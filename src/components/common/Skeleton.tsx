import { cn } from '../../utils/cn';

interface SkeletonProps {
  className?: string;
  variant?: 'card' | 'chart' | 'table' | 'text' | 'avatar' | 'metric';
}

export function Skeleton({ className, variant = 'text' }: SkeletonProps) {
  const base = 'rounded bg-slate-200/90 animate-skeleton-shimmer';
  const variants = {
    card: 'h-32',
    chart: 'h-64',
    table: 'h-48',
    text: 'h-4',
    avatar: 'h-10 w-10 rounded-full',
    metric: 'h-8 w-20',
  };
  return <div className={cn(base, variants[variant], className)} />;
}

export function SkeletonCard() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <Skeleton variant="text" className="w-24 mb-4" />
      <Skeleton variant="metric" className="mb-2" />
      <Skeleton variant="text" className="w-32" />
    </div>
  );
}

export function SkeletonChart() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <Skeleton variant="text" className="w-40 mb-2" />
      <Skeleton variant="text" className="w-56 mb-6" />
      <Skeleton variant="chart" />
    </div>
  );
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <Skeleton variant="text" className="w-48 mb-4" />
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, i) => (
          <Skeleton key={i} variant="text" className="w-full" />
        ))}
      </div>
    </div>
  );
}
