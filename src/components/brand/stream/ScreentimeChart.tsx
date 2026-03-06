import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';
import { ChartCard } from '../../common/ChartCard';
import { formatMinutes } from '../../../utils/formatters';
import type { ScreentimeData } from '../../../types';

interface ScreentimeChartProps {
  data: ScreentimeData[];
}

const COLORS = ['#6B46C1', '#3B82F6', '#10B981'];

export function ScreentimeChart({ data }: ScreentimeChartProps) {
  const [filter, setFilter] = useState<'match' | 'overall'>('match');

  const matchData = data.filter((d) => d.match);
  const overallData = data.filter((d) => !d.match);

  const chartData = filter === 'match'
    ? Object.entries(
        matchData.reduce(
          (acc: Record<string, Record<string, number>>, d: ScreentimeData) => {
            const match = d.match!;
            if (!acc[match]) acc[match] = {};
            acc[match][d.channel] = (acc[match][d.channel] ?? 0) + d.minutes;
            return acc;
          },
          {} as Record<string, Record<string, number>>
        )
      ).map(([match, channels]) => ({ match, ...channels }))
    : overallData.map((d) => ({ channel: d.channel, minutes: d.minutes }));

  return (
    <ChartCard
      title="Total Screentime"
      subtitle="By Match / Overall / Stream / Language"
      actions={
        <div className="flex gap-2">
          {(['match', 'overall'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                filter === f ? 'bg-[#6B46C1] text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      }
    >
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          {filter === 'match' ? (
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <XAxis dataKey="match" stroke="#6B7280" tick={{ fill: '#9CA3AF', fontSize: 11 }} />
              <YAxis stroke="#6B7280" tick={{ fill: '#9CA3AF', fontSize: 11 }} />
              <Tooltip
                contentStyle={{ backgroundColor: 'white', border: '1px solid #E2E8F0', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                formatter={(value, name) => [formatMinutes(Number(value) || 0), typeof name === 'string' ? name : '']}
                labelFormatter={(_, payload) => payload[0]?.payload?.match ? `Brand · ${(payload[0].payload as { match: string }).match}` : ''}
              />
              <Legend />
              <Bar dataKey="Star Sports Hindi" stackId="a" fill={COLORS[0]} radius={[0, 0, 0, 0]} name="Star Sports Hindi (min)" />
              <Bar dataKey="Star Sports English" stackId="a" fill={COLORS[1]} radius={[0, 0, 0, 0]} name="Star Sports English (min)" />
              <Bar dataKey="JioCinema" stackId="a" fill={COLORS[2]} radius={[0, 4, 4, 0]} name="JioCinema (min)" />
            </BarChart>
          ) : (
            <BarChart data={chartData} layout="vertical" margin={{ left: 80, right: 10 }}>
              <XAxis type="number" stroke="#6B7280" tick={{ fill: '#9CA3AF', fontSize: 11 }} />
              <YAxis type="category" dataKey="channel" width={120} stroke="#6B7280" tick={{ fill: '#9CA3AF', fontSize: 11 }} />
              <Tooltip
                contentStyle={{ backgroundColor: 'white', border: '1px solid #E2E8F0', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                formatter={(value) => [formatMinutes(Number(value) || 0), 'Brand screentime (min)']}
                labelFormatter={() => 'Overall by channel'}
              />
              <Bar dataKey="minutes" radius={[0, 4, 4, 0]} name="Minutes">
                {chartData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}
