import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function AdminLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex font-sans antialiased">
      <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        <Header isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
        <main className="p-4 md:p-6 space-y-6 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
