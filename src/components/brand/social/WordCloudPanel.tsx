import { ChartCard } from '../../common/ChartCard';
import type { WordCloudWord } from '../../../types';

interface WordCloudPanelProps {
  words: WordCloudWord[];
}

const sentimentColors = {
  positive: '#10B981',
  negative: '#EF4444',
  neutral: '#6B7280',
};

export function WordCloudPanel({ words }: WordCloudPanelProps) {
  const maxValue = Math.max(...words.map((w) => w.value));
  const minSize = 12;
  const maxSize = 28;

  return (
    <ChartCard title="Word Cloud" subtitle="Conversation corpus - size = frequency, color = sentiment">
      <div className="flex flex-wrap gap-2 justify-center p-6 min-h-[200px] items-center">
        {words.map((w, i) => {
          const size = minSize + ((w.value / maxValue) * (maxSize - minSize));
          const color = w.sentiment ? sentimentColors[w.sentiment] : sentimentColors.neutral;
          return (
            <span
              key={`${w.text}-${i}`}
              className="inline-block px-1 cursor-default hover:opacity-80 transition-opacity"
              style={{ fontSize: size, color, fontWeight: size > 20 ? 600 : 500 }}
              title={`${w.text}: ${w.value} mentions`}
            >
              {w.text}
            </span>
          );
        })}
      </div>
      <div className="flex gap-4 justify-center mt-4 text-xs text-slate-500">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#10B981]" />
          Positive
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
          Negative
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#6B7280]" />
          Neutral
        </span>
      </div>
    </ChartCard>
  );
}
