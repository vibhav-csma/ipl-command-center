import { useMemo, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { ChartCard } from '../../common/ChartCard';
import { Mic } from 'lucide-react';
import type { VerbalMention } from '../../../types';

interface VerbalMentionsProps {
  data: VerbalMention[];
}

export function VerbalMentions({ data }: VerbalMentionsProps) {
  const [view, setView] = useState<'overall' | string>('overall');

  const matchOptions = useMemo(() => {
    const matches = [...new Set(data.map((d) => d.match))].sort();
    return ['overall', ...matches];
  }, [data]);

  const filteredData = view === 'overall'
    ? data
    : data.filter((d) => d.match === view);

  const totalMentions = filteredData.reduce((acc, d) => acc + d.count, 0);

  const chartData = view === 'overall'
    ? data.map((d) => ({ matchTime: `${d.match} ${d.timestamp}`, match: d.match, timestamp: d.timestamp, count: d.count }))
    : filteredData.map((d) => ({ matchTime: d.timestamp, match: d.match, timestamp: d.timestamp, count: d.count }));

  return (
    <ChartCard
      title="Verbal Brand Mentions"
      subtitle="Commentator mentions timeline by match"
      actions={
        <div className="flex flex-wrap gap-2">
          {matchOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => setView(opt)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                view === opt ? 'bg-[#6B46C1] text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {opt === 'overall' ? 'Overall' : opt}
            </button>
          ))}
        </div>
      }
    >
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex items-center gap-4 p-4 rounded-xl bg-violet-50 border border-violet-100 w-fit">
          <div className="p-3 rounded-lg bg-violet-100">
            <Mic className="w-6 h-6 text-[#6B46C1]" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900">{totalMentions}</p>
            <p className="text-xs text-slate-500">
              Total Verbal Mentions {view !== 'overall' && `(${view})`}
            </p>
          </div>
        </div>
        <div className="flex-1 min-h-[200px]">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="matchTime" stroke="#6B7280" tick={{ fill: '#9CA3AF', fontSize: 10 }} />
              <YAxis stroke="#6B7280" tick={{ fill: '#9CA3AF', fontSize: 11 }} />
              <Tooltip
                contentStyle={{ backgroundColor: 'white', border: '1px solid #E2E8F0', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                formatter={(value) => [value ?? 0, 'Mentions']}
                labelFormatter={(label, payload) => {
                  const p = payload[0]?.payload as { match?: string; timestamp?: string };
                  if (p?.match) return `${p.match} · ${p.timestamp}`;
                  return label;
                }}
              />
              <Line type="monotone" dataKey="count" stroke="#6B46C1" strokeWidth={2} dot={{ fill: '#6B46C1', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
        {filteredData.map((d, i) => (
          <div
            key={i}
            className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 hover:bg-violet-50/50 transition-colors"
            title={`${d.match} at ${d.timestamp}: ${d.count} mentions`}
          >
            <span className="text-xs text-slate-500 font-mono">{d.timestamp}</span>
            <span className="text-sm text-slate-800 font-medium truncate">{d.match}</span>
            <span className="text-sm text-[#6B46C1] font-bold ml-auto">{d.count}x</span>
          </div>
        ))}
      </div>
    </ChartCard>
  );
}
