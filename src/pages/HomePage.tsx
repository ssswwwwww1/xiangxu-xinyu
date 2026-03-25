import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Heart, MapPin, Sparkles, BookOpen } from 'lucide-react'

const HomePage = () => {
  const navigate = useNavigate()

  const features = [
    {
      icon: Heart,
      title: '情感测评',
      description: 'AI 智能分析您的情绪状态，量身定制疗愈方案',
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: MapPin,
      title: '智能叙事',
      description: '基于位置和情绪，生成独一无二的村落探索路线',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      icon: Sparkles,
      title: '数字人陪伴',
      description: '情感化 AI 数字人全程陪伴，提供温暖引导',
      color: 'from-amber-500 to-orange-500'
    },
    {
      icon: BookOpen,
      title: '心灵游记',
      description: '自动生成专属心路影像诗，珍藏美好回忆',
      color: 'from-emerald-500 to-teal-500'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-earth-50 via-primary-50 to-emerald-50">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-20" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6"
          >
            <Sparkles className="w-16 h-16 mx-auto text-primary-600" />
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            乡叙<span className="text-primary-600">心域</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-4 font-light">
            从观光到疗愈的智慧桥梁
          </p>
          
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            让传统文化开口说话，治愈现代人的心灵<br/>
            AI 赋能，千人千面，开启您的专属疗愈之旅
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/assessment')}
            className="bg-gradient-to-r from-primary-600 to-purple-600 text-white px-12 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            开始疗愈之旅
          </motion.button>
        </motion.div>

        {/* Animated background elements */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary-400 rounded-full opacity-30"
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 100,
            }}
            animate={{
              y: -100,
              x: Math.random() * window.innerWidth,
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
              delay: i * 2,
            }}
          />
        ))}
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              AI 四大核心引擎
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              从"千人一面"到"千人千面"，打造个性化的疗愈体验
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary-600 to-purple-700">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold text-white mb-6">
            准备好开启您的心灵疗愈之旅了吗？
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            让 AI 读懂您的心，让村落的文化治愈您
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/assessment')}
            className="bg-white text-primary-600 px-12 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            立即体验
          </motion.button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-900 text-gray-400">
        <div className="max-w-6xl mx-auto text-center">
          <p>&copy; 2026 乡叙心域。让传统文化治愈现代心灵。</p>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
