import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { MetricCard } from '../common/MetricCard';
import { ChartCard } from '../common/ChartCard';
import { formatNumber } from '../../utils/formatters';
import type { ExposureData } from '../../types';

interface ExposureMetricsProps {
  data: ExposureData;
}

const PIE_COLORS = ['#6B46C1', '#8B5CF6', '#10B981'];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number; name: string }[]; label?: string }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-lg p-4">
      <p className="text-sm font-semibold text-slate-800 mb-1">{label}</p>
      <p className="text-lg font-bold text-[#6B46C1]">{payload[0].value} min exposure</p>
      <p className="text-xs text-slate-500 mt-0.5">Broadcast + OTT + Social combined</p>
    </div>
  );
};

export function ExposureMetrics({ data }: ExposureMetricsProps) {
  const pieData = [
    { name: 'Broadcast', value: data.broadcast, color: PIE_COLORS[0] },
    { name: 'OTT', value: data.ott, color: PIE_COLORS[1] },
    { name: 'Social', value: data.social, color: PIE_COLORS[2] },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MetricCard
          title="Total Exposure Airtime"
          value={`${data.total} min`}
          subtitle="Across Streams + Socials"
          trend={{ value: 8.2, label: 'vs last match' }}
          delay={0.05}
        />
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="rounded-2xl bg-white border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <p className="text-sm text-slate-500 font-medium mb-3">Breakdown by Channel</p>
          <div className="flex items-center gap-6">
            <div className="h-32 w-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={35}
                    outerRadius={55}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-2">
              {pieData.map((d) => (
                <div key={d.name} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-slate-700">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                    {d.name}
                  </span>
                  <span className="text-slate-900 font-semibold">{formatNumber(d.value)} min</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      <ChartCard title="Exposure Over Matches" subtitle="Cumulative exposure trend" delay={0.15}>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.timeline} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="exposureGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6B46C1" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#6B46C1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="match" stroke="#94A3B8" tick={{ fill: '#64748B', fontSize: 11 }} />
              <YAxis stroke="#94A3B8" tick={{ fill: '#64748B', fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="value" stroke="#6B46C1" fill="url(#exposureGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
}
