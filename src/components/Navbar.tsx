import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Target, Building2, Clock, Bell, LogOut, Menu, ChevronDown } from "lucide-react";
import { logout } from "@/lib/auth";
import ThemeToggle from "@/components/ThemeToggle";
import { useState, useRef, useEffect } from "react";

const modules = [
  { name: "Talent", path: "/app/talent", icon: Target, enabled: true },
  { name: "Core", path: "/app/core", icon: Building2, enabled: true },
  { name: "Time", path: "/app/time", icon: Clock, enabled: true },
];

interface NavbarProps {
  onMenuClick?: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Find active module
  const activeModule = modules.find((mod) =>
    location.pathname.startsWith(mod.path)
  );

  // Determine role based on path
  const getRoleLabel = () => {
    if (location.pathname.startsWith("/app/talent")) {
      return "talent.emp";
    } else if (location.pathname.startsWith("/app/core")) {
      return "talent.mng";
    } else if (location.pathname.startsWith("/app/time")) {
      return "talent.hr";
    }
    return "";
  };

  const roleLabel = getRoleLabel();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="flex items-center justify-between h-14 px-4 md:px-6 bg-[var(--bg)] border-b border-app relative z-50">
      {/* Left: Hamburger Menu (Mobile only) */}
      <div className="flex-1 flex items-center">
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 hover:bg-soft rounded-lg transition-all hover:scale-110 active:scale-95"
            aria-label="เปิดเมนู"
            title="เปิดเมนู"
          >
            <Menu className="w-5 h-5 text-muted" />
          </button>
        )}
      </div>

      {/* Center: Module Navigation */}
      {/* Desktop - Inline Navigation */}
      <nav className="hidden md:flex gap-1 md:gap-2 items-center">
        {modules.map((mod) => {
          if (!mod.enabled) {
            return (
              <div
                key={mod.path}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted opacity-50 cursor-not-allowed"
                title="Coming soon"
              >
                <mod.icon className="w-4 h-4" strokeWidth={2} />
                <span>{mod.name}</span>
              </div>
            );
          }
          return (
            <NavLink
              key={mod.path}
              to={mod.path}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                  isActive
                    ? "bg-[var(--primary)] text-white font-medium shadow-md hover:shadow-lg hover:brightness-110 active:scale-95"
                    : "text-muted hover:bg-soft hover:text-app hover:scale-105 active:scale-95"
                }`
              }
              style={{
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <mod.icon className="w-4 h-4" strokeWidth={2} />
              <span>{mod.name}</span>
            </NavLink>
          );
        })}
        {roleLabel && (
          <span className="ml-2 px-2 py-1 text-xs font-medium text-muted bg-soft rounded">
            {roleLabel}
          </span>
        )}
      </nav>

      {/* Mobile - Dropdown Navigation */}
      <div className="md:hidden relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm bg-[var(--primary)] text-white font-medium shadow-md hover:shadow-lg hover:brightness-110 active:scale-95 transition-all"
        >
          {activeModule && <activeModule.icon className="w-4 h-4" strokeWidth={2} />}
          <span className="text-xs">{activeModule?.name || "เลือกระบบ"}</span>
          {roleLabel && <span className="text-xs opacity-75">({roleLabel})</span>}
          <ChevronDown
            className={`w-3 h-3 transition-transform ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute top-full left-0 mt-2 w-48 bg-[var(--bg)] border border-app rounded-lg shadow-lg overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            {modules.map((mod) => {
              const isActive = location.pathname.startsWith(mod.path);
              if (!mod.enabled) {
                return (
                  <div
                    key={mod.path}
                    className="flex items-center gap-3 px-4 py-3 text-sm text-muted opacity-50 cursor-not-allowed"
                    title="Coming soon"
                  >
                    <mod.icon className="w-4 h-4" strokeWidth={2} />
                    <span>{mod.name}</span>
                  </div>
                );
              }
              return (
                <NavLink
                  key={mod.path}
                  to={mod.path}
                  onClick={() => setIsDropdownOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                    isActive
                      ? "bg-[var(--primary)] text-white font-medium"
                      : "text-muted hover:bg-soft hover:text-app"
                  }`}
                >
                  <mod.icon className="w-4 h-4" strokeWidth={2} />
                  <span>{mod.name}</span>
                </NavLink>
              );
            })}
          </div>
        )}
      </div>

      {/* Right Actions */}
      <div className="flex-1 flex items-center justify-end gap-1 md:gap-2">
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notification */}
        <button
          className="relative p-2 hover:bg-soft rounded-lg transition-all hover:scale-110 active:scale-95"
          title="การแจ้งเตือน"
        >
          <Bell className="w-4 h-4 text-muted" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-ptt-red rounded-full animate-pulse"></span>
        </button>

        {/* Profile */}
        <img
          src="https://ui-avatars.com/api/?name=PTT+User&background=2867e0&color=fff"
          alt="Profile"
          className="w-7 h-7 rounded-full ring-2 ring-ptt-blue/20 hover:ring-ptt-blue/40 hover:scale-110 transition-all cursor-pointer active:scale-95"
        />

        {/* Logout - Hidden on mobile */}
        <button
          onClick={handleLogout}
          className="hidden sm:flex items-center gap-1 px-2 py-1.5 hover:bg-soft rounded-lg transition-all text-muted hover:text-ptt-red hover:scale-105 active:scale-95 text-sm"
          title="ออกจากระบบ"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden lg:inline">ออกจากระบบ</span>
        </button>
      </div>
    </header>
  );
}
