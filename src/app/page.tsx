import Link from "next/link";

import { auth } from "@/server/auth";
import { Github, FileText, MessageSquare, GitCommit, Users, Star, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default async function Home() {

  const session = await auth(); 
  // console.log(session?.user)


  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-x-hidden">
    {/* Enhanced Header */}
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50 w-full">
      <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center">
      <Link className="flex items-center justify-center group" href="#">
        <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg mr-3 group-hover:scale-105 transition-transform">
          <Github className="h-5 w-5 text-white" />
        </div>
        <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Repo Lens
        </span>
      </Link>
      <nav className="ml-auto flex gap-6 items-center">
        <div className="hidden md:flex gap-6">
          <Link href="#features" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
            Features
          </Link>
          <Link href="#how-it-works" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
            How it works
          </Link>
        </div>
        {session ? (
          <div className="flex items-center gap-4">
            <Button asChild variant="outline" size="sm">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/api/auth/signout">Log out</Link>
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="sm">
              <Link href="/api/auth/signin">Sign In</Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Link href="/api/auth/signin">Get Started</Link>
            </Button>
          </div>
        )}
      </nav>
      </div>
    </header>

    <main className="flex-1 w-full">
      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-32 lg:py-40 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-pink-600/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-600/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto relative px-4 md:px-6">
          <div className="flex flex-col items-center space-y-8 text-center">
            <Badge variant="secondary" className="px-4 py-2 bg-blue-100 text-blue-700 border-blue-200">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Repository Analysis
            </Badge>
            
            <div className="space-y-6 max-w-4xl">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                  Unlock the Power of Your
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  GitHub Repositories
                </span>
              </h1>
              <p className="mx-auto max-w-[700px] text-xl text-gray-600 leading-relaxed">
                Transform how you understand code with AI-powered analysis. Ask questions, generate documentation, 
                and get insights from any GitHub repository in seconds.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {session ? (
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg">
                    <Link href="/dashboard">
                      Go to Dashboard
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="px-8 py-6 text-lg border-2">
                    <Link href="/create">
                      Add New Repository
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg">
                    <Link href="/api/auth/signin">
                      Start Free Analysis
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="px-8 py-6 text-lg border-2">
                    <Link href="#demo">
                      Watch Demo
                    </Link>
                  </Button>
                </div>
              )}
            </div>

            {/* Trust indicators */}
            <div className="pt-8 flex flex-col items-center gap-4">
              <p className="text-sm text-gray-500">Trusted by developers worldwide</p>
              <div className="flex items-center gap-8 text-gray-400">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-current text-yellow-400" />
                  <span className="text-sm font-medium">4.9/5 Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span className="text-sm font-medium">10k+ Users</span>
                </div>
                <div className="flex items-center gap-2">
                  <Github className="w-4 h-4" />
                  <span className="text-sm font-medium">50k+ Repos Analyzed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section id="features" className="w-full py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="px-4 py-2 bg-purple-100 text-purple-700 border-purple-200 mb-4">
              Powerful Features
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
              Everything you need to understand
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> any repository</span>
            </h2>
            <p className="mx-auto max-w-[700px] text-xl text-gray-600">
              Powerful AI-driven tools that make repository analysis effortless and insightful
            </p>
          </div>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="group relative p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-blue-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="p-3 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform">
                  <Github className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Repository Analysis</h3>
                <p className="text-gray-600 leading-relaxed">
                  Deep dive into any GitHub repository with just a link. Our AI analyzes code structure, dependencies, and patterns.
                </p>
              </div>
            </div>

            <div className="group relative p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border border-green-200 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-green-600/0 to-green-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="p-3 bg-gradient-to-br from-green-600 to-green-700 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform">
                  <MessageSquare className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">AI-Powered Q&A</h3>
                <p className="text-gray-600 leading-relaxed">
                  Ask natural language questions about code structure, functionality, and implementation details. Get instant, accurate answers.
                </p>
              </div>
            </div>

            <div className="group relative p-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border border-purple-200 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-purple-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="p-3 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Instant Documentation</h3>
                <p className="text-gray-600 leading-relaxed">
                  Generate comprehensive README files, API documentation, and code comments automatically with perfect formatting.
                </p>
              </div>
            </div>

            <div className="group relative p-8 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl border border-orange-200 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600/0 to-orange-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="p-3 bg-gradient-to-br from-orange-600 to-orange-700 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform">
                  <GitCommit className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Commit Intelligence</h3>
                <p className="text-gray-600 leading-relaxed">
                  Track development progress with intelligent commit analysis, summaries, and impact assessments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-20 md:py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-repeat" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        <div className="container mx-auto relative px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
              Trusted by developers worldwide
            </h2>
            <p className="mx-auto max-w-[600px] text-xl text-blue-100">
              Join thousands of developers who are already using Repo Lens to understand code better
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">50k+</div>
              <div className="text-blue-200">Repositories Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">10k+</div>
              <div className="text-blue-200">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">1M+</div>
              <div className="text-blue-200">Questions Answered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">99.9%</div>
              <div className="text-blue-200">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="w-full py-20 md:py-32 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="px-4 py-2 bg-green-100 text-green-700 border-green-200 mb-4">
              Simple Process
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
              Get started in
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"> three simple steps</span>
            </h2>
            <p className="mx-auto max-w-[600px] text-xl text-gray-600">
              From repository URL to deep insights in minutes
            </p>
          </div>
          
          <div className="grid gap-12 md:gap-8 lg:grid-cols-3">
            <div className="flex flex-col items-center text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold group-hover:scale-110 transition-transform">
                  1
                </div>
                <div className="absolute -inset-4 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Connect Repository</h3>
              <p className="text-gray-600 leading-relaxed max-w-sm">
                Simply paste your GitHub repository URL. Our system securely analyzes your code structure and content.
              </p>
            </div>

            <div className="flex flex-col items-center text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold group-hover:scale-110 transition-transform">
                  2
                </div>
                <div className="absolute -inset-4 bg-gradient-to-br from-green-600/20 to-blue-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI Analysis</h3>
              <p className="text-gray-600 leading-relaxed max-w-sm">
                Our advanced AI processes your repository, understanding code patterns, architecture, and dependencies.
              </p>
            </div>

            <div className="flex flex-col items-center text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold group-hover:scale-110 transition-transform">
                  3
                </div>
                <div className="absolute -inset-4 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Get Insights</h3>
              <p className="text-gray-600 leading-relaxed max-w-sm">
                Ask questions, generate documentation, and explore your codebase with unprecedented clarity and speed.
              </p>
            </div>
          </div>
        </div>
      </section>
      
    </main>

    {/* Enhanced Footer */}
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link className="flex items-center mb-4" href="#">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg mr-3">
                <Github className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Repo Lens
              </span>
            </Link>
            <p className="text-gray-300 mb-4 max-w-md leading-relaxed">
              Transform how you understand code with AI-powered repository analysis. 
              Get insights, documentation, and answers from any GitHub repository.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://github.com/talha-ansarii" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com/in/talha-ansarii" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#features" className="text-gray-300 hover:text-white transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">
                  How it Works
                </Link>
              </li>
              <li>
                <Link href="/api/auth/signin" className="text-gray-300 hover:text-white transition-colors">
                  Get Started
                </Link>
              </li>
            </ul>
          </div>

          {/* Developer Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Developer</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://github.com/talha-ansarii" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a 
                  href="https://portfolio-talha-ansaris-projects.vercel.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Portfolio
                </a>
              </li>
              <li>
                <a 
                  href="https://linkedin.com/in/talha-ansarii" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Repo Lens. Made with ❤️ by{' '}
            <a 
              href="https://linkedin.com/in/talha-ansarii" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Talha Ansari
            </a>
          </p>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <span className="text-gray-400 text-sm">Powered by AI</span>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm">Online</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
  );
}
