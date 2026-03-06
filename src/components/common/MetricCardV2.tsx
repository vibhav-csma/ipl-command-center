import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface MetricCardV2Props {
  title: string;
  value: string | number;
  sub?: string;
  trend?: { value: number; label?: string };
  icon?: ReactNode;
}

export function MetricCardV2({ title, value, sub, trend, icon }: MetricCardV2Props) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</p>
          <p className="text-2xl font-bold text-slate-900 mt-2">{value}</p>
          {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
          {trend && (
            <p
              className={cn(
                'text-xs mt-2 font-semibold',
                trend.value >= 0 ? 'text-emerald-600' : 'text-rose-500'
              )}
            >
              {trend.value >= 0 ? '▲' : '▼'} {Math.abs(trend.value)}%
              {trend.label ? ` ${trend.label}` : ''}
            </p>
          )}
        </div>
        {icon && (
          <div className="p-2.5 rounded-lg bg-[#eff6ff]">
            <div className="text-[#1e40af]">{icon}</div>
          </div>
        )}
      </div>
    </div>
  );
}
