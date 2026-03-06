import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ChartCard } from '../../common/ChartCard';
import type { CompetitorMention } from '../../../types';

interface CompetitorMentionsProps {
  data: CompetitorMention;
}

const CompetitorTooltip = ({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number }[]; label?: string }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-lg p-4 min-w-[180px]">
      <p className="text-sm font-semibold text-slate-800 mb-2">{label}</p>
      <div className="space-y-1">
        {payload.map((p) => (
          <div key={p.name} className="flex justify-between text-sm">
            <span className="text-slate-600">{p.name}</span>
            <span className="font-semibold text-slate-900">{p.value} mentions</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export function CompetitorMentions({ data }: CompetitorMentionsProps) {
  const chartData = data.timeline.map((t, i) => ({
    timeline: t,
    [data.brandName]: data.volume[i],
    sentiment: (data.sentiment[i] * 100).toFixed(0),
    MPL: Math.round(data.volume[i] * (0.85 + (i * 0.015))),
    CRED: Math.round(data.volume[i] * (0.72 + (i * 0.02))),
    Paytm: Math.round(data.volume[i] * (0.68 + (i * 0.015))),
  }));

  return (
    <ChartCard
      title="Competitor Brand Mentions"
      subtitle="Trends / trendline / verbatims / volume"
    >
      <div className="h-72 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <XAxis dataKey="timeline" stroke="#94A3B8" tick={{ fill: '#64748B', fontSize: 11 }} />
            <YAxis stroke="#94A3B8" tick={{ fill: '#64748B', fontSize: 11 }} />
            <Tooltip content={<CompetitorTooltip />} />
            <Legend />
            <Line type="monotone" dataKey={data.brandName} stroke="#6B46C1" strokeWidth={2.5} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="MPL" stroke="#3B82F6" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="CRED" stroke="#10B981" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="Paytm" stroke="#8B5CF6" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="border-t border-slate-200 pt-4">
        <p className="text-xs text-slate-500 font-medium mb-2">Sample Verbatims</p>
        <div className="space-y-2">
          {data.verbatims.map((v, i) => (
            <p key={i} className="text-sm text-slate-700 italic">&ldquo;{v}&rdquo;</p>
          ))}
        </div>
      </div>
    </ChartCard>
  );
}
