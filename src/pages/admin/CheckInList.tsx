import { useEffect, useState } from 'react';
import { Camera, Mic, Type, FileText, ArrowRight, X } from 'lucide-react';
import Modal from '../../components/Modal';

interface CheckIn {
  id: number;
  stopName: string;
  photo?: string;
  voiceNote?: string;
  textNote?: string;
  emotion?: string;
  timestamp: string;
}

const CheckInList = () => {
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCheckIn, setSelectedCheckIn] = useState<CheckIn | null>(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/checkins')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setCheckIns(data.data);
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
            <FileText className="w-5 h-5 text-indigo-600" />
            用户打卡内容
          </h2>
          <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full border shadow-sm">
            共 {checkIns.length} 条记录
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {checkIns.map((item) => (
            <div key={item.id} className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-gray-400">#{item.id}</span>
                <span className="text-xs text-gray-500">{new Date(item.timestamp).toLocaleDateString()}</span>
              </div>
              
              <h3 className="font-bold text-gray-800 mb-2 text-lg">{item.stopName}</h3>
              
              <div className="space-y-3 mb-4 flex-1">
                {item.photo && (
                  <div className="relative h-32 bg-gray-100 rounded-lg overflow-hidden group">
                     {/* Replace with actual image if available, using placeholder for now */}
                     <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100">
                       <Camera className="w-8 h-8 opacity-50" />
                     </div>
                     {item.photo.startsWith('data:') && (
                        <img src={item.photo} alt="打卡照片" className="w-full h-full object-cover" />
                     )}
                     <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-white text-xs font-medium">查看大图</span>
                     </div>
                  </div>
                )}
                {item.voiceNote && (
                  <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg border border-amber-100">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                      <Mic className="w-4 h-4 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <div className="h-1 bg-amber-200 rounded-full w-2/3 mb-1" />
                      <span className="text-xs text-amber-600">语音记录</span>
                    </div>
                  </div>
                )}
                {item.textNote && (
                  <div className="flex items-start gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <Type className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <p className="line-clamp-3 text-xs leading-relaxed">{item.textNote}</p>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                {item.emotion && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-md border border-purple-100 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    {item.emotion}
                  </span>
                )}
                
                <button 
                  onClick={() => setSelectedCheckIn(item)}
                  className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1 transition-colors"
                >
                  查看详情 <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
          {checkIns.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-400 bg-gray-50 rounded-lg border border-dashed border-gray-200">
              暂无打卡记录
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedCheckIn && (
        <Modal
          isOpen={!!selectedCheckIn}
          onClose={() => setSelectedCheckIn(null)}
          title={`打卡详情 #${selectedCheckIn.id}`}
        >
          <div className="space-y-6">
             <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-500 mb-1">打卡点</p>
                <span className="text-lg font-bold text-gray-800">{selectedCheckIn.stopName}</span>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 mb-1">时间</p>
                <span className="text-sm font-mono text-gray-800">
                  {new Date(selectedCheckIn.timestamp).toLocaleString()}
                </span>
              </div>
            </div>

            {selectedCheckIn.emotion && (
              <div>
                <h4 className="text-sm font-semibold text-gray-500 mb-2">情感标签</h4>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full font-medium">
                  <span className="text-lg">🏷️</span>
                  {selectedCheckIn.emotion}
                </div>
              </div>
            )}

            {selectedCheckIn.photo && (
              <div>
                <h4 className="text-sm font-semibold text-gray-500 mb-2 flex items-center gap-2">
                  <Camera className="w-4 h-4" /> 照片
                </h4>
                <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                   {selectedCheckIn.photo.startsWith('data:') ? (
                      <img src={selectedCheckIn.photo} alt="打卡照片" className="w-full h-auto" />
                   ) : (
                      <div className="h-64 flex items-center justify-center text-gray-400">
                        <span className="flex flex-col items-center gap-2">
                          <Camera className="w-12 h-12 opacity-30" />
                          <span className="text-sm">图片未加载</span>
                        </span>
                      </div>
                   )}
                </div>
              </div>
            )}

            {selectedCheckIn.voiceNote && (
              <div>
                <h4 className="text-sm font-semibold text-gray-500 mb-2 flex items-center gap-2">
                  <Mic className="w-4 h-4" /> 语音
                </h4>
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-amber-500">
                    <Mic className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="h-2 bg-amber-200 rounded-full w-full mb-1" />
                    <p className="text-xs text-amber-700">语音消息 (点击播放暂未实现)</p>
                  </div>
                </div>
              </div>
            )}

            {selectedCheckIn.textNote && (
              <div>
                <h4 className="text-sm font-semibold text-gray-500 mb-2 flex items-center gap-2">
                  <Type className="w-4 h-4" /> 文字感想
                </h4>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {selectedCheckIn.textNote}
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </>
  );
};

export default CheckInList;
