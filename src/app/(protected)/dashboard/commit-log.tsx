import useProject from '@/hooks/use-project'
import { cn } from '@/lib/utils'
import { api } from '@/trpc/react'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const CommitLog = () => {
    const {selectedProjectId : projectId, project} = useProject()
    
    
    const {data : commits} = api.project.getCommits.useQuery({projectId : projectId!})

    if (!commits || commits.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                    <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No commits found</h3>
                <p className="text-gray-500">Commit history will appear here once available.</p>
            </div>
        );
    }

  return (
    <div className="flow-root">
         <ul className='space-y-6'>
            {commits?.map((commit, commitIdx) => {
                return <li key={commit.id} className='relative flex gap-x-4'>
                    <div className={cn(
                        commitIdx === commits.length - 1 ? ' h-6 ' : ' -bottom-6 ',
                        "absolute left-0 top-0 flex w-6 justify-center"
                    )}>
                        <div className='w-px translate-x-1 bg-gray-200'></div>
                    </div>
                    <>
                        <div className="relative">
                            <img 
                                src={commit?.commitAuthorAvatar ?? ''} 
                                alt="commit avatar" 
                                className="relative mt-3 size-10 flex-none rounded-full bg-gray-50 ring-2 ring-white shadow-sm"
                            />
                            <div className="absolute -bottom-1 -right-1 size-4 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>
                        <div className='flex-auto rounded-lg bg-white p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200'>
                            <div className='flex justify-between items-start gap-x-4 mb-3'>
                                <div>
                                    <span className='font-semibold text-gray-900 text-base'>
                                        {commit.commitAuthorName}
                                    </span>
                                    <div className='mt-1 text-sm text-gray-600'>
                                        {new Date(commit.createdAt).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </div>
                                </div>
                                <Link 
                                    className='inline-flex items-center px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors' 
                                    target='_blank' 
                                    href={`${project?.githubUrl}/commit/${commit.commitHash}`}
                                >
                                    View commit
                                    <ExternalLink className='size-3 ml-1'/>
                                </Link>
                            </div>
                            <h4 className='font-semibold text-gray-900 mb-2 leading-tight'>
                                {commit.commitMessage}
                            </h4>
                            {commit.summary && (
                                <div className='mt-3 p-3 bg-gray-50 rounded-lg'>
                                    <pre className='whitespace-pre-wrap text-sm text-gray-700 font-mono leading-relaxed'>
                                        {commit.summary}
                                    </pre>
                                </div>
                            )}
                        </div> 
                    </>
                </li>
            })}
         </ul>
    </div>
  )
}

export default CommitLog