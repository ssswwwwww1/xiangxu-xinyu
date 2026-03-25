import { Link, Outlet, useLocation } from 'react-router-dom';
import { Home, Map, Smile, BookOpen, Bot } from 'lucide-react';
import { motion } from 'framer-motion';

const ClientLayout = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: '首页' },
    { path: '/assessment', icon: Smile, label: '测评' },
    { path: '/journey', icon: Map, label: '旅程' },
    { path: '/memory', icon: BookOpen, label: '游记' },
    { path: '/digital-human', icon: Bot, label: '福宝' },
  ];

  // 某些页面可能不需要底部导航，比如沉浸式体验时
  const hideNav = location.pathname === '/checkin'; 

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-1 pb-20">
        <Outlet />
      </main>

      {!hideNav && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200 pb-safe pt-2 px-6 z-50 shadow-lg-up">
          <div className="flex justify-around items-center max-w-md mx-auto h-16">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative flex flex-col items-center justify-center w-16 group"
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -top-2 w-8 h-1 bg-indigo-500 rounded-full"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  <Icon
                    className={`w-6 h-6 transition-colors duration-200 ${
                      isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'
                    }`}
                  />
                  <span
                    className={`text-[10px] mt-1 font-medium transition-colors duration-200 ${
                      isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
};

export default ClientLayout;
