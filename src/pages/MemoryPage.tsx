import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { BookOpen, Sparkles, Heart, MapPin, Clock, Share2, Download, Image, Music } from 'lucide-react'

const MemoryPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [checkIns, setCheckIns] = useState<any[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedPoem, setGeneratedPoem] = useState<string | null>(null)
  const [showShareOptions, setShowShareOptions] = useState(false)

  useEffect(() => {
    const savedCheckIns = localStorage.getItem('checkIns')
    if (savedCheckIns) {
      setCheckIns(JSON.parse(savedCheckIns))
    }
  }, [])

  const generatePoem = () => {
    setIsGenerating(true)
    
    // 模拟 AI 生成诗歌
    setTimeout(() => {
      const poems = [
        `古井旁的沉思
瓦猫守护着心灵的印迹
一针一线，绣出内心的宁静
时光在此刻，凝固成诗

庭院深深，茶香袅袅
百年的故事在耳边低语
我听见了自己的心跳
与这片土地，产生了共鸣`,

        `阳光穿过屋檐的缝隙
照亮了尘封的记忆
指尖触碰古老的砖瓦
仿佛穿越了时空的隧道

刺绣坊里的专注
古戏台上的欢歌
每一个瞬间都是疗愈
每一次感动都是成长`,

        `从焦虑到平静
从迷茫到清晰
这条路上，有瓦猫的守护
有古井的智慧，有刺绣的细腻

心，在这里找到了归宿
灵魂，在这里得到了安放
乡叙心域，不仅是一次旅行
更是一场与自己的对话`
      ]
      
      const randomPoem = poems[Math.floor(Math.random() * poems.length)]
      setGeneratedPoem(randomPoem)
      setIsGenerating(false)
    }, 2000)
  }

  const emotionStats = checkIns.reduce((acc, checkIn) => {
    if (checkIn.emotion) {
      acc[checkIn.emotion] = (acc[checkIn.emotion] || 0) + 1
    }
    return acc
  }, {} as Record<string, number>)

  const totalDuration = checkIns.length * 30 // 假设每个打卡点平均 30 分钟

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-purple-50 to-emerald-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-10 h-10 text-primary-600" />
            <h1 className="text-4xl font-bold text-gray-900">心灵游记</h1>
          </div>
          <p className="text-lg text-gray-600">
            AI 生成的专属心路影像诗，珍藏您的疗愈之旅
          </p>
        </motion.div>

        {/* Generate Poem */}
        {!generatedPoem && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-12 mb-8 text-center"
          >
            <Sparkles className="w-16 h-16 text-primary-600 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              让 AI 为您创作专属诗歌
            </h2>
            <p className="text-gray-600 mb-8 max-w-lg mx-auto">
              基于您的打卡记录、情感变化和旅程轨迹，AI 将为您生成一首独一无二的心路影像诗
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={generatePoem}
              disabled={isGenerating || checkIns.length === 0}
              className="px-12 py-4 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <span className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-5 h-5" />
                  </motion.div>
                  AI 创作中...
                </span>
              ) : (
                '生成心路影像诗'
              )}
            </motion.button>
            
            {checkIns.length === 0 && (
              <p className="mt-4 text-sm text-amber-600">
                您还没有打卡记录，先去完成路线打卡吧！
              </p>
            )}
          </motion.div>
        )}

        {/* Generated Poem */}
        {generatedPoem && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-12 mb-8"
          >
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Image className="w-6 h-6 text-primary-600" />
                <h2 className="text-2xl font-bold text-gray-900">心路影像诗</h2>
              </div>
              <p className="text-sm text-gray-500">
                生成于 {new Date().toLocaleDateString('zh-CN', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>

            <div className="bg-gradient-to-br from-primary-50 to-purple-50 rounded-2xl p-8 mb-8">
              <pre className="whitespace-pre-wrap text-gray-800 text-lg leading-relaxed font-serif">
                {generatedPoem}
              </pre>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowShareOptions(true)}
                className="px-6 py-3 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2"
              >
                <Share2 className="w-5 h-5" />
                分享
              </button>
              <button
                onClick={() => {
                  // 模拟下载
                  alert('已为您生成精美的线装手账 PDF，可在"我的作品"中查看')
                }}
                className="px-6 py-3 bg-white text-gray-900 border-2 border-gray-200 rounded-xl font-semibold hover:border-primary-500 hover:text-primary-600 transition-all duration-300 flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                下载手账
              </button>
            </div>
          </motion.div>
        )}

        {/* Journey Stats */}
        {checkIns.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">旅程统计</h3>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl">
                <MapPin className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-gray-900">{checkIns.length}</div>
                <div className="text-gray-600">打卡地点</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl">
                <Clock className="w-8 h-8 text-amber-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-gray-900">{totalDuration}</div>
                <div className="text-gray-600">总时长 (分钟)</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl">
                <Heart className="w-8 h-8 text-pink-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-gray-900">
                  {Object.keys(emotionStats).length}
                </div>
                <div className="text-gray-600">情感体验</div>
              </div>
            </div>

            {/* Emotion Chart */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">情感分布</h4>
              <div className="space-y-3">
                {Object.entries(emotionStats).map(([emotion, count]) => {
                  const percentage = (count / checkIns.length) * 100
                  const emotionEmojis: Record<string, string> = {
                    peaceful: '😌',
                    joyful: '😊',
                    touched: '🥺',
                    inspired: '💡',
                    nostalgic: '🌙',
                    focused: '🎯'
                  }
                  const emotionLabels: Record<string, string> = {
                    peaceful: '平静',
                    joyful: '喜悦',
                    touched: '感动',
                    inspired: '启发',
                    nostalgic: '怀念',
                    focused: '专注'
                  }
                  
                  return (
                    <div key={emotion} className="flex items-center gap-4">
                      <span className="text-2xl w-8">{emotionEmojis[emotion] || '😊'}</span>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">
                            {emotionLabels[emotion] || emotion}
                          </span>
                          <span className="text-sm text-gray-600">{count}次</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="h-full bg-gradient-to-r from-primary-500 to-purple-500 rounded-full"
                          />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* Check-in Records */}
        {checkIns.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">打卡记录</h3>
            <div className="space-y-4">
              {checkIns.map((checkIn, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{checkIn.stopName}</div>
                    <div className="text-sm text-gray-600">
                      {new Date(checkIn.timestamp).toLocaleDateString('zh-CN', {
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                  <div className="text-2xl">
                    {{
                      peaceful: '😌',
                      joyful: '😊',
                      touched: '🥺',
                      inspired: '💡',
                      nostalgic: '🌙',
                      focused: '🎯'
                    }[checkIn.emotion] || '😊'}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Share Options Modal */}
        {showShareOptions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowShareOptions(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                分享您的心灵游记
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Image, label: '生成图片', color: 'from-blue-500 to-cyan-500' },
                  { icon: Music, label: '配乐朗诵', color: 'from-purple-500 to-pink-500' },
                  { icon: Share2, label: '朋友圈', color: 'from-green-500 to-emerald-500' },
                  { icon: Download, label: '保存本地', color: 'from-amber-500 to-orange-500' },
                ].map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-6 rounded-2xl bg-gradient-to-br ${option.color} text-white flex flex-col items-center gap-3`}
                  >
                    <option.icon className="w-8 h-8" />
                    <span className="font-medium">{option.label}</span>
                  </motion.button>
                ))}
              </div>
              <button
                onClick={() => setShowShareOptions(false)}
                className="mt-6 w-full py-3 text-gray-600 hover:text-gray-900 transition-colors"
              >
                取消
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* Back to Home */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          onClick={() => navigate('/')}
          className="w-full py-4 bg-white text-gray-900 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          返回首页
        </motion.button>
      </div>
    </div>
  )
}

export default MemoryPage
