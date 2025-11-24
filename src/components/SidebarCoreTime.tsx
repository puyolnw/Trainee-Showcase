import { 
  Home, 
  Users,
  FileText,
  BarChart3,
  Clock,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Menu items สำหรับ Manager และ HR
const items = [
  { to: "/app/core", icon: Home, label: "Dashboard", end: true },
  { to: "/app/core/reviews", icon: FileText, label: "Reviews", end: false },
  { to: "/app/core/team", icon: Users, label: "Team Performance", end: false },
  { to: "/app/core/evaluation", icon: FileText, label: "Evaluation", end: false },
  { to: "/app/core/calibration", icon: BarChart3, label: "Calibration", end: false },
];

// Menu items สำหรับ Time module (placeholder)
const timeItems = [
  { to: "/app/time", icon: Home, label: "Dashboard", end: true },
  { to: "/app/time/attendance", icon: Clock, label: "Attendance", end: false },
];

interface SidebarCoreTimeProps {
  onClose?: () => void;
  isMobile?: boolean;
  module?: 'core' | 'time';
}

export default function SidebarCoreTime({ onClose, isMobile = false, module = 'core' }: SidebarCoreTimeProps) {
  // Load sidebar state from localStorage immediately on mount
  // Use shared key for all layouts - single state across all modules
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('sidebar-collapsed');
        return saved === 'true';
      } catch {
        return false;
      }
    }
    return false;
  });

  // Save sidebar state to localStorage when it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('sidebar-collapsed', String(isCollapsed));
      } catch (error) {
        console.warn('Failed to save sidebar state:', error);
      }
    }
  }, [isCollapsed]);

  const menuItems = module === 'time' ? timeItems : items;
  const moduleName = module === 'time' ? 'Time' : 'Core';
  const ModuleIcon = module === 'time' ? Clock : Users;

  // Mobile always shows full sidebar
  if (isMobile) {
    return (
      <aside className="w-64 bg-[var(--bg)] flex flex-col items-start px-4 py-4 border-r border-app h-full overflow-y-auto scrollbar-hide">
        <div className="mb-6 w-full flex items-center justify-between gap-2">
          <div className="flex items-center gap-3 flex-1 p-2 rounded-lg">
            <div className="w-10 h-10 bg-gradient-to-br from-ptt-blue to-ptt-cyan rounded-xl flex items-center justify-center shadow-lg shadow-ptt-blue/20">
              <ModuleIcon className="w-6 h-6 text-app" strokeWidth={2} />
            </div>
            <div className="flex-1 text-left">
              <h2 className="text-lg font-semibold text-[var(--accent)] font-display">HREx {moduleName}</h2>
              <p className="text-xs text-muted font-light">Manager & HR Portal</p>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col space-y-2 w-full pb-6">
          {menuItems.map(({ to, icon: Icon, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              title={label}
              aria-label={label}
              onClick={onClose}
              className={({ isActive }) =>
                `p-3 rounded-xl hover:panel relative group hover:scale-105 active:scale-95 outline-none focus:outline-none focus:ring-2 focus:ring-ptt-blue/30 flex items-center gap-3 w-full ${
                  isActive ? "panel shadow-md" : ""
                }`
              }
              style={{
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-ptt-blue rounded-r-full shadow-[0_0_8px_rgba(40,103,224,0.6)]" />
                  )}
                  <Icon
                    className={`w-5 h-5 group-hover:scale-110 ${
                      isActive ? "text-[var(--accent)]" : "text-muted group-hover:text-app"
                    }`}
                    strokeWidth={1.5}
                  />
                  <span 
                    className={`text-sm font-medium ${
                      isActive ? "text-[var(--accent)]" : "text-app group-hover:text-app"
                    }`}
                  >
                    {label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </aside>
    );
  }

  // Desktop sidebar with collapse functionality
  return (
    <motion.aside
      initial={false}
      animate={{
        width: isCollapsed ? "80px" : "240px"
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="bg-[var(--bg)] flex flex-col items-center py-4 border-r border-app h-full relative"
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-4 w-6 h-6 bg-[var(--bg)] border border-app rounded-full flex items-center justify-center hover:bg-soft transition-all z-10 shadow-md"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4 text-muted" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-muted" />
        )}
      </button>

      {/* Header */}
      <div className={`mb-6 ${isCollapsed ? "p-2" : "w-full px-4"}`}>
        {isCollapsed ? (
          <div className="w-10 h-10 bg-gradient-to-br from-ptt-blue to-ptt-cyan rounded-xl flex items-center justify-center shadow-lg shadow-ptt-blue/20">
            <ModuleIcon className="w-6 h-6 text-app" strokeWidth={2} />
          </div>
        ) : (
          <div className="flex items-center gap-3 p-2 rounded-lg">
            <div className="w-10 h-10 bg-gradient-to-br from-ptt-blue to-ptt-cyan rounded-xl flex items-center justify-center shadow-lg shadow-ptt-blue/20">
              <ModuleIcon className="w-6 h-6 text-app" strokeWidth={2} />
            </div>
            <div className="flex-1 text-left">
              <h2 className="text-lg font-semibold text-[var(--accent)] font-display">HREx {moduleName}</h2>
              <p className="text-xs text-muted font-light">Manager & HR Portal</p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Items */}
      <div className="flex-1 flex flex-col space-y-2 w-full px-2">
        {menuItems.map(({ to, icon: Icon, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            title={label}
            aria-label={label}
            className={({ isActive }) =>
              `p-3 rounded-xl hover:panel relative group hover:scale-105 active:scale-95 outline-none focus:outline-none focus:ring-2 focus:ring-ptt-blue/30 ${
                isActive ? "panel shadow-md" : ""
              } ${isCollapsed ? "flex items-center justify-center" : "flex items-center gap-3"}`
            }
            style={{
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            {({ isActive }) => (
              <>
                {isActive && !isCollapsed && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-ptt-blue rounded-r-full shadow-[0_0_8px_rgba(40,103,224,0.6)]" />
                )}
                <Icon
                  className={`w-5 h-5 group-hover:scale-110 ${
                    isActive ? "text-[var(--accent)]" : "text-muted group-hover:text-app"
                  }`}
                  strokeWidth={1.5}
                />
                {!isCollapsed && (
                  <span 
                    className={`text-sm font-medium ${
                      isActive ? "text-[var(--accent)]" : "text-app group-hover:text-app"
                    }`}
                  >
                    {label}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </motion.aside>
  );
}
