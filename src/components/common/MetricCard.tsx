import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: { value: number; label: string };
  icon?: ReactNode;
  children?: ReactNode;
  live?: boolean;
  delay?: number;
}

export function MetricCard({ title, value, subtitle, trend, icon, children, live, delay = 0 }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="rounded-2xl bg-white border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500 font-medium">{title}</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
          {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
          {trend && (
            <p className={`text-xs mt-2 font-medium ${trend.value >= 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
              {trend.value >= 0 ? '+' : ''}{trend.value}% {trend.label}
            </p>
          )}
        </div>
        {icon && <div className="text-slate-400">{icon}</div>}
        {live && (
          <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live
          </span>
        )}
      </div>
      {children && <div className="mt-4">{children}</div>}
    </motion.div>
  );
}
