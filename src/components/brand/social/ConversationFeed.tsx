import React, { useState } from 'react';
import { ChartCard } from '../../common/ChartCard';
import { SentimentBadge } from '../../common/SentimentBadge';
import { Twitter, Instagram, Youtube, MessageCircle } from 'lucide-react';
import { formatNumber } from '../../../utils/formatters';
import type { Conversation } from '../../../types';

interface ConversationFeedProps {
  data: Conversation[];
}

const platformIcons = {
  twitter: Twitter,
  instagram: Instagram,
  youtube: Youtube,
  reddit: MessageCircle,
} satisfies Record<Conversation['platform'], React.ComponentType<{ className?: string }>>;

export function ConversationFeed({ data }: ConversationFeedProps) {
  const [sentimentFilter, setSentimentFilter] = useState<'all' | 'positive' | 'negative' | 'neutral'>('all');
  const [platformFilter, setPlatformFilter] = useState<string>('all');

  const filtered = data.filter((c) => {
    if (sentimentFilter !== 'all' && c.sentiment !== sentimentFilter) return false;
    if (platformFilter !== 'all' && c.platform !== platformFilter) return false;
    return true;
  });

  return (
    <ChartCard
      title="Real-time Conversations"
      subtitle="Sentiment / Themes / Word Cloud - over time, this match/past matches"
    >
      <div className="flex flex-wrap gap-2 mb-4">
        {(['all', 'positive', 'negative', 'neutral'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setSentimentFilter(s)}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
              sentimentFilter === s ? 'bg-[#6B46C1] text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
        <span className="text-slate-300 mx-2">|</span>
        {['all', 'twitter', 'instagram', 'youtube', 'reddit'].map((p) => (
          <button
            key={p}
            onClick={() => setPlatformFilter(p)}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
              platformFilter === p ? 'bg-[#3B82F6] text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </div>
      <div className="max-h-96 overflow-y-auto space-y-3">
        {filtered.map((c) => {
          const Icon = platformIcons[c.platform];
          return (
            <div
              key={c.id}
              className="flex gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-violet-200 hover:shadow-sm transition-all"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center">
                <Icon className="w-4 h-4 text-[#6B46C1]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-slate-900">{c.username}</span>
                  <SentimentBadge sentiment={c.sentiment} />
                  <span className="text-xs text-slate-400 ml-auto">{c.timestamp}</span>
                </div>
                <p className="text-sm text-slate-700">{c.text}</p>
                <div className="flex gap-4 mt-2 text-xs text-slate-500">
                  <span>{formatNumber(c.likes)} likes</span>
                  <span>{formatNumber(c.comments)} comments</span>
                  <span>{formatNumber(c.shares)} shares</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </ChartCard>
  );
}
