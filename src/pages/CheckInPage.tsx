import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { Camera, Mic, MapPin, Heart, Sparkles, Send } from 'lucide-react'

const CheckInPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const stop = (location.state as any)?.stop || JSON.parse(localStorage.getItem('currentStop') || '{}')
  
  const [activeTab, setActiveTab] = useState<'photo' | 'voice' | 'text'>('photo')
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [voiceNote, setVoiceNote] = useState<string | null>(null)
  const [textNote, setTextNote] = useState('')
  const [emotion, setEmotion] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const recordingTimer = useRef<NodeJS.Timeout>()

  const startRecording = () => {
    setIsRecording(true)
    setRecordingTime(0)
    recordingTimer.current = setInterval(() => {
      setRecordingTime(prev => prev + 1)
    }, 1000)
  }

  const stopRecording = () => {
    setIsRecording(false)
    if (recordingTimer.current) {
      clearInterval(recordingTimer.current)
    }
    // 模拟语音转文字
    const mockTranscripts = [
      '站在这里，我感受到了历史的厚重...',
      '阳光透过屋檐洒下来，心情变得平静...',
      '传统工艺的魅力让人惊叹，专注的感觉真好...',
      '这里的每一块砖瓦都在诉说着故事...'
    ]
    const transcript = mockTranscripts[Math.floor(Math.random() * mockTranscripts.length)]
    setVoiceNote(transcript)
    setRecordingTime(0)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleCapture = () => {
    // 模拟拍照
    const mockPhotos = [
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2UwZTdlMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iYXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5照片已拍摄</text></svg>'
    ]
    setCapturedPhoto(mockPhotos[0])
  }

  const handleSubmit = () => {
    setIsSubmitting(true)
    
    // 保存打卡记录
    const checkInData = {
      stopId: stop.id,
      stopName: stop.name,
      photo: capturedPhoto,
      voiceNote,
      textNote,
      emotion,
      timestamp: new Date().toISOString()
    }

    // 获取已有的打卡记录
    const existingCheckIns = JSON.parse(localStorage.getItem('checkIns') || '[]')
    existingCheckIns.push(checkInData)
    localStorage.setItem('checkIns', JSON.stringify(existingCheckIns))

    // 分析情感
    setTimeout(() => {
      setIsSubmitting(false)
      navigate('/memory', { state: { justCheckedIn: true, checkInData } })
    }, 1500)
  }

  const emotions = [
    { value: 'peaceful', label: '平静', emoji: '😌' },
    { value: 'joyful', label: '喜悦', emoji: '😊' },
    { value: 'touched', label: '感动', emoji: '🥺' },
    { value: 'inspired', label: '启发', emoji: '💡' },
    { value: 'nostalgic', label: '怀念', emoji: '🌙' },
    { value: 'focused', label: '专注', emoji: '🎯' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-earth-50 via-primary-50 to-emerald-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <MapPin className="w-6 h-6 text-primary-600" />
            <h1 className="text-3xl font-bold text-gray-900">{stop.name}</h1>
          </div>
          <p className="text-gray-600">记录此刻，珍藏美好</p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 md:p-8 mb-6"
        >
          {/* Tabs */}
          <div className="flex gap-2 mb-8 p-1 bg-gray-100 rounded-xl">
            {[
              { id: 'photo', icon: Camera, label: '拍照打卡' },
              { id: 'voice', icon: Mic, label: '语音日记' },
              { id: 'text', icon: Send, label: '文字感悟' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Photo Tab */}
          {activeTab === 'photo' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="relative aspect-video bg-gray-100 rounded-2xl overflow-hidden flex items-center justify-center">
                {capturedPhoto ? (
                  <img src={capturedPhoto} alt="Captured" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center">
                    <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">点击按钮拍摄照片</p>
                  </div>
                )}
              </div>
              <button
                onClick={handleCapture}
                className="w-full py-4 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3"
              >
                <Camera className="w-5 h-5" />
                {capturedPhoto ? '重新拍摄' : '拍摄照片'}
              </button>
            </motion.div>
          )}

          {/* Voice Tab */}
          {activeTab === 'voice' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="text-center py-12">
                {isRecording ? (
                  <div className="space-y-4">
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="w-24 h-24 bg-red-500 rounded-full mx-auto flex items-center justify-center"
                    >
                      <Mic className="w-10 h-10 text-white" />
                    </motion.div>
                    <div className="text-3xl font-bold text-gray-900">
                      {formatTime(recordingTime)}
                    </div>
                    <p className="text-gray-600">正在录音...</p>
                  </div>
                ) : voiceNote ? (
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                        <Mic className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">录音已完成</div>
                        <div className="text-sm text-gray-600">AI 已自动转写</div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 text-gray-700 italic">
                      "{voiceNote}"
                    </div>
                  </div>
                ) : (
                  <div>
                    <Mic className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 mb-6">点击按钮开始录音</p>
                  </div>
                )}
              </div>

              <button
                onClick={isRecording ? stopRecording : startRecording}
                className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 ${
                  isRecording
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-gradient-to-r from-primary-600 to-purple-600 text-white hover:shadow-lg'
                }`}
              >
                <Mic className="w-5 h-5" />
                {isRecording ? '停止录音' : '开始录音'}
              </button>
            </motion.div>
          )}

          {/* Text Tab */}
          {activeTab === 'text' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <textarea
                value={textNote}
                onChange={(e) => setTextNote(e.target.value)}
                placeholder="写下此刻的感受和想法..."
                className="w-full h-48 p-4 border-2 border-gray-200 rounded-xl resize-none focus:border-primary-500 focus:outline-none transition-colors"
              />
              <div className="text-right text-sm text-gray-500">
                {textNote.length} 字
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Emotion Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 md:p-8 mb-6"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Heart className="w-6 h-6 text-primary-600" />
            此刻的心情是？
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {emotions.map((emo) => (
              <button
                key={emo.value}
                onClick={() => setEmotion(emo.value)}
                className={`p-4 rounded-2xl transition-all duration-200 ${
                  emotion === emo.value
                    ? 'bg-primary-500 text-white shadow-lg scale-105'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="text-3xl mb-2">{emo.emoji}</div>
                <div className="text-sm font-medium">{emo.label}</div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onClick={handleSubmit}
          disabled={isSubmitting || (!capturedPhoto && !voiceNote && !textNote) || !emotion}
          className="w-full py-4 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {isSubmitting ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-6 h-6" />
              </motion.div>
              <span>AI 正在分析...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-6 h-6" />
              <span>完成打卡</span>
            </>
          )}
        </motion.button>
      </div>
    </div>
  )
}

export default CheckInPage
