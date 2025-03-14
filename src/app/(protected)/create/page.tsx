"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useRefetch from '@/hooks/use-refetch'
import { useToast } from '@/hooks/use-toast'
import { api } from '@/trpc/react'
import { FormInput, Loader } from 'lucide-react'
import React from 'react'
import {useForm} from 'react-hook-form'

import { toast } from "sonner"

type FormInput ={
    repoUrl : string,
    projectName : string,
    githubToken? : string
}


const CreatePage = () => {

    const {register, handleSubmit, reset } = useForm<FormInput>()

    const createProject = api.project.createProject.useMutation()

    
    
    const refetch = useRefetch()

    function onSubmit(data: FormInput){
        createProject.mutate({
            githubUrl : data.repoUrl,
            name : data.projectName,
        },{
            onSuccess : () => {
                toast.success("Project Created Successfully")
                refetch()
                reset()
            },
            onError : () => {
                toast.error("Failed to create project")
            }
        })
        return true
    }
  return (
    <div className='flex items-center gap-12 h-full justify-center'>
        <img src='/create.png' className='h-56 w-auto' />
        <div>
            <div>
                <h1 className='font-semibold text2xl '>Link your Github Repository</h1>
                <p className='text-sm text-muted-foreground'>
                    Enter the URL of your repository to link it to Repolens.
                </p>
            </div>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='h-2'></div>
                    <Input
                        {...register('projectName',  {required : true})}
                        placeholder='Project Name'
                        required
                     /> 
                     <div className='h-2'></div>
                    <Input
                        {...register('repoUrl',  {required : true})}
                        placeholder='Girhub Url'
                        type='url'
                        required
                     /> 
                     <div className='h-2'></div>
                     

                     <div className='h-4'></div>
                     <Button disabled={createProject.isPending} type='submit'>
                        {
                            createProject.isPending ? <Loader className='animate-spin' size={24}/> : "Create Project"
                        }
                     </Button>

                </form>
            </div>
        </div>
    </div>
  )
}

export default CreatePage