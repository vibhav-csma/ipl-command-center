import { motion } from 'framer-motion';
import { useDashboardData } from '../hooks/useDashboardData';
import { DashboardKPIs } from '../components/ipl-overview/DashboardKPIs';
import { BrandPowerRank } from '../components/ipl-overview/BrandPowerRank';
import { BrandSentimentPerformance } from '../components/ipl-overview/BrandSentimentPerformance';
import { EmotionRankChart } from '../components/ipl-overview/EmotionRankChart';
import { ExposureSankey } from '../components/ipl-overview/ExposureSankey';
import { SkeletonCard, SkeletonChart } from '../components/common/Skeleton';
import {
  brandRanks,
  emotionRadarByBrand,
  dashboardKpis,
  sentimentByBrandTimeline,
  sentimentByBrandSplitTimeline,
  exposureSankeyData,
} from '../data/mockData';

export function IPLOverview() {
  const { loading } = useDashboardData(1000);

  if (loading) {
    return (
      <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
        <SkeletonChart />
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <SkeletonChart />
          <SkeletonChart />
        </div>
        <SkeletonChart />
      </motion.div>
    );
  }

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <DashboardKPIs {...dashboardKpis} />
      <div className="flex flex-col lg:flex-row gap-6 items-stretch">
        <BrandPowerRank data={brandRanks} />
        <div className="flex-1 min-w-0">
          <BrandSentimentPerformance sentimentByBrandTimeline={sentimentByBrandTimeline} sentimentByBrandSplitTimeline={sentimentByBrandSplitTimeline} />
        </div>
      </div>
      <EmotionRankChart data={emotionRadarByBrand} />
      <ExposureSankey data={exposureSankeyData} />
    </motion.div>
  );
}
