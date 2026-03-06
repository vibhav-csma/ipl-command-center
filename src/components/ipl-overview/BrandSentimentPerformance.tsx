import { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import { DarkChartCard } from '../common/DarkChartCard';
import { brands } from '../../data/brands';

const POSITIVE_COLOR = '#22c55e';
const NEUTRAL_COLOR = '#8b5cf6';
const NEGATIVE_COLOR = '#ef4444';

type SentimentSplit = { positive: number; negative: number; neutral: number };

interface BrandSentimentPerformanceProps {
  sentimentByBrandTimeline: { date: string; [brandId: string]: string | number }[];
  sentimentByBrandSplitTimeline: { date: string; brands: Record<string, SentimentSplit> }[];
  brandRanks?: { brandId: string }[];
}

export function BrandSentimentPerformance({
  sentimentByBrandTimeline,
  sentimentByBrandSplitTimeline,
}: BrandSentimentPerformanceProps) {
  const allBrandIds = useMemo(() => {
    const first = sentimentByBrandTimeline[0];
    if (!first) return [];
    return Object.keys(first).filter((k) => k !== 'date');
  }, [sentimentByBrandTimeline]);

  const [selectedBrand, setSelectedBrand] = useState<string | null>('dream11');

  const selectBrand = (id: string) => {
    setSelectedBrand((prev) => (prev === id ? prev : id));
  };

  const chartDataBrandView = useMemo(() => {
    if (!selectedBrand) return [];
    return sentimentByBrandSplitTimeline.map((row) => {
      const split = row.brands[selectedBrand];
      return {
        date: row.date,
        positive: split?.positive ?? 0,
        neutral: split?.neutral ?? 0,
        negative: split?.negative ?? 0,
      };
    });
  }, [sentimentByBrandSplitTimeline, selectedBrand]);

  const selectedBrandName = selectedBrand ? brands.find((b) => b.id === selectedBrand)?.name ?? selectedBrand : null;

  return (
    <DarkChartCard
      title="Brand Sentiment Performance"
      subtitle={selectedBrandName ? 'Sentiment over time' : 'Select a brand'}
      icon="chart"
    >
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="flex flex-wrap gap-1.5">
            {allBrandIds.map((id) => {
              const name = brands.find((b) => b.id === id)?.name ?? id;
              const isSelected = selectedBrand === id;
              return (
                <button
                  key={id}
                  onClick={() => selectBrand(id)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                    isSelected ? 'bg-[#1e40af] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {name}
                </button>
              );
            })}
        </div>
      </div>

      <div className="h-64">
          {selectedBrand ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartDataBrandView} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" stroke="#64748b" tick={{ fill: '#64748b', fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fill: '#64748b', fontSize: 11 }} domain={[0, 100]} unit="%" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  }}
                  formatter={(value) => [`${value}%`, '']}
                  labelFormatter={(label) => `${selectedBrandName} — ${label}`}
                />
                <Legend
                  formatter={(value) =>
                    value === 'positive' ? 'Positive' : value === 'neutral' ? 'Neutral' : value === 'negative' ? 'Negative' : value
                  }
                  wrapperStyle={{ fontSize: 12 }}
                />
                <Line
                  type="monotone"
                  dataKey="positive"
                  name="positive"
                  stroke={POSITIVE_COLOR}
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                  connectNulls
                />
                <Line
                  type="monotone"
                  dataKey="neutral"
                  name="neutral"
                  stroke={NEUTRAL_COLOR}
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                  connectNulls
                />
                <Line
                  type="monotone"
                  dataKey="negative"
                  name="negative"
                  stroke={NEGATIVE_COLOR}
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                  connectNulls
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-400 text-sm">
              Select a brand to see positive, neutral, and negative sentiment over time
            </div>
          )}
        </div>
    </DarkChartCard>
  );
}
