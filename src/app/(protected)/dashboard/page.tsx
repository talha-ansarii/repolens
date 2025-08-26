"use client";

import useProject from '@/hooks/use-project';
import { ExternalLink, Github, GitBranch, Star, Activity, Calendar, Users } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import CommitLog from './commit-log';
import AskQuestionCard from './ask-question-card';
import DeleteProjectButton from './DeleteProjectButton';
import Readme from './Readme';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
// import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";

const DashboardPage = () => {
  const { project, isLoading, isError, error } = useProject();
  // const {getUser} = useKindeBrowserClient()

  // const user = getUser()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-6 py-8">
          {/* Header Skeleton */}
          <div className="mb-8">
            <Skeleton className="h-8 w-64 mb-4" />
            <Skeleton className="h-4 w-96" />
          </div>
          
          {/* Stats Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="border-0 shadow-sm">
                <CardHeader className="pb-3">
                  <Skeleton className="h-4 w-20" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-16 mb-2" />
                  <Skeleton className="h-3 w-24" />
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Main Content Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Skeleton className="h-64 w-full" />
            </div>
            <div>
              <Skeleton className="h-40 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white flex items-center justify-center">
        <div className="max-w-md w-full px-6">
          <Alert variant="destructive">
            <AlertDescription className="text-center">
              <strong>Error loading project:</strong> {error?.message}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 mb-4">
            <Github className="mx-auto h-16 w-16" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No project selected</h3>
          <p className="text-gray-500">Please select a project to view the dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <div className="container mx-auto px-6 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Project Dashboard
              </h1>
              <p className="text-gray-600">
                Overview and insights for your repository
              </p>
            </div>
            <div className="flex items-center gap-3">
              <DeleteProjectButton />
            </div>
          </div>
        </div>

        {/* Project Info Card */}
        <Card className="mb-8 border-0 shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
          <CardContent className="p-8 relative z-10">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Github className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-1">
                    Connected Repository
                  </h2>
                  <Link 
                    href={project?.githubUrl ?? ''} 
                    className="inline-flex items-center text-white/90 hover:text-white transition-colors group"
                    target="_blank"
                  >
                    <span className="font-medium">{project?.name || project?.githubUrl}</span>
                    <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <GitBranch className="w-3 h-3 mr-1" />
                Active
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <Activity className="w-4 h-4 mr-2" />
                Commits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">24</div>
              <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <Users className="w-4 h-4 mr-2" />
                Contributors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">3</div>
              <p className="text-xs text-gray-500 mt-1">Active members</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <Star className="w-4 h-4 mr-2" />
                Stars
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">127</div>
              <p className="text-xs text-gray-500 mt-1">GitHub stars</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Last Update
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">2h</div>
              <p className="text-xs text-gray-500 mt-1">ago</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <AskQuestionCard />
          </div>
          <div className="space-y-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <Readme />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Commit Log Section */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center">
              <Activity className="w-5 h-5 mr-2 text-blue-600" />
              Recent Activity
            </CardTitle>
            <p className="text-gray-600 text-sm">Latest commits and changes</p>
          </CardHeader>
          <CardContent>
            <CommitLog />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
