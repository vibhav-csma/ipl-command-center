import { motion } from 'framer-motion';
import { useDashboardData } from '../hooks/useDashboardData';
import { MetricCardV2 } from '../components/common/MetricCardV2';
import { ChartCardV2 } from '../components/common/ChartCardV2';
import { SkeletonCard, SkeletonChart, SkeletonTable } from '../components/common/Skeleton';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ComposedChart, Line, Area, Tooltip as LineTooltip, ResponsiveContainer as LineRC, Legend } from 'recharts';
import { fcsByStream, fcsSnapshots, screentimeByMatchChart, streamDataByBrand, verbalBrandMentionsByCommentator } from '../data/mockData';
import { brands } from '../data/brands';
import { formatNumber } from '../utils/formatters';
import { useState, useMemo } from 'react';
import { Radio, Gauge, BarChart3, Star, Heart, Calculator, ChevronDown, Mic } from 'lucide-react';

const STREAM_BRAND_IDS = ['bisleri', 'dream11', 'tata', 'ceat'] as const;
const STREAM_CHART_COLORS = ['#1e40af', '#2563eb', '#3b82f6', '#60a5fa'];
// Muted, cohesive palette for emotion timeline
const EMOTION_COLORS = ['#0ea5e9', '#6366f1', '#10b981', '#f43f5e', '#a855f7', '#f97316'];

const impactColors: Record<string, string> = {
  viral: 'text-blue-600 font-semibold',
  high: 'text-amber-600 font-semibold',
  medium: 'text-slate-500',
};

