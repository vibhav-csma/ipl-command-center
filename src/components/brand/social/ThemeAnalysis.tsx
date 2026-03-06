import { ChartCard } from '../../common/ChartCard';
import { formatNumber } from '../../../utils/formatters';
import type { ThemeData } from '../../../types';

interface ThemeAnalysisProps {
  data: ThemeData[];
}

const COLORS = ['#FF6B00', '#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EC4899', '#6B7280'];

export function ThemeAnalysis({ data }: ThemeAnalysisProps) {
  const maxVolume = Math.max(...data.map((d) => d.volume));

  return (
    <ChartCard title="Themes Analysis" subtitle="Detected conversation themes - click to drill down">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {data.map((d, i) => (
          <button
            key={d.name}
            className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-left hover:border-violet-300 hover:shadow-sm transition-all"
          >
            <div
              className="h-1.5 rounded-full mb-2 transition-all"
              style={{
                width: `${(d.volume / maxVolume) * 100}%`,
                backgroundColor: COLORS[i % COLORS.length],
              }}
            />
            <p className="text-sm font-medium text-slate-800 truncate">{d.name}</p>
            <p className="text-xs text-slate-500 mt-0.5">{formatNumber(d.volume)} mentions</p>
            <p className="text-xs mt-1">
              <span className={d.sentiment >= 0.6 ? 'text-[#10B981]' : d.sentiment >= 0.4 ? 'text-amber-400' : 'text-red-400'}>
                {(d.sentiment * 100).toFixed(0)}% sentiment
              </span>
            </p>
          </button>
        ))}
      </div>
    </ChartCard>
  );
}
