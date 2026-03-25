import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Activity, Settings, Map, FileText, BarChart2 } from 'lucide-react';

const AdminLayout = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/admin', icon: LayoutDashboard, label: '数据概览' },
    { path: '/admin/journeys', icon: Map, label: '旅程记录' },
    { path: '/admin/checkins', icon: FileText, label: '打卡内容' },
    { path: '/admin/emotions', icon: Activity, label: '情感分析' },
    // { path: '/admin/settings', icon: Settings, label: '系统设置' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <BarChart2 className="w-8 h-8 text-indigo-600" />
            乡叙管理端
          </h1>
        </div>
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-0 w-64 p-4 border-t bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
              A
            </div>
            <div>
              <p className="font-medium text-gray-800">管理员</p>
              <p className="text-xs text-gray-500">admin@xiangxu.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-10">
          <h2 className="text-xl font-semibold text-gray-800">
            {menuItems.find(item => item.path === location.pathname)?.label || '管理面板'}
          </h2>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm text-indigo-600 hover:underline">
              返回前台
            </Link>
          </div>
        </header>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
