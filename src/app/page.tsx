import Link from 'next/link'
import { ArrowRight, Brain, CheckCircle, Clock, Users } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex justify-center items-center mb-6">
            <Brain className="w-12 h-12 text-indigo-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">AI Readiness Quiz</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover your organization&apos;s readiness for AI adoption with our comprehensive assessment
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">What You'll Learn</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Current Tech Usage</h3>
                  <p className="text-gray-600">Assess your existing technology infrastructure and digital maturity</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Data & Processes</h3>
                  <p className="text-gray-600">Evaluate data quality, accessibility, and process standardization</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Team Readiness</h3>
                  <p className="text-gray-600">Understand your team&apos;s skills, mindset, and capacity for AI adoption</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Business Goals</h3>
                  <p className="text-gray-600">Align AI initiatives with strategic objectives and ROI expectations</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>3-5 minutes</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span>10 questions</span>
                  </div>
                </div>
                <span className="text-green-600 font-medium">No registration required</span>
              </div>

              <Link
                href="/quiz"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center group"
              >
                Start Your AI Readiness Assessment
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="text-center text-sm text-gray-500">
            Get personalized insights and actionable recommendations for your AI journey
          </div>
        </div>
      </div>
    </div>
  )
}
