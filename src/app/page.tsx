import Link from 'next/link'
import { ArrowRight, Clock, Users } from 'lucide-react'
import { AsciiBackground } from '@/components/ascii-background'

export default function HomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: '#007BE5' }}>
      <AsciiBackground />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          <header className="mb-12">
            <h1 
              className="text-6xl font-bold text-white mb-6"
              style={{ fontFamily: 'DM Mono, monospace' }}
            >
              AI READINESS
            </h1>
            <h2 
              className="text-4xl font-bold text-white/80 mb-8"
              style={{ fontFamily: 'DM Mono, monospace' }}
            >
              ASSESSMENT
            </h2>
            <p 
              className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
              style={{ fontFamily: 'DM Mono, monospace' }}
            >
              DISCOVER YOUR ORGANIZATION READINESS FOR AI ADOPTION
            </p>
          </header>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-8 mb-8">
            <h3 
              className="text-xl font-semibold text-white mb-6"
              style={{ fontFamily: 'DM Mono, monospace' }}
            >
              ASSESSMENT CATEGORIES
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8 text-left">
              <div className="border border-white/20 rounded p-4 bg-white/5">
                <h4 
                  className="font-semibold text-white mb-2"
                  style={{ fontFamily: 'DM Mono, monospace' }}
                >
                  TECH INFRASTRUCTURE
                </h4>
                <p 
                  className="text-white/70 text-sm"
                  style={{ fontFamily: 'DM Mono, monospace' }}
                >
                  ASSESS EXISTING TECHNOLOGY AND DIGITAL MATURITY
                </p>
              </div>
              
              <div className="border border-white/20 rounded p-4 bg-white/5">
                <h4 
                  className="font-semibold text-white mb-2"
                  style={{ fontFamily: 'DM Mono, monospace' }}
                >
                  DATA & PROCESSES
                </h4>
                <p 
                  className="text-white/70 text-sm"
                  style={{ fontFamily: 'DM Mono, monospace' }}
                >
                  EVALUATE DATA QUALITY AND STANDARDIZATION
                </p>
              </div>
              
              <div className="border border-white/20 rounded p-4 bg-white/5">
                <h4 
                  className="font-semibold text-white mb-2"
                  style={{ fontFamily: 'DM Mono, monospace' }}
                >
                  TEAM READINESS
                </h4>
                <p 
                  className="text-white/70 text-sm"
                  style={{ fontFamily: 'DM Mono, monospace' }}
                >
                  UNDERSTAND TEAM SKILLS AND AI ADOPTION CAPACITY
                </p>
              </div>
              
              <div className="border border-white/20 rounded p-4 bg-white/5">
                <h4 
                  className="font-semibold text-white mb-2"
                  style={{ fontFamily: 'DM Mono, monospace' }}
                >
                  BUSINESS STRATEGY
                </h4>
                <p 
                  className="text-white/70 text-sm"
                  style={{ fontFamily: 'DM Mono, monospace' }}
                >
                  ALIGN AI INITIATIVES WITH STRATEGIC OBJECTIVES
                </p>
              </div>
            </div>

            <div className="border-t border-white/20 pt-6">
              <div 
                className="flex items-center justify-center space-x-8 text-white/60 mb-6"
                style={{ fontFamily: 'DM Mono, monospace' }}
              >
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>3-5 MINUTES</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  <span>10 QUESTIONS</span>
                </div>
                <span>NO REGISTRATION</span>
              </div>

              <Link
                href="/quiz"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-lg transition-all duration-200 border border-white/30 group backdrop-blur-sm"
                style={{ fontFamily: 'DM Mono, monospace' }}
              >
                START ASSESSMENT
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div 
            className="text-white/50 text-sm"
            style={{ fontFamily: 'DM Mono, monospace' }}
          >
            GET PERSONALIZED INSIGHTS AND ACTIONABLE RECOMMENDATIONS
          </div>
        </div>
      </div>
    </div>
  )
}
