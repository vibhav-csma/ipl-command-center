import type { ReactNode } from 'react';

interface ChartCardV2Props {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  children: ReactNode;
}

export function ChartCardV2({ title, subtitle, icon, children }: ChartCardV2Props) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center gap-3 mb-5">
        {icon && (
          <div className="p-2 rounded-lg bg-[#eff6ff]">
            <div className="text-[#1e40af]">{icon}</div>
          </div>
        )}
        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">{title}</h3>
          {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}
