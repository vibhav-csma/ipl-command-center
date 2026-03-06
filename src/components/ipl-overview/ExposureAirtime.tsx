import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { DarkChartCard } from '../common/DarkChartCard';

interface ExposurePlatform {
  platform: string;
  hours: number;
}

interface ExposureAirtimeProps {
  data: ExposurePlatform[];
}

const COLORS = ['#1e40af', '#3b82f6', '#64748B', '#94A3B8', '#1e3a5f'];

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { payload: ExposurePlatform }[];
}) => {
  if (!active || !payload?.length) return null;
  const p = payload[0].payload;
  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-lg p-4">
      <p className="text-sm font-semibold text-[#0f172a]">{p.platform}</p>
      <p className="text-lg font-bold text-[#1e40af]">{p.hours}h</p>
      <p className="text-xs text-slate-500">Cumulative this season</p>
    </div>
  );
};

export function ExposureAirtime({ data }: ExposureAirtimeProps) {
  const pieData = data.map((d, i) => ({ ...d, fill: COLORS[i % COLORS.length] }));

  return (
    <DarkChartCard
      title="Total Exposure Airtime"
      subtitle="Cumulative across broadcast, OTT, social"
      icon="sparkles"
    >
      <div className="flex items-center gap-8">
        <div className="h-48 w-48 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={65}
                paddingAngle={2}
                dataKey="hours"
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={entry.fill} stroke="#FFFFFF" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 space-y-2">
          {pieData.map((d) => (
            <div
              key={d.platform}
              className="flex items-center justify-between text-sm"
              title={`${d.platform}: ${d.hours}h`}
            >
              <span className="flex items-center gap-2 text-[#1e3a5f]">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: d.fill }}
                />
                {d.platform}
              </span>
              <span className="font-semibold text-[#0f172a]">{d.hours}h</span>
            </div>
          ))}
        </div>
      </div>
    </DarkChartCard>
  );
}
