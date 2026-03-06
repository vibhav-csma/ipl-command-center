import { ChartCard } from '../../common/ChartCard';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import type { CrisisAlert } from '../../../types';

interface CrisisMonitorProps {
  data: CrisisAlert[];
}

const severityConfig: Record<CrisisAlert['severity'], { icon: typeof CheckCircle; color: string; bg: string }> = {
  green: { icon: CheckCircle, color: 'text-[#10B981]', bg: 'bg-[#10B981]/10 border-[#10B981]/30' },
  yellow: { icon: AlertTriangle, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30' },
  red: { icon: AlertTriangle, color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/30' },
};

const categoryLabels: Record<CrisisAlert['category'], string> = {
  celebrity: 'Celebrity',
  brand: 'Brand',
  advertisement: 'Advertisement',
};

export function CrisisMonitor({ data }: CrisisMonitorProps) {
  return (
    <ChartCard
      title="Crisis Monitoring"
      subtitle="Celebrity / Brand / Advertisement"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.map((crisis) => {
          const config = severityConfig[crisis.severity];
          const Icon = config.icon;
          return (
            <div
              key={crisis.id}
              className={`rounded-lg border p-4 ${config.bg}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon className={`w-5 h-5 ${config.color}`} />
                <span className="text-sm font-medium text-slate-800">{categoryLabels[crisis.category]}</span>
              </div>
              <p className="text-sm font-semibold text-slate-900">{crisis.title}</p>
              <p className="text-xs text-slate-600 mt-0.5">{crisis.description}</p>
              {crisis.volumeSpike > 0 && (
                <p className="text-xs text-amber-400 mt-2">Volume spike: +{crisis.volumeSpike}%</p>
              )}
              <p className="text-xs text-slate-500 mt-2">{crisis.timestamp}</p>
            </div>
          );
        })}
      </div>
    </ChartCard>
  );
}
