import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { ChartCard } from '../common/ChartCard';
import { brands } from '../../data/brands';
import type { BrandRank } from '../../types';

interface BrandRankTableProps {
  data: BrandRank[];
}

type SortKey = 'rank' | 'score' | 'sentiment' | 'exposure';

export function BrandRankTable({ data }: BrandRankTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('rank');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const sortedData = useMemo(() => {
    const sorted = [...data].sort((a, b) => {
      const aVal = a[sortKey] ?? 0;
      const bVal = b[sortKey] ?? 0;
      return sortDir === 'asc' ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
    });
    return sorted;
  }, [data, sortKey, sortDir]);

  const getBrandName = (brandId: string) => brands.find((b) => b.id === brandId)?.name ?? brandId;

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else setSortKey(key);
  };

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return null;
    return sortDir === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />;
  };

  return (
    <ChartCard title="IPL Brand Rank" subtitle="Overall brand performance across IPL ecosystem" delay={0.05}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500 border-b border-slate-200">
              <th className="pb-3 pr-4 font-medium cursor-pointer hover:text-slate-700" onClick={() => handleSort('rank')}>
                <span className="flex items-center gap-1">Rank <SortIcon col="rank" /></span>
              </th>
              <th className="pb-3 pr-4 font-medium">Brand</th>
              <th className="pb-3 pr-4 font-medium cursor-pointer hover:text-slate-700" onClick={() => handleSort('score')}>
                <span className="flex items-center gap-1">Score <SortIcon col="score" /></span>
              </th>
              <th className="pb-3 pr-4 font-medium cursor-pointer hover:text-slate-700" onClick={() => handleSort('sentiment')}>
                <span className="flex items-center gap-1">Sentiment <SortIcon col="sentiment" /></span>
              </th>
              <th className="pb-3 pr-4 font-medium cursor-pointer hover:text-slate-700" onClick={() => handleSort('exposure')}>
                <span className="flex items-center gap-1">Exposure <SortIcon col="exposure" /></span>
              </th>
              <th className="pb-3 font-medium">Trend</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, i) => (
              <motion.tr
                key={row.brandId}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className="border-b border-slate-100 hover:bg-violet-50/50 transition-colors"
              >
                <td className="py-3 pr-4 text-slate-900 font-medium">{row.rank}</td>
                <td className="py-3 pr-4 text-slate-800 font-medium">{getBrandName(row.brandId)}</td>
                <td className="py-3 pr-4 text-slate-800">{row.score}</td>
                <td className="py-3 pr-4 text-slate-800">{row.sentiment}</td>
                <td className="py-3 pr-4 text-slate-800">{row.exposure}</td>
                <td className="py-3">
                  {row.trend === 'up' && <ArrowUp className="w-4 h-4 text-emerald-600" />}
                  {row.trend === 'down' && <ArrowDown className="w-4 h-4 text-rose-500" />}
                  {row.trend === 'flat' && <Minus className="w-4 h-4 text-slate-300" />}
                  <span className={`ml-1 text-xs font-medium ${row.change >= 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                    {row.change >= 0 ? '+' : ''}{row.change}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </ChartCard>
  );
}
