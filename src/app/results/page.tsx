'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, CheckCircle, AlertCircle, TrendingUp, RotateCcw, Brain } from 'lucide-react'
import { QuizResult, questions } from '@/lib/quiz-data'

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
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{ background: 'rgb(250, 246, 240)' }}
      >
        <div className="text-center">
          <Brain className="w-12 h-12 mx-auto mb-4 animate-pulse" style={{ color: 'rgb(252, 61, 33)' }} />
          <p 
            style={{ 
              fontFamily: 'Inter, sans-serif',
              color: 'rgb(0, 0, 0)'
            }}
          >
            Loading your results...
          </p>
        </div>
      </div>
    )
  }

  const getReadinessColor = (level: string) => {
    switch (level) {
      case 'beginner': return { text: 'rgb(220, 38, 127)', bg: 'rgba(220, 38, 127, 0.1)', border: 'rgb(220, 38, 127)' }
      case 'developing': return { text: 'rgb(245, 158, 11)', bg: 'rgba(245, 158, 11, 0.1)', border: 'rgb(245, 158, 11)' }
      case 'advanced': return { text: 'rgb(59, 130, 246)', bg: 'rgba(59, 130, 246, 0.1)', border: 'rgb(59, 130, 246)' }
      case 'expert': return { text: 'rgb(32, 205, 90)', bg: 'rgba(32, 205, 90, 0.1)', border: 'rgb(32, 205, 90)' }
      default: return { text: 'rgb(0, 0, 0)', bg: 'rgba(0, 0, 0, 0.1)', border: 'rgba(0, 0, 0, 0.3)' }
    }
  }

  const getReadinessIcon = (level: string) => {
    const colors = getReadinessColor(level)
    switch (level) {
      case 'beginner': return <AlertCircle className="w-6 h-6" style={{ color: colors.text }} />
      case 'developing': return <TrendingUp className="w-6 h-6" style={{ color: colors.text }} />
      case 'advanced': return <CheckCircle className="w-6 h-6" style={{ color: colors.text }} />
      case 'expert': return <Brain className="w-6 h-6" style={{ color: colors.text }} />
      default: return <AlertCircle className="w-6 h-6" style={{ color: colors.text }} />
    }
  }

  const categoryNames = {
    tech: 'Technology Infrastructure',
    data: 'Data & Processes', 
    team: 'Team Readiness',
    business: 'Business Strategy'
  }

  const percentage = Math.round((results.totalScore / results.maxScore) * 100)
  const levelColors = getReadinessColor(results.readinessLevel)

  return (
    <div className="min-h-screen" style={{ background: 'rgb(250, 246, 240)' }}>
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <div className="flex justify-center items-center mb-4">
            <Brain className="w-8 h-8 mr-2" style={{ color: 'rgb(252, 61, 33)' }} />
            <h1 
              className="text-2xl font-bold"
              style={{ 
                fontFamily: 'Unbounded, sans-serif',
                color: 'rgb(0, 0, 0)'
              }}
            >
              Your AI Readiness Results
            </h1>
          </div>
        </header>

        <div className="max-w-4xl mx-auto space-y-6">
          <div 
            className="rounded-lg shadow-lg p-8"
            style={{ background: 'rgb(255, 255, 255)' }}
          >
            <div className="text-center mb-8">
              <div 
                className="inline-flex items-center px-4 py-2 rounded-lg font-semibold text-lg border"
                style={{
                  color: levelColors.text,
                  background: levelColors.bg,
                  borderColor: levelColors.border
                }}
              >
                {getReadinessIcon(results.readinessLevel)}
                <span 
                  className="ml-2 capitalize"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {results.readinessLevel} Level
                </span>
              </div>
              <div className="mt-6">
                <div 
                  className="text-5xl font-bold mb-2"
                  style={{ 
                    fontFamily: 'Unbounded, sans-serif',
                    color: 'rgb(0, 0, 0)'
                  }}
                >
                  {percentage}%
                </div>
                <div 
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    color: 'rgb(0, 0, 0)',
                    opacity: 0.7
                  }}
                >
                  Overall AI Readiness Score
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {Object.entries(results.categoryScores).map(([category, score]) => {
                const maxCategoryScore = questions.filter(q => q.category === category).length * 4
                const categoryPercentage = Math.round((score / maxCategoryScore) * 100)
                
                return (
                  <div 
                    key={category} 
                    className="border rounded-lg p-4"
                    style={{ 
                      borderColor: 'rgba(0, 0, 0, 0.1)',
                      background: 'rgb(250, 246, 240)'
                    }}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h3 
                        className="font-semibold text-sm"
                        style={{ 
                          fontFamily: 'Inter, sans-serif',
                          color: 'rgb(0, 0, 0)'
                        }}
                      >
                        {categoryNames[category as keyof typeof categoryNames]}
                      </h3>
                      <span 
                        className="text-sm font-medium"
                        style={{ 
                          fontFamily: 'Fragment Mono, monospace',
                          color: 'rgb(0, 0, 0)',
                          opacity: 0.7
                        }}
                      >
                        {categoryPercentage}%
                      </span>
                    </div>
                    <div 
                      className="w-full rounded-full h-2"
                      style={{ background: 'rgba(0, 0, 0, 0.1)' }}
                    >
                      <div 
                        className="h-2 rounded-full transition-all duration-500"
                        style={{ 
                          width: `${categoryPercentage}%`,
                          background: 'rgb(252, 61, 33)'
                        }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div 
            className="rounded-lg shadow-lg p-8"
            style={{ background: 'rgb(255, 255, 255)' }}
          >
            <h2 
              className="text-xl font-semibold mb-6"
              style={{ 
                fontFamily: 'Unbounded, sans-serif',
                color: 'rgb(0, 0, 0)'
              }}
            >
              Recommended Next Steps
            </h2>
            <div className="space-y-4">
              {results.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'rgb(32, 205, 90)' }} />
                  <p 
                    className="leading-relaxed"
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      color: 'rgb(0, 0, 0)',
                      opacity: 0.8
                    }}
                  >
                    {recommendation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="flex items-center justify-center px-6 py-3 border font-medium rounded-lg transition-colors"
              style={{ 
                borderColor: 'rgba(0, 0, 0, 0.2)',
                color: 'rgb(0, 0, 0)',
                fontFamily: 'Inter, sans-serif'
              }}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Take Quiz Again
            </Link>
            <button
              onClick={() => window.print()}
              className="flex items-center justify-center px-6 py-3 font-medium rounded-lg transition-colors"
              style={{ 
                background: 'rgb(252, 61, 33)',
                color: 'rgb(255, 255, 255)',
                fontFamily: 'Inter, sans-serif'
              }}
            >
              Save Results
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}