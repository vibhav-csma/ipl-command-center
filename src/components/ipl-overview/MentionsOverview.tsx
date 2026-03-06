import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { MetricCard } from '../common/MetricCard';
import { ChartCard } from '../common/ChartCard';
import { formatNumber } from '../../utils/formatters';
import type { MentionData } from '../../types';

interface MentionsOverviewProps {
  data: MentionData;
}

const platformColors: Record<string, string> = {
  'Twitter/X': '#1DA1F2',
  Instagram: '#E4405F',
  YouTube: '#FF0000',
  Reddit: '#FF4500',
};

const MentionTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-lg p-4">
      <p className="text-sm font-semibold text-slate-800 mb-1">{label}</p>
      <p className="text-lg font-bold text-[#6B46C1]">{formatNumber(payload[0].value)} mentions</p>
    </div>
  );
};

export function MentionsOverview({ data }: MentionsOverviewProps) {
  const trendData = data.trend.map((v, i) => ({ day: `D${i + 1}`, value: v }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MetricCard
          title="Total Conversational Mentions"
          value={formatNumber(data.total)}
          trend={{ value: data.delta, label: 'vs last match' }}
          delay={0.1}
        />
        <ChartCard title="Platform Breakdown" subtitle="Mentions by platform" delay={0.15}>
          <div className="space-y-4">
            {data.platformBreakdown.map((p) => (
              <div key={p.platform}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-700 font-medium">{p.platform}</span>
                  <span className="text-slate-900 font-semibold">{formatNumber(p.count)}</span>
                </div>
                <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(p.count / Math.max(...data.platformBreakdown.map((x) => x.count))) * 100}%`,
                      backgroundColor: platformColors[p.platform] ?? '#64748B',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>
      <ChartCard title="Mentions Trend" subtitle="Daily conversation volume" delay={0.2}>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="mentionsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6B46C1" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#6B46C1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" stroke="#94A3B8" tick={{ fill: '#64748B', fontSize: 11 }} />
              <YAxis stroke="#94A3B8" tick={{ fill: '#64748B', fontSize: 11 }} />
              <Tooltip content={<MentionTooltip />} />
              <Area type="monotone" dataKey="value" stroke="#6B46C1" fill="url(#mentionsGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
}
