import React from 'react';
import { ChartCard } from '../../common/ChartCard';
import { formatMinutes } from '../../../utils/formatters';
import { Video, Zap, Target, Repeat, Tv } from 'lucide-react';
import type { KeyMoment } from '../../../types';

interface KeyMomentsProps {
  data: KeyMoment[];
}

const typeIcons = {
  boundary: Zap,
  wicket: Target,
  strategic: Video,
  replay: Repeat,
  ad: Tv,
} satisfies Record<KeyMoment['type'], React.ComponentType<{ className?: string }>>;

export function KeyMoments({ data }: KeyMomentsProps) {
  return (
    <ChartCard
      title="Key Visibility Moments"
      subtitle="Callouts where brand was visible longest (JioHotstar style)"
    >
      <div className="flex gap-4 overflow-x-auto pb-2">
        {data.map((moment) => {
          const Icon = typeIcons[moment.type];
          const imageSrc = moment.image || '';
          return (
            <div
              key={moment.id}
              className="flex-shrink-0 w-64 rounded-xl bg-slate-50 border border-slate-200 overflow-hidden hover:border-violet-300 hover:shadow-lg transition-all duration-200 group"
              title={`${moment.timestamp} · ${moment.context} · ${formatMinutes(moment.duration)} visibility`}
            >
              <div className="flex items-center gap-2 p-3 border-b border-slate-100">
                <span className="text-[#FF6B00] font-mono text-sm">{moment.timestamp}</span>
                <span className="text-xs text-slate-500">
                  {formatMinutes(moment.duration).replace('m', 's').replace('h ', 'm ')}
                </span>
                <Icon className="w-4 h-4 text-slate-400 ml-auto flex-shrink-0" />
              </div>
              <div className="aspect-video bg-slate-200 relative overflow-hidden">
                {imageSrc ? (
                  <img src={imageSrc} alt={moment.context} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-xs text-slate-500">Key moment</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 p-2 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  {moment.context}
                </div>
              </div>
              <p className="p-3 text-sm text-slate-700 line-clamp-2">{moment.context}</p>
            </div>
          );
        })}
      </div>
    </ChartCard>
  );
}
