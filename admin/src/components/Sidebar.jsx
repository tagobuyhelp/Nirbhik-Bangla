import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutGrid,
  FileText,
  Video,
  Tv,
  Folder,
  User,
  ListOrdered,
  ShieldCheck,
  MessageCircle,
  Megaphone,
  Target,
  BarChart2,
  PieChart,
  Image as ImageIcon,
  Users,
  Settings,
  ChevronRight,
  ChevronDown,
  PlusCircle,
  Radio,
  PanelLeftClose,
  PanelLeft,
  Share2,
} from 'lucide-react';

export default function Sidebar({ isCollapsed, toggleSidebar }) {
  const location = useLocation();

  // Track expanded menu state for items with children
  const [openMenus, setOpenMenus] = useState({
    posts: true,
    videos: false,
    live: false,
    reporters: false,
    ads: false,
  });

  const toggleMenu = (id) => {
    setOpenMenus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const mainNavItems = [
    { label: 'Dashboard', path: '/', icon: LayoutGrid, isHome: true },
    {
      id: 'posts',
      label: 'Posts',
      path: '/posts',
      icon: FileText,
      children: [
        { label: 'All Posts', path: '/posts' },
        { label: 'Add New Post', path: '/posts/add', badge: 'NEW' },
        { label: 'Categories', path: '/categories' },
        { label: 'Tags', path: '/tags' },
      ],
    },
    {
      id: 'videos',
      label: 'Videos',
      path: '/videos',
      icon: Video,
      children: [
        { label: 'All Videos', path: '/videos' },
        { label: 'Program Schedule', path: '/schedule' },
      ],
    },
    {
      id: 'live',
      label: 'Live TV',
      path: '/live-tv',
      icon: Tv,
      children: [
        { label: 'Control Center', path: '/live-tv' },
        { label: 'Live Streams', path: '/live-streams' },
      ],
    },
    { label: 'Categories', path: '/categories', icon: Folder },
    {
      id: 'reporters',
      label: 'Reporters',
      path: '/reporters',
      icon: User,
      children: [
        { label: 'All Reporters', path: '/reporters' },
        { label: 'Add New Reporter', path: '/reporters/create' },
      ],
    },
    { label: 'Comments', path: '/comments', icon: MessageCircle, badge: '24' },
    {
      id: 'ads',
      label: 'Ad Manager',
      path: '/ads-manager',
      icon: Megaphone,
      children: [
        { label: 'Ads Campaigns', path: '/ads-manager' },
        { label: 'Ad Placements', path: '/ad-placements' },
      ],
    },
    { label: 'Ad Placements', path: '/ad-placements', icon: Target },
    { label: 'Social Connector', path: '/social-connector', icon: Share2, badge: 'AI' },
    { label: 'Analytics', path: '/analytics', icon: PieChart },
    { label: 'Media Library', path: '/media', icon: ImageIcon },
    { label: 'Users', path: '/reporters', icon: Users },
  ];

  const systemNavItems = [
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside
      className={`bg-[#0e131f] text-slate-300 flex flex-col justify-between shrink-0 sticky top-0 h-screen overflow-y-auto custom-scrollbar select-none font-sans rounded-tr-2xl shadow-2xl transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-20' : 'w-72'
      }`}
    >
      <div className={`space-y-6 ${isCollapsed ? 'p-2.5' : 'p-4'}`}>
        
        {/* Hardcoded Logo Branding Header */}
        <div className="pt-2 px-1 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-3 group" title="Nirbhik Bangla Admin">
            {/* Custom Emblem Badge Icon */}
            <div className="w-11 h-11 rounded-2xl bg-white p-0.5 shadow-md shadow-red-600/30 group-hover:scale-105 transition-transform shrink-0 border border-white/20 overflow-hidden">
              <img
                src="/images/logos/Nirbhik-Bangla-Icon.png"
                alt="Nirbhik Bangla Emblem"
                className="w-full h-full object-contain rounded-xl"
              />
            </div>

            {/* Hardcoded Text Branding (Hidden when collapsed) */}
            {!isCollapsed && (
              <div className="animate-in fade-in duration-200">
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="font-black text-xl text-white tracking-tight">NIRBHIK</span>
                  <span className="font-black text-xl text-[#eb1c24] tracking-tight">BANGLA</span>
                </div>
                <p className="text-[9px] font-black text-slate-400 tracking-[0.18em] uppercase mt-1">
                  — FRIENDS OF NEWS —
                </p>
              </div>
            )}
          </NavLink>

          {!isCollapsed && (
            <button
              onClick={toggleSidebar}
              title="Collapse Sidebar"
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer hidden lg:block"
            >
              <PanelLeftClose size={18} />
            </button>
          )}
        </div>

        {/* MAIN Section */}
        <div className="space-y-1.5">
          {!isCollapsed && (
            <p className="px-3 text-[11px] font-black text-slate-400 tracking-wider uppercase">
              MAIN
            </p>
          )}

          <nav className="space-y-1">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const hasChildren = item.children && item.children.length > 0;
              const isChildActive = hasChildren && item.children.some((c) => location.pathname === c.path);
              const isParentActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path + '/'));
              const isOpen = item.id ? openMenus[item.id] || isChildActive || isParentActive : false;

              return (
                <div key={item.label} className="space-y-1 relative group">
                  <NavLink
                    to={item.path}
                    end={item.isHome}
                    title={isCollapsed ? item.label : undefined}
                    onClick={(e) => {
                      if (hasChildren && !isCollapsed) {
                        toggleMenu(item.id);
                      }
                    }}
                    className={({ isActive }) =>
                      `w-full flex items-center ${
                        isCollapsed ? 'justify-center px-0 py-3' : 'justify-between px-3.5 py-2.5'
                      } rounded-xl text-sm font-bold transition-all ${
                        isActive || isChildActive
                          ? 'bg-[#eb1c24] text-white shadow-md shadow-red-600/30'
                          : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3.5'}`}>
                          <div
                            className={`p-1.5 rounded-lg flex items-center justify-center ${
                              isActive || isChildActive
                                ? 'bg-[#b91c1c] text-white'
                                : 'text-slate-300'
                            }`}
                          >
                            <Icon size={18} />
                          </div>
                          {!isCollapsed && <span>{item.label}</span>}
                        </div>

                        {!isCollapsed && (
                          item.badge ? (
                            <span className="bg-[#ea580c] text-white text-xs font-extrabold px-2 py-0.5 rounded-full shadow-xs">
                              {item.badge}
                            </span>
                          ) : hasChildren ? (
                            isOpen ? (
                              <ChevronDown size={16} className={isActive || isChildActive ? 'text-white' : 'text-slate-400'} />
                            ) : (
                              <ChevronRight size={16} className={isActive || isChildActive ? 'text-white' : 'text-slate-400'} />
                            )
                          ) : (
                            <ChevronRight
                              size={15}
                              className={isActive ? 'text-white' : 'text-slate-400'}
                            />
                          )
                        )}
                      </>
                    )}
                  </NavLink>

                  {/* Render Sub-menu Items Dropdown (Only when expanded) */}
                  {hasChildren && isOpen && !isCollapsed && (
                    <div className="pl-9 space-y-1 pt-1 border-l-2 border-slate-800/80 ml-5 my-1">
                      {item.children.map((child) => (
                        <NavLink
                          key={child.path}
                          to={child.path}
                          end
                          className={({ isActive }) =>
                            `w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                              isActive
                                ? 'bg-white/15 text-white font-black pl-4'
                                : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
                            }`
                          }
                        >
                          <span>{child.label}</span>
                          {child.badge && (
                            <span className="bg-[#eb1c24] text-white text-[9px] font-black px-1.5 py-0.2 rounded shadow-xs">
                              {child.badge}
                            </span>
                          )}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* SYSTEM Section */}
        <div className="pt-2 border-t border-slate-800/60 space-y-1.5">
          {!isCollapsed && (
            <p className="px-3 text-[11px] font-black text-slate-400 tracking-wider uppercase">
              SYSTEM
            </p>
          )}

          <nav className="space-y-1">
            {systemNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.label}
                  to={item.path}
                  title={isCollapsed ? item.label : undefined}
                  className={({ isActive }) =>
                    `w-full flex items-center ${
                      isCollapsed ? 'justify-center px-0 py-3' : 'justify-between px-3.5 py-2.5'
                    } rounded-xl text-sm font-bold transition-all ${
                      isActive
                        ? 'bg-white/10 text-[#f97316] border-l-4 border-[#f97316] pl-2.5'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3.5'}`}>
                        <div className={`p-1.5 rounded-lg ${isActive ? 'text-[#f97316]' : 'text-slate-300'}`}>
                          <Icon size={18} />
                        </div>
                        {!isCollapsed && <span className={isActive ? 'text-[#f97316]' : ''}>{item.label}</span>}
                      </div>
                      {!isCollapsed && <ChevronRight size={15} className={isActive ? 'text-[#f97316]' : 'text-slate-400'} />}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

      </div>

      {/* Bottom User Profile Card */}
      <div className={`p-3 border-t border-slate-800/80 bg-[#0a0e17] ${isCollapsed ? 'flex justify-center' : ''}`}>
        <div
          title={isCollapsed ? "Super Admin (Administrator)" : undefined}
          className={`bg-white/5 border border-white/5 p-2.5 rounded-2xl flex items-center ${
            isCollapsed ? 'justify-center w-11 h-11 p-0' : 'justify-between'
          } cursor-pointer hover:bg-white/10 transition-colors`}
        >
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80"
              alt="Super Admin"
              className="w-8 h-8 rounded-full object-cover border border-amber-500/50 shadow-xs shrink-0"
            />
            {!isCollapsed && (
              <div>
                <h5 className="text-xs font-black text-white leading-tight">Super Admin</h5>
                <p className="text-[10px] text-slate-400">Administrator</p>
              </div>
            )}
          </div>
          {!isCollapsed && <ChevronDown size={14} className="text-slate-400" />}
        </div>
      </div>
    </aside>
  );
}
