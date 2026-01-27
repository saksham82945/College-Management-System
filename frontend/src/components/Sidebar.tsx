import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';
import {
  ChevronDown, ChevronRight, Menu, Home, LogOut, Users, GraduationCap,
  BookOpen, Calculator, Calendar, ClipboardCheck,
  FileText, Settings, Briefcase,
  LayoutDashboard, CreditCard, PieChart, UserCircle
} from 'lucide-react';
import { useThemeStore } from '@/store/theme';

interface MenuItem {
  label: string;
  path?: string;
  icon: any;
  children?: MenuItem[];
}

export const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['Faculty & Staff']); // Pre-expand Faculty & Staff
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const { isDarkMode } = useThemeStore();
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const menuItems: Record<string, MenuItem[]> = {
    ADMIN: [
      { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
      { label: 'Students', path: '/students', icon: GraduationCap },
      {
        label: 'Faculty & Staff',
        icon: UserCircle,
        children: [
          { label: 'Faculty', path: '/teachers', icon: Users },
          { label: 'Staff', path: '/staff', icon: Briefcase },
        ]
      },
      { label: 'Courses', path: '/classes', icon: ClipboardCheck },
      { label: 'Books', path: '/books', icon: BookOpen },
      { label: 'Fees', path: '/fees', icon: CreditCard },
      { label: 'Attendance', path: '/attendance', icon: Calendar },
      { label: 'Exams', path: '/exams', icon: FileText },
      { label: 'Timetable', path: '/timetable', icon: Calculator },
      { label: 'Payroll', path: '/payroll', icon: PieChart },
      { label: 'Settings', path: '/settings', icon: Settings },
    ],
    STUDENT: [
      { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
      { label: 'My Fees', path: '/my-fees', icon: CreditCard },
      { label: 'Attendance', path: '/my-attendance', icon: Calendar },
      { label: 'Exams', path: '/my-exams', icon: FileText },
      { label: 'Timetable', path: '/timetable', icon: Calculator },
    ],
    PUBLIC: [
      { label: 'Home', path: '/dashboard', icon: Home },
      { label: 'Pay Fees', path: '/pay-fee', icon: CreditCard },
    ],
  };

  const currentRole = user?.roles?.[0] ? user.roles[0].toUpperCase() : 'PUBLIC';
  const items = menuItems[currentRole as keyof typeof menuItems] || menuItems['PUBLIC'];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  const toggleMenu = (label: string) => {
    setExpandedMenus(prev =>
      prev.includes(label)
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Save and restore scroll position
  React.useEffect(() => {
    // Restore scroll position when component mounts or location changes
    const savedScrollPosition = sessionStorage.getItem('sidebarScrollPosition');
    if (savedScrollPosition && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = parseInt(savedScrollPosition, 10);
    }

    // Add scroll listener to save position as user scrolls
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        sessionStorage.setItem('sidebarScrollPosition', scrollContainerRef.current.scrollTop.toString());
      }
    };

    const scrollElement = scrollContainerRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
    }

    // Cleanup
    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [location.pathname]);

  const renderMenuItem = (item: MenuItem, depth = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedMenus.includes(item.label);
    const active = item.path ? isActive(item.path) : false;

    if (hasChildren) {
      // Parent item with children
      return (
        <div key={item.label}>
          <button
            onClick={() => toggleMenu(item.label)}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group relative
              ${isDarkMode
                ? 'hover:bg-gray-800 hover:text-white text-gray-300'
                : 'hover:bg-gray-50 hover:text-gray-900 text-gray-600'
              }
              ${collapsed ? 'justify-center px-2' : ''}
            `}
            title={collapsed ? item.label : ''}
          >
            <item.icon size={22} className="shrink-0" />
            {!collapsed && (
              <>
                <span className="font-medium truncate flex-1 text-left">{item.label}</span>
                {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
              </>
            )}
          </button>

          {/* Children */}
          {!collapsed && isExpanded && (
            <div className="ml-4 space-y-1 mt-1">
              {item.children?.map(child => renderMenuItem(child, depth + 1))}
            </div>
          )}
        </div>
      );
    }

    // Leaf item
    return (
      <button
        key={item.path}
        onClick={() => {
          if (item.path) {
            // Save scroll position before navigation
            if (scrollContainerRef.current) {
              sessionStorage.setItem('sidebarScrollPosition', scrollContainerRef.current.scrollTop.toString());
            }
            navigate(item.path);
            if (isMobile) setCollapsed(true);
          }
        }}
        className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group relative
          ${active
            ? isDarkMode
              ? 'bg-purple-500/10 text-purple-400'
              : 'bg-purple-50 text-purple-600'
            : isDarkMode
              ? 'hover:bg-gray-800 hover:text-white text-gray-300'
              : 'hover:bg-gray-50 hover:text-gray-900 text-gray-600'
          }
          ${collapsed ? 'justify-center px-2' : ''}
          ${depth > 0 ? 'ml-2' : ''}
        `}
        title={collapsed ? item.label : ''}
      >
        <item.icon
          size={depth > 0 ? 20 : 22}
          className={`shrink-0 transition-colors ${active ? 'text-purple-500' : ''}`}
        />

        {
          !collapsed && (
            <span className={`font-medium truncate ${active ? 'font-semibold' : ''}`}>
              {item.label}
            </span>
          )
        }

        {
          collapsed && active && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-purple-500 rounded-l-full" />
          )
        }
      </button >
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {!collapsed && isMobile && (
        <div
          className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={() => setCollapsed(true)}
        />
      )}

      <aside
        className={`transition-all duration-300 
          ${isMobile ? 'fixed inset-y-0 left-0 z-50 h-full' : 'sticky top-0 h-screen z-20'}
          ${collapsed ? 'w-20' : 'w-72'} 
          ${isMobile && collapsed ? '-translate-x-full' : 'translate-x-0'}
          flex flex-col 
          ${isDarkMode
            ? 'bg-[#0f1117] border-r border-gray-800 text-gray-300'
            : 'bg-white border-r border-gray-100 text-gray-600 shadow-xl'
          }`}
      >
        <div className={`flex items-center justify-between p-6 mb-2
          ${!collapsed && 'px-6'}
        `}>
          {!collapsed && (
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-500 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/20 shrink-0">
                <GraduationCap className="text-white w-5 h-5" />
              </div>
              <h1 className={`font-bold text-xl tracking-tight whitespace-nowrap ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                LNMI CMS
              </h1>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`p-2 rounded-lg transition-all ${isDarkMode
              ? 'hover:bg-gray-800 text-gray-400 hover:text-white'
              : 'hover:bg-gray-100 text-gray-500 hover:text-gray-900'
              } ${collapsed ? 'mx-auto' : ''}`}
          >
            {!collapsed && isMobile ? (
              <ChevronDown className="rotate-90" size={20} />
            ) : (
              <Menu size={20} />
            )}
          </button>
        </div>

        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto overflow-x-hidden px-4 space-y-1 custom-scrollbar">
          {items.map((item) => renderMenuItem(item))}
        </div>

        {/* Footer Actions */}
        <div className={`p-4 mt-auto border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-100'}`}>
          <div className="space-y-1">
            <button
              onClick={() => navigate('/')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors
                ${isDarkMode
                  ? 'hover:bg-gray-800 text-gray-400 hover:text-white'
                  : 'hover:bg-gray-50 text-gray-600 hover:text-gray-900'
                } ${collapsed ? 'justify-center px-2' : ''}`}
              title="Home"
            >
              <Home size={20} />
              {!collapsed && <span className="font-medium">Home</span>}
            </button>

            <button
              onClick={handleLogout}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors
                ${isDarkMode
                  ? 'hover:bg-red-500/10 text-red-400 hover:text-red-300'
                  : 'hover:bg-red-50 text-red-600 hover:text-red-700'
                } ${collapsed ? 'justify-center px-2' : ''}`}
              title="Logout"
            >
              <LogOut size={20} />
              {!collapsed && <span className="font-medium">Logout</span>}
            </button>
          </div>

          {!collapsed && (
            <div className={`mt-4 pt-4 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-100'}`}>
              <div className="flex items-center gap-3 px-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-700 to-gray-600 flex items-center justify-center text-white font-bold shrink-0">
                  {user?.fullName?.[0] || 'U'}
                </div>
                <div className="overflow-hidden">
                  <p className={`text-sm font-semibold truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {user?.fullName || 'User'}
                  </p>
                  <p className="text-xs text-gray-500 truncate capitalize">
                    {user?.roles?.[0]?.toLowerCase() || 'Guest'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
