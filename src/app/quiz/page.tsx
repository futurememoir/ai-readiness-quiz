'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight, Brain } from 'lucide-react'
import { questions, calculateResults } from '@/lib/quiz-data'

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const router = useRouter()

  const handleAnswer = (score: number) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: score
    }))
  }

  const goToNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      const results = calculateResults(answers)
      localStorage.setItem('quizResults', JSON.stringify(results))
      router.push('/results')
    }
  }

  const goToPrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100
  const currentQ = questions[currentQuestion]
  const currentAnswer = answers[currentQ.id]

  const getCategoryLabel = (category: string) => {
    switch(category) {
      case 'tech': return 'Technology'
      case 'data': return 'Data & Processes'
      case 'team': return 'Team Readiness'
      case 'business': return 'Business Goals'
      default: return category
    }
  }

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
              AI Readiness Quiz
            </h1>
          </div>
          <div 
            className="w-full rounded-full h-2 max-w-md mx-auto"
            style={{ background: 'rgba(0, 0, 0, 0.1)' }}
          >
            <div 
              className="h-2 rounded-full transition-all duration-300 ease-out"
              style={{ 
                width: `${progress}%`,
                background: 'rgb(252, 61, 33)'
              }}
            />
          </div>
          <p 
            className="text-sm mt-2"
            style={{ 
              fontFamily: 'Inter, sans-serif',
              color: 'rgb(0, 0, 0)',
              opacity: 0.6
            }}
          >
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </header>

        <div className="max-w-2xl mx-auto">
          <div 
            className="rounded-lg shadow-lg p-8"
            style={{ background: 'rgb(255, 255, 255)' }}
          >
            <div className="mb-4">
              <span 
                className="inline-block px-3 py-1 text-xs font-medium rounded-full uppercase tracking-wide"
                style={{ 
                  background: 'rgb(250, 246, 240)',
                  color: 'rgb(252, 61, 33)',
                  fontFamily: 'Fragment Mono, monospace'
                }}
              >
                {getCategoryLabel(currentQ.category)}
              </span>
            </div>
            
            <h2 
              className="text-xl font-semibold mb-6"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                color: 'rgb(0, 0, 0)'
              }}
            >
              {currentQ.question}
            </h2>

            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <label
                  key={index}
                  className={`block p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                    currentAnswer === option.score
                      ? 'ring-2'
                      : ''
                  }`}
                  style={{
                    borderColor: currentAnswer === option.score ? 'rgb(252, 61, 33)' : 'rgba(0, 0, 0, 0.1)',
                    background: currentAnswer === option.score ? 'rgba(252, 61, 33, 0.05)' : 'rgb(255, 255, 255)'
                  }}
                >
                  <div className="flex items-start">
                    <input
                      type="radio"
                      name={`question-${currentQ.id}`}
                      value={option.score}
                      checked={currentAnswer === option.score}
                      onChange={() => handleAnswer(option.score)}
                      className="mt-1 mr-3"
                      style={{ accentColor: 'rgb(252, 61, 33)' }}
                    />
                    <span 
                      style={{ 
                        fontFamily: 'Inter, sans-serif',
                        color: 'rgb(0, 0, 0)'
                      }}
                    >
                      {option.text}
                    </span>
                  </div>
                </label>
              ))}
            </div>

            <div className="flex justify-between items-center mt-8">
              <button
                onClick={goToPrevious}
                disabled={currentQuestion === 0}
                className="flex items-center px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  color: currentQuestion === 0 ? 'rgba(0, 0, 0, 0.3)' : 'rgb(0, 0, 0)'
                }}
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Previous
              </button>

              <button
                onClick={goToNext}
                disabled={!currentAnswer}
                className="flex items-center px-6 py-3 font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                style={{ 
                  background: currentAnswer ? 'rgb(252, 61, 33)' : 'rgba(0, 0, 0, 0.1)',
                  color: currentAnswer ? 'rgb(255, 255, 255)' : 'rgba(0, 0, 0, 0.3)',
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                {currentQuestion === questions.length - 1 ? 'See Results' : 'Next'}
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}