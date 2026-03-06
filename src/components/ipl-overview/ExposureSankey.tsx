import React, { useState, useMemo } from 'react';
import { sankey, sankeyLinkHorizontal } from 'd3-sankey';
import { DarkChartCard } from '../common/DarkChartCard';

interface SankeyLink {
  source: string;
  target: string;
  value: number;
}

interface ExposureSankeyProps {
  data: {
    links: SankeyLink[];
    brandTotals: Record<string, number>;
  };
}

const SOURCE_COLORS: Record<string, string> = {
  Stream: '#1e40af',
  Socials: '#8b5cf6',
  Ads: '#f59e0b',
  Other: '#64748b',
};

const BRAND_COLORS: Record<string, string> = {
  Dream11: '#8b5cf6',
  'Tata Group': '#ef4444',
  'CEAT Tyres': '#f59e0b',
  JioCinema: '#3b82f6',
  Bisleri: '#22c55e',
  'Wonder Cement': '#78716c',
  Swiggy: '#ea580c',
  RuPay: '#3b82f6',
};

export function ExposureSankey({ data }: ExposureSankeyProps) {
  const { nodes, links } = useMemo(() => {
    const allSources = new Set(data.links.map((l) => l.source));
    const allTargets = new Set(data.links.map((l) => l.target));
    const nodeMap = new Map<string, { name: string }>();
    allSources.forEach((id) => nodeMap.set(id, { name: id }));
    allTargets.forEach((id) => nodeMap.set(id, { name: id }));
    const nodes = Array.from(nodeMap.values());

    const graph = {
      nodes,
      links: data.links.map((l) => ({ source: l.source, target: l.target, value: l.value })),
    };

    const layout = sankey()
      // @ts-expect-error d3-sankey type expects different signature
      .nodeId((d: { name: string }) => d.name)
      .nodeWidth(18)
      .nodePadding(10)
      .extent([
        [0, 20],
        [800, 320],
      ]) as any;

    const result = layout(graph);
    const linkGen = sankeyLinkHorizontal() as any;

    return {
      nodes: result.nodes,
      links: result.links.map((l: any) => ({ ...l, path: linkGen(l) })),
    };
  }, [data.links]);

  const [showPanel, setShowPanel] = useState(false);
  const hoverTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const totalHours = useMemo(
    () => Object.values(data.brandTotals).reduce((a, b) => a + b, 0),
    [data.brandTotals]
  );
  const brandBreakdown = useMemo(
    () => Object.entries(data.brandTotals).sort((a, b) => b[1] - a[1]),
    [data.brandTotals]
  );

  const handleMouseEnter = () => {
    hoverTimerRef.current = setTimeout(() => setShowPanel(true), 120);
  };
  const handleMouseLeave = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = null;
    setShowPanel(false);
  };

  React.useEffect(() => () => { if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current); }, []);

  return (
    <DarkChartCard
      title="Total Exposure Airtime"
      subtitle="Flow from view sources to brands (hours)"
      icon="sparkles"
    >
      <div
        className="overflow-x-auto relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <svg
          width="100%"
          height={360}
          viewBox="0 0 800 360"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {links.map((link: { source: { name?: string } | string; target: { name?: string } | string }, i: number) => {
              const gradId = `grad-${i}`;
              const sourceId = typeof link.source === 'object' ? (link.source as { name?: string }).name ?? '' : String(link.source);
              const targetId = typeof link.target === 'object' ? (link.target as { name?: string }).name ?? '' : String(link.target);
              const color = BRAND_COLORS[targetId] ?? SOURCE_COLORS[sourceId] ?? '#64748b';
              return (
                <linearGradient key={gradId} id={gradId} x1="0%" x2="100%" y1="0%" y2="0%">
                  <stop offset="0%" stopColor={color} stopOpacity={0.8} />
                  <stop offset="100%" stopColor={color} stopOpacity={0.3} />
                </linearGradient>
              );
            })}
          </defs>
          <g transform="translate(0, 10)">
            {links.map((link: { source: unknown; target: unknown; width?: number; path?: string }, i: number) => (
                <path
                  key={i}
                  d={link.path ?? ''}
                  fill="none"
                  stroke={`url(#grad-${i})`}
                  strokeWidth={Math.max(2, link.width ?? 2)}
                  strokeOpacity={0.6}
                />
            ))}
            {nodes.map((node: { name: string; x0?: number; x1?: number; y0?: number; y1?: number }) => {
              const n = node;
              const x0 = n.x0 ?? 0;
              const x1 = n.x1 ?? 0;
              const y0 = n.y0 ?? 0;
              const y1 = n.y1 ?? 0;
              const isSource = ['Stream', 'Socials', 'Ads', 'Other'].includes(n.name);
              const color = isSource ? SOURCE_COLORS[n.name] ?? '#64748b' : BRAND_COLORS[n.name] ?? '#64748b';
              const total = data.brandTotals[n.name];
              return (
                <g key={n.name}>
                  <rect
                    x={x0}
                    y={y0}
                    width={Math.max(0, x1 - x0)}
                    height={Math.max(0, y1 - y0)}
                    fill={color}
                    fillOpacity={0.7}
                    rx={4}
                  />
                  <text
                    x={isSource ? x0 - 6 : x1 + 6}
                    y={(y0 + y1) / 2}
                    dy="0.35em"
                    textAnchor={isSource ? 'end' : 'start'}
                    fontSize={11}
                    fill="#0f172a"
                  >
                    {n.name}
                    {total != null && ` — ${total}h`}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
        {showPanel && (
          <div
            className="absolute bottom-3 right-3 z-10 bg-white/98 backdrop-blur-sm rounded-lg border border-slate-200 shadow-lg p-3 min-w-[200px]"
            style={{ boxShadow: '0 4px 20px rgba(15,23,42,0.12)' }}
          >
            <div className="flex gap-4">
              <div className="shrink-0">
                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Total</p>
                <p className="text-lg font-bold text-slate-900">{totalHours.toLocaleString()}h</p>
              </div>
              <div className="flex-1 min-w-0 border-l border-slate-200 pl-3">
                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">By brand</p>
                <div className="space-y-1 max-h-28 overflow-y-auto pr-1">
                  {brandBreakdown.map(([brand, hours]) => (
                    <div key={brand} className="flex justify-between items-center gap-3 text-xs">
                      <span style={{ color: BRAND_COLORS[brand] ?? '#64748b' }} className="font-medium truncate">
                        {brand}
                      </span>
                      <span className="font-semibold text-slate-900 shrink-0">{hours}h</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DarkChartCard>
  );
}
