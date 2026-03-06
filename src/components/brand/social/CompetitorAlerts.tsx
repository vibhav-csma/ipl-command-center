import { ChartCard } from '../../common/ChartCard';
import { AlertTriangle, AlertCircle, Info } from 'lucide-react';
import type { CompetitorAlert } from '../../../types';

interface CompetitorAlertsProps {
  data: CompetitorAlert[];
}

const severityConfig: Record<CompetitorAlert['severity'], { icon: typeof AlertTriangle; color: string }> = {
  high: { icon: AlertTriangle, color: 'text-red-400 border-red-500/30 bg-red-500/10' },
  medium: { icon: AlertCircle, color: 'text-amber-400 border-amber-500/30 bg-amber-500/10' },
  low: { icon: Info, color: 'text-blue-400 border-blue-500/30 bg-blue-500/10' },
};

export function CompetitorAlerts({ data }: CompetitorAlertsProps) {
  return (
    <ChartCard
      title="Competitor Alerts"
      subtitle="e.g. Brand B is gaining traction using humor around DRS memes"
    >
      <div className="space-y-3">
        {data.map((alert) => {
          const config = severityConfig[alert.severity];
          const Icon = config.icon;
          return (
            <div
              key={alert.id}
              className={`flex gap-3 p-4 rounded-lg border ${config.color}`}
            >
              <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-800">{alert.message}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-slate-500">{alert.timestamp}</span>
                  <span className="text-slate-300">·</span>
                  <span className="text-xs text-slate-600">{alert.brandName}</span>
                </div>
                {alert.suggestedAction && (
                  <p className="text-xs text-slate-600 mt-2 italic">Suggested: {alert.suggestedAction}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </ChartCard>
  );
}
