import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Sparkles, Mic, MicOff, Volume2, VolumeX, Send, Heart, MapPin } from 'lucide-react'

const DigitalHumanPage = () => {
  const navigate = useNavigate()
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [messages, setMessages] = useState<Array<{
    type: 'user' | 'ai'
    content: string
    emotion?: string
    timestamp: Date
  }>>([
    {
      type: 'ai',
      content: '您好呀！我是福安村的数字人向导"福宝"。感受到您此刻的心情，让我陪您一起探索这个美丽的古村落吧~',
      emotion: 'happy',
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [muted, setMuted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const aiResponses = [
    {
      keywords: ['紧张', '焦虑', '压力'],
      responses: [
        '我能感受到您的紧张。来，深呼吸~ 看着眼前的古建筑，它们已经静静伫立了数百年，见证了多少故事。让我们放慢脚步，一起感受这份宁静好吗？',
        '焦虑的时候，不妨试试专注于当下。您看那边的瓦猫，它守护了这个家几百年，总是那么从容。我们也可以像它一样，找到内心的安定。'
      ],
      emotion: 'calm'
    },
    {
      keywords: ['美丽', '好看', '喜欢'],
      responses: [
        '是呀！福安村的每一处风景都蕴含着故事。您知道吗？这些建筑不仅仅是砖瓦，更是先辈们智慧的结晶。我很开心您能感受到这份美~',
        '您的欣赏让这片土地更有意义了呢！美，需要被发现，更需要被感受。您有一双善于发现美的眼睛哦~'
      ],
      emotion: 'happy'
    },
    {
      keywords: ['历史', '故事', '文化'],
      responses: [
        '说到历史，福安村已经有 600 多年了呢！每一块青石板都记录着岁月的痕迹。您现在站的地方，曾经有多少先人走过，想过多少故事...',
        '文化就像一条河流，从过去流向现在。您此刻的体验，也是在续写这条河的故事呢。想知道更多福安村的故事吗？'
      ],
      emotion: 'thoughtful'
    },
    {
      keywords: ['累', '疲惫', '辛苦'],
      responses: [
        '走了这么久，确实会累呢。前面有个古井，我们去那边坐坐吧？听听水声，感受微风，让身心都休息一下~',
        '疗愈的路上，休息也是很重要的一环哦。找个舒服的地方坐下，闭上眼睛，听听大自然的声音，让疲惫慢慢消散...'
      ],
      emotion: 'caring'
    },
    {
      keywords: ['推荐', '去哪里', '做什么'],
      responses: [
        '根据您的情绪状态，我推荐您去瓦猫工坊。亲手绘制一只瓦猫，在专注中释放压力，还能带走一份属于自己的守护神哦~',
        '要不要去心灵庭院坐坐？那里有一棵百年的桂花树，在树下品茶、冥想，能让内心特别平静。我陪您一起去吧！'
      ],
      emotion: 'helpful'
    }
  ]

  const findBestResponse = (userInput: string) => {
    for (const item of aiResponses) {
      if (item.keywords.some(keyword => userInput.includes(keyword))) {
        return {
          content: item.responses[Math.floor(Math.random() * item.responses.length)],
          emotion: item.emotion
        }
      }
    }
    // 默认回复
    return {
      content: '我在听，您继续说~ 这里的每一处风景都值得细细品味，每一段感受都值得被珍藏。',
      emotion: 'attentive'
    }
  }

  const handleSend = () => {
    if (!inputText.trim()) return

    // 添加用户消息
    setMessages(prev => [...prev, {
      type: 'user',
      content: inputText,
      timestamp: new Date()
    }])

    const userInput = inputText
    setInputText('')

    // 模拟 AI 思考和回复
    setTimeout(() => {
      const response = findBestResponse(userInput)
      setMessages(prev => [...prev, {
        type: 'ai',
        content: response.content,
        emotion: response.emotion,
        timestamp: new Date()
      }])

      // 模拟语音播放
      if (!muted) {
        setIsSpeaking(true)
        setTimeout(() => setIsSpeaking(false), 3000)
      }
    }, 1000)
  }

  const handleVoiceInput = () => {
    if (isListening) {
      setIsListening(false)
      // 模拟语音识别
      const mockInputs = [
        '这里的建筑好美啊，有什么故事吗？',
        '感觉心情平静了很多',
        '有点累了，有什么推荐休息的地方吗？',
        '我想了解更多关于瓦猫的文化'
      ]
      const randomInput = mockInputs[Math.floor(Math.random() * mockInputs.length)]
      setInputText(randomInput)
    } else {
      setIsListening(true)
    }
  }

  const getDigitalHumanExpression = () => {
    const lastMessage = messages[messages.length - 1]
    if (lastMessage.type === 'ai' && lastMessage.emotion) {
      switch (lastMessage.emotion) {
        case 'happy': return '😊'
        case 'calm': return '😌'
        case 'thoughtful': return '🤔'
        case 'caring': return '🥺'
        case 'helpful': return '✨'
        case 'attentive': return '👂'
        default: return '😊'
      }
    }
    return isSpeaking ? '💬' : '😊'
  }

  const quickQuestions = [
    '这里有什么特别的地方吗？',
    '我感觉有点紧张，怎么办？',
    '推荐一个适合拍照的地方',
    '瓦猫有什么寓意？'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-primary-50 to-emerald-50 flex flex-col">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-2xl">
              🏮
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">福宝</h1>
              <p className="text-sm text-gray-600">福安村数字人向导</p>
            </div>
          </div>
          <button
            onClick={() => setMuted(!muted)}
            className="p-3 rounded-full hover:bg-gray-100 transition-colors"
          >
            {muted ? (
              <VolumeX className="w-5 h-5 text-gray-600" />
            ) : (
              <Volume2 className="w-5 h-5 text-primary-600" />
            )}
          </button>
        </div>
      </div>

      {/* Digital Human Display */}
      <div className="flex-shrink-0 py-6 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            animate={isSpeaking ? {
              scale: [1, 1.05, 1],
              y: [0, -5, 0]
            } : {}}
            transition={{
              duration: 0.5,
              repeat: isSpeaking ? Infinity : 0
            }}
            className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-5xl shadow-lg">
                  {getDigitalHumanExpression()}
                </div>
                {isSpeaking && (
                  <motion.div
                    className="absolute -inset-2 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full opacity-30"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity
                    }}
                  />
                )}
              </div>

              {/* Status */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Sparkles className="w-5 h-5 text-primary-600" />
                  <span className="font-semibold text-gray-900">
                    {isSpeaking ? '正在说话...' : isListening ? '正在聆听...' : '等待输入'}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">
                  {isListening 
                    ? '请说话，我会认真听~' 
                    : isSpeaking 
                    ? '让我为您介绍一下...' 
                    : '有什么我可以帮您的吗？'}
                </p>
              </div>

              {/* Voice Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleVoiceInput}
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isListening
                    ? 'bg-red-500 text-white shadow-lg shadow-red-500/50'
                    : 'bg-gradient-to-br from-primary-600 to-purple-600 text-white shadow-lg'
                }`}
              >
                {isListening ? (
                  <MicOff className="w-8 h-8" />
                ) : (
                  <Mic className="w-8 h-8" />
                )}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-hidden px-4 pb-4">
        <div className="max-w-4xl mx-auto h-full flex flex-col">
          <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-t-3xl shadow-lg overflow-hidden flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-6 py-4 ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-primary-600 to-purple-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="leading-relaxed">{message.content}</p>
                    <p className={`text-xs mt-2 ${
                      message.type === 'user' ? 'text-primary-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString('zh-CN', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            {messages.length < 3 && (
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <p className="text-sm text-gray-600 mb-3">您可以问我：</p>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => setInputText(question)}
                      className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-primary-500 hover:text-primary-600 transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="输入您想说的话..."
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 transition-colors"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  disabled={!inputText.trim()}
                  className="p-3 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Info */}
      <div className="flex-shrink-0 px-4 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary-600" />
              <div>
                <div className="text-sm font-semibold text-gray-900">当前位置</div>
                <div className="text-xs text-gray-600">福安古村落 · 文化遗产保护区</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
              <span className="text-sm text-gray-700">情感陪伴中</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DigitalHumanPage
