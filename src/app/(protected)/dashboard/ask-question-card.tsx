"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import useProject from '@/hooks/use-project'
import Image from 'next/image'
import React from 'react'
import { askQuestion } from './actions'
import { readStreamableValue } from 'ai/rsc'
import MDEditor from '@uiw/react-md-editor'
import CodeReferences from './code-references'
import { api } from '@/trpc/react'
import { toast } from '@/hooks/use-toast'
import useRefetch from '@/hooks/use-refetch'
import { Loader } from 'lucide-react'


const AskQuestionCard = () => {
    const { project } = useProject()
    const [question, setQuestion] = React.useState('')
    const [open, setOpen] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [fileRefrences, setFileRefrences] = React.useState<{
        fileName: string,
        sourceCode: string,
        summary: string
    }[]>([])
    const refetch = useRefetch()
    const [answer, setAnswer] = React.useState('')
    const saveAnswer = api.project.saveAnswer.useMutation()

    
    const handleSubmit = async (e: React.FormEvent) => {
        setAnswer('')
        setFileRefrences([])
        if(!project?.id) return
        e.preventDefault()
        setLoading(true)

        const {output, fileRefrences} = await askQuestion(question, project.id)
        setOpen(true)

        setFileRefrences(fileRefrences)

        setLoading(false)
        for await (const delta of readStreamableValue(output)){
            if(delta){
                setAnswer(prev => prev + delta)
            }
        }
    }   

  return (
    <>
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className='sm:max-w-[90vw] max-h-[90vh] overflow-hidden flex flex-col'>
                <DialogHeader className="border-b pb-4">
                    <div className='flex items-center justify-between'>
                        <DialogTitle className="flex items-center text-xl font-semibold">
                            <div className="p-2 bg-blue-100 rounded-lg mr-3">
                                <Image src='/git.svg' alt='logo' width={24} height={24}/>
                            </div>
                            AI Assistant Response
                        </DialogTitle>
                        <div className="flex items-center gap-2">
                            <Button 
                                disabled={saveAnswer.isPending} 
                                variant={"outline"} 
                                size="sm"
                                onClick={()=>{
                                    saveAnswer.mutate({
                                        projectId : project?.id!,
                                        question,
                                        fileReferences : fileRefrences,
                                        answer
                                    },
                                    {
                                        onSuccess : () => {
                                            toast({
                                                description : 'Your answer has been saved',
                                                variant : 'default'
                                            })
                                            refetch()
                                        },
                                        onError : (error) => {
                                            toast({
                                                description :"Failed to save the answer",
                                                variant : 'destructive'
                                            })
                                        }
                                    }
                                )
                                }}
                                className="bg-green-600 hover:bg-green-700 text-white border-green-600"
                            >
                                {saveAnswer.isPending ? (
                                    <>
                                        <Loader className="w-4 h-4 mr-2 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        Save Answer
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </DialogHeader>
                
                <div className='flex-1 overflow-auto py-4'>
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                        <p className="text-sm font-medium text-blue-800 mb-1">Your Question:</p>
                        <p className="text-blue-700">{question}</p>
                    </div>
                    
                    <div className="prose max-w-none">
                        <MDEditor.Markdown 
                            source={answer || "Generating response..."} 
                            className='w-full p-4 rounded-lg border bg-white min-h-[300px]' 
                        />
                    </div>
                    
                    {fileRefrences.length > 0 && (
                        <div className="mt-6">
                            <CodeReferences filesRefrences={fileRefrences} />
                        </div>
                    )}
                </div>
                
                <div className="border-t pt-4 flex justify-end">
                    <Button 
                        type='button' 
                        variant="outline"
                        onClick={() => {
                            setOpen(false)
                            setAnswer('')
                            setQuestion('')
                            setLoading(false)
                        }}
                    >
                        Close
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
        <Card className='relative border-0 shadow-sm hover:shadow-md transition-all duration-300'>
            <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg mr-3">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    Ask AI Assistant
                </CardTitle>
                <p className="text-gray-600 text-sm mt-1">
                    Get instant answers about your codebase structure and functionality
                </p>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <Textarea 
                            placeholder='Which file should I edit to change the home page? How does authentication work? Where are the API routes defined?'
                            value={question}
                            onChange={e => setQuestion(e.target.value)}
                            className="min-h-[120px] resize-none border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                            disabled={loading}
                        />
                        {question.length > 0 && (
                            <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                                {question.length} characters
                            </div>
                        )}
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500">
                            💡 Tip: Be specific for better results
                        </div>
                        <Button 
                            disabled={loading || !question.trim()} 
                            type='submit'
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
                        >
                            {loading ? (
                                <>
                                    <Loader className='animate-spin mr-2' size={16} />
                                    Analyzing...
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                    Ask Question
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    </>
  )
}

export default AskQuestionCard