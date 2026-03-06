import type { ReactNode } from 'react';
import { FileText, Zap, Eye, Users } from 'lucide-react';

interface DarkCardProps {
  title: string;
  value: string | number;
  sub?: string;
  trend?: { value: number; label?: string };
  icon?: 'document' | 'lightning' | 'eye' | 'users';
  children?: ReactNode;
}

const icons = {
  document: FileText,
  lightning: Zap,
  eye: Eye,
  users: Users,
};

export function DarkCard({ title, value, sub, trend, icon, children }: DarkCardProps) {
  const Icon = icon ? icons[icon] : null;
  return (
    <div className="rounded-xl bg-[#FFFFFF] border border-slate-200/80 shadow-sm p-6 hover:shadow-md hover:border-[#1e40af]/20 transition-colors">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{title}</p>
          <p className="text-2xl font-bold text-[#0f172a] mt-2">{value}</p>
          {sub && <p className="text-xs text-slate-500 mt-1">{sub}</p>}
          {trend && (
            <p className={`text-xs mt-2 font-medium ${trend.value >= 0 ? 'text-[#1e40af]' : 'text-rose-500'}`}>
              {trend.value >= 0 ? '▲' : '▼'} {Math.abs(trend.value)}%{trend.label ? ` ${trend.label}` : ''}
            </p>
          )}
        </div>
        {Icon && (
          <div className="p-2 rounded-lg bg-[#1e40af]/10">
            <Icon className="w-5 h-5 text-[#1e40af]" />
          </div>
        )}
      </div>
      {children}
    </div>
  );
}
