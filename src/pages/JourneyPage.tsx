import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { MapPin, Clock, Sparkles, Star, Wind, Sun, Cloud } from 'lucide-react'

const routes = {
  peaceful: {
    name: '宁静心灵之路',
    description: '专为缓解焦虑设计，通过古建筑的静谧和自然的疗愈，帮助您找回内心的平静',
    color: 'from-emerald-500 to-teal-500',
    stops: [
      {
        id: 1,
        name: '福安古井',
        type: 'landmark',
        duration: '15 分钟',
        description: '在百年古井旁聆听水的故事，感受时间的静谧流淌',
        activity: '静坐冥想，聆听井水声',
        emotion: '平静',
        coordinates: { lat: 25.123, lng: 102.456 }
      },
      {
        id: 2,
        name: '瓦猫工坊',
        type: 'craft',
        duration: '40 分钟',
        description: '亲手绘制瓦猫，在专注中释放焦虑，感受守护的力量',
        activity: '绘制心理一颗印瓦猫',
        emotion: '专注',
        coordinates: { lat: 25.125, lng: 102.458 }
      },
      {
        id: 3,
        name: '心灵庭院',
        type: 'nature',
        duration: '30 分钟',
        description: '在古朴庭院中品茶闻香，与自然对话',
        activity: '茶道体验，心灵日记',
        emotion: '安宁',
        coordinates: { lat: 25.127, lng: 102.460 }
      }
    ]
  },
  energizing: {
    name: '活力焕发之路',
    description: '为疲惫的身心注入活力，通过互动体验和创造性活动重获能量',
    color: 'from-amber-500 to-orange-500',
    stops: [
      {
        id: 1,
        name: '刺绣坊',
        type: 'craft',
        duration: '45 分钟',
        description: '学习传统刺绣技艺，在针线间找到专注与成就',
        activity: '制作个性化刺绣小品',
        emotion: '成就',
        coordinates: { lat: 25.130, lng: 102.462 }
      },
      {
        id: 2,
        name: '古村落广场',
        type: 'social',
        duration: '30 分钟',
        description: '与当地手艺人交流，感受人情温暖',
        activity: '互动问答，故事分享',
        emotion: '连接',
        coordinates: { lat: 25.132, lng: 102.464 }
      },
      {
        id: 3,
        name: '阳光露台',
        type: 'nature',
        duration: '25 分钟',
        description: '在露台上俯瞰全村，感受开阔与自由',
        activity: '自由创作，摄影记录',
        emotion: '自由',
        coordinates: { lat: 25.134, lng: 102.466 }
      }
    ]
  },
  cultural: {
    name: '文化探索之路',
    description: '深度体验村落文化底蕴，在历史与艺术的熏陶中获得心灵满足',
    color: 'from-purple-500 to-indigo-500',
    stops: [
      {
        id: 1,
        name: '百年祠堂',
        type: 'landmark',
        duration: '35 分钟',
        description: '了解家族历史，感受文化传承的力量',
        activity: '聆听祠堂故事，拓印家训',
        emotion: '敬畏',
        coordinates: { lat: 25.136, lng: 102.468 }
      },
      {
        id: 2,
        name: '非遗展示馆',
        type: 'culture',
        duration: '50 分钟',
        description: '沉浸式体验多项非遗技艺',
        activity: '选择一项技艺深度学习',
        emotion: '好奇',
        coordinates: { lat: 25.138, lng: 102.470 }
      },
      {
        id: 3,
        name: '古戏台',
        type: 'performance',
        duration: '40 分钟',
        description: '欣赏传统戏曲表演，感受艺术魅力',
        activity: '观看表演，学习基础唱腔',
        emotion: '愉悦',
        coordinates: { lat: 25.140, lng: 102.472 }
      }
    ]
  }
}

const JourneyPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [selectedRoute, setSelectedRoute] = useState<any>(null)
  const [weather, setWeather] = useState({ condition: 'sunny', temperature: 22 })
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const state = location.state as any
    if (state?.recommendedRoute && routes[state.recommendedRoute as keyof typeof routes]) {
      setSelectedRoute(routes[state.recommendedRoute as keyof typeof routes])
    } else {
      setSelectedRoute(routes.cultural)
    }

    // 模拟天气数据
    const weathers = ['sunny', 'cloudy', 'windy']
    setWeather({
      condition: weathers[Math.floor(Math.random() * weathers.length)],
      temperature: Math.floor(Math.random() * 10) + 18
    })

    // 更新时间
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [location.state])

  if (!selectedRoute) return null

  const getWeatherIcon = () => {
    switch (weather.condition) {
      case 'sunny': return <Sun className="w-5 h-5 text-amber-500" />
      case 'cloudy': return <Cloud className="w-5 h-5 text-gray-500" />
      case 'windy': return <Wind className="w-5 h-5 text-blue-500" />
      default: return <Sun className="w-5 h-5 text-amber-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-earth-50 via-primary-50 to-emerald-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">您的专属疗愈路线</h1>
              <p className="text-sm text-gray-600">AI 智能叙事引擎生成</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
                {getWeatherIcon()}
                <span className="text-sm text-gray-700">{weather.temperature}°C</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
                <Clock className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-700">
                  {currentTime.getHours().toString().padStart(2, '0')}:
                  {currentTime.getMinutes().toString().padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Route Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`bg-gradient-to-r ${selectedRoute.color} rounded-3xl p-8 text-white mb-8 shadow-xl`}
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-8 h-8" />
                <h2 className="text-3xl font-bold">{selectedRoute.name}</h2>
              </div>
              <p className="text-lg opacity-90 mb-6 max-w-2xl">
                {selectedRoute.description}
              </p>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{selectedRoute.stops.length} 个打卡点</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>
                    预计 {selectedRoute.stops.reduce((acc: number, stop: any) => {
                      return acc + parseInt(stop.duration)
                    }, 0)} 分钟
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Route Stops */}
        <div className="space-y-6">
          {selectedRoute.stops.map((stop: any, index: number) => (
            <motion.div
              key={stop.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 }}
              className="relative"
            >
              {/* Connection Line */}
              {index < selectedRoute.stops.length - 1 && (
                <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-gradient-to-b from-primary-400 to-transparent" />
              )}

              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-6">
                  {/* Stop Number */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${selectedRoute.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                    <span className="text-2xl font-bold text-white">{index + 1}</span>
                  </div>

                  {/* Stop Info */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900">{stop.name}</h3>
                      <div className="flex items-center gap-2 px-3 py-1 bg-primary-50 rounded-full">
                        <Star className="w-4 h-4 text-primary-600 fill-primary-600" />
                        <span className="text-sm text-primary-700">{stop.emotion}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4">{stop.description}</p>

                    <div className="flex flex-wrap gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{stop.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span className="capitalize">{stop.type}</span>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4 mb-4">
                      <div className="text-sm font-semibold text-gray-700 mb-2">推荐活动：</div>
                      <div className="text-gray-600">{stop.activity}</div>
                    </div>

                    <button
                      onClick={() => {
                        localStorage.setItem('currentStop', JSON.stringify(stop))
                        navigate('/checkin', { state: { stop } })
                      }}
                      className={`px-6 py-3 bg-gradient-to-r ${selectedRoute.color} text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300`}
                    >
                      前往打卡
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 flex justify-center gap-4"
        >
          <button
            onClick={() => navigate('/digital-human')}
            className="px-8 py-4 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3"
          >
            <Sparkles className="w-5 h-5" />
            召唤数字人向导
          </button>
          <button
            onClick={() => navigate('/memory')}
            className="px-8 py-4 bg-white text-gray-900 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            查看心灵游记
          </button>
        </motion.div>
      </div>
    </div>
  )
}

export default JourneyPage
