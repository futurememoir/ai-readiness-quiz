'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Brain, ArrowRight, CheckCircle, AlertCircle, TrendingUp, RotateCcw } from 'lucide-react'
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Brain className="w-12 h-12 text-indigo-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Loading your results...</p>
        </div>
      </div>
    )
  }

  const getReadinessColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'text-red-600 bg-red-100'
      case 'developing': return 'text-orange-600 bg-orange-100'
      case 'advanced': return 'text-blue-600 bg-blue-100'
      case 'expert': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
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
    tech: 'Technology Infrastructure',
    data: 'Data & Processes', 
    team: 'Team Readiness',
    business: 'Business Strategy'
  }

  const percentage = Math.round((results.totalScore / results.maxScore) * 100)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <div className="flex justify-center items-center mb-4">
            <Brain className="w-8 h-8 text-indigo-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-900">Your AI Readiness Results</h1>
          </div>
        </header>

        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <div className={`inline-flex items-center px-4 py-2 rounded-full font-semibold text-lg ${getReadinessColor(results.readinessLevel)}`}>
                {getReadinessIcon(results.readinessLevel)}
                <span className="ml-2 capitalize">{results.readinessLevel} Level</span>
              </div>
              <div className="mt-4">
                <div className="text-4xl font-bold text-gray-900">{percentage}%</div>
                <div className="text-gray-600">Overall AI Readiness Score</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {Object.entries(results.categoryScores).map(([category, score]) => {
                const maxCategoryScore = questions.filter(q => q.category === category).length * 4
                const categoryPercentage = Math.round((score / maxCategoryScore) * 100)
                
                return (
                  <div key={category} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-gray-900">
                        {categoryNames[category as keyof typeof categoryNames]}
                      </h3>
                      <span className="text-sm font-medium text-gray-600">
                        {categoryPercentage}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${categoryPercentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Recommended Next Steps
            </h2>
            <div className="space-y-4">
              {results.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">{recommendation}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/"
              className="flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Take Quiz Again
            </Link>
            <button
              onClick={() => window.print()}
              className="flex items-center justify-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
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