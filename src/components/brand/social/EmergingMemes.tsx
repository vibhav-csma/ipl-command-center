import { ChartCard } from '../../common/ChartCard';
import { TrendingUp, Zap, Sparkles } from 'lucide-react';
import { formatNumber } from '../../../utils/formatters';
import type { MemeTemplate } from '../../../types';

interface EmergingMemesProps {
  data: MemeTemplate[];
}

const badgeConfig: Record<MemeTemplate['badge'], { icon: typeof TrendingUp; color: string; label: string }> = {
  trending: { icon: TrendingUp, color: 'text-amber-400', label: 'Trending' },
  viral: { icon: Zap, color: 'text-[#10B981]', label: 'Viral' },
  new: { icon: Sparkles, color: 'text-[#3B82F6]', label: 'New' },
};

export function EmergingMemes({ data }: EmergingMemesProps) {
  return (
    <ChartCard
      title="Emerging Memes / Audio Formats / Templates"
      subtitle="Trending on Social"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.map((m) => {
          const config = badgeConfig[m.badge];
          const Icon = config.icon;
          return (
            <div
              key={m.id}
              className="rounded-xl bg-slate-50 border border-slate-200 overflow-hidden hover:border-violet-300 hover:shadow-md transition-all"
            >
              <div className="h-24 bg-slate-100 flex items-center justify-center">
                <span className="text-xs text-slate-400">Thumbnail</span>
              </div>
              <div className="p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-medium flex items-center gap-1 ${config.color}`}>
                    <Icon className="w-3 h-3" />
                    {config.label}
                  </span>
                  <span className={`text-xs px-1.5 py-0.5 rounded ${
                    m.sentiment === 'positive' ? 'bg-[#10B981]/20 text-[#10B981]' :
                    m.sentiment === 'negative' ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {m.sentiment}
                  </span>
                </div>
                <p className="text-sm font-medium text-slate-800 truncate">{m.format}</p>
                <div className="flex gap-2 mt-1 text-xs text-slate-500">
                  <span>{formatNumber(m.usageCount)} uses</span>
                  <span className="text-[#10B981]">+{m.growthRate}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </ChartCard>
  );
}
