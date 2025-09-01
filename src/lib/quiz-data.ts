export interface Question {
  id: number
  category: 'tech' | 'data' | 'team' | 'business'
  question: string
  options: {
    text: string
    score: number
  }[]
}

export interface QuizResult {
  totalScore: number
  maxScore: number
  categoryScores: {
    tech: number
    data: number
    team: number
    business: number
  }
  readinessLevel: 'beginner' | 'developing' | 'advanced' | 'expert'
  recommendations: string[]
}

export const questions: Question[] = [
  {
    id: 1,
    category: 'tech',
    question: "How would you describe your organization's current technology infrastructure?",
    options: [
      { text: 'Mostly manual processes with basic tools', score: 1 },
      { text: 'Some digital tools but limited integration', score: 2 },
      { text: 'Well-integrated digital systems across most departments', score: 3 },
      { text: 'Advanced cloud-based infrastructure with APIs and automation', score: 4 }
    ]
  },
  {
    id: 2,
    category: 'data',
    question: "How accessible and organized is your organization's data?",
    options: [
      { text: 'Data is scattered across different systems and formats', score: 1 },
      { text: 'Some centralized data but requires manual effort to access', score: 2 },
      { text: 'Most data is centralized and easily accessible', score: 3 },
      { text: 'Real-time data pipelines with comprehensive data governance', score: 4 }
    ]
  },
  {
    id: 3,
    category: 'team',
    question: 'What is your team\'s comfort level with new technology?',
    options: [
      { text: 'Resistant to change, prefers traditional methods', score: 1 },
      { text: 'Cautious but willing to learn with proper training', score: 2 },
      { text: 'Generally adaptable and eager to try new tools', score: 3 },
      { text: 'Highly tech-savvy and actively seeks innovation', score: 4 }
    ]
  },
  {
    id: 4,
    category: 'business',
    question: 'How clearly defined are your business goals for AI adoption?',
    options: [
      { text: 'No specific AI goals, just exploring possibilities', score: 1 },
      { text: 'General ideas about efficiency but no concrete plans', score: 2 },
      { text: 'Identified specific use cases with measurable outcomes', score: 3 },
      { text: 'Detailed AI strategy with ROI projections and timelines', score: 4 }
    ]
  },
  {
    id: 5,
    category: 'tech',
    question: 'Does your organization currently use any automation tools?',
    options: [
      { text: 'No automation, everything is manual', score: 1 },
      { text: 'Basic automation for simple, repetitive tasks', score: 2 },
      { text: 'Moderate automation across several business processes', score: 3 },
      { text: 'Extensive automation with workflow orchestration', score: 4 }
    ]
  },
  {
    id: 6,
    category: 'data',
    question: 'How would you rate the quality of your data?',
    options: [
      { text: 'Inconsistent, incomplete, and often outdated', score: 1 },
      { text: 'Generally accurate but requires cleaning and validation', score: 2 },
      { text: 'High quality with established data standards', score: 3 },
      { text: 'Exceptional quality with real-time validation and monitoring', score: 4 }
    ]
  },
  {
    id: 7,
    category: 'team',
    question: 'Does your organization have experience with data analysis or machine learning?',
    options: [
      { text: 'No experience with data analysis beyond basic reporting', score: 1 },
      { text: 'Basic analytics and reporting capabilities', score: 2 },
      { text: 'Advanced analytics with some ML experimentation', score: 3 },
      { text: 'Dedicated data science team with ML models in production', score: 4 }
    ]
  },
  {
    id: 8,
    category: 'business',
    question: 'What is your budget allocation for technology initiatives?',
    options: [
      { text: 'Very limited budget for new technology', score: 1 },
      { text: 'Modest budget for essential tools and upgrades', score: 2 },
      { text: 'Reasonable budget for strategic technology investments', score: 3 },
      { text: 'Significant budget allocated for innovation and AI initiatives', score: 4 }
    ]
  },
  {
    id: 9,
    category: 'tech',
    question: 'How does your organization handle software integration and APIs?',
    options: [
      { text: 'Limited integration, mostly standalone applications', score: 1 },
      { text: 'Some integrations but often require manual intervention', score: 2 },
      { text: 'Good integration capabilities with established API usage', score: 3 },
      { text: 'Sophisticated API ecosystem with microservices architecture', score: 4 }
    ]
  },
  {
    id: 10,
    category: 'business',
    question: 'How does leadership view AI adoption in your organization?',
    options: [
      { text: 'Skeptical or unaware of AI benefits', score: 1 },
      { text: 'Interested but cautious about implementation', score: 2 },
      { text: 'Supportive with clear expectations for AI initiatives', score: 3 },
      { text: 'Championing AI as a core strategic priority', score: 4 }
    ]
  }
]

export function calculateResults(answers: Record<number, number>): QuizResult {
  const categoryScores = {
    tech: 0,
    data: 0,
    team: 0,
    business: 0
  }

  let totalScore = 0
  const maxScore = questions.length * 4

  questions.forEach(question => {
    const score = answers[question.id] || 0
    categoryScores[question.category] += score
    totalScore += score
  })

  const percentage = (totalScore / maxScore) * 100
  let readinessLevel: QuizResult['readinessLevel']
  let recommendations: string[]

  if (percentage < 25) {
    readinessLevel = 'beginner'
    recommendations = [
      'Focus on digitizing basic processes and building data collection systems',
      'Invest in team training for digital literacy and change management',
      'Start with simple automation tools before considering AI',
      'Develop a clear technology roadmap with leadership buy-in'
    ]
  } else if (percentage < 50) {
    readinessLevel = 'developing'
    recommendations = [
      'Improve data quality and centralization efforts',
      'Expand automation to more business processes',
      'Build internal capabilities through training and hiring',
      'Pilot small AI projects to demonstrate value'
    ]
  } else if (percentage < 75) {
    readinessLevel = 'advanced'
    recommendations = [
      'Launch AI pilot projects in high-impact areas',
      'Establish AI governance and ethical guidelines',
      'Invest in advanced analytics and ML capabilities',
      'Create cross-functional AI teams and centers of excellence'
    ]
  } else {
    readinessLevel = 'expert'
    recommendations = [
      'Scale successful AI initiatives across the organization',
      'Develop proprietary AI solutions and competitive advantages',
      'Lead industry innovation and best practices',
      'Establish AI-first culture and continuous learning programs'
    ]
  }

  return {
    totalScore,
    maxScore,
    categoryScores,
    readinessLevel,
    recommendations
  }
}