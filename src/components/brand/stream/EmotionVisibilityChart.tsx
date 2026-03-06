import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import { ChartCard } from '../../common/ChartCard';
import type { EmotionVisibilityPoint } from '../../../types';

interface EmotionVisibilityChartProps {
  data: EmotionVisibilityPoint[];
}

const EMOTION_COLORS: Record<string, string> = {
  Excitement: '#6B46C1',
  Anticipation: '#3B82F6',
  Joy: '#10B981',
  Tension: '#F59E0B',
  Disappointment: '#EF4444',
};

const EMOTIONS = ['Excitement', 'Anticipation', 'Joy', 'Tension', 'Disappointment'];

function pivotEmotionData(data: EmotionVisibilityPoint[]) {
  const times = [...new Set(data.map((d) => d.time))].sort();
  return times.map((time) => {
    const row: Record<string, number | string> = { time };
    const atTime = data.filter((d) => d.time === time);
    atTime.forEach((d) => {
      row[d.emotion] = d.intensity;
    });
    const first = atTime[0];
    if (first) {
      row.visibilityMinutes = first.visibilityMinutes ?? 0;
      row.visibilityImpressionsM = first.visibilityImpressionsM ?? 0;
    }
    return row;
  });
}

export function EmotionVisibilityChart({ data }: EmotionVisibilityChartProps) {
  const [yAxis, setYAxis] = useState<'intensity' | 'mins' | 'impressions'>('intensity');
  const chartData = pivotEmotionData(data);

  return (
    <ChartCard
      title="Emotion Timeline x Brand Visibility"
      subtitle="Multiple emotions with peak visibility (mins / impressions in millions)"
      actions={
        <div className="flex gap-2">
          {(['intensity', 'mins', 'impressions'] as const).map((opt) => (
            <button
              key={opt}
              onClick={() => setYAxis(opt)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                yAxis === opt ? 'bg-[#6B46C1] text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {opt === 'intensity' ? 'Intensity' : opt === 'mins' ? 'Visibility (mins)' : 'Impressions (M)'}
            </button>
          ))}
        </div>
      }
    >
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="time" stroke="#6B7280" tick={{ fill: '#9CA3AF', fontSize: 11 }} />
            <YAxis
              stroke="#6B7280"
              tick={{ fill: '#9CA3AF', fontSize: 11 }}
              tickFormatter={
                yAxis === 'intensity'
                  ? undefined
                  : yAxis === 'mins'
                    ? (v) => `${v}m`
                    : (v) => `${v}M`
              }
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #E2E8F0',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                maxWidth: 320,
              }}
              formatter={(value, name) => [value ?? 0, String(name ?? '')]}
              labelFormatter={(label, payload) => {
                const p = payload[0]?.payload as Record<string, unknown>;
                const mins = p?.visibilityMinutes as number | undefined;
                const imp = p?.visibilityImpressionsM as number | undefined;
                const parts = [label];
                if (mins != null) parts.push(`Visibility: ${mins.toFixed(1)} min`);
                if (imp != null) parts.push(`Impressions: ${imp.toFixed(1)}M`);
                return parts.join(' · ');
              }}
            />
            <Legend />
            {yAxis === 'intensity' &&
              EMOTIONS.map((emotion) => (
                <Line
                  key={emotion}
                  type="monotone"
                  dataKey={emotion}
                  stroke={EMOTION_COLORS[emotion] ?? '#6B7280'}
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  name={emotion}
                />
              ))}
            {yAxis === 'mins' && (
              <Line
                type="monotone"
                dataKey="visibilityMinutes"
                stroke="#6B46C1"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Visibility (mins)"
              />
            )}
            {yAxis === 'impressions' && (
              <Line
                type="monotone"
                dataKey="visibilityImpressionsM"
                stroke="#10B981"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Impressions (M)"
              />
            )}
            {yAxis !== 'intensity' && (
              <ReferenceLine y={0} stroke="#94A3B8" strokeWidth={1} />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-wrap gap-4 mt-4 text-xs text-slate-500">
        {EMOTIONS.map((e) => (
          <span key={e} className="flex items-center gap-1.5">
            <span
              className="w-3 h-0.5 rounded"
              style={{ backgroundColor: EMOTION_COLORS[e] ?? '#6B7280' }}
            />
            {e}
          </span>
        ))}
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 bg-slate-400 rounded" style={{ borderStyle: 'dashed' }} />
          Visibility (mins / impressions M)
        </span>
      </div>
    </ChartCard>
  );
}
