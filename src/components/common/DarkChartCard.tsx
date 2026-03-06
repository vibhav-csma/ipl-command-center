import type { ReactNode } from 'react';
import { Trophy, TrendingUp, Lightbulb, Sparkles } from 'lucide-react';

interface DarkChartCardProps {
  title: string;
  subtitle?: string;
  icon?: 'trophy' | 'chart' | 'lightbulb' | 'sparkles';
  children: ReactNode;
}

const icons = {
  trophy: Trophy,
  chart: TrendingUp,
  lightbulb: Lightbulb,
  sparkles: Sparkles,
};

export function DarkChartCard({ title, subtitle, icon = 'chart', children }: DarkChartCardProps) {
  const Icon = icons[icon];
  return (
    <div className="rounded-xl bg-[#FFFFFF] border border-slate-200/80 shadow-sm p-6 hover:shadow-md hover:border-[#1e40af]/20 transition-colors">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 rounded-lg bg-[#1e40af]/10">
          <Icon className="w-4 h-4 text-[#1e40af]" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-[#0f172a] uppercase tracking-wider">{title}</h3>
          {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}
