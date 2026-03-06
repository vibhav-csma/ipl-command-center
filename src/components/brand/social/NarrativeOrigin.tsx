import { ChartCard } from '../../common/ChartCard';
import { User, Bot, DollarSign } from 'lucide-react';
import { formatNumber } from '../../../utils/formatters';
import type { NarrativeThread } from '../../../types';

interface NarrativeOriginProps {
  data: NarrativeThread[];
}

const typeConfig: Record<NarrativeThread['type'], { icon: typeof User; color: string; label: string }> = {
  organic: { icon: User, color: 'text-[#10B981] border-[#10B981]/30', label: 'Organic' },
  bot: { icon: Bot, color: 'text-amber-400 border-amber-500/30', label: 'Bot' },
  paid: { icon: DollarSign, color: 'text-[#3B82F6] border-blue-500/30', label: 'Paid' },
};

export function NarrativeOrigin({ data }: NarrativeOriginProps) {
  return (
    <ChartCard
      title="Narrative Origin Accounts / Bot Patterns / Paid Meme Farms"
      subtitle="How narratives spread"
    >
      <div className="space-y-4">
        {data.map((thread) => {
          const config = typeConfig[thread.type];
          const Icon = config.icon;
          return (
            <div
              key={thread.id}
              className={`flex gap-4 p-4 rounded-xl border ${config.color} bg-slate-50`}
            >
              <div className="flex-shrink-0">
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-800">{thread.content}</p>
                <div className="flex gap-4 mt-2 text-xs">
                  <span className="text-slate-500">{config.label}</span>
                  <span className="text-slate-700">
                    Authenticity: {thread.authenticityScore}%
                  </span>
                  <span className="text-[#6B46C1] font-medium">
                    Spread: {formatNumber(thread.spreadCount)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </ChartCard>
  );
}
