export interface Brand {
  id: string;
  name: string;
  logo?: string;
}

export interface BrandRank {
  brandId: string;
  rank: number;
  score: number;
  sentiment: number;
  exposure: number;
  trend: 'up' | 'down' | 'flat';
  change: number;
}

export interface EmotionRank {
  brandId: string;
  emotion: string;
  score: number;
  rank: number;
}

export interface ExposureData {
  broadcast: number;
  ott: number;
  social: number;
  total: number;
  timeline: { match: string; value: number }[];
}

export interface MentionData {
  total: number;
  delta: number;
  platformBreakdown: { platform: string; count: number }[];
  trend: number[];
}

export interface SentimentData {
  positive: number;
  negative: number;
  neutral: number;
  timeline: { match: string; positive: number; negative: number; neutral: number }[];
}

export interface LiveMatch {
  id: string;
  teamA: string;
  teamB: string;
  scoreA: number;
  scoreB: number;
  overs: string;
  status: 'live' | 'upcoming' | 'completed';
  venue: string;
}

export interface FCSBreakdown {
  logoVisibility: number;
  productPlacement: number;
  jerseyPresence: number;
  stadiumBranding: number;
  digitalOverlay: number;
}

export interface ScreentimeData {
  match?: string;
  stream?: string;
  language?: string;
  channel: string;
  minutes: number;
}

export interface VerbalMention {
  match: string;
  timestamp: string;
  count: number;
  context?: string;
}

export interface KeyMoment {
  id: string;
  timestamp: string;
  duration: number;
  context: string;
  type: 'boundary' | 'wicket' | 'strategic' | 'replay' | 'ad';
  image?: string;
}

export interface KeyMomentWithImage extends KeyMoment {
  time?: string;
  event?: string;
  brand?: string;
  visibility?: number;
  impact?: string;
  durationDisplay?: string;
}

export interface FCSSnapshotWithScore {
  src: string;
  label: string;
  match?: string;
  momentType: KeyMoment['type'];
  score: number;
}

export interface EmotionVisibilityPoint {
  time: string;
  emotion: string;
  intensity: number;
  visibilityType?: 'ad' | 'non-ad';
  visibilityMinutes?: number;
  visibilityImpressionsM?: number; // impressions in millions
}

export interface ROIParams {
  adSpend: number;
  cpm: number;
  targetImpressions: number;
  actualImpressions?: number;
  engagements?: number;
}

export interface Conversation {
  id: string;
  platform: 'twitter' | 'instagram' | 'youtube' | 'reddit';
  username: string;
  text: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
}

export interface ThemeData {
  name: string;
  volume: number;
  sentiment: number;
  children?: ThemeData[];
}

export interface WordCloudWord {
  text: string;
  value: number;
  sentiment?: 'positive' | 'negative' | 'neutral';
}

export interface CompetitorMention {
  brandId: string;
  brandName: string;
  volume: number[];
  sentiment: number[];
  timeline: string[];
  verbatims: string[];
  mplVolume?: number[];
  credVolume?: number[];
  paytmVolume?: number[];
}

export interface GeoSpike {
  state: string;
  city?: string;
  volume: number;
  topTopics: string[];
  spikeIntensity: number;
  lat?: number;
  lng?: number;
}

export interface MemeTemplate {
  id: string;
  thumbnail: string;
  format: string;
  usageCount: number;
  growthRate: number;
  sentiment: 'positive' | 'negative' | 'neutral';
  badge: 'trending' | 'viral' | 'new';
}

export interface CompetitorAlert {
  id: string;
  brandId: string;
  brandName: string;
  message: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
  suggestedAction?: string;
}

export interface CrisisAlert {
  id: string;
  category: 'celebrity' | 'brand' | 'advertisement';
  severity: 'green' | 'yellow' | 'red';
  title: string;
  description: string;
  volumeSpike: number;
  timestamp: string;
}

export interface Influencer {
  id: string;
  handle: string;
  platform: string;
  avatar?: string;
  followers: number;
  engagementRate: number;
  recentPost: string;
  rankBy: 'followers' | 'ugc' | 'virality';
}

export interface NarrativeThread {
  id: string;
  content: string;
  type: 'organic' | 'bot' | 'paid';
  authenticityScore: number;
  spreadCount: number;
}
