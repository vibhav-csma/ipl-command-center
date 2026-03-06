import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Tv, MessageCircle } from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'IPL Overview' },
  { to: '/brand/stream', icon: Tv, label: 'Stream Data' },
  { to: '/brand/social', icon: MessageCircle, label: 'Social Data' },
];

export function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-white border-r border-slate-200/80 flex flex-col shadow-sm">
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <img
            src="/consuma-logo.png"
            alt="Consuma"
            className="h-9 w-auto"
          />
          <div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">IPL Command Center</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-violet-50 text-[#6B46C1] border border-violet-100 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`
            }
          >
            <Icon className="w-5 h-5" />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
