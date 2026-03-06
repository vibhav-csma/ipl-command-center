import { NavLink } from 'react-router-dom';
import { RefreshCw } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { to: '/', label: 'IPL Overview' },
  { to: '/brand/stream', label: 'Stream Data' },
  { to: '/brand/social', label: 'Social Intelligence' },
];

export function Header() {
  const [lastSync, setLastSync] = useState(12);

  const handleRefresh = () => {
    setLastSync(0);
    const interval = setInterval(() => {
      setLastSync((prev) => (prev >= 12 ? (clearInterval(interval), 12) : prev + 1));
    }, 1000);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 shrink-0">
            <img src="/assets/consuma-logo.png" alt="Consuma" className="h-7 w-auto object-contain" />
            <span className="text-slate-300 font-light">|</span>
            <img src="/assets/ipl-logo.png" alt="IPL" className="h-7 w-auto object-contain" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-600">IPL 2025</span>
            <span className="text-slate-400">—</span>
            <span className="text-sm font-medium text-slate-900">Live</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Live" />
          </div>
          <nav className="flex gap-1 ml-4">
            {navItems.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `px-4 py-2.5 text-sm font-medium rounded-lg transition-all border-b-2 ${
                    isActive
                      ? 'text-[#1e40af] bg-[#eff6ff] border-[#1e40af]'
                      : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Last sync: {lastSync}s ago</span>
        </button>
      </div>
    </header>
  );
}
