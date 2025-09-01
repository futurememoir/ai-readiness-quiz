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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <div className="flex justify-center items-center mb-4">
            <Brain className="w-8 h-8 text-indigo-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-900">AI Readiness Quiz</h1>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 max-w-md mx-auto">
            <div 
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </header>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-2">
              <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full uppercase tracking-wide">
                {currentQ.category.replace('tech', 'Technology').replace('data', 'Data & Processes').replace('team', 'Team Readiness').replace('business', 'Business Goals')}
              </span>
            </div>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {currentQ.question}
            </h2>

            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <label
                  key={index}
                  className={`block p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:border-indigo-300 hover:bg-indigo-50 ${
                    currentAnswer === option.score
                      ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-start">
                    <input
                      type="radio"
                      name={`question-${currentQ.id}`}
                      value={option.score}
                      checked={currentAnswer === option.score}
                      onChange={() => handleAnswer(option.score)}
                      className="mt-1 mr-3 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-gray-900">{option.text}</span>
                  </div>
                </label>
              ))}
            </div>

            <div className="flex justify-between items-center mt-8">
              <button
                onClick={goToPrevious}
                disabled={currentQuestion === 0}
                className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Previous
              </button>

              <button
                onClick={goToNext}
                disabled={!currentAnswer}
                className="flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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