import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  actions?: ReactNode;
  delay?: number;
}

export function ChartCard({ title, subtitle, children, actions, delay = 0 }: ChartCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="rounded-2xl bg-[#FFFFFF] border border-slate-200/80 p-6 shadow-sm hover:shadow-md hover:border-[#1e40af]/20 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-[#0f172a]">{title}</h3>
          {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
        {actions}
      </div>
      {children}
    </motion.div>
  );
}
