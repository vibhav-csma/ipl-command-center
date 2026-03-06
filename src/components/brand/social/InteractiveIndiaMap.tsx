import { useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';
import { formatNumber } from '../../../utils/formatters';
import type { GeoSpike } from '../../../types';

const INDIA_TOPOLOGY_URL =
  'https://raw.githubusercontent.com/deldersveld/topojson/master/countries/india/india-states.json';

const INDIA_CENTER: [number, number] = [78.96, 22.5];
const INDIA_SCALE = 1200;

interface InteractiveIndiaMapProps {
  data: GeoSpike[];
}

export function InteractiveIndiaMap({ data }: InteractiveIndiaMapProps) {
  const [hoveredPoint, setHoveredPoint] = useState<GeoSpike | null>(null);

  const pointsWithCoords = data.filter((d) => d.lat != null && d.lng != null);
  const maxVolume = Math.max(...pointsWithCoords.map((d) => d.volume), 1);

  return (
    <div className="relative w-full rounded-xl border border-slate-200/80 overflow-hidden bg-slate-50">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          center: INDIA_CENTER,
          scale: INDIA_SCALE,
        }}
        style={{ width: '100%', height: 420 }}
      >
        <ZoomableGroup center={INDIA_CENTER} zoom={1} minZoom={0.8} maxZoom={3}>
          <Geographies geography={INDIA_TOPOLOGY_URL}>
            {({ geographies }: { geographies: { rsmKey: string }[] }) =>
              geographies.map((geo: { rsmKey: string }) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#e2e8f0"
                  stroke="#94a3b8"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: 'none' },
                    hover: { fill: '#cbd5e1', outline: 'none' },
                    pressed: { outline: 'none' },
                  }}
                />
              ))
            }
          </Geographies>
          {pointsWithCoords.map((point) => {
            const isHovered = hoveredPoint?.city === point.city;
            const size = 6 + (point.volume / maxVolume) * 10;
            return (
              <Marker
                key={`${point.state}-${point.city}`}
                coordinates={[point.lng!, point.lat!]}
                onMouseEnter={() => setHoveredPoint(point)}
                onMouseLeave={() => setHoveredPoint(null)}
              >
                <g className="cursor-pointer">
                  <circle
                    r={size}
                    fill="#1e40af"
                    fillOpacity={isHovered ? 0.9 : 0.6}
                    stroke="#1e40af"
                    strokeWidth={isHovered ? 2 : 1}
                    strokeOpacity={0.9}
                  />
                </g>
              </Marker>
            );
          })}
        </ZoomableGroup>
      </ComposableMap>

      {/* Tooltip */}
      {hoveredPoint && (
        <div
          className="absolute bottom-4 left-4 z-10 bg-white border border-slate-200 rounded-lg shadow-lg p-4 min-w-[200px] pointer-events-none"
          style={{ maxWidth: 'calc(100% - 2rem)' }}
        >
          <p className="font-bold text-slate-900">{hoveredPoint.city ?? hoveredPoint.state}</p>
          <p className="text-xs text-slate-500">{hoveredPoint.state}</p>
          <p className="text-sm font-bold text-[#1e40af] mt-1">{formatNumber(hoveredPoint.volume)}</p>
          <p className="text-xs text-slate-500 mt-0.5">{hoveredPoint.spikeIntensity}% sentiment</p>
          <p className="text-xs text-slate-600 mt-1">{hoveredPoint.topTopics.join(', ')}</p>
        </div>
      )}

      {/* Legend */}
      <div className="absolute top-2 right-2 flex gap-2 text-xs text-slate-500 bg-white/90 rounded-lg px-2 py-1.5 border border-slate-200">
        <span>• Click + drag to pan</span>
        <span>• Scroll to zoom</span>
      </div>
    </div>
  );
}
