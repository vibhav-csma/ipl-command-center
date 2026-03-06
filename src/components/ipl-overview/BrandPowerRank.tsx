import { DarkChartCard } from '../common/DarkChartCard';
import { brands } from '../../data/brands';
import type { BrandRank } from '../../types';

interface BrandPowerRankProps {
  data: BrandRank[];
}

const brandLogoPath: Record<string, string> = {
  dream11: '/assets/logo-dream11.png',
  tata: '/assets/logo-tata.png',
  ceat: '/assets/logo-ceat.png',
  jiocinema: '/assets/logo-jiocinema.png',
  swiggy: '/assets/logo-swiggy.png',
  rupay: '/assets/logo-rupay.png',
  aramco: '/assets/logo-aramco.png',
};

const brandDisplayName: Record<string, string> = {
  tata: 'Dream 11',
  dream11: 'TATA',
  ceat: 'CEAT Tires',
};

export function BrandPowerRank({ data }: BrandPowerRankProps) {
  const getBrandName = (brandId: string) =>
    brandDisplayName[brandId] ?? brands.find((b) => b.id === brandId)?.name ?? brandId;
  const getLogo = (brandId: string) => brandLogoPath[brandId];

  return (
    <div className="max-w-[280px]">
    <DarkChartCard title="IPL Brand Power Rank" icon="trophy">
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="text-left text-slate-500 border-b border-slate-200">
              <th className="pb-2 pr-2 font-medium uppercase tracking-wider">#</th>
              <th className="pb-2 pr-2 font-medium uppercase tracking-wider">Brand</th>
              <th className="pb-2 pr-2 font-medium uppercase tracking-wider">Score</th>
              <th className="pb-2 font-medium uppercase tracking-wider">Δ</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr
                key={row.brandId}
                className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
              >
                <td className="py-2 pr-2 text-[#0f172a] font-semibold">{row.rank}</td>
                <td className="py-2 pr-2">
                  <span className="flex items-center gap-1.5">
                    {getLogo(row.brandId) ? (
                      <img src={getLogo(row.brandId)} alt="" className="w-5 h-5 object-contain shrink-0" />
                    ) : null}
                    <span className="font-medium text-[#0f172a]">{getBrandName(row.brandId)}</span>
                  </span>
                </td>
                <td className="py-2 pr-2 text-[#1e40af] font-semibold">{row.score.toFixed(1)}</td>
                <td className="py-2">
                  <span
                    className={`font-medium ${
                      row.change >= 0 ? 'text-[#1e40af]' : 'text-rose-500'
                    }`}
                  >
                    {row.change >= 0 ? '+' : ''}{row.change.toFixed(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DarkChartCard>
    </div>
  );
}
