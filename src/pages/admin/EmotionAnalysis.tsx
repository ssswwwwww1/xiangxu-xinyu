import { useEffect, useState } from 'react';
import { Activity, BarChart, Smile, Frown, MessageSquare } from 'lucide-react';

interface Emotion {
  id: number;
  text: string;
  analysis: {
    primaryEmotion: string;
    confidence: number;
    keywords: string[];
    sentiment: string;
  };
  createdAt: string;
}

const EmotionAnalysis = () => {
  const [emotions, setEmotions] = useState<Emotion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/emotions')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setEmotions(data.data);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8 text-center text-gray-500">加载中...</div>;

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <Activity className="w-5 h-5 text-indigo-600" />
          情感分析记录
        </h2>
        <span className="text-sm text-gray-500">共 {emotions.length} 条记录</span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-600 text-xs uppercase font-medium">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">生成时间</th>
              <th className="px-6 py-4">用户输入</th>
              <th className="px-6 py-4">主要情绪</th>
              <th className="px-6 py-4">置信度</th>
              <th className="px-6 py-4">关键词</th>
              <th className="px-6 py-4">情感倾向</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {emotions.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-mono text-sm text-gray-500">#{item.id}</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(item.createdAt).toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 max-w-xs truncate">
                  {item.text || <span className="text-gray-400 italic">语音输入</span>}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize
                    ${item.analysis.primaryEmotion === 'peaceful' ? 'bg-emerald-100 text-emerald-700' : ''}
                    ${item.analysis.primaryEmotion === 'joyful' ? 'bg-amber-100 text-amber-700' : ''}
                    ${item.analysis.primaryEmotion === 'touched' ? 'bg-pink-100 text-pink-700' : ''}
                  `}>
                    {item.analysis.primaryEmotion}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-500 rounded-full"
                      style={{ width: `${item.analysis.confidence * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 mt-1 block">
                    {(item.analysis.confidence * 100).toFixed(1)}%
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  <div className="flex flex-wrap gap-1">
                    {item.analysis.keywords.map((kw, i) => (
                      <span key={i} className="bg-gray-100 px-2 py-0.5 rounded text-xs text-gray-500">
                        {kw}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">
                   {item.analysis.sentiment === 'positive' && (
                     <span className="text-green-600 flex items-center gap-1">
                       <Smile className="w-4 h-4" /> 正向
                     </span>
                   )}
                   {item.analysis.sentiment === 'negative' && (
                     <span className="text-red-600 flex items-center gap-1">
                       <Frown className="w-4 h-4" /> 负向
                     </span>
                   )}
                   {item.analysis.sentiment === 'neutral' && (
                     <span className="text-gray-600 flex items-center gap-1">
                       <MessageSquare className="w-4 h-4" /> 中性
                     </span>
                   )}
                </td>
              </tr>
            ))}
            {emotions.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                  暂无情感分析记录
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmotionAnalysis;
