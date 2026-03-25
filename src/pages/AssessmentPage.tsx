import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Heart, Sparkles, ArrowRight } from 'lucide-react'

const questions = [
  {
    id: 1,
    question: '最近一周，您的整体情绪状态是？',
    options: [
      { value: 'anxious', label: '焦虑不安', emoji: '😰', score: 3 },
      { value: 'tired', label: '疲惫无力', emoji: '😴', score: 2 },
      { value: 'normal', label: '平静普通', emoji: '😐', score: 1 },
      { value: 'happy', label: '愉快轻松', emoji: '😊', score: 0 },
    ]
  },
  {
    id: 2,
    question: '您希望通过这次疗愈之旅获得什么？',
    options: [
      { value: 'relax', label: '放松减压', emoji: '🧘', score: 2 },
      { value: 'inspire', label: '寻找灵感', emoji: '💡', score: 1 },
      { value: 'connect', label: '连接自我', emoji: '🤲', score: 3 },
      { value: 'explore', label: '探索新鲜', emoji: '🗺️', score: 0 },
    ]
  },
  {
    id: 3,
    question: '您更偏好哪种疗愈方式？',
    options: [
      { value: 'nature', label: '自然山水', emoji: '🏞️', score: 1 },
      { value: 'culture', label: '文化体验', emoji: '🏮', score: 2 },
      { value: 'craft', label: '手工技艺', emoji: '🎨', score: 3 },
      { value: 'story', label: '故事叙事', emoji: '📖', score: 0 },
    ]
  },
  {
    id: 4,
    question: '当前最困扰您的情绪是？',
    options: [
      { value: 'stress', label: '工作压力', emoji: '💼', score: 3 },
      { value: 'lonely', label: '孤独感', emoji: '🌙', score: 2 },
      { value: 'confused', label: '迷茫困惑', emoji: '🌫️', score: 1 },
      { value: 'none', label: '无明显困扰', emoji: '☀️', score: 0 },
    ]
  },
  {
    id: 5,
    question: '您理想的疗愈节奏是？',
    options: [
      { value: 'slow', label: '慢节奏深度体验', emoji: '🐢', score: 2 },
      { value: 'balanced', label: '平衡放松与探索', emoji: '⚖️', score: 1 },
      { value: 'active', label: '活跃丰富的活动', emoji: '🎪', score: 0 },
    ]
  }
]

const AssessmentPage = () => {
  const navigate = useNavigate()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [currentQuestion]: value }
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300)
    } else {
      analyzeResults(newAnswers)
    }
  }

  const analyzeResults = (finalAnswers: Record<number, string>) => {
    setIsAnalyzing(true)
    
    // 模拟 AI 分析过程
    setTimeout(() => {
      // 计算情绪类型和推荐路线
      const scores = Object.values(finalAnswers).map((answer, index) => {
        const question = questions[index]
        const option = question.options.find(opt => opt.value === answer)
        return option?.score || 0
      })

      const totalScore = scores.reduce((a, b) => a + b, 0)
      let emotionType = 'balanced'
      let recommendedRoute = 'cultural'

      if (totalScore >= 8) {
        emotionType = 'anxious'
        recommendedRoute = 'peaceful'
      } else if (totalScore >= 5) {
        emotionType = 'tired'
        recommendedRoute = 'energizing'
      } else if (totalScore >= 2) {
        emotionType = 'normal'
        recommendedRoute = 'cultural'
      }

      // 存储分析结果到 localStorage
      localStorage.setItem('emotionType', emotionType)
      localStorage.setItem('recommendedRoute', recommendedRoute)
      localStorage.setItem('assessmentAnswers', JSON.stringify(finalAnswers))

      setIsAnalyzing(false)
      navigate('/journey', { 
        state: { 
          emotionType, 
          recommendedRoute,
          score: totalScore 
        } 
      })
    }, 2500)
  }

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-purple-50 to-emerald-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="mb-8"
          >
            <Sparkles className="w-24 h-24 mx-auto text-primary-600" />
          </motion.div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            AI 正在分析您的情绪
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            基于您的回答，为您量身定制专属疗愈路线
          </p>
          
          <div className="relative w-32 h-32 mx-auto">
            <motion.div
              className="absolute inset-0 border-4 border-primary-200 rounded-full"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-2 border-4 border-primary-400 rounded-full"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
            />
            <motion.div
              className="absolute inset-4 border-4 border-primary-600 rounded-full"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
            />
          </div>
        </motion.div>
      </div>
    )
  }

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-earth-50 via-primary-50 to-emerald-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>问题 {currentQuestion + 1} / {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary-500 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Question Card */}
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-12"
        >
          <div className="flex items-center gap-4 mb-8">
            <Heart className="w-8 h-8 text-primary-600" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {question.question}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {question.options.map((option, index) => (
              <motion.button
                key={option.value}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswer(option.value)}
                className="p-6 rounded-2xl border-2 border-gray-200 hover:border-primary-500 hover:bg-primary-50 transition-all duration-200 text-left group"
              >
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{option.emoji}</span>
                  <div>
                    <div className="font-semibold text-gray-900 group-hover:text-primary-700">
                      {option.label}
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between items-center">
          <button
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
            className="px-6 py-3 text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            ← 返回
          </button>
          
          <div className="flex items-center gap-2 text-gray-500">
            <span className="text-sm">AI 情感分析引擎</span>
            <Sparkles className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AssessmentPage
