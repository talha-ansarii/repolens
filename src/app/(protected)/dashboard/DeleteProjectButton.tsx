import { Button } from '@/components/ui/button'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import useProject from '@/hooks/use-project'
import useRefetch from '@/hooks/use-refetch'
import { api } from '@/trpc/react'
import { Trash2, Loader } from 'lucide-react'
import React from 'react'

const DeleteProjectButton = () => {
    const {selectedProjectId , setSelectedProjectId} = useProject()
    const projectId = selectedProjectId ?? ""
    const deleteProject = api.project.deteteProject.useMutation()
    const refetch = useRefetch()
    
    const handleDelete = () => {
        if(projectId){
             deleteProject.mutate({projectId}
                ,
                {
                    onSuccess : () => {
                        setSelectedProjectId?.("")
                        refetch()
                    }
                }
            )
        }
    }

  return (
    <AlertDialog>
        <AlertDialogTrigger asChild>
            <Button
                size={"sm"} 
                variant={"outline"}
                className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-colors"
            >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Project
            </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center">
                    <Trash2 className="w-5 h-5 mr-2 text-red-600" />
                    Delete Project
                </AlertDialogTitle>
                <AlertDialogDescription className="text-gray-600">
                    Are you sure you want to delete this project? This action cannot be undone and will permanently remove all project data including commit history and saved Q&A sessions.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                    onClick={handleDelete}
                    disabled={deleteProject.isPending}
                    className="bg-red-600 hover:bg-red-700 text-white"
                >
                    {deleteProject.isPending ? (
                        <>
                            <Loader className="w-4 h-4 mr-2 animate-spin" />
                            Deleting...
                        </>
                    ) : (
                        <>
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Project
                        </>
                    )}
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteProjectButton