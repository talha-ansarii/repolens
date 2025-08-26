"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import useRefetch from '@/hooks/use-refetch'
import { useToast } from '@/hooks/use-toast'
import { api } from '@/trpc/react'
import { Github, Loader, ExternalLink, Sparkles, CheckCircle, ArrowRight } from 'lucide-react'
import React from 'react'
import {useForm} from 'react-hook-form'
import { toast } from "sonner"
import Image from 'next/image'

type FormInput ={
    repoUrl : string,
    projectName : string,
    githubToken? : string
}


const CreatePage = () => {
    const {register, handleSubmit, reset, watch, formState: { errors } } = useForm<FormInput>()
    const createProject = api.project.createProject.useMutation()
    const refetch = useRefetch()

    const watchedRepoUrl = watch('repoUrl')
    const watchedProjectName = watch('projectName')

    function onSubmit(data: FormInput){
        createProject.mutate({
            githubUrl : data.repoUrl,
            name : data.projectName,
        },{
            onSuccess : () => {
                toast.success("Project Created Successfully! 🎉")
                refetch()
                reset()
            },
            onError : () => {
                toast.error("Failed to create project. Please check your repository URL.")
            }
        })
        return true
    }

    const steps = [
        { title: 'Connect Repository', description: 'Link your GitHub repository', completed: !!watchedRepoUrl },
        { title: 'Name Project', description: 'Give your project a name', completed: !!watchedProjectName },
        { title: 'AI Analysis', description: 'Our AI will analyze your code', completed: false }
    ];

    return (
        <div className="min-h-full bg-gradient-to-br from-slate-50 to-white p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
                        <Sparkles className="h-4 w-4" />
                        Create New Project
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-3">
                        Connect Your GitHub Repository
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Transform your repository into an intelligent, searchable knowledge base with AI-powered insights.
                    </p>
                </div>

                {/* Progress Steps */}
                <div className="flex justify-center mb-8">
                    <div className="flex items-center space-x-4">
                        {steps.map((step, index) => (
                            <div key={index} className="flex items-center">
                                <div className="flex items-center space-x-3">
                                    <div className={`
                                        flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors duration-200
                                        ${step.completed 
                                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 border-transparent text-white' 
                                            : 'border-gray-300 text-gray-400'
                                        }
                                    `}>
                                        {step.completed ? (
                                            <CheckCircle className="h-5 w-5" />
                                        ) : (
                                            <span className="text-sm font-medium">{index + 1}</span>
                                        )}
                                    </div>
                                    <div className="hidden sm:block">
                                        <p className={`text-sm font-medium ${step.completed ? 'text-blue-600' : 'text-gray-500'}`}>
                                            {step.title}
                                        </p>
                                        <p className="text-xs text-gray-400">{step.description}</p>
                                    </div>
                                </div>
                                {index < steps.length - 1 && (
                                    <ArrowRight className="h-4 w-4 text-gray-300 mx-4" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-2 gap-8 items-start">
                    {/* Illustration */}
                    <div className="relative">
                        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 text-center">
                            <div className="relative">
                                <Image 
                                    src='/create.png' 
                                    alt='Create project illustration'
                                    width={300}
                                    height={200}
                                    className='mx-auto mb-6'
                                />
                                <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                                    <Github className="h-6 w-6 text-white" />
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                AI-Powered Analysis
                            </h3>
                            <p className="text-gray-600">
                                Our intelligent system will analyze your repository structure, dependencies, 
                                and codebase to provide instant insights and documentation.
                            </p>
                        </div>
                    </div>

                    {/* Form */}
                    <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                        <CardHeader className="pb-6">
                            <CardTitle className="flex items-center gap-3 text-xl">
                                <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
                                    <Github className="h-5 w-5 text-white" />
                                </div>
                                Repository Details
                            </CardTitle>
                            <CardDescription>
                                Enter your repository information to get started with AI analysis
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <div className="space-y-2">
                                    <label htmlFor="projectName" className="text-sm font-medium text-gray-700">
                                        Project Name
                                    </label>
                                    <Input
                                        id="projectName"
                                        {...register('projectName', { 
                                            required: 'Project name is required',
                                            minLength: { value: 2, message: 'Project name must be at least 2 characters' }
                                        })}
                                        placeholder='Enter a memorable project name'
                                        className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    />
                                    {errors.projectName && (
                                        <p className="text-sm text-red-600">{errors.projectName.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="repoUrl" className="text-sm font-medium text-gray-700">
                                        GitHub Repository URL
                                    </label>
                                    <div className="relative">
                                        <Input
                                            id="repoUrl"
                                            {...register('repoUrl', { 
                                                required: 'Repository URL is required',
                                                pattern: {
                                                    value: /^https:\/\/github\.com\/.+\/.+$/,
                                                    message: 'Please enter a valid GitHub repository URL'
                                                }
                                            })}
                                            placeholder='https://github.com/username/repository'
                                            type='url'
                                            className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500 pr-10"
                                            required
                                        />
                                        <ExternalLink className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    </div>
                                    {errors.repoUrl && (
                                        <p className="text-sm text-red-600">{errors.repoUrl.message}</p>
                                    )}
                                    <p className="text-xs text-gray-500">
                                        Make sure your repository is public or you have the necessary permissions
                                    </p>
                                </div>

                                <Button 
                                    disabled={createProject.isPending} 
                                    type='submit'
                                    className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200"
                                >
                                    {createProject.isPending ? (
                                        <div className="flex items-center gap-2">
                                            <Loader className='animate-spin h-4 w-4' />
                                            Creating Project...
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <Sparkles className="h-4 w-4" />
                                            Create Project & Start Analysis
                                        </div>
                                    )}
                                </Button>
                            </form>

                            
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default CreatePage