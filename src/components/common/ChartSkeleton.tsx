import { motion } from 'framer-motion';

interface ChartSkeletonProps {
  height?: number;
  bars?: number;
  lines?: boolean;
}

export function ChartSkeleton({ height = 200, bars = 6, lines }: ChartSkeletonProps) {
  return (
    <div className="animate-pulse" style={{ height }}>
      {lines ? (
        <div className="flex flex-col gap-4 h-full justify-end pb-2">
          {[75, 55, 85, 45, 65, 90, 70].map((w, i) => (
            <motion.div
              key={i}
              className="h-3 rounded-full bg-slate-200"
              initial={{ width: 0 }}
              animate={{ width: `${w}%` }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            />
          ))}
        </div>
      ) : (
        <div className="flex items-end gap-2 h-full pb-2">
          {Array.from({ length: bars }).map((_, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-t bg-slate-200 min-h-[20px]"
              initial={{ height: 20 }}
              animate={{ height: 40 + Math.random() * (height - 80) }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