export function BrandStreamData() {
  const { loading } = useDashboardData(1000);
  const [selectedBrand, setSelectedBrand] = useState<string>(STREAM_BRAND_IDS[0]);
  const [adSpend, setAdSpend] = useState(4.5);
  const [targetImpressions, setTargetImpressions] = useState(892);
  const [cpm, setCpm] = useState(50);

  const brandData = streamDataByBrand[selectedBrand] ?? streamDataByBrand.bisleri;
  const brandName = brands.find((b) => b.id === selectedBrand)?.name ?? 'Bisleri';

  const verbalMentionsForBrand = useMemo(
    () =>
      verbalBrandMentionsByCommentator
        .filter((m) => m.brandId === selectedBrand)
        .sort((a, b) => b.mentions - a.mentions),
    [selectedBrand]
  );

  const { estReturn, impressions, cpmVal, engagement, roiPercent } = useMemo(() => {
    const spendCr = adSpend * 1e7;
    const impM = targetImpressions;
    const imp = impM * 1e6;
    const cpmRate = cpm;
    const ret = imp * (cpmRate / 1000);
    const roi = spendCr > 0 ? ((ret - spendCr) / spendCr) * 100 : 0;
    const eng = 12.8;
    return {
      estReturn: ret / 1e7,
      impressions: formatNumber(imp),
      cpmVal: `₹${cpmRate}`,
      engagement: `${eng}%`,
      roiPercent: roi,
    };
  }, [adSpend, targetImpressions, cpm]);

  if (loading) {
    return (
      <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SkeletonChart />
          <SkeletonChart />
        </div>
        <SkeletonTable rows={7} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SkeletonChart />
          <SkeletonChart />
        </div>
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-bold text-slate-900">{brandName}</h2>
        <div className="relative">
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="appearance-none pl-4 pr-10 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 font-medium focus:ring-2 focus:ring-[#1e40af]/30 focus:border-[#1e40af] outline-none cursor-pointer min-w-[180px]"
          >
            {STREAM_BRAND_IDS.map((id) => (
              <option key={id} value={id}>
                {brands.find((b) => b.id === id)?.name ?? id}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCardV2
          title="Avg FCS Score"
          value={brandData.streamKpis.avgFcs.toFixed(1)}
          trend={{ value: brandData.streamKpis.avgFcsDelta }}
          icon={<Gauge className="w-5 h-5" />}
        />
        <MetricCardV2
          title="Total Screentime"
          value={formatNumber(brandData.streamKpis.totalScreentime)}
          sub="Watch Minutes"
          trend={{ value: brandData.streamKpis.totalScreentimeDelta }}
          icon={<BarChart3 className="w-5 h-5" />}
        />
        <MetricCardV2
          title="Verbal Mentions"
          value={brandData.streamKpis.verbalMentions}
          sub={brandData.streamKpis.verbalMentionsSub}
          icon={<Radio className="w-5 h-5" />}
        />
        <MetricCardV2
          title="ROI Multiple"
          value={`${brandData.streamKpis.roiMultiple}%`}
          trend={{ value: brandData.streamKpis.roiMultipleDelta }}
          icon={<Calculator className="w-5 h-5" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCardV2
          title="Functional Coverage Score"
          subtitle="Stream coverage · Image-based analysis with snapshots"
          icon={<Gauge className="w-5 h-5" />}
        >
          <div className="space-y-5 mb-6">
            {fcsByStream.map((s) => (
              <div key={s.stream}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-slate-800">{s.stream}</span>
                  <span className="text-sm font-bold text-[#1e40af]">{s.score}</span>
                </div>
                <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden mb-1.5">
                  <motion.div
                    className="h-full rounded-full bg-[#1e40af]"
                    initial={{ width: 0 }}
                    animate={{ width: `${s.score}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                </div>
                <div className="flex gap-2 mt-1">
                  <div className="flex-1 h-1.5 rounded bg-slate-100 overflow-hidden">
                    <div className="h-full rounded bg-amber-400/80" style={{ width: `${s.audio}%` }} />
                  </div>
                  <div className="flex-1 h-1.5 rounded bg-slate-100 overflow-hidden">
                    <div className="h-full rounded bg-emerald-500/80" style={{ width: `${s.overlay}%` }} />
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-1">Audio {s.audio}% · Overlay {s.overlay}%</p>
              </div>
            ))}
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-3">
              FCS Snapshots — Image-based visibility scoring
            </p>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {fcsSnapshots.map((s, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-28 rounded-lg overflow-hidden border border-slate-200 group hover:border-[#1e40af]/40 hover:shadow-lg transition-all cursor-pointer"
                  title={`${s.label} · FCS ${s.score}`}
                >
                  <div className="aspect-[4/3] bg-slate-100 relative">
                    <img src={s.src} alt={s.label} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 left-0 right-0 p-2 text-white text-[10px] font-bold bg-[#1e40af]/90 opacity-0 group-hover:opacity-100 transition-opacity">
                      FCS {s.score}
                    </div>
                    <div className="absolute top-1 right-1 px-1.5 py-0.5 rounded bg-white/90 text-[10px] font-bold text-[#1e40af]">
                      {s.score}
                    </div>
                  </div>
                  <p className="p-1.5 text-[10px] text-slate-600 truncate">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </ChartCardV2>

        <ChartCardV2
          title="Screentime by Match"
          subtitle="Minutes of viewership by stream source"
          icon={<BarChart3 className="w-5 h-5" />}
        >
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={screentimeByMatchChart} layout="vertical" margin={{ top: 8, right: 24, left: 70, bottom: 8 }} barCategoryGap={12} barGap={2}>
                <CartesianGrid strokeDasharray="2 2" stroke="#e2e8f0" horizontal={false} />
                <XAxis type="number" stroke="#64748b" tick={{ fill: '#64748b', fontSize: 10 }} domain={[0, 'auto']} axisLine={{ stroke: '#e2e8f0' }} tickLine={false} tickFormatter={(v) => `${v} min`} />
                <YAxis type="category" dataKey="match" stroke="#64748b" tick={{ fill: '#64748b', fontSize: 11 }} width={65} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.08)', padding: '10px 14px', fontSize: 12 }}
                  formatter={(value, name) => [value != null ? `${value} min` : '—', name ?? '']}
                  cursor={{ fill: 'rgba(30,64,175,0.04)' }}
                  separator=""
                />
                <Legend wrapperStyle={{ fontSize: 11 }} iconType="square" iconSize={10} />
                <Bar dataKey="jioHotstar" stackId="a" fill={STREAM_CHART_COLORS[0]} radius={[0, 4, 4, 0]} name="JioHotstar" />
                <Bar dataKey="starSportsHindi" stackId="a" fill={STREAM_CHART_COLORS[1]} radius={0} name="Star Sports Hindi" />
                <Bar dataKey="starSportsEnglish" stackId="a" fill={STREAM_CHART_COLORS[2]} radius={0} name="Star Sports English" />
                <Bar dataKey="jiocinema" stackId="a" fill={STREAM_CHART_COLORS[3]} radius={[0, 0, 0, 4]} name="JioCinema" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100">
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-3">Insights by source</p>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-sm flex-shrink-0 mt-1" style={{ backgroundColor: STREAM_CHART_COLORS[0] }} />
                <span><strong className="text-slate-700">JioHotstar:</strong> Brief buffering at ~19:45 caused ~12% of viewers to pause; recovery by 20:02.</span>
              </li>
              <li className="flex gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-sm flex-shrink-0 mt-1" style={{ backgroundColor: STREAM_CHART_COLORS[1] }} />
                <span><strong className="text-slate-700">Star Sports Hindi:</strong> Regional outage in UP/Bihar during MI vs CSK led to lower than expected minutes.</span>
              </li>
              <li className="flex gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-sm flex-shrink-0 mt-1" style={{ backgroundColor: STREAM_CHART_COLORS[2] }} />
                <span><strong className="text-slate-700">Star Sports English:</strong> Ads ran longer than usual in LSW vs SRH, inflating watch time slightly.</span>
              </li>
              <li className="flex gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-sm flex-shrink-0 mt-1" style={{ backgroundColor: STREAM_CHART_COLORS[3] }} />
                <span><strong className="text-slate-700">JioCinema:</strong> Powerplay surge in GT vs KXIP — viewers switched from other sources during key overs.</span>
              </li>
            </ul>
          </div>
        </ChartCardV2>
      </div>

      <ChartCardV2
        title="Verbal Brand Mentions"
        subtitle={`Who mentioned ${brandName} on commentary — by commentator`}
        icon={<Mic className="w-5 h-5" />}
      >
        {verbalMentionsForBrand.length === 0 ? (
          <p className="text-sm text-slate-500 py-6">No verbal mentions for this brand.</p>
        ) : (
          <>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={verbalMentionsForBrand} layout="vertical" margin={{ top: 8, right: 24, left: 90, bottom: 8 }} barCategoryGap={10} barGap={4}>
                  <CartesianGrid strokeDasharray="2 2" stroke="#e2e8f0" horizontal={false} />
                  <XAxis type="number" stroke="#64748b" tick={{ fill: '#64748b', fontSize: 10 }} domain={[0, 'auto']} axisLine={{ stroke: '#e2e8f0' }} tickLine={false} tickFormatter={(v) => `${v}`} />
                  <YAxis type="category" dataKey="commentator" stroke="#64748b" tick={{ fill: '#64748b', fontSize: 11 }} width={85} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.08)', padding: '10px 14px', fontSize: 12 }}
                    content={({ active, payload }) => {
                      if (!active || !payload?.length) return null;
                      const p = payload[0]?.payload as { commentator: string; context: string; mentions: number } | undefined;
                      return p ? (
                        <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3 text-sm">
                          <p className="font-semibold text-slate-800">{p.commentator}</p>
                          <p className="text-slate-600 mt-0.5">{p.context}</p>
                          <p className="text-[#1e40af] font-bold mt-1">{p.mentions} mentions</p>
                        </div>
                      ) : null;
                    }}
                    cursor={{ fill: 'rgba(30,64,175,0.04)' }}
                  />
                  <Bar dataKey="mentions" fill="#1e40af" radius={[0, 4, 4, 0]} name="Mentions" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-slate-500 border-b border-slate-200">
                    <th className="pb-2 pr-4 font-semibold uppercase text-xs">Commentator</th>
                    <th className="pb-2 pr-4 font-semibold uppercase text-xs">Mentions</th>
                    <th className="pb-2 font-semibold uppercase text-xs">Context</th>
                  </tr>
                </thead>
                <tbody>
                  {verbalMentionsForBrand.map((row) => (
                    <tr key={`${row.commentator}-${row.context}`} className="border-b border-slate-100 hover:bg-slate-50/80 transition-colors">
                      <td className="py-2 pr-4 font-medium text-slate-800">{row.commentator}</td>
                      <td className="py-2 pr-4 font-bold text-[#1e40af]">{row.mentions}</td>
                      <td className="py-2 text-slate-600">{row.context}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </ChartCardV2>

      <ChartCardV2 title="Key Moments — Brand Visibility Callouts" subtitle="With visual snapshots" icon={<Star className="w-5 h-5" />}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b border-slate-200">
                <th className="pb-3 pr-4 font-semibold uppercase text-xs">Preview</th>
                <th className="pb-3 pr-4 font-semibold uppercase text-xs">Time</th>
                <th className="pb-3 pr-4 font-semibold uppercase text-xs">Event</th>
                <th className="pb-3 pr-4 font-semibold uppercase text-xs">Visibility</th>
                <th className="pb-3 pr-4 font-semibold uppercase text-xs">Duration</th>
                <th className="pb-3 font-semibold uppercase text-xs">Impact</th>
              </tr>
            </thead>
            <tbody>
              {brandData.keyMoments.map((row) => (
                <tr key={row.id} className="border-b border-slate-100 hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 pr-4">
                    <div className="w-16 h-10 rounded overflow-hidden bg-slate-100 flex-shrink-0">
                      {row.image && (
                        <img src={row.image} alt={row.event} className="w-full h-full object-cover" />
                      )}
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-slate-700 font-mono text-xs">{row.time}</td>
                  <td className="py-3 pr-4 font-medium text-slate-800 max-w-[280px]">{row.event}</td>
                  <td className="py-3 pr-4 font-bold text-[#1e40af]">{row.visibility}%</td>
                  <td className="py-3 pr-4 text-slate-500">{row.durationDisplay}</td>
                  <td className="py-3">
                    <span className={impactColors[row.impact ?? ''] ?? 'text-slate-500'}>{row.impact ?? '—'}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCardV2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCardV2
          title="Emotion Timeline x Brand Visibility"
          subtitle="Consumer emotional state during brand exposure"
          icon={<Heart className="w-5 h-5" />}
        >
          <div className="h-80">
            <LineRC width="100%" height="100%">
              <ComposedChart data={brandData.emotionByOverPhase} margin={{ top: 16, right: 16, left: 8, bottom: 8 }}>
                <defs>
                  <linearGradient id="viewershipFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1e40af" stopOpacity={0.12} />
                    <stop offset="100%" stopColor="#1e40af" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="2 2" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="date" stroke="#64748b" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={{ stroke: '#e2e8f0' }} tickLine={false} />
                <YAxis yAxisId="left" stroke="#64748b" tick={{ fill: '#64748b', fontSize: 10 }} domain={[0, 100]} width={28} axisLine={false} tickLine={false} />
                <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 9 }} domain={[0, 'dataMax + 2']} width={32} axisLine={false} tickLine={false} />
                <LineTooltip
                  contentStyle={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.08)', padding: '10px 14px', fontSize: 12 }}
                  formatter={(value, name) => [value != null ? (name === 'Viewership (M)' ? `${Number(value).toFixed(1)}M` : `${value}%`) : '—', name ?? '']}
                  cursor={{ stroke: '#cbd5e1', strokeWidth: 1 }}
                  itemStyle={{ padding: '2px 0' }}
                />
                <Legend layout="horizontal" align="center" verticalAlign="bottom" wrapperStyle={{ paddingTop: 12, fontSize: 11 }} iconType="line" iconSize={8} />
                <Area yAxisId="right" type="monotone" dataKey="viewership" fill="url(#viewershipFill)" stroke="#1e40af" strokeWidth={2} strokeOpacity={0.7} name="Viewership (M)" connectNulls />
                <Line yAxisId="left" type="monotone" dataKey="excitement" stroke={EMOTION_COLORS[0]} strokeWidth={2.5} dot={false} activeDot={{ r: 4, fill: EMOTION_COLORS[0] }} name="Excitement" />
                <Line yAxisId="left" type="monotone" dataKey="joy" stroke={EMOTION_COLORS[2]} strokeWidth={2.5} dot={false} activeDot={{ r: 4, fill: EMOTION_COLORS[2] }} name="Joy" />
                <Line yAxisId="left" type="monotone" dataKey="anticipation" stroke={EMOTION_COLORS[4]} strokeWidth={2} dot={false} activeDot={{ r: 3, fill: EMOTION_COLORS[4] }} name="Anticipation" strokeOpacity={0.9} />
                <Line yAxisId="left" type="monotone" dataKey="tension" stroke={EMOTION_COLORS[1]} strokeWidth={2} strokeDasharray="6 4" dot={false} activeDot={{ r: 3, fill: EMOTION_COLORS[1] }} name="Tension" strokeOpacity={0.9} />
                <Line yAxisId="left" type="monotone" dataKey="disappointment" stroke={EMOTION_COLORS[3]} strokeWidth={2} strokeDasharray="4 4" dot={false} activeDot={{ r: 3, fill: EMOTION_COLORS[3] }} name="Disappointment" strokeOpacity={0.9} />
                <Line yAxisId="left" type="monotone" dataKey="surprise" stroke={EMOTION_COLORS[5]} strokeWidth={2} strokeDasharray="3 3" dot={false} activeDot={{ r: 3, fill: EMOTION_COLORS[5] }} name="Surprise" strokeOpacity={0.9} />
              </ComposedChart>
            </LineRC>
          </div>
        </ChartCardV2>

        <ChartCardV2 title="ROI Calculator" subtitle="Ad spend vs estimated return" icon={<Calculator className="w-5 h-5" />}>
          <div className="space-y-5">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Ad Spend (₹ Cr)</label>
              <input
                type="number"
                value={adSpend}
                onChange={(e) => setAdSpend(Number(e.target.value) || 0)}
                step={0.5}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 text-lg font-bold focus:ring-2 focus:ring-[#1e40af]/30 focus:border-[#1e40af] outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Target Impressions (M)</label>
                <input
                  type="number"
                  value={targetImpressions}
                  onChange={(e) => setTargetImpressions(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 font-semibold focus:ring-2 focus:ring-[#1e40af]/30 outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">CPM (₹)</label>
                <input
                  type="number"
                  value={cpm}
                  onChange={(e) => setCpm(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 font-semibold focus:ring-2 focus:ring-[#1e40af]/30 outline-none"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Est. Return</label>
              <p className="text-2xl font-bold text-[#1e40af]">₹{estReturn.toFixed(1)} Cr</p>
              <p className="text-xs text-slate-500 mt-0.5">ROI: {roiPercent >= 0 ? '+' : ''}{roiPercent.toFixed(1)}%</p>
            </div>
            <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-[#1e40af]"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, Math.max(0, (estReturn / 25) * 100))}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="p-3 rounded-lg bg-slate-50">
                <p className="text-xs text-slate-500">Impressions</p>
                <p className="text-sm font-bold text-slate-900">{impressions}</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-50">
                <p className="text-xs text-slate-500">CPM</p>
                <p className="text-sm font-bold text-slate-900">{cpmVal}</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-50">
                <p className="text-xs text-slate-500">Engagement</p>
                <p className="text-sm font-bold text-slate-900">{engagement}</p>
              </div>
            </div>
          </div>
        </ChartCardV2>
      </div>
    </motion.div>
  );
}
