import type { Conversation } from '../../types';

type Sentiment = Conversation['sentiment'];

interface SentimentBadgeProps {
  sentiment: Sentiment;
  size?: 'sm' | 'md';
}

const styles: Record<Sentiment, { bg: string; text: string }> = {
  positive: { bg: 'bg-emerald-50', text: 'text-emerald-600' },
  negative: { bg: 'bg-rose-50', text: 'text-rose-600' },
  neutral: { bg: 'bg-slate-100', text: 'text-slate-600' },
};

export function SentimentBadge({ sentiment, size = 'sm' }: SentimentBadgeProps) {
  const { bg, text } = styles[sentiment];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-lg ${bg} ${text} font-medium ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
      {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
    </span>
  );
}
