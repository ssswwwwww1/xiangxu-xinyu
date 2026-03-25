import { useEffect, useState } from 'react';
import { Map, Calendar, User, ArrowRight, X, Clock, MapPin } from 'lucide-react';
import Modal from '../../components/Modal';

interface Journey {
  id: number;
  emotionType: string;
  createdAt: string;
  route: {
    name: string;
    description: string;
    stops: {
      id: number;
      name: string;
      description: string;
      activity: string;
      emotion: string;
      duration: string;
    }[];
  };
}

const JourneyList = () => {
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJourney, setSelectedJourney] = useState<Journey | null>(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/journeys')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setJourneys(data.data);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8 text-center text-gray-500 animate-pulse">加载中...</div>;

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center bg-gray-50">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <Map className="w-5 h-5 text-indigo-600" />
            旅程记录列表
          </h2>
          <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full border shadow-sm">
            共 {journeys.length} 条记录
          </span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-xs uppercase font-medium tracking-wider">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">生成时间</th>
                <th className="px-6 py-4">情绪类型</th>
                <th className="px-6 py-4">路线名称</th>
                <th className="px-6 py-4">包含景点</th>
                <th className="px-6 py-4">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {journeys.map((journey) => (
                <tr key={journey.id} className="hover:bg-indigo-50/50 transition-colors group">
                  <td className="px-6 py-4 font-mono text-sm text-gray-500">#{journey.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {new Date(journey.createdAt).toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize inline-flex items-center gap-1
                      ${journey.emotionType === 'anxious' ? 'bg-emerald-100 text-emerald-700' : ''}
                      ${journey.emotionType === 'tired' ? 'bg-amber-100 text-amber-700' : ''}
                      ${journey.emotionType === 'balanced' ? 'bg-purple-100 text-purple-700' : ''}
                      ${journey.emotionType === 'normal' ? 'bg-blue-100 text-blue-700' : ''}
                    `}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50" />
                      {journey.emotionType}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">
                    {journey.route.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="flex flex-wrap gap-1">
                      {journey.route.stops.slice(0, 2).map(stop => (
                        <span key={stop.id} className="bg-gray-100 px-2 py-0.5 rounded text-xs border border-gray-200">
                          {stop.name}
                        </span>
                      ))}
                      {journey.route.stops.length > 2 && (
                        <span className="bg-gray-100 px-2 py-0.5 rounded text-xs text-gray-400 border border-gray-200">
                          +{journey.route.stops.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button 
                      onClick={() => setSelectedJourney(journey)}
                      className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      查看详情 <ArrowRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
              {journeys.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400 bg-gray-50/30">
                    暂无旅程记录
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedJourney && (
        <Modal
          isOpen={!!selectedJourney}
          onClose={() => setSelectedJourney(null)}
          title={`旅程详情 #${selectedJourney.id}`}
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-500 mb-1">情绪类型</p>
                <span className="text-lg font-bold capitalize text-gray-800">{selectedJourney.emotionType}</span>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 mb-1">生成时间</p>
                <span className="text-sm font-mono text-gray-800">
                  {new Date(selectedJourney.createdAt).toLocaleString()}
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-indigo-600" />
                {selectedJourney.route.name}
              </h4>
              <p className="text-gray-600 bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                {selectedJourney.route.description}
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                包含站点 ({selectedJourney.route.stops.length})
              </h4>
              <div className="space-y-4 relative pl-4 border-l-2 border-gray-100">
                {selectedJourney.route.stops.map((stop, index) => (
                  <div key={stop.id} className="relative">
                    <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-white border-2 border-indigo-500" />
                    <div className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-bold text-gray-800">{stop.name}</h5>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
                          {stop.duration}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{stop.description}</p>
                      <div className="flex flex-wrap gap-2 text-xs">
                        <span className="bg-amber-50 text-amber-700 px-2 py-1 rounded border border-amber-100">
                          活动: {stop.activity}
                        </span>
                        <span className="bg-purple-50 text-purple-700 px-2 py-1 rounded border border-purple-100">
                          情感: {stop.emotion}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default JourneyList;
