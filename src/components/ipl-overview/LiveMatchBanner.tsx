import { motion } from 'framer-motion';
import { LiveIndicator } from '../common/LiveIndicator';
import type { LiveMatch } from '../../types';

interface LiveMatchBannerProps {
  match: LiveMatch;
}

export function LiveMatchBanner({ match }: LiveMatchBannerProps) {
  const isLive = match.status === 'live';
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl bg-gradient-to-r from-violet-500 to-[#6B46C1] border border-violet-200/50 p-6 mb-6 shadow-lg"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          {isLive && (
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <LiveIndicator />
            </motion.div>
          )}
          <div className="flex items-center gap-8">
            <div className="text-center">
              <p className="text-sm text-white/80 font-medium">{match.teamA}</p>
              <p className="text-2xl font-bold text-white">{match.scoreA}</p>
            </div>
            <div className="text-white font-mono text-sm font-semibold">vs</div>
            <div className="text-center">
              <p className="text-sm text-white/80 font-medium">{match.teamB}</p>
              <p className="text-2xl font-bold text-white">{match.scoreB}</p>
            </div>
          </div>
          {isLive && (
            <div className="text-white/90 text-sm font-mono border-l border-white/30 pl-6">
              {match.overs} overs
            </div>
          )}
        </div>
        <div className="text-right">
          <p className="text-xs text-white/80">{match.venue}</p>
          <p className="text-sm text-white font-medium mt-1 capitalize">{match.status}</p>
        </div>
      </div>
    </motion.div>
  );
}
