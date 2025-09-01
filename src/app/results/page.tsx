'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, CheckCircle, AlertCircle, TrendingUp, RotateCcw, Brain } from 'lucide-react'
import { QuizResult, questions } from '@/lib/quiz-data'
import { AsciiBackground } from '@/components/ascii-background'

export default function ResultsPage() {
  const [results, setResults] = useState<QuizResult | null>(null)
  const router = useRouter()

  useEffect(() => {
    const savedResults = localStorage.getItem('quizResults')
    if (savedResults) {
      setResults(JSON.parse(savedResults))
    } else {
      router.push('/')
    }
  }, [router])

  if (!results) {
    return (
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center" style={{ background: '#007BE5' }}>
        <AsciiBackground />
        <div className="relative z-10 text-center">
          <div 
            className="text-white text-lg animate-pulse"
            style={{ fontFamily: 'DM Mono, monospace' }}
          >
            LOADING RESULTS...
          </div>
        </div>
      </div>
    )
  }

  const getReadinessColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'text-red-300 bg-red-500/20 border-red-400/30'
      case 'developing': return 'text-orange-300 bg-orange-500/20 border-orange-400/30'
      case 'advanced': return 'text-blue-300 bg-blue-500/20 border-blue-400/30'
      case 'expert': return 'text-green-300 bg-green-500/20 border-green-400/30'
      default: return 'text-white/70 bg-white/10 border-white/30'
    }
  }

  const getReadinessIcon = (level: string) => {
    switch (level) {
      case 'beginner': return <AlertCircle className="w-6 h-6" />
      case 'developing': return <TrendingUp className="w-6 h-6" />
      case 'advanced': return <CheckCircle className="w-6 h-6" />
      case 'expert': return <Brain className="w-6 h-6" />
      default: return <AlertCircle className="w-6 h-6" />
    }
  }

  const categoryNames = {
    tech: 'TECH INFRASTRUCTURE',
    data: 'DATA & PROCESSES', 
    team: 'TEAM READINESS',
    business: 'BUSINESS STRATEGY'
  }

  const percentage = Math.round((results.totalScore / results.maxScore) * 100)

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: '#007BE5' }}>
      <AsciiBackground />
      
      <div className="relative z-10 min-h-screen py-8 px-4">
        <header className="text-center mb-8">
          <h1 
            className="text-3xl font-bold text-white"
            style={{ fontFamily: 'DM Mono, monospace' }}
          >
            AI READINESS RESULTS
          </h1>
        </header>

        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-8">
            <div className="text-center mb-8">
              <div className={`inline-flex items-center px-4 py-2 rounded-lg font-semibold text-lg border ${getReadinessColor(results.readinessLevel)}`}>
                {getReadinessIcon(results.readinessLevel)}
                <span 
                  className="ml-2 uppercase tracking-wide"
                  style={{ fontFamily: 'DM Mono, monospace' }}
                >
                  {results.readinessLevel} LEVEL
                </span>
              </div>
              <div className="mt-6">
                <div 
                  className="text-5xl font-bold text-white mb-2"
                  style={{ fontFamily: 'DM Mono, monospace' }}
                >
                  {percentage}%
                </div>
                <div 
                  className="text-white/70"
                  style={{ fontFamily: 'DM Mono, monospace' }}
                >
                  OVERALL AI READINESS SCORE
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {Object.entries(results.categoryScores).map(([category, score]) => {
                const maxCategoryScore = questions.filter(q => q.category === category).length * 4
                const categoryPercentage = Math.round((score / maxCategoryScore) * 100)
                
                return (
                  <div key={category} className="border border-white/20 rounded-lg p-4 bg-white/5">
                    <div className="flex justify-between items-center mb-3">
                      <h3 
                        className="font-semibold text-white text-sm"
                        style={{ fontFamily: 'DM Mono, monospace' }}
                      >
                        {categoryNames[category as keyof typeof categoryNames]}
                      </h3>
                      <span 
                        className="text-sm font-medium text-white/70"
                        style={{ fontFamily: 'DM Mono, monospace' }}
                      >
                        {categoryPercentage}%
                      </span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div 
                        className="bg-white h-2 rounded-full transition-all duration-500"
                        style={{ width: `${categoryPercentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-8">
            <h2 
              className="text-xl font-semibold text-white mb-6"
              style={{ fontFamily: 'DM Mono, monospace' }}
            >
              RECOMMENDED NEXT STEPS
            </h2>
            <div className="space-y-4">
              {results.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0 mt-0.5" />
                  <p 
                    className="text-white/80 text-sm leading-relaxed"
                    style={{ fontFamily: 'DM Mono, monospace' }}
                  >
                    {recommendation.toUpperCase()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="flex items-center justify-center px-6 py-3 bg-white/20 hover:bg-white/30 text-white font-medium rounded-lg transition-all border border-white/30 backdrop-blur-sm"
              style={{ fontFamily: 'DM Mono, monospace' }}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              TAKE AGAIN
            </Link>
            <button
              onClick={() => window.print()}
              className="flex items-center justify-center px-6 py-3 bg-white/20 hover:bg-white/30 text-white font-medium rounded-lg transition-all border border-white/30 backdrop-blur-sm"
              style={{ fontFamily: 'DM Mono, monospace' }}
            >
              SAVE RESULTS
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}