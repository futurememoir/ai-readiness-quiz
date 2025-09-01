'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { questions, calculateResults } from '@/lib/quiz-data'
import { AsciiBackground } from '@/components/ascii-background'

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
      case 'tech': return 'TECH INFRASTRUCTURE'
      case 'data': return 'DATA & PROCESSES'
      case 'team': return 'TEAM READINESS'
      case 'business': return 'BUSINESS STRATEGY'
      default: return category.toUpperCase()
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: '#007BE5' }}>
      <AsciiBackground />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-3xl mx-auto w-full">
          <header className="text-center mb-8">
            <h1 
              className="text-3xl font-bold text-white mb-4"
              style={{ fontFamily: 'DM Mono, monospace' }}
            >
              AI READINESS ASSESSMENT
            </h1>
            
            <div className="w-full bg-white/20 rounded-full h-2 max-w-md mx-auto mb-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            
            <p 
              className="text-white/70 text-sm"
              style={{ fontFamily: 'DM Mono, monospace' }}
            >
              QUESTION {currentQuestion + 1} OF {questions.length}
            </p>
          </header>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-8">
            <div className="mb-4">
              <span 
                className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-medium rounded border border-white/30 uppercase tracking-wide"
                style={{ fontFamily: 'DM Mono, monospace' }}
              >
                {getCategoryLabel(currentQ.category)}
              </span>
            </div>
            
            <h2 
              className="text-xl font-semibold text-white mb-8 leading-relaxed"
              style={{ fontFamily: 'DM Mono, monospace' }}
            >
              {currentQ.question.toUpperCase()}
            </h2>

            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <label
                  key={index}
                  className={`block p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:border-white/50 hover:bg-white/10 ${
                    currentAnswer === option.score
                      ? 'border-white bg-white/20 ring-2 ring-white/30'
                      : 'border-white/30 bg-white/5'
                  }`}
                >
                  <div className="flex items-start">
                    <input
                      type="radio"
                      name={`question-${currentQ.id}`}
                      value={option.score}
                      checked={currentAnswer === option.score}
                      onChange={() => handleAnswer(option.score)}
                      className="mt-1 mr-3 accent-white scale-125"
                    />
                    <span 
                      className="text-white text-sm leading-relaxed"
                      style={{ fontFamily: 'DM Mono, monospace' }}
                    >
                      {option.text.toUpperCase()}
                    </span>
                  </div>
                </label>
              ))}
            </div>

            <div className="flex justify-between items-center mt-8">
              <button
                onClick={goToPrevious}
                disabled={currentQuestion === 0}
                className="flex items-center px-4 py-2 text-white/60 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                style={{ fontFamily: 'DM Mono, monospace' }}
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                PREVIOUS
              </button>

              <button
                onClick={goToNext}
                disabled={!currentAnswer}
                className="flex items-center px-6 py-3 bg-white/20 hover:bg-white/30 text-white font-medium rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all border border-white/30 backdrop-blur-sm"
                style={{ fontFamily: 'DM Mono, monospace' }}
              >
                {currentQuestion === questions.length - 1 ? 'VIEW RESULTS' : 'NEXT'}
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}