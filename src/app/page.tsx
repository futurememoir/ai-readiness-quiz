import Link from 'next/link'
import { ArrowRight, Brain, CheckCircle, Clock, Users } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ background: 'rgb(250, 246, 240)' }}>
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex justify-center items-center mb-6">
            <Brain className="w-12 h-12 mr-3" style={{ color: 'rgb(252, 61, 33)' }} />
            <h1 
              className="text-4xl font-bold"
              style={{ 
                fontFamily: 'Unbounded, sans-serif',
                color: 'rgb(0, 0, 0)'
              }}
            >
              AI Readiness Quiz
            </h1>
          </div>
          <p 
            className="text-xl max-w-2xl mx-auto"
            style={{ 
              fontFamily: 'Inter, sans-serif',
              color: 'rgb(0, 0, 0)'
            }}
          >
            Discover your organization readiness for AI adoption with our comprehensive assessment
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
          <div 
            className="rounded-lg shadow-lg p-8 mb-8"
            style={{ background: 'rgb(255, 255, 255)' }}
          >
            <h2 
              className="text-2xl font-semibold mb-6"
              style={{ 
                fontFamily: 'Unbounded, sans-serif',
                color: 'rgb(0, 0, 0)'
              }}
            >
              What You'll Learn
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: 'rgb(32, 205, 90)' }} />
                <div>
                  <h3 
                    className="font-semibold mb-1"
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      color: 'rgb(0, 0, 0)'
                    }}
                  >
                    Current Tech Usage
                  </h3>
                  <p 
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      color: 'rgb(0, 0, 0)',
                      opacity: 0.7
                    }}
                  >
                    Assess your existing technology infrastructure and digital maturity
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: 'rgb(32, 205, 90)' }} />
                <div>
                  <h3 
                    className="font-semibold mb-1"
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      color: 'rgb(0, 0, 0)'
                    }}
                  >
                    Data & Processes
                  </h3>
                  <p 
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      color: 'rgb(0, 0, 0)',
                      opacity: 0.7
                    }}
                  >
                    Evaluate data quality, accessibility, and process standardization
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: 'rgb(32, 205, 90)' }} />
                <div>
                  <h3 
                    className="font-semibold mb-1"
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      color: 'rgb(0, 0, 0)'
                    }}
                  >
                    Team Readiness
                  </h3>
                  <p 
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      color: 'rgb(0, 0, 0)',
                      opacity: 0.7
                    }}
                  >
                    Understand your team skills, mindset, and capacity for AI adoption
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: 'rgb(32, 205, 90)' }} />
                <div>
                  <h3 
                    className="font-semibold mb-1"
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      color: 'rgb(0, 0, 0)'
                    }}
                  >
                    Business Goals
                  </h3>
                  <p 
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      color: 'rgb(0, 0, 0)',
                      opacity: 0.7
                    }}
                  >
                    Align AI initiatives with strategic objectives and ROI expectations
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t pt-6" style={{ borderColor: 'rgba(0, 0, 0, 0.1)' }}>
              <div 
                className="flex items-center justify-between text-sm mb-6"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  color: 'rgb(0, 0, 0)',
                  opacity: 0.6
                }}
              >
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
                <span className="font-medium" style={{ color: 'rgb(32, 205, 90)' }}>
                  No registration required
                </span>
              </div>

              <Link
                href="/quiz"
                className="w-full font-semibold py-4 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center group"
                style={{ 
                  background: 'rgb(252, 61, 33)',
                  color: 'rgb(255, 255, 255)',
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                Start Your AI Readiness Assessment
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div 
            className="text-center text-sm"
            style={{ 
              fontFamily: 'Inter, sans-serif',
              color: 'rgb(0, 0, 0)',
              opacity: 0.5
            }}
          >
            Get personalized insights and actionable recommendations for your AI journey
          </div>
        </div>
      </div>
    </div>
  )
}
