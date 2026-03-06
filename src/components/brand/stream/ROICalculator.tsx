import { useState, useMemo } from 'react';
import { ChartCard } from '../../common/ChartCard';
import { GaugeChart } from '../../common/GaugeChart';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

function parseNum(v: string | number): number {
  const n = typeof v === 'string' ? parseFloat(v) || 0 : v;
  return isNaN(n) ? 0 : Math.max(0, n);
}

export function ROICalculator() {
  const [adSpend, setAdSpend] = useState<string | number>(5000000);
  const [cpm, setCpm] = useState<string | number>(250);
  const [targetImpressions, setTargetImpressions] = useState<string | number>(20000000);
  const [actualImpressions, setActualImpressions] = useState<string | number>(18500000);
  const [engagements, setEngagements] = useState<string | number>(420000);

  const { costPerEngagement, equivalentMediaValue, roiPercent, comparisonData, targetAchievement } = useMemo(() => {
    const ad = parseNum(adSpend);
    const c = parseNum(cpm);
    const target = parseNum(targetImpressions);
    const actual = parseNum(actualImpressions);
    const eng = parseNum(engagements);

    const costPerEngagement = eng > 0 ? ad / eng : 0;
    const equivalentMediaValue = actual * (c / 1000);
    const roiPercent = ad > 0 ? ((equivalentMediaValue - ad) / ad) * 100 : 0;
    const targetAchievement = target > 0 ? (actual / target) * 100 : 0;

    const comparisonData = [
      { name: 'Ad Spend', value: ad / 1_000_000, fill: '#EF4444' },
      { name: 'Media Value', value: equivalentMediaValue / 1_000_000, fill: '#10B981' },
    ];
    return { costPerEngagement, equivalentMediaValue, roiPercent, comparisonData, targetAchievement };
  }, [adSpend, cpm, targetImpressions, actualImpressions, engagements]);

  return (
    <ChartCard
      title="ROI Calculator"
      subtitle="Ad Spend vs Return"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="group relative">
            <label className="text-xs text-slate-500 block mb-1">Ad Spend (INR)</label>
            <input
              type="number"
              value={adSpend}
              onChange={(e) => setAdSpend(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900"
            />
            <span className="absolute left-0 -bottom-5 opacity-0 group-hover:opacity-100 text-xs text-slate-400 transition-opacity">Total ad investment for campaign</span>
          </div>
          <div className="group relative">
            <label className="text-xs text-slate-500 block mb-1">CPM (INR)</label>
            <input
              type="number"
              value={cpm}
              onChange={(e) => setCpm(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900"
            />
            <span className="absolute left-0 -bottom-5 opacity-0 group-hover:opacity-100 text-xs text-slate-400 transition-opacity">Cost per 1000 impressions</span>
          </div>
          <div className="group relative">
            <label className="text-xs text-slate-500 block mb-1">Target Impressions</label>
            <input
              type="number"
              value={targetImpressions}
              onChange={(e) => setTargetImpressions(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900"
            />
            <span className="absolute left-0 -bottom-5 opacity-0 group-hover:opacity-100 text-xs text-slate-400 transition-opacity">Expected reach from sponsorship</span>
          </div>
          <div className="group relative">
            <label className="text-xs text-slate-500 block mb-1">Actual Impressions</label>
            <input
              type="number"
              value={actualImpressions}
              onChange={(e) => setActualImpressions(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900"
            />
            <span className="absolute left-0 -bottom-5 opacity-0 group-hover:opacity-100 text-xs text-slate-400 transition-opacity">Delivered impressions (TV + OTT + replay)</span>
          </div>
          <div className="group relative">
            <label className="text-xs text-slate-500 block mb-1">Engagements</label>
            <input
              type="number"
              value={engagements}
              onChange={(e) => setEngagements(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900"
            />
            <span className="absolute left-0 -bottom-5 opacity-0 group-hover:opacity-100 text-xs text-slate-400 transition-opacity">Clicks, shares, mentions, purchases</span>
          </div>
        </div>
        <div className="space-y-6">
          <div className="flex items-center gap-6">
            <GaugeChart
              value={Math.max(0, Math.min(100, Math.round(roiPercent)))}
              max={100}
              size={120}
              color={roiPercent >= 0 ? '#10B981' : '#EF4444'}
            />
            <div>
              <p className="text-2xl font-bold text-slate-900">{Number.isFinite(roiPercent) ? roiPercent.toFixed(1) : '0'}% ROI</p>
              <p className="text-xs text-slate-500">Return on Ad Spend</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-xl bg-slate-50 border border-slate-100 p-4" title="Ad spend divided by total engagements">
              <p className="text-xs text-slate-500">Cost per Engagement</p>
              <p className="text-lg font-bold text-slate-900">₹{(costPerEngagement || 0).toFixed(2)}</p>
            </div>
            <div className="rounded-xl bg-slate-50 border border-slate-100 p-4" title="Actual impressions × CPM / 1000">
              <p className="text-xs text-slate-500">Equivalent Media Value</p>
              <p className="text-lg font-bold text-[#10B981]">₹{(equivalentMediaValue / 1_000_000).toFixed(1)}M</p>
            </div>
            <div className="rounded-xl bg-slate-50 border border-slate-100 p-4" title="Actual vs target impressions">
              <p className="text-xs text-slate-500">Target achievement</p>
              <p className="text-lg font-bold text-slate-900">{targetAchievement.toFixed(0)}%</p>
            </div>
          </div>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData} layout="vertical" margin={{ left: 80 }}>
                <XAxis type="number" stroke="#6B7280" tick={{ fill: '#9CA3AF', fontSize: 11 }} tickFormatter={(v) => `₹${v}M`} />
                <YAxis type="category" dataKey="name" width={70} stroke="#6B7280" tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                <Tooltip formatter={(v) => [`₹${v ?? 0}M`, '']} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {comparisonData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </ChartCard>
  );
}
