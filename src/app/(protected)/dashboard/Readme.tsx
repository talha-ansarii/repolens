"use client"
import useProject from '@/hooks/use-project'
import React from 'react'
import { generateReadme } from './readmeAction'
import { readStreamableValue } from 'ai/rsc'
import { Button } from '@/components/ui/button'
import MDEditor from '@uiw/react-md-editor'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import Image from 'next/image'
import { Copy } from 'lucide-react'
import { toast } from 'sonner'
import { Loader } from 'lucide-react';

const Readme = () => {
    const {selectedProjectId} = useProject()
    const projectId = selectedProjectId || ''
    const [readme, setReadme] = React.useState('')
    const [open, setOpen] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const generateReadmee = async () => {
        setReadme('')
        setLoading(true)
        const { output } = await generateReadme(projectId)
        setOpen(true)
        for await (const delta of readStreamableValue(output)){
            if(delta){
                setReadme(prev => prev + delta)
            }
        }
        setLoading(false)
        
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(readme).then(() => {
            toast.success("Copied to clipboard!")
        }).catch(err => console.error("Failed to copy: ", err))
    }

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className='sm:max-w-[90vw] max-h-[90vh] overflow-hidden flex flex-col'>
                    <DialogHeader className="border-b pb-4">
                        <div className='flex items-center justify-between'>
                            <DialogTitle className='flex items-center text-xl font-semibold'>
                                <div className="p-2 bg-green-100 rounded-lg mr-3">
                                    <Image src='/git.svg' alt='logo' width={24} height={24}/>
                                </div>
                                Generated README
                            </DialogTitle>
                            <div className="flex items-center gap-2">
                                {loading && <Loader size={20} className='animate-spin text-green-600' />}
                                <Button 
                                    onClick={copyToClipboard} 
                                    variant="outline"
                                    size="sm"
                                    className='flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white border-green-600'
                                    disabled={!readme || loading}
                                >
                                    <Copy size={16} /> 
                                    Copy to Clipboard
                                </Button>
                            </div>
                        </div>
                    </DialogHeader>
                    
                    <div className="flex-1 overflow-auto py-4">
                        <div className="prose max-w-none">
                            <MDEditor.Markdown 
                                source={readme || "Generating README documentation..."} 
                                className='w-full p-4 rounded-lg border bg-white min-h-[400px]' 
                            />
                        </div>
                    </div>
                    
                    <div className="border-t pt-4 flex justify-end">
                        <Button 
                            type='button' 
                            variant="outline"
                            onClick={() => setOpen(false)}
                        >
                            Close
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
            <div className="space-y-4">
                <div className="text-center">
                    <div className="p-3 bg-green-100 rounded-lg inline-block mb-3">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Generate Documentation</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Create comprehensive README documentation for your project automatically
                    </p>
                </div>
                <Button 
                    className='w-full bg-green-600 hover:bg-green-700 text-white transition-colors duration-200' 
                    onClick={generateReadmee}
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <Loader className='animate-spin mr-2' size={16} />
                            Generating...
                        </>
                    ) : (
                        <>
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Generate README
                        </>
                    )}
                </Button>
            </div>
        </div>
    )
}

export default Readme
