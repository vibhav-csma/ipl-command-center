import { useState } from 'react';
import { motion } from 'framer-motion';
import { GaugeChart } from '../../common/GaugeChart';
import { ChartCard } from '../../common/ChartCard';
import type { FCSBreakdown } from '../../../types';

interface FCSGaugeProps {
  total: number;
  breakdown: FCSBreakdown;
  fcsByMatch?: Record<string, { total: number; breakdown: FCSBreakdown }>;
  snapshots?: { src: string; label: string; match?: string }[];
}

const labels: Record<keyof FCSBreakdown, string> = {
  logoVisibility: 'Logo Visibility',
  productPlacement: 'Product Placement',
  jerseyPresence: 'Jersey Presence',
  stadiumBranding: 'Stadium Branding',
  digitalOverlay: 'Digital Overlay',
};

const FCS_SNAPSHOTS = [
  { src: '/assets/imgff76546e-588a-48d7-a57c-8608c1436bcf.png', label: 'Dugout cooler placement', match: 'GT vs DC' },
  { src: '/assets/imga1e9768b-84bb-4e91-89f1-d8b1e6f8035c.png', label: '#DRINKITUP campaign', match: 'Ad break' },
  { src: '/assets/img49e94247-2465-4cce-ba3b-ff4d8bb1c4b9.png', label: 'Product in use', match: 'Key moment' },
  { src: '/assets/img4ce2bdcc-c723-4a89-a540-ef9032f9bebc.png', label: 'Stadium hoarding', match: 'Boundary' },
];

export function FCSGauge({ total, breakdown, fcsByMatch = {}, snapshots = FCS_SNAPSHOTS }: FCSGaugeProps) {
  const [view, setView] = useState<'overall' | string>('overall');

  const matchOptions = ['overall', ...Object.keys(fcsByMatch)];
  const currentFcs = view === 'overall' || !fcsByMatch[view]
    ? { total, breakdown }
    : fcsByMatch[view];

  const entries = Object.entries(currentFcs.breakdown) as [keyof FCSBreakdown, number][];

  return (
    <ChartCard
      title="Functional Coverage Score (FCS)"
      subtitle="Basis image/video processing · Depth & breadth of brand visibility"
      actions={
        matchOptions.length > 1 ? (
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
        ) : undefined
      }
    >
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex flex-col items-center">
            <GaugeChart value={currentFcs.total} size={180} strokeWidth={14} color="#6B46C1" />
            <p className="text-sm text-slate-500 mt-2">
              {view === 'overall' ? 'Overall FCS' : `${view} FCS`}
            </p>
          </div>
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
            {entries.map(([key, value], i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="group rounded-xl bg-slate-50 border border-slate-100 p-4 hover:bg-violet-50/50 hover:border-violet-200 transition-all cursor-default"
                title={`${labels[key]}: ${value}/100 — Brand visibility in ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
              >
                <p className="text-xs text-slate-500 mb-1">{labels[key]}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-slate-900">{value}</span>
                  <span className="text-xs text-slate-400">/ 100</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-slate-200 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-[#6B46C1]"
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 0.8, delay: 0.2 + i * 0.05 }}
                  />
                </div>
                <span className="absolute opacity-0 group-hover:opacity-100 text-[10px] text-slate-400 mt-1 transition-opacity">
                  Hover for details
                </span>
              </motion.div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-xs font-semibold text-slate-600 mb-3">FCS Snapshots – Brand visibility</h4>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {snapshots.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="flex-shrink-0 w-36 rounded-xl overflow-hidden border border-slate-200 hover:shadow-lg transition-shadow group"
              >
                <div className="aspect-video bg-slate-100 relative">
                  <img
                    src={s.src}
                    alt={s.label}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-2 text-white text-[10px] font-medium bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                    {s.label} {s.match && `· ${s.match}`}
                  </div>
                </div>
                <p className="p-2 text-xs text-slate-600 truncate" title={s.label}>{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </ChartCard>
  );
}
