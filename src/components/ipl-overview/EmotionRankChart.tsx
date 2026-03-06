import { useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { DarkChartCard } from '../common/DarkChartCard';
import { brands } from '../../data/brands';

const EMOTION_KEYS = ['excitement', 'trust', 'joy', 'anticipation', 'disappointment', 'tension', 'pride', 'surprise', 'loyalty'] as const;
const EMOTION_LABELS: Record<string, string> = {
  excitement: 'Excitement',
  trust: 'Trust',
  joy: 'Joy',
  anticipation: 'Anticipation',
  disappointment: 'Disappointment',
  tension: 'Tension',
  pride: 'Pride',
  surprise: 'Surprise',
  loyalty: 'Loyalty',
};

const BRAND_COLORS: Record<string, string> = {
  dream11: '#8B5CF6',
  tata: '#EF4444',
  ceat: '#F59E0B',
  jiocinema: '#3B82F6',
  swiggy: '#F59E0B',
  rupay: '#3B82F6',
  aramco: '#22C55E',
  my11circle: '#8B5CF6',
  bisleri: '#22C55E',
  wondercement: '#78716C',
};

interface EmotionRadarRow {
  brandId: string;
  excitement: number;
  trust: number;
  joy: number;
  anticipation: number;
  disappointment: number;
  tension: number;
  pride: number;
  surprise: number;
  loyalty: number;
  description: string;
}

interface EmotionRankChartProps {
  data: EmotionRadarRow[];
}

export function EmotionRankChart({ data }: EmotionRankChartProps) {
  const [hoveredBrand, setHoveredBrand] = useState<string | null>(null);
  const topBrands = data.slice(0, 6);

  const chartData = EMOTION_KEYS.map((key) => {
    const row: Record<string, string | number> = { subject: EMOTION_LABELS[key] ?? key };
    topBrands.forEach((b) => {
      row[b.brandId] = (b as unknown as Record<string, number>)[key] ?? 0;
    });
    return row;
  });

  return (
    <DarkChartCard
      title="Brand Emotion Rank"
      subtitle="Emotional resonance across 9 dimensions"
      icon="lightbulb"
    >
      <div className="flex gap-6 items-stretch min-h-[300px]">
        <div className="flex-1 min-w-0 shrink-0" style={{ maxWidth: '52%' }}>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={chartData}>
                <PolarGrid stroke="#E2E8F0" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: '#64748B', fontSize: 10 }}
                />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  tick={{ fill: '#64748B', fontSize: 9 }}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                  formatter={(value, name) => [`${value}`, brands.find((b) => b.id === name)?.name ?? name]}
                  labelFormatter={(label) => label}
                />
                <Legend
                  formatter={(value) => brands.find((b) => b.id === value)?.name ?? value}
                  wrapperStyle={{ fontSize: 11 }}
                />
                {topBrands.map((b, i) => (
                  <Radar
                    key={b.brandId}
                    name={b.brandId}
                    dataKey={b.brandId}
                    stroke={BRAND_COLORS[b.brandId] ?? '#64748b'}
                    fill={BRAND_COLORS[b.brandId] ?? '#64748b'}
                    fillOpacity={0.15 + (i % 3) * 0.1}
                    strokeWidth={1.5}
                  />
                ))}
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="flex-1 min-w-0 flex flex-col border-l border-slate-200 pl-6">
          <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-3">Brand insights</p>
          <div className="grid grid-cols-1 gap-2 overflow-y-auto max-h-72 pr-1">
            {topBrands.map((b) => (
              <div
                key={b.brandId}
                className={`rounded-md px-2.5 py-2 transition-colors cursor-default border-l-2 ${
                  hoveredBrand === b.brandId
                    ? 'bg-slate-100 border-l-[#1e40af]'
                    : 'bg-slate-50/60 border-l-transparent hover:bg-slate-50'
                }`}
                onMouseEnter={() => setHoveredBrand(b.brandId)}
                onMouseLeave={() => setHoveredBrand(null)}
              >
                <span className="text-[11px] font-semibold text-slate-800 block mb-0.5">
                  {brands.find((x) => x.id === b.brandId)?.name ?? b.brandId}
                </span>
                <span className="text-[10px] text-slate-600 leading-tight">{b.description}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DarkChartCard>
  );
}
