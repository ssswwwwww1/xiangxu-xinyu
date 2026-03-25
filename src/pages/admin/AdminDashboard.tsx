import { useEffect, useState } from 'react';
import { Users, Activity, Map, TrendingUp, Calendar } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalJourneys: 0,
    totalCheckIns: 0,
    totalEmotions: 0,
    emotionCounts: {}
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/stats')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStats(data.data);
        }
      })
      .catch(err => console.error('Error fetching stats:', err));
  }, []);

  const cards = [
    {
      label: '总旅程数',
      value: stats.totalJourneys,
      icon: Map,
      color: 'bg-blue-100 text-blue-600',
      desc: '用户生成的个性化路线'
    },
    {
      label: '打卡记录',
      value: stats.totalCheckIns,
      icon: TrendingUp,
      color: 'bg-green-100 text-green-600',
      desc: '用户的互动打卡内容'
    },
    {
      label: '情感分析',
      value: stats.totalEmotions,
      icon: Activity,
      color: 'bg-purple-100 text-purple-600',
      desc: 'AI 分析的情感数据点'
    },
    {
      label: '活跃用户',
      value: '23', // Mock data
      icon: Users,
      color: 'bg-orange-100 text-orange-600',
      desc: '最近 7 天活跃用户'
    }
  ];

  // Mock data for the line chart
  const activityData = [12, 19, 15, 25, 22, 30, 23];
  const maxActivity = Math.max(...activityData);
  const chartHeight = 100;
  const chartWidth = 300;
  const points = activityData.map((val, i) => {
    const x = (i / (activityData.length - 1)) * chartWidth;
    const y = chartHeight - (val / maxActivity) * chartHeight;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${card.color}`}>
                <card.icon className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded">
                +12%
              </span>
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-1">{card.value}</h3>
            <p className="text-sm font-medium text-gray-600 mb-2">{card.label}</p>
            <p className="text-xs text-gray-400">{card.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Emotion Distribution */}
        <div className="bg-white rounded-xl shadow-sm p-6 lg:col-span-2 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-800">情绪分布概览</h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>本周</span>
            </div>
          </div>
          <div className="space-y-5">
            {Object.entries(stats.emotionCounts).map(([emotion, count]) => (
              <div key={emotion} className="group">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full 
                      ${emotion === 'peaceful' ? 'bg-emerald-500' : ''}
                      ${emotion === 'joyful' ? 'bg-amber-500' : ''}
                      ${emotion === 'touched' ? 'bg-pink-500' : ''}
                      ${emotion === 'focused' ? 'bg-blue-500' : 'bg-gray-400'}
                    `} />
                    <span className="text-sm font-medium text-gray-700 capitalize">{emotion}</span>
                  </div>
                  <span className="text-sm text-gray-500 font-medium">{count} 次</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ease-out group-hover:opacity-80
                      ${emotion === 'peaceful' ? 'bg-emerald-500' : ''}
                      ${emotion === 'joyful' ? 'bg-amber-500' : ''}
                      ${emotion === 'touched' ? 'bg-pink-500' : ''}
                      ${emotion === 'focused' ? 'bg-blue-500' : 'bg-gray-400'}
                    `}
                    style={{ width: `${(count / stats.totalEmotions) * 100}%` }}
                  />
                </div>
              </div>
            ))}
            {Object.keys(stats.emotionCounts).length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                <Activity className="w-12 h-12 mb-3 opacity-20" />
                <p>暂无情绪数据</p>
              </div>
            )}
          </div>
        </div>

        {/* Activity Chart (SVG) */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex flex-col">
          <h3 className="text-lg font-bold text-gray-800 mb-1">活跃趋势</h3>
          <p className="text-sm text-gray-500 mb-6">最近 7 天用户活跃度</p>
          
          <div className="flex-1 flex items-end justify-center min-h-[200px] w-full">
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight + 20}`} className="w-full h-full overflow-visible">
              {/* Grid lines */}
              {[0, 25, 50, 75, 100].map(y => (
                 <line key={y} x1="0" y1={y} x2={chartWidth} y2={y} stroke="#f3f4f6" strokeWidth="1" />
              ))}
              
              {/* Area fill */}
              <path
                d={`M0,${chartHeight} L${points} L${chartWidth},${chartHeight} Z`}
                fill="url(#gradient)"
                opacity="0.2"
              />
              <defs>
                <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#ffffff" />
                </linearGradient>
              </defs>

              {/* Line */}
              <polyline
                fill="none"
                stroke="#6366f1"
                strokeWidth="3"
                points={points}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              
              {/* Points */}
              {activityData.map((val, i) => {
                 const x = (i / (activityData.length - 1)) * chartWidth;
                 const y = chartHeight - (val / maxActivity) * chartHeight;
                 return (
                    <circle key={i} cx={x} cy={y} r="4" fill="#fff" stroke="#6366f1" strokeWidth="2" />
                 );
              })}
            </svg>
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-4">
            <span>周一</span>
            <span>周日</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">热门打卡点</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
             {/* Mock Data for popular spots */}
             {[
               { name: '百年祠堂', count: 45, trend: '+5', color: 'bg-red-50 text-red-600' },
               { name: '福安古井', count: 32, trend: '+2', color: 'bg-blue-50 text-blue-600' },
               { name: '瓦猫工坊', count: 28, trend: '+8', color: 'bg-amber-50 text-amber-600' },
               { name: '古戏台', count: 19, trend: '-1', color: 'bg-purple-50 text-purple-600' },
             ].map((spot, i) => (
               <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 border border-gray-100">
                 <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${spot.color}`}>
                   {i + 1}
                 </div>
                 <div className="flex-1">
                   <span className="font-bold text-gray-700 block">{spot.name}</span>
                   <span className="text-xs text-gray-500">{spot.count} 次打卡</span>
                 </div>
                 <div className={`text-xs font-medium px-2 py-1 rounded ${spot.trend.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                   {spot.trend}
                 </div>
               </div>
             ))}
          </div>
        </div>
    </div>
  );
};

export default AdminDashboard;
