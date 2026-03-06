import { ChartCard } from '../../common/ChartCard';
import { formatNumber } from '../../../utils/formatters';
import type { GeoSpike } from '../../../types';

interface GeographicMapProps {
  data: GeoSpike[];
}

// Simplified India state coordinates for a CSS-based map layout
const STATE_POSITIONS: Record<string, { top: string; left: string }> = {
  Maharashtra: { top: '35%', left: '28%' },
  Karnataka: { top: '52%', left: '26%' },
  'Tamil Nadu': { top: '72%', left: '32%' },
  Gujarat: { top: '22%', left: '18%' },
  Delhi: { top: '28%', left: '42%' },
  'West Bengal': { top: '42%', left: '58%' },
  Rajasthan: { top: '28%', left: '32%' },
};

export function GeographicMap({ data }: GeographicMapProps) {
  const maxVolume = Math.max(...data.map((d) => d.volume));

  return (
    <ChartCard
      title="Geographic Based Spikes"
      subtitle="State/City - conversations + topics"
    >
      <div className="relative h-80 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden">
        {/* Simplified India outline representation */}
        <svg
          viewBox="0 0 400 500"
          className="absolute inset-0 w-full h-full opacity-20"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d="M 150 50 L 250 60 L 280 120 L 260 180 L 240 250 L 220 320 L 200 380 L 180 450 L 120 420 L 100 350 L 90 280 L 100 200 L 120 120 Z"
            fill="none"
            stroke="rgba(107,70,193,0.3)"
            strokeWidth="1"
          />
        </svg>
        {data.map((d) => {
          const pos = STATE_POSITIONS[d.state] ?? { top: '50%', left: '50%' };
          const intensity = (d.volume / maxVolume) * 100;
          return (
            <div
              key={d.state}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
              style={{ top: pos.top, left: pos.left }}
            >
              <div
                className="w-6 h-6 rounded-full border-2 border-violet-500 flex items-center justify-center transition-transform group-hover:scale-125"
                style={{
                  backgroundColor: `rgba(107,70,193,${0.2 + (intensity / 100) * 0.5})`,
                  boxShadow: `0 0 ${8 + intensity / 5}px rgba(107,70,193,0.5)`,
                }}
              >
                <span className="text-[10px] font-bold text-slate-900">{d.volume > 100000 ? (d.volume / 1000).toFixed(0) : d.volume}</span>
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white border border-slate-200 rounded-xl p-3 shadow-lg z-10 min-w-[140px]">
                <p className="text-xs font-semibold text-slate-900">{d.state}</p>
                {d.city && <p className="text-xs text-slate-600">{d.city}</p>}
                <p className="text-xs text-[#6B46C1] font-medium mt-0.5">{formatNumber(d.volume)} mentions</p>
                <div className="mt-1">
                  <p className="text-[10px] text-slate-500">Top topics:</p>
                  <p className="text-[10px] text-slate-700">{d.topTopics.join(', ')}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
        {data.slice(0, 4).map((d) => (
          <div key={d.state} className="rounded-lg bg-slate-50 border border-slate-100 p-2">
            <p className="text-xs font-medium text-slate-800">{d.state}</p>
            <p className="text-[10px] text-slate-500">{formatNumber(d.volume)} · {d.topTopics.slice(0, 2).join(', ')}</p>
          </div>
        ))}
      </div>
    </ChartCard>
  );
}
