import { useState } from 'react';
import { ChartCard } from '../../common/ChartCard';
import { formatNumber } from '../../../utils/formatters';
import type { Influencer } from '../../../types';

interface TopInfluencersProps {
  data: Influencer[];
}

export function TopInfluencers({ data }: TopInfluencersProps) {
  const [sortBy, setSortBy] = useState<'followers' | 'ugc' | 'virality'>('followers');

  const filtered = data.filter((d) => d.rankBy === sortBy);

  return (
    <ChartCard
      title="Top Influencers"
      subtitle="By Follower Count / UGC / Virality"
      actions={
        <div className="flex gap-2">
          {(['followers', 'ugc', 'virality'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSortBy(s)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                sortBy === s ? 'bg-[#6B46C1] text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {s === 'followers' ? 'Followers' : s === 'ugc' ? 'UGC' : 'Virality'}
            </button>
          ))}
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((inf, i) => (
          <div
            key={inf.id}
            className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-violet-200 hover:shadow-sm transition-all"
          >
            <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0 text-lg font-bold text-[#6B46C1]">
              {i + 1}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900">{inf.handle}</p>
              <p className="text-xs text-slate-500">{inf.platform}</p>
              <div className="flex gap-3 mt-2 text-xs">
                <span className="text-slate-700">{formatNumber(inf.followers)} followers</span>
                <span className="text-[#10B981]">{inf.engagementRate}% ER</span>
              </div>
              <p className="text-xs text-slate-500 mt-1 truncate">{inf.recentPost}</p>
            </div>
          </div>
        ))}
      </div>
    </ChartCard>
  );
}
