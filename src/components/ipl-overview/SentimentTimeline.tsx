import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { DarkChartCard } from '../common/DarkChartCard';
import type { SentimentData } from '../../types';

interface SentimentTimelineProps {
  data: SentimentData;
  timelineWithDates?: { date: string; positive: number; negative: number; neutral: number }[];
}

const SentimentTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { name: string; value: number }[];
}) => {
  if (!active || !payload?.length) return null;
  const positive = payload.find((p) => p.name === 'positive')?.value ?? 0;
  const negative = payload.find((p) => p.name === 'negative')?.value ?? 0;
  const neutral = payload.find((p) => p.name === 'neutral')?.value ?? 0;
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-lg p-4 min-w-[180px]">
      <p className="text-sm font-semibold text-slate-900 mb-2">Sentiment split</p>
      <div className="space-y-1.5 text-sm">
        <div className="flex justify-between">
          <span className="text-emerald-600">Positive</span>
          <span className="font-semibold text-[#0f172a]">{positive}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-rose-500">Negative</span>
          <span className="font-semibold text-[#0f172a]">{negative}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Neutral</span>
          <span className="font-semibold text-[#0f172a]">{neutral}%</span>
        </div>
      </div>
    </div>
  );
};

export function SentimentTimeline({
  data,
  timelineWithDates = [],
}: SentimentTimelineProps) {
  const chartData =
    timelineWithDates.length > 0
      ? timelineWithDates
      : data.timeline.map((t) => ({
          date: t.match,
          positive: t.positive,
          negative: t.negative,
          neutral: t.neutral,
        }));

  return (
    <DarkChartCard
      title="Sentiment Performance"
      subtitle="Season trend across all brands"
      icon="chart"
    >
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="posGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22C55E" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#22C55E" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="negGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#EF4444" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#EF4444" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="neutGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#64748B" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#64748B" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              stroke="#64748B"
              tick={{ fill: '#94A3B8', fontSize: 11 }}
            />
            <YAxis
              stroke="#64748B"
              tick={{ fill: '#94A3B8', fontSize: 11 }}
              domain={[0, 80]}
            />
            <Tooltip content={<SentimentTooltip />} />
            <Area
              type="monotone"
              dataKey="positive"
              stroke="#22C55E"
              fill="url(#posGrad)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="negative"
              stroke="#EF4444"
              fill="url(#negGrad)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="neutral"
              stroke="#64748B"
              fill="url(#neutGrad)"
              strokeWidth={1}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </DarkChartCard>
  );
}
