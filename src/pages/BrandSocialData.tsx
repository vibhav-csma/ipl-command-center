import { motion } from 'framer-motion';
import { useDashboardData } from '../hooks/useDashboardData';
import { DarkChartCard } from '../components/common/DarkChartCard';
import { MetricCardV2 } from '../components/common/MetricCardV2';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { formatNumber } from '../utils/formatters';
import { AlertTriangle, ShieldCheck, Users, MessageSquare, Briefcase, MessageCircle, Globe } from 'lucide-react';
import { SkeletonCard, SkeletonChart } from '../components/common/Skeleton';
import { socialKpis, conversations, competitorMentions, geoSpikes, memeTemplates, trendingTopicsWordCloud, bisleriCompetitorAlerts, bisleriCrisisMonitoring, bisleriBotDetection, bisleriTopInfluencers } from '../data/mockData';

const platformIcons: Record<string, string> = {
  twitter: '𝕏',
  instagram: '📸',
  youtube: '▶',
  reddit: '🔶',
};

export function BrandSocialData() {
  const { loading } = useDashboardData(1000);

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
        <SkeletonChart />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SkeletonChart />
          <SkeletonChart />
        </div>
      </motion.div>
    );
  }

  const chartData = competitorMentions.timeline.map((t, i) => ({
    week: t,
    [competitorMentions.brandName]: competitorMentions.volume[i],
    MPL: competitorMentions.mplVolume?.[i] ?? Math.round(competitorMentions.volume[i] * 0.9),
    CRED: competitorMentions.credVolume?.[i] ?? Math.round(competitorMentions.volume[i] * 0.75),
    Paytm: competitorMentions.paytmVolume?.[i] ?? Math.round(competitorMentions.volume[i] * 0.65),
  }));

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCardV2
          title="Active Conversations"
          value={formatNumber(socialKpis.activeConversations)}
          trend={{ value: socialKpis.activeConversationsDelta, label: 'last 24h' }}
          icon={<MessageSquare className="w-5 h-5" />}
        />
        <div className="rounded-xl bg-[#FFFFFF] border border-slate-200/80 shadow-sm p-6 hover:shadow-md hover:border-[#1e40af]/20 transition-colors">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Competitor Alerts
              </p>
              <p className="text-2xl font-bold text-[#0f172a] mt-2">{socialKpis.competitorAlerts}</p>
              <p className="text-xs text-amber-400 mt-1">{socialKpis.competitorAlertsSub}</p>
            </div>
            <div className="p-2 rounded-lg bg-[#1e40af]/10">
              <AlertTriangle className="w-5 h-5 text-[#1e40af]" />
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-[#FFFFFF] border border-slate-200/80 shadow-sm p-6 hover:shadow-md hover:border-[#1e40af]/20 transition-colors">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Crisis Status
              </p>
              <p className="text-2xl font-bold text-[#1e40af] mt-2">{socialKpis.crisisStatus}</p>
              <p className="text-xs text-slate-500 mt-1">{socialKpis.crisisStatusSub}</p>
            </div>
            <div className="p-2 rounded-lg bg-[#1e40af]/10">
              <ShieldCheck className="w-5 h-5 text-[#1e40af]" />
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-[#FFFFFF] border border-slate-200/80 shadow-sm p-6 hover:shadow-md hover:border-[#1e40af]/20 transition-colors">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Top Influencers
              </p>
              <p className="text-2xl font-bold text-[#0f172a] mt-2">{socialKpis.topInfluencers}</p>
              <p className="text-xs text-slate-500 mt-1">{socialKpis.topInfluencersSub}</p>
            </div>
            <div className="p-2 rounded-lg bg-[#1e40af]/10">
              <Users className="w-5 h-5 text-[#1e40af]" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DarkChartCard
          title="Real-Time Conversations"
          subtitle="Live social feed with sentiment analysis"
          icon="chart"
        >
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {conversations.slice(0, 8).map((c) => (
              <div
                key={c.id}
                className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 hover:border-[#1e40af]/20 transition-colors"
                title={c.text}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-slate-500">{platformIcons[c.platform] ?? '•'}</span>
                  <span className="text-sm font-medium text-[#1e3a5f]">{c.username}</span>
                  <span
                    className={`ml-auto text-xs font-medium ${
                      c.sentiment === 'positive'
                        ? 'text-[#1e40af]'
                        : c.sentiment === 'negative'
                          ? 'text-rose-500'
                          : 'text-slate-400'
                    }`}
                  >
                    {c.sentiment}
                  </span>
                </div>
                <p className="text-sm text-[#0f172a]/90 line-clamp-2">{c.text}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                  <span>❤ {formatNumber(c.likes)}</span>
                  <span>💬 {c.comments}</span>
                  <span>{c.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </DarkChartCard>

        <DarkChartCard title="Trending Topics" subtitle="Word cloud from conversations" icon="lightbulb">
          <div className="h-72 w-full p-4 flex flex-wrap content-center justify-center gap-x-3 gap-y-2 items-center overflow-hidden">
            {trendingTopicsWordCloud.map((word) => {
              const scale = 0.5 + (word.value / 100);
              const colors = ['#1e40af', '#2563eb', '#3b82f6', '#64748b', '#0ea5e9', '#6366f1', '#475569'];
              const color = colors[word.text.length % colors.length];
              return (
                <span
                  key={word.text}
                  className="inline-block px-1.5 py-0.5 hover:opacity-100 opacity-90 transition-opacity cursor-default"
                  style={{
                    fontSize: `${Math.min(12 + scale * 16, 48)}px`,
                    color,
                    transform: `rotate(${(word.value % 3 - 1) * 12}deg)`,
                  }}
                  title={`${word.text} — ${word.value} mentions`}
                >
                  {word.text}
                </span>
              );
            })}
          </div>
        </DarkChartCard>
      </div>

      <DarkChartCard title="Competitor Brand Mentions" subtitle="Weekly volume comparison" icon="chart">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <XAxis dataKey="week" stroke="#64748B" tick={{ fill: '#64748b', fontSize: 11 }} />
              <YAxis stroke="#64748B" tick={{ fill: '#64748b', fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '10px',
                  boxShadow: '0 8px 24px rgba(15,23,42,0.12)',
                  padding: '12px 16px',
                }}
                formatter={(value, name) => [value != null ? formatNumber(Number(value)) : '—', name ?? '']}
                labelFormatter={(label) => `Week ${label}`}
              />
              <Line type="monotone" dataKey={competitorMentions.brandName} stroke="#3B82F6" strokeWidth={2.5} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="MPL" stroke="#F59E0B" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="CRED" stroke="#EC4899" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="Paytm" stroke="#8B5CF6" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </DarkChartCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DarkChartCard title="Geographic Spikes" icon="chart">
          <div className="space-y-3">
            {geoSpikes.slice(0, 5).map((g, i) => (
              <div
                key={i}
                className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-between"
              >
                <div>
                  <p className="font-medium text-[#0f172a]">{g.city ?? g.state}</p>
                  <p className="text-xs text-slate-500">{g.topTopics.join(', ')}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-[#1e40af]">{formatNumber(g.volume)}</p>
                  <div className="mt-1 h-1.5 w-16 rounded-full bg-slate-200 overflow-hidden ml-auto">
                    <div
                      className="h-full rounded-full bg-[#1e40af]"
                      style={{ width: `${g.spikeIntensity}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{g.spikeIntensity}% sentiment</p>
                </div>
              </div>
            ))}
          </div>
        </DarkChartCard>

        <DarkChartCard title="Emerging Memes & Formats" icon="sparkles">
          <div className="grid grid-cols-2 gap-3">
            {memeTemplates.slice(0, 4).map((m) => (
              <div
                key={m.id}
                className="group rounded-xl border border-slate-200/80 overflow-hidden bg-slate-50 hover:border-[#1e40af]/30 hover:shadow-md transition-all"
              >
                <div className="aspect-[4/3] bg-slate-200 relative overflow-hidden">
                  {m.thumbnail && (
                    <img
                      src={m.thumbnail}
                      alt={m.format}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/80 to-transparent p-2">
                    <span className="text-[10px] font-semibold text-white uppercase tracking-wider">{m.badge}</span>
                  </div>
                </div>
                <div className="p-3">
                  <p className="font-semibold text-[#0f172a] text-sm">{m.format}</p>
                  <div className="flex items-center justify-between mt-1.5 gap-2">
                    <p className="text-xs text-[#1e40af] font-medium">+{m.growthRate}%</p>
                    <p className="text-xs font-bold text-slate-600">{formatNumber(m.usageCount)}</p>
                  </div>
                  <p className="text-[10px] text-slate-500 capitalize mt-0.5">{m.sentiment}</p>
                </div>
              </div>
            ))}
          </div>
        </DarkChartCard>
      </div>

      {/* Bisleri-specific Social Intelligence */}
      <div className="pt-4 border-t border-slate-200">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Bisleri — Social Intelligence</p>

        <DarkChartCard title="Competitor Alerts" subtitle="Alerts for Bisleri competitive landscape" icon="chart">
          <div className="space-y-4">
            {bisleriCompetitorAlerts.map((a) => (
              <div key={a.id} className="p-5 rounded-lg bg-slate-50 border border-slate-200/80 hover:border-[#1e40af]/20 transition-colors">
                <div className="flex flex-wrap items-start gap-x-4 gap-y-3">
                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className={`shrink-0 px-2.5 py-1 rounded-md text-xs font-semibold ${
                        a.severity === 'high' ? 'bg-rose-100 text-rose-600' : a.severity === 'medium' ? 'bg-amber-100 text-amber-600' : 'bg-sky-100 text-sky-600'
                      }`}
                    >
                      {a.severity}
                    </span>
                    <div>
                      <p className="font-bold text-[#0f172a]">{a.competitor}</p>
                      <p className="text-xs text-slate-500">{a.timeAgo}</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 flex-1 min-w-[200px] basis-full sm:basis-0">{a.description}</p>
                  <div className="shrink-0 text-right ml-auto sm:ml-0">
                    <p className="text-sm font-bold text-[#0f172a]">{a.mentions}</p>
                    <p className={`text-xs font-medium ${a.trend === 'rising' ? 'text-emerald-600' : 'text-slate-500'}`}>{a.trend}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DarkChartCard>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <DarkChartCard title="Crisis Monitoring" subtitle="Entity-level tracking" icon="chart">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-slate-500 border-b border-slate-200">
                    <th className="pb-2 pr-3 font-semibold uppercase text-xs">Type</th>
                    <th className="pb-2 pr-3 font-semibold uppercase text-xs">Entity</th>
                    <th className="pb-2 pr-3 font-semibold uppercase text-xs">Issue</th>
                    <th className="pb-2 pr-3 font-semibold uppercase text-xs">Mentions</th>
                    <th className="pb-2 font-semibold uppercase text-xs">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bisleriCrisisMonitoring.map((row) => (
                    <tr key={row.id} className="border-b border-slate-100 hover:bg-slate-50/80 transition-colors">
                      <td className="py-2.5 pr-3">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-xs">{row.type}</span>
                      </td>
                      <td className="py-2.5 pr-3 font-bold text-[#0f172a]">{row.entity}</td>
                      <td className="py-2.5 pr-3 text-slate-600">{row.issue}</td>
                      <td className="py-2.5 pr-3 font-semibold text-[#0f172a]">{row.mentions}</td>
                      <td className="py-2.5">
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-medium ${
                            row.status === 'resolved' ? 'bg-emerald-100 text-emerald-600' : row.status === 'monitoring' ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </DarkChartCard>

          <DarkChartCard title="Bot Detection & Narrative Origins" subtitle="Flagged accounts and coordinated activity" icon="chart">
            <div className="space-y-4">
              {bisleriBotDetection.map((b) => (
                <div key={b.label} className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-[#1e40af]/10">
                      {b.icon === 'briefcase' && <Briefcase className="w-4 h-4 text-[#1e40af]" />}
                      {b.icon === 'chat' && <MessageCircle className="w-4 h-4 text-[#1e40af]" />}
                      {b.icon === 'globe' && <Globe className="w-4 h-4 text-[#1e40af]" />}
                    </div>
                    <div>
                      <p className="font-semibold text-[#0f172a]">{b.label}</p>
                      <p className="text-xs text-slate-500">{b.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-[#0f172a]">{formatNumber(b.count)} accounts ({b.pct}% of total)</p>
                    <span
                      className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium ${
                        b.status === 'flagged' ? 'bg-rose-100 text-rose-600' : b.status === 'monitoring' ? 'bg-amber-100 text-amber-600' : 'bg-sky-100 text-sky-600'
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </DarkChartCard>
        </div>

        <div className="mt-6">
          <DarkChartCard title="★ Top Influencers" subtitle="Bisleri-relevant creators" icon="chart">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500 border-b border-slate-200">
                  <th className="pb-3 pr-4 font-semibold uppercase text-xs">Influencer</th>
                  <th className="pb-3 pr-4 font-semibold uppercase text-xs">Platform</th>
                  <th className="pb-3 pr-4 font-semibold uppercase text-xs">Followers</th>
                  <th className="pb-3 pr-4 font-semibold uppercase text-xs">UGC Score</th>
                  <th className="pb-3 pr-4 font-semibold uppercase text-xs">Virality</th>
                  <th className="pb-3 font-semibold uppercase text-xs">Recent</th>
                </tr>
              </thead>
              <tbody>
                {bisleriTopInfluencers.map((inf) => (
                  <tr key={inf.handle} className="border-b border-slate-100 hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 pr-4">
                      <p className="font-bold text-[#0f172a]">{inf.name}</p>
                      <p className="text-xs text-slate-500">{inf.handle}</p>
                    </td>
                    <td className="py-3 pr-4 text-slate-600">{inf.platform}</td>
                    <td className="py-3 pr-4 font-semibold text-[#0f172a]">{inf.followers}</td>
                    <td className="py-3 pr-4 font-bold text-[#1e40af]">{inf.ugcScore}</td>
                    <td className="py-3 pr-4 font-bold text-amber-600">{inf.virality}</td>
                    <td className="py-3 text-slate-600">{inf.recent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DarkChartCard>
        </div>
      </div>
    </motion.div>
  );
}
