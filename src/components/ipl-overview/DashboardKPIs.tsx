import { DarkCard } from '../common/DarkCard';
import { formatNumber } from '../../utils/formatters';

interface DashboardKPIsProps {
  totalMentions: number;
  totalMentionsDelta: number;
  todayMentions: number;
  totalExposureHours: number;
  totalExposureDelta: number;
  activeBrands: number;
}

export function DashboardKPIs({
  totalMentions,
  totalMentionsDelta,
  todayMentions,
  totalExposureHours,
  totalExposureDelta,
  activeBrands,
}: DashboardKPIsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <DarkCard
        title="Lifetime Mentions"
        value={formatNumber(totalMentions)}
        trend={{ value: totalMentionsDelta }}
        sub="across all platforms"
        icon="document"
      />
      <DarkCard
        title="Today's Mentions"
        value={formatNumber(todayMentions)}
        sub="last 24 hours"
        icon="lightning"
      />
      <DarkCard
        title="Total Exposure"
        value={`${totalExposureHours}h`}
        trend={{ value: totalExposureDelta }}
        sub="stream + social"
        icon="eye"
      />
      <DarkCard
        title="Active Brands"
        value={activeBrands}
        sub="tracked this season"
        icon="users"
      />
    </div>
  );
}
