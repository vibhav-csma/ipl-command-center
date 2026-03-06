import type {
  BrandRank,
  EmotionRank,
  ExposureData,
  MentionData,
  SentimentData,
  LiveMatch,
  FCSBreakdown,
  ScreentimeData,
  VerbalMention,
  KeyMoment,
  KeyMomentWithImage,
  FCSSnapshotWithScore,
  EmotionVisibilityPoint,
  Conversation,
  ThemeData,
  WordCloudWord,
  CompetitorMention,
  GeoSpike,
  MemeTemplate,
  CompetitorAlert,
  CrisisAlert,
  Influencer,
  NarrativeThread,
} from '../types';

export const liveMatch: LiveMatch = {
  id: '1',
  teamA: 'Mumbai Indians',
  teamB: 'Chennai Super Kings',
  scoreA: 187,
  scoreB: 92,
  overs: '14.2',
  status: 'live',
  venue: 'Wankhede Stadium, Mumbai',
};

export const brandRanks: BrandRank[] = [
  { brandId: 'tata', rank: 1, score: 94.2, sentiment: 82, exposure: 92, trend: 'up', change: 2.1 },
  { brandId: 'dream11', rank: 2, score: 91.8, sentiment: 78, exposure: 88, trend: 'up', change: 1.5 },
  { brandId: 'ceat', rank: 3, score: 88.4, sentiment: 75, exposure: 85, trend: 'down', change: -0.3 },
  { brandId: 'jiocinema', rank: 4, score: 86.9, sentiment: 71, exposure: 90, trend: 'up', change: 3.2 },
  { brandId: 'swiggy', rank: 5, score: 84.1, sentiment: 69, exposure: 72, trend: 'up', change: 0.8 },
  { brandId: 'rupay', rank: 6, score: 82.7, sentiment: 68, exposure: 70, trend: 'down', change: -1.1 },
  { brandId: 'aramco', rank: 7, score: 80.3, sentiment: 66, exposure: 68, trend: 'up', change: 0.4 },
];

export const emotionRanks: EmotionRank[] = [
  { brandId: 'dream11', emotion: 'Excitement', score: 88, rank: 1 },
  { brandId: 'tata', emotion: 'Trust', score: 85, rank: 2 },
  { brandId: 'ceat', emotion: 'Joy', score: 82, rank: 3 },
  { brandId: 'jiocinema', emotion: 'Excitement', score: 79, rank: 4 },
  { brandId: 'swiggy', emotion: 'Joy', score: 76, rank: 5 },
  { brandId: 'rupay', emotion: 'Trust', score: 73, rank: 6 },
  { brandId: 'aramco', emotion: 'Anticipation', score: 70, rank: 7 },
  { brandId: 'my11circle', emotion: 'Joy', score: 67, rank: 8 },
];

// Emotion radar: each brand has scores for 9 emotions (for multi-axis radar)
export const emotionRadarByBrand: { brandId: string; excitement: number; trust: number; joy: number; anticipation: number; disappointment: number; tension: number; pride: number; surprise: number; loyalty: number; description: string }[] = [
  { brandId: 'dream11', excitement: 92, trust: 78, joy: 88, anticipation: 85, disappointment: 22, tension: 45, pride: 90, surprise: 72, loyalty: 82, description: 'Title sponsor visibility in high-stakes moments drives excitement; consistent branding builds trust.' },
  { brandId: 'tata', excitement: 75, trust: 95, joy: 80, anticipation: 82, disappointment: 18, tension: 35, pride: 88, surprise: 65, loyalty: 90, description: 'Legacy brand association with IPL creates strong trust; Tata EV & Baja campaigns reinforce pride.' },
  { brandId: 'ceat', excitement: 88, trust: 72, joy: 85, anticipation: 78, disappointment: 28, tension: 52, pride: 82, surprise: 80, loyalty: 75, description: 'Strategic timeout slot guarantees prime visibility; tyre imagery during cricketing action drives excitement.' },
  { brandId: 'jiocinema', excitement: 90, trust: 68, joy: 82, anticipation: 88, disappointment: 30, tension: 40, pride: 75, surprise: 85, loyalty: 70, description: 'Streaming platform presence peaks pre-match; free access drives anticipation and surprise engagement.' },
  { brandId: 'swiggy', excitement: 70, trust: 65, joy: 92, anticipation: 72, disappointment: 25, tension: 38, pride: 68, surprise: 78, loyalty: 72, description: 'Food delivery messaging during breaks resonates with viewer mood; instant ordering CTA drives joy.' },
  { brandId: 'rupay', excitement: 65, trust: 88, joy: 75, anticipation: 70, disappointment: 20, tension: 42, pride: 80, surprise: 62, loyalty: 85, description: 'UPI payment integration during fantasy leagues builds trust; financial brand safety reduces tension.' },
  { brandId: 'aramco', excitement: 60, trust: 82, joy: 68, anticipation: 65, disappointment: 22, tension: 48, pride: 85, surprise: 55, loyalty: 78, description: 'Global energy brand leverages IPL for premium positioning; association with cricket pride elevates perception.' },
  { brandId: 'my11circle', excitement: 85, trust: 70, joy: 88, anticipation: 90, disappointment: 35, tension: 58, pride: 72, surprise: 82, loyalty: 68, description: 'Fantasy league brand thrives on match-day anticipation; rollercoaster outcomes drive excitement and disappointment.' },
];

// Sankey: sources (Stream, Socials, Ads, Other) → brands (CEAT, Tata, JioCinema, Bisleri, Wonder Cement, Dream11, Swiggy, RuPay)
export const exposureSankeyData = {
  links: [
    { source: 'Stream', target: 'Dream11', value: 245 },
    { source: 'Stream', target: 'Tata Group', value: 198 },
    { source: 'Stream', target: 'CEAT Tyres', value: 185 },
    { source: 'Stream', target: 'JioCinema', value: 342 },
    { source: 'Stream', target: 'Bisleri', value: 156 },
    { source: 'Stream', target: 'Wonder Cement', value: 92 },
    { source: 'Socials', target: 'Dream11', value: 98 },
    { source: 'Socials', target: 'Tata Group', value: 85 },
    { source: 'Socials', target: 'JioCinema', value: 112 },
    { source: 'Socials', target: 'Bisleri', value: 72 },
    { source: 'Socials', target: 'Wonder Cement', value: 45 },
    { source: 'Ads', target: 'CEAT Tyres', value: 142 },
    { source: 'Ads', target: 'Tata Group', value: 128 },
    { source: 'Ads', target: 'Bisleri', value: 168 },
    { source: 'Ads', target: 'Wonder Cement', value: 88 },
    { source: 'Ads', target: 'Swiggy', value: 95 },
    { source: 'Other', target: 'RuPay', value: 78 },
    { source: 'Other', target: 'Dream11', value: 52 },
    { source: 'Other', target: 'JioCinema', value: 48 },
  ],
  brandTotals: { Dream11: 395, 'Tata Group': 411, 'CEAT Tyres': 327, JioCinema: 502, Bisleri: 396, 'Wonder Cement': 225, Swiggy: 95, RuPay: 78 },
};

export const exposureData: ExposureData = {
  broadcast: 245,
  ott: 180,
  social: 92,
  total: 517,
  timeline: [
    { match: 'MI vs CSK', value: 52 },
    { match: 'RCB vs KKR', value: 48 },
    { match: 'LSW vs SRH', value: 49 },
    { match: 'GT vs KXIP', value: 51 },
    { match: 'DC vs SRH', value: 45 },
    { match: 'GT vs LSG', value: 51 },
    { match: 'RR vs PBKS', value: 47 },
    { match: 'MI vs RR', value: 55 },
  ],
};

// Lovable-style dashboard KPIs
export const dashboardKpis = {
  totalMentions: 22800000, // 22.8M
  totalMentionsDelta: 12.4,
  todayMentions: 797600,
  totalExposureHours: 894, // sum of exposureByPlatform hours (342+285+124+89+54)
  totalExposureDelta: 8.2,
  activeBrands: 42,
};

export const exposureByPlatform = [
  { platform: 'JioHotstar', hours: 342 },
  { platform: 'Star Sports', hours: 285 },
  { platform: 'Instagram', hours: 124 },
  { platform: 'X (Twitter)', hours: 89 },
  { platform: 'YouTube', hours: 54 },
];

export const mentionData: MentionData = {
  total: 2848000, // sum of platformBreakdown
  delta: 12.4,
  platformBreakdown: [
    { platform: 'Twitter/X', count: 1250000 },
    { platform: 'Instagram', count: 890000 },
    { platform: 'YouTube', count: 420000 },
    { platform: 'Reddit', count: 287000 },
  ],
  trend: [165, 180, 195, 220, 210, 240, 255, 265, 280, 292, 305, 318],
};

export const sentimentData: SentimentData = {
  positive: 62,
  negative: 12,
  neutral: 26,
  timeline: [
    { match: 'MI vs CSK', positive: 58, negative: 15, neutral: 27 },
    { match: 'RCB vs KKR', positive: 60, negative: 14, neutral: 26 },
    { match: 'LSW vs SRH', positive: 62, negative: 11, neutral: 27 },
    { match: 'GT vs KXIP', positive: 64, negative: 10, neutral: 26 },
    { match: 'DC vs SRH', positive: 59, negative: 13, neutral: 28 },
    { match: 'GT vs LSG', positive: 63, negative: 11, neutral: 26 },
    { match: 'RR vs PBKS', positive: 61, negative: 12, neutral: 27 },
    { match: 'MI vs RR', positive: 65, negative: 10, neutral: 25 },
  ],
};

// Sentiment with dates for chart (Mar 22 - May 24)
export const sentimentTimelineWithDates = [
  { date: 'Mar 22', positive: 58, negative: 15, neutral: 27 },
  { date: 'Mar 29', positive: 60, negative: 14, neutral: 26 },
  { date: 'Apr 5', positive: 62, negative: 12, neutral: 26 },
  { date: 'Apr 12', positive: 63, negative: 11, neutral: 26 },
  { date: 'Apr 19', positive: 61, negative: 13, neutral: 26 },
  { date: 'Apr 26', positive: 64, negative: 10, neutral: 26 },
  { date: 'May 3', positive: 65, negative: 11, neutral: 24 },
  { date: 'May 10', positive: 66, negative: 10, neutral: 24 },
  { date: 'May 17', positive: 67, negative: 9, neutral: 24 },
  { date: 'May 24', positive: 68, negative: 9, neutral: 23 },
];

// Sentiment by brand: positive, negative, neutral per brand per date (each row sums to 100 per brand)
export type SentimentSplit = { positive: number; negative: number; neutral: number };
export const sentimentByBrandSplitTimeline: { date: string; brands: Record<string, SentimentSplit> }[] = [
  { date: 'Mar 22', brands: { dream11: { positive: 72, negative: 10, neutral: 18 }, tata: { positive: 68, negative: 14, neutral: 18 }, ceat: { positive: 71, negative: 12, neutral: 17 }, jiocinema: { positive: 65, negative: 18, neutral: 17 }, swiggy: { positive: 58, negative: 20, neutral: 22 }, rupay: { positive: 62, negative: 16, neutral: 22 }, bisleri: { positive: 70, negative: 11, neutral: 19 }, wondercement: { positive: 64, negative: 15, neutral: 21 }, aramco: { positive: 66, negative: 14, neutral: 20 }, my11circle: { positive: 69, negative: 13, neutral: 18 } } },
  { date: 'Mar 29', brands: { dream11: { positive: 74, negative: 9, neutral: 17 }, tata: { positive: 70, negative: 13, neutral: 17 }, ceat: { positive: 73, negative: 11, neutral: 16 }, jiocinema: { positive: 67, negative: 16, neutral: 17 }, swiggy: { positive: 60, negative: 18, neutral: 22 }, rupay: { positive: 63, negative: 15, neutral: 22 }, bisleri: { positive: 72, negative: 10, neutral: 18 }, wondercement: { positive: 66, negative: 14, neutral: 20 }, aramco: { positive: 68, negative: 13, neutral: 19 }, my11circle: { positive: 71, negative: 12, neutral: 17 } } },
  { date: 'Apr 5', brands: { dream11: { positive: 75, negative: 9, neutral: 16 }, tata: { positive: 72, negative: 12, neutral: 16 }, ceat: { positive: 74, negative: 10, neutral: 16 }, jiocinema: { positive: 69, negative: 15, neutral: 16 }, swiggy: { positive: 61, negative: 17, neutral: 22 }, rupay: { positive: 64, negative: 14, neutral: 22 }, bisleri: { positive: 73, negative: 9, neutral: 18 }, wondercement: { positive: 67, negative: 13, neutral: 20 }, aramco: { positive: 69, negative: 12, neutral: 19 }, my11circle: { positive: 72, negative: 11, neutral: 17 } } },
  { date: 'Apr 12', brands: { dream11: { positive: 76, negative: 8, neutral: 16 }, tata: { positive: 74, negative: 11, neutral: 15 }, ceat: { positive: 75, negative: 10, neutral: 15 }, jiocinema: { positive: 71, negative: 14, neutral: 15 }, swiggy: { positive: 63, negative: 16, neutral: 21 }, rupay: { positive: 66, negative: 13, neutral: 21 }, bisleri: { positive: 74, negative: 9, neutral: 17 }, wondercement: { positive: 68, negative: 12, neutral: 20 }, aramco: { positive: 71, negative: 11, neutral: 18 }, my11circle: { positive: 73, negative: 10, neutral: 17 } } },
  { date: 'Apr 19', brands: { dream11: { positive: 75, negative: 9, neutral: 16 }, tata: { positive: 75, negative: 10, neutral: 15 }, ceat: { positive: 74, negative: 11, neutral: 15 }, jiocinema: { positive: 70, negative: 15, neutral: 15 }, swiggy: { positive: 62, negative: 17, neutral: 21 }, rupay: { positive: 65, negative: 14, neutral: 21 }, bisleri: { positive: 75, negative: 8, neutral: 17 }, wondercement: { positive: 69, negative: 12, neutral: 19 }, aramco: { positive: 70, negative: 12, neutral: 18 }, my11circle: { positive: 72, negative: 11, neutral: 17 } } },
  { date: 'Apr 26', brands: { dream11: { positive: 78, negative: 8, neutral: 14 }, tata: { positive: 76, negative: 9, neutral: 15 }, ceat: { positive: 76, negative: 10, neutral: 14 }, jiocinema: { positive: 72, negative: 13, neutral: 15 }, swiggy: { positive: 64, negative: 16, neutral: 20 }, rupay: { positive: 67, negative: 13, neutral: 20 }, bisleri: { positive: 76, negative: 8, neutral: 16 }, wondercement: { positive: 70, negative: 11, neutral: 19 }, aramco: { positive: 72, negative: 11, neutral: 17 }, my11circle: { positive: 74, negative: 10, neutral: 16 } } },
  { date: 'May 3', brands: { dream11: { positive: 80, negative: 7, neutral: 13 }, tata: { positive: 78, negative: 8, neutral: 14 }, ceat: { positive: 78, negative: 9, neutral: 13 }, jiocinema: { positive: 74, negative: 12, neutral: 14 }, swiggy: { positive: 66, negative: 15, neutral: 19 }, rupay: { positive: 68, negative: 12, neutral: 20 }, bisleri: { positive: 78, negative: 7, neutral: 15 }, wondercement: { positive: 72, negative: 10, neutral: 18 }, aramco: { positive: 74, negative: 10, neutral: 16 }, my11circle: { positive: 76, negative: 9, neutral: 15 } } },
  { date: 'May 10', brands: { dream11: { positive: 81, negative: 7, neutral: 12 }, tata: { positive: 80, negative: 7, neutral: 13 }, ceat: { positive: 79, negative: 8, neutral: 13 }, jiocinema: { positive: 75, negative: 11, neutral: 14 }, swiggy: { positive: 67, negative: 14, neutral: 19 }, rupay: { positive: 69, negative: 11, neutral: 20 }, bisleri: { positive: 79, negative: 7, neutral: 14 }, wondercement: { positive: 73, negative: 9, neutral: 18 }, aramco: { positive: 75, negative: 9, neutral: 16 }, my11circle: { positive: 77, negative: 8, neutral: 15 } } },
  { date: 'May 17', brands: { dream11: { positive: 82, negative: 6, neutral: 12 }, tata: { positive: 82, negative: 6, neutral: 12 }, ceat: { positive: 80, negative: 8, neutral: 12 }, jiocinema: { positive: 76, negative: 10, neutral: 14 }, swiggy: { positive: 68, negative: 13, neutral: 19 }, rupay: { positive: 70, negative: 10, neutral: 20 }, bisleri: { positive: 80, negative: 6, neutral: 14 }, wondercement: { positive: 74, negative: 8, neutral: 18 }, aramco: { positive: 76, negative: 8, neutral: 16 }, my11circle: { positive: 78, negative: 7, neutral: 15 } } },
  { date: 'May 24', brands: { dream11: { positive: 84, negative: 5, neutral: 11 }, tata: { positive: 84, negative: 5, neutral: 11 }, ceat: { positive: 82, negative: 7, neutral: 11 }, jiocinema: { positive: 78, negative: 9, neutral: 13 }, swiggy: { positive: 70, negative: 12, neutral: 18 }, rupay: { positive: 72, negative: 9, neutral: 19 }, bisleri: { positive: 82, negative: 5, neutral: 13 }, wondercement: { positive: 76, negative: 7, neutral: 17 }, aramco: { positive: 78, negative: 7, neutral: 15 }, my11circle: { positive: 80, negative: 6, neutral: 14 } } },
];

// Sentiment by brand over dates (positive % only) — kept for backward compat / overall stacked calc
export const sentimentByBrandTimeline: { date: string; [brandId: string]: string | number }[] = [
  { date: 'Mar 22', dream11: 72, tata: 68, ceat: 71, jiocinema: 65, swiggy: 58, rupay: 62, bisleri: 70, wondercement: 64, aramco: 66, my11circle: 69 },
  { date: 'Mar 29', dream11: 74, tata: 70, ceat: 73, jiocinema: 67, swiggy: 60, rupay: 63, bisleri: 72, wondercement: 66, aramco: 68, my11circle: 71 },
  { date: 'Apr 5', dream11: 75, tata: 72, ceat: 74, jiocinema: 69, swiggy: 61, rupay: 64, bisleri: 73, wondercement: 67, aramco: 69, my11circle: 72 },
  { date: 'Apr 12', dream11: 76, tata: 74, ceat: 75, jiocinema: 71, swiggy: 63, rupay: 66, bisleri: 74, wondercement: 68, aramco: 71, my11circle: 73 },
  { date: 'Apr 19', dream11: 75, tata: 75, ceat: 74, jiocinema: 70, swiggy: 62, rupay: 65, bisleri: 75, wondercement: 69, aramco: 70, my11circle: 72 },
  { date: 'Apr 26', dream11: 78, tata: 76, ceat: 76, jiocinema: 72, swiggy: 64, rupay: 67, bisleri: 76, wondercement: 70, aramco: 72, my11circle: 74 },
  { date: 'May 3', dream11: 80, tata: 78, ceat: 78, jiocinema: 74, swiggy: 66, rupay: 68, bisleri: 78, wondercement: 72, aramco: 74, my11circle: 76 },
  { date: 'May 10', dream11: 81, tata: 80, ceat: 79, jiocinema: 75, swiggy: 67, rupay: 69, bisleri: 79, wondercement: 73, aramco: 75, my11circle: 77 },
  { date: 'May 17', dream11: 82, tata: 82, ceat: 80, jiocinema: 76, swiggy: 68, rupay: 70, bisleri: 80, wondercement: 74, aramco: 76, my11circle: 78 },
  { date: 'May 24', dream11: 84, tata: 84, ceat: 82, jiocinema: 78, swiggy: 70, rupay: 72, bisleri: 82, wondercement: 76, aramco: 78, my11circle: 80 },
];

// Stream Data KPIs - avgFcs = mean of fcsByBrand scores; verbalMentions = sum of verbalMentions count
export const streamKpis = {
  avgFcs: 87, // mean of fcsByBrand: (92+89+85+82)/4
  avgFcsDelta: 3.4,
  totalScreentime: 1_200_000_000,
  totalScreentimeDelta: 5.1,
  verbalMentions: 87,
  verbalMentionsSub: 'by commentators',
  roiMultiple: 315.6,
  roiMultipleDelta: 12.4,
};

// FCS by brand (Stream Data) - derived from fcsByMatch/fcsBreakdown
export const fcsByBrand = [
  { brand: 'Dream11', score: 92, audio: 88, overlay: 95, logoVisibility: 94, productPlacement: 80, jerseyPresence: 86, stadiumBranding: 90, digitalOverlay: 96 },
  { brand: 'Tata Group', score: 89, audio: 85, overlay: 92, logoVisibility: 90, productPlacement: 77, jerseyPresence: 83, stadiumBranding: 88, digitalOverlay: 94 },
  { brand: 'CEAT Tyres', score: 85, audio: 82, overlay: 88, logoVisibility: 88, productPlacement: 75, jerseyPresence: 80, stadiumBranding: 85, digitalOverlay: 90 },
  { brand: 'JioCinema', score: 82, audio: 78, overlay: 86, logoVisibility: 85, productPlacement: 72, jerseyPresence: 78, stadiumBranding: 82, digitalOverlay: 88 },
];

// FCS snapshots with images - each image links to FCS calculation
export const fcsSnapshots = [
  { src: '/assets/imgff76546e-588a-48d7-a57c-8608c1436bcf.png', label: 'Dugout cooler placement', match: 'GT vs DC', momentType: 'boundary' as const, score: 94 },
  { src: '/assets/imga1e9768b-84bb-4e91-89f1-d8b1e6f8035c.png', label: '#DRINKITUP campaign', match: 'Ad break', momentType: 'ad' as const, score: 98 },
  { src: '/assets/img49e94247-2465-4cce-ba3b-ff4d8bb1c4b9.png', label: 'Product in use', match: 'Key moment', momentType: 'ad' as const, score: 92 },
  { src: '/assets/img4ce2bdcc-c723-4a89-a540-ef9032f9bebc.png', label: 'Stadium hoarding', match: 'Boundary', momentType: 'boundary' as const, score: 88 },
  { src: '/assets/imgc7ce8e61-5200-4262-b761-33eb731b5f9a.png', label: 'Wicket celebration', match: 'MI vs GT', momentType: 'wicket' as const, score: 96 },
  { src: '/assets/imgec6d8a33-a7c8-437b-badb-b6d4ef13236c.png', label: 'Strategic timeout', match: 'PBKS vs SRH', momentType: 'strategic' as const, score: 100 },
  { src: '/assets/imgaaea26fd-8af9-42dd-aaec-f0246f61f066.png', label: 'DRS overlay', match: 'Replay', momentType: 'replay' as const, score: 95 },
];


// Screentime by match (Stream Data) - derived from screentimeData
// Emotion timeline by over phase (Stream Data) — date for X-axis
export const emotionByOverPhase = [
  { phase: '0', date: 'Mar 18', excitement: 45, tension: 38, joy: 52, disappointment: 22 },
  { phase: '1-5', date: 'Mar 19', excitement: 62, tension: 55, joy: 68, disappointment: 18 },
  { phase: '6-10', date: 'Mar 20', excitement: 78, tension: 62, joy: 82, disappointment: 15 },
  { phase: '11-15', date: 'Mar 21', excitement: 85, tension: 72, joy: 88, disappointment: 12 },
  { phase: '16-20', date: 'Mar 22', excitement: 92, tension: 88, joy: 95, disappointment: 8 },
  { phase: 'Death', date: 'Mar 23', excitement: 98, tension: 95, joy: 72, disappointment: 45 },
];

// Erratic viewership patterns (peaks and dips, typical of live sports)
const viewershipErratic = {
  bisleri: [4.1, 7.8, 5.2, 9.4, 6.0, 11.2],
  dream11: [5.2, 8.1, 5.8, 10.2, 6.5, 9.8],
  tata: [3.9, 6.5, 7.2, 8.1, 5.4, 10.6],
  ceat: [4.5, 7.2, 6.1, 8.9, 7.0, 9.4],
};

// Social KPIs
export const socialKpis = {
  activeConversations: 142800,
  activeConversationsDelta: 18.3,
  competitorAlerts: 3,
  competitorAlertsSub: 'action needed',
  crisisStatus: 'Clear',
  crisisStatusSub: 'all monitored',
  topInfluencers: 248,
  topInfluencersSub: 'tracked',
};

// Brand-specific Stream Data (Bisleri)
export const fcsBreakdown: FCSBreakdown = {
  logoVisibility: 92,
  productPlacement: 78,
  jerseyPresence: 85,
  stadiumBranding: 88,
  digitalOverlay: 95,
};

export const fcsTotal = 87;

export const fcsByMatch: Record<string, { total: number; breakdown: FCSBreakdown }> = {
  'MI vs CSK': { total: 89, breakdown: { logoVisibility: 94, productPlacement: 80, jerseyPresence: 86, stadiumBranding: 90, digitalOverlay: 96 } },
  'RCB vs KKR': { total: 85, breakdown: { logoVisibility: 90, productPlacement: 76, jerseyPresence: 82, stadiumBranding: 86, digitalOverlay: 92 } },
  'LSW vs SRH': { total: 88, breakdown: { logoVisibility: 93, productPlacement: 79, jerseyPresence: 84, stadiumBranding: 89, digitalOverlay: 95 } },
  'GT vs KXIP': { total: 90, breakdown: { logoVisibility: 95, productPlacement: 82, jerseyPresence: 87, stadiumBranding: 91, digitalOverlay: 97 } },
  'DC vs SRH': { total: 84, breakdown: { logoVisibility: 88, productPlacement: 75, jerseyPresence: 80, stadiumBranding: 85, digitalOverlay: 91 } },
  'GT vs LSG': { total: 86, breakdown: { logoVisibility: 91, productPlacement: 77, jerseyPresence: 83, stadiumBranding: 87, digitalOverlay: 93 } },
  'RR vs PBKS': { total: 83, breakdown: { logoVisibility: 87, productPlacement: 74, jerseyPresence: 79, stadiumBranding: 84, digitalOverlay: 90 } },
};

export const MATCH_IDS = ['MI vs CSK', 'RCB vs KKR', 'LSW vs SRH', 'GT vs KXIP', 'DC vs SRH', 'GT vs LSG', 'RR vs PBKS'] as const;

export const screentimeData: ScreentimeData[] = [
  { match: 'MI vs CSK', channel: 'Star Sports Hindi', minutes: 8.2 },
  { match: 'MI vs CSK', channel: 'Star Sports English', minutes: 7.8 },
  { match: 'MI vs CSK', channel: 'JioCinema', minutes: 12.4 },
  { match: 'RCB vs KKR', channel: 'Star Sports Hindi', minutes: 6.9 },
  { match: 'RCB vs KKR', channel: 'Star Sports English', minutes: 7.1 },
  { match: 'RCB vs KKR', channel: 'JioCinema', minutes: 11.2 },
  { match: 'LSW vs SRH', channel: 'Star Sports Hindi', minutes: 7.4 },
  { match: 'LSW vs SRH', channel: 'Star Sports English', minutes: 7.2 },
  { match: 'LSW vs SRH', channel: 'JioCinema', minutes: 10.8 },
  { match: 'GT vs KXIP', channel: 'Star Sports Hindi', minutes: 8.1 },
  { match: 'GT vs KXIP', channel: 'Star Sports English', minutes: 7.5 },
  { match: 'GT vs KXIP', channel: 'JioCinema', minutes: 13.2 },
  { match: 'DC vs SRH', channel: 'Star Sports Hindi', minutes: 6.5 },
  { match: 'DC vs SRH', channel: 'Star Sports English', minutes: 6.8 },
  { match: 'DC vs SRH', channel: 'JioCinema', minutes: 10.5 },
  { match: 'GT vs LSG', channel: 'Star Sports Hindi', minutes: 7.8 },
  { match: 'GT vs LSG', channel: 'Star Sports English', minutes: 7.3 },
  { match: 'GT vs LSG', channel: 'JioCinema', minutes: 11.8 },
  { match: 'RR vs PBKS', channel: 'Star Sports Hindi', minutes: 6.2 },
  { match: 'RR vs PBKS', channel: 'Star Sports English', minutes: 6.5 },
  { match: 'RR vs PBKS', channel: 'JioCinema', minutes: 9.8 },
  { channel: 'Star Sports Hindi', minutes: 52 },
  { channel: 'Star Sports English', minutes: 48 },
  { channel: 'JioCinema', minutes: 89 },
];

export const verbalMentions: VerbalMention[] = [
  { match: 'MI vs CSK', timestamp: '19:24', count: 5 },
  { match: 'MI vs CSK', timestamp: '20:45', count: 8 },
  { match: 'RCB vs KKR', timestamp: '19:12', count: 4 },
  { match: 'DC vs SRH', timestamp: '20:30', count: 6 },
  { match: 'GT vs LSG', timestamp: '19:55', count: 7 },
  { match: 'RR vs PBKS', timestamp: '20:15', count: 5 },
  { match: 'LSW vs SRH', timestamp: '19:42', count: 6 },
  { match: 'LSW vs SRH', timestamp: '20:28', count: 9 },
  { match: 'GT vs KXIP', timestamp: '19:18', count: 5 },
  { match: 'GT vs KXIP', timestamp: '20:52', count: 7 },
];

export const keyMoments: KeyMoment[] = [
  { id: '1', timestamp: '19:34', duration: 12.4, context: 'Boundary replay - Bisleri cooler visible in dugout', type: 'boundary', image: '/assets/imgff76546e-588a-48d7-a57c-8608c1436bcf.png' },
  { id: '2', timestamp: '20:12', duration: 8.2, context: 'Wicket celebration - Bisleri branding in frame', type: 'wicket', image: '/assets/imgc7ce8e61-5200-4262-b761-33eb731b5f9a.png' },
  { id: '3', timestamp: '20:45', duration: 15.0, context: 'Strategic timeout - Bisleri logo display', type: 'strategic', image: '/assets/imgec6d8a33-a7c8-437b-badb-b6d4ef13236c.png' },
  { id: '4', timestamp: '21:02', duration: 6.8, context: 'DRS review - Digital overlay prominent', type: 'replay', image: '/assets/imgaaea26fd-8af9-42dd-aaec-f0246f61f066.png' },
  { id: '5', timestamp: '21:18', duration: 30.0, context: 'Mid-innings ad - #DRINKITUP campaign', type: 'ad', image: '/assets/imga1e9768b-84bb-4e91-89f1-d8b1e6f8035c.png' },
  { id: '6', timestamp: '19:58', duration: 10.2, context: 'Boundary - Player fielding near Bisleri hoarding', type: 'boundary', image: '/assets/img4ce2bdcc-c723-4a89-a540-ef9032f9bebc.png' },
  { id: '7', timestamp: '20:22', duration: 9.4, context: 'Key visibility - Fan drinking Bisleri', type: 'ad', image: '/assets/img49e94247-2465-4cce-ba3b-ff4d8bb1c4b9.png' },
];

// Merge keyMoments (has images) with keyMomentsTable (has event/brand structure)
export const keyMomentsWithImages: KeyMomentWithImage[] = [
  { id: '1', timestamp: '19:34', time: '7:42 PM', event: "Dhoni's last-ball six", brand: 'Dream11', visibility: 98, duration: 12.4, durationDisplay: '12s', impact: 'viral', context: 'Boundary replay - Bisleri cooler visible in dugout', type: 'boundary', image: '/assets/imgff76546e-588a-48d7-a57c-8608c1436bcf.png' },
  { id: '2', timestamp: '20:12', time: '8:15 PM', event: 'Strategic Timeout', brand: 'CEAT Tyres', visibility: 100, duration: 8.2, durationDisplay: '150s', impact: 'high', context: 'Wicket celebration - Bisleri branding in frame', type: 'wicket', image: '/assets/imgc7ce8e61-5200-4262-b761-33eb731b5f9a.png' },
  { id: '3', timestamp: '20:45', time: '8:32 PM', event: 'Super Over start', brand: 'Tata Group', visibility: 95, duration: 15.0, durationDisplay: '45s', impact: 'viral', context: 'Strategic timeout - Bisleri logo display', type: 'strategic', image: '/assets/imgec6d8a33-a7c8-437b-badb-b6d4ef13236c.png' },
  { id: '4', timestamp: '21:02', time: '9:18 PM', event: 'Winning moment celebration', brand: 'Dream11', visibility: 99, duration: 6.8, durationDisplay: '28s', impact: 'high', context: 'DRS review - Digital overlay prominent', type: 'replay', image: '/assets/imgaaea26fd-8af9-42dd-aaec-f0246f61f066.png' },
  { id: '5', timestamp: '21:18', time: '7:15 PM', event: 'Toss ceremony', brand: 'RuPay', visibility: 85, duration: 30.0, durationDisplay: '90s', impact: 'medium', context: 'Mid-innings ad - #DRINKITUP campaign', type: 'ad', image: '/assets/imga1e9768b-84bb-4e91-89f1-d8b1e6f8035c.png' },
  { id: '6', timestamp: '19:58', time: '7:58 PM', event: 'Boundary near hoarding', brand: 'CEAT Tyres', visibility: 82, duration: 10.2, durationDisplay: '10s', impact: 'medium', context: 'Boundary - Player fielding near Bisleri hoarding', type: 'boundary', image: '/assets/img4ce2bdcc-c723-4a89-a540-ef9032f9bebc.png' },
  { id: '7', timestamp: '20:22', time: '8:22 PM', event: 'Product in use', brand: 'Bisleri', visibility: 91, duration: 9.4, durationDisplay: '9s', impact: 'high', context: 'Key visibility - Fan drinking Bisleri', type: 'ad', image: '/assets/img49e94247-2465-4cce-ba3b-ff4d8bb1c4b9.png' },
];

export const keyMomentsTable = keyMomentsWithImages.map(({ time, event, brand, visibility, durationDisplay, duration, impact }) => ({
  time,
  event,
  brand,
  visibility,
  duration: durationDisplay ?? `${duration}s`,
  impact,
}));

// FCS snapshots with scores - weighted avg of logoVisibility, productPlacement, jerseyPresence, stadiumBranding, digitalOverlay
// Each snapshot links to a key moment type
const computeFcsScore = (b: FCSBreakdown) =>
  Math.round(
    (b.logoVisibility * 0.25 + b.productPlacement * 0.2 + b.jerseyPresence * 0.2 + b.stadiumBranding * 0.2 + b.digitalOverlay * 0.15)
  );

export const fcsSnapshotsWithScores: FCSSnapshotWithScore[] = [
  { src: '/assets/imgff76546e-588a-48d7-a57c-8608c1436bcf.png', label: 'Dugout cooler placement', match: 'MI vs CSK', momentType: 'boundary', score: computeFcsScore(fcsByMatch['MI vs CSK']?.breakdown ?? fcsBreakdown) },
  { src: '/assets/imga1e9768b-84bb-4e91-89f1-d8b1e6f8035c.png', label: '#DRINKITUP campaign', match: 'Ad break', momentType: 'ad', score: computeFcsScore(fcsBreakdown) },
  { src: '/assets/img49e94247-2465-4cce-ba3b-ff4d8bb1c4b9.png', label: 'Product in use', match: 'Key moment', momentType: 'ad', score: computeFcsScore(fcsBreakdown) },
  { src: '/assets/img4ce2bdcc-c723-4a89-a540-ef9032f9bebc.png', label: 'Stadium hoarding', match: 'MI vs CSK', momentType: 'boundary', score: computeFcsScore(fcsByMatch['MI vs CSK']?.breakdown ?? fcsBreakdown) },
  { src: '/assets/imgc7ce8e61-5200-4262-b761-33eb731b5f9a.png', label: 'Wicket celebration', match: 'RCB vs KKR', momentType: 'wicket', score: computeFcsScore(fcsByMatch['RCB vs KKR']?.breakdown ?? fcsBreakdown) },
  { src: '/assets/imgec6d8a33-a7c8-437b-badb-b6d4ef13236c.png', label: 'Strategic timeout', match: 'LSW vs SRH', momentType: 'strategic', score: computeFcsScore(fcsByMatch['LSW vs SRH']?.breakdown ?? fcsBreakdown) },
  { src: '/assets/imgaaea26fd-8af9-42dd-aaec-f0246f61f066.png', label: 'DRS overlay', match: 'GT vs KXIP', momentType: 'replay', score: computeFcsScore(fcsByMatch['GT vs KXIP']?.breakdown ?? fcsBreakdown) },
];

// Screentime by match chart - minutes of viewership by stream source (stacked bars)
const screentimeByStreamRaw = [
  { match: 'MI vs CSK', JioHotstar: 6.2, 'Star Sports Hindi': 8.2, 'Star Sports English': 7.8, JioCinema: 12.4 },
  { match: 'RCB vs KKR', JioHotstar: 5.1, 'Star Sports Hindi': 6.9, 'Star Sports English': 7.1, JioCinema: 11.2 },
  { match: 'LSW vs SRH', JioHotstar: 5.8, 'Star Sports Hindi': 7.4, 'Star Sports English': 7.2, JioCinema: 10.8 },
  { match: 'GT vs KXIP', JioHotstar: 6.5, 'Star Sports Hindi': 8.1, 'Star Sports English': 7.5, JioCinema: 13.2 },
  { match: 'DC vs SRH', JioHotstar: 4.9, 'Star Sports Hindi': 6.5, 'Star Sports English': 6.8, JioCinema: 10.5 },
  { match: 'GT vs LSG', JioHotstar: 6.0, 'Star Sports Hindi': 7.8, 'Star Sports English': 7.3, JioCinema: 11.8 },
  { match: 'RR vs PBKS', JioHotstar: 4.5, 'Star Sports Hindi': 6.2, 'Star Sports English': 6.5, JioCinema: 9.8 },
];
export const screentimeByMatchChart = screentimeByStreamRaw.map((r) => ({
  match: r.match,
  jioHotstar: r.JioHotstar,
  starSportsHindi: r['Star Sports Hindi'],
  starSportsEnglish: r['Star Sports English'],
  jiocinema: r.JioCinema,
}));

// FCS by stream (not brand)
export const fcsByStream = [
  { stream: 'JioHotstar', score: 91, audio: 88, overlay: 94 },
  { stream: 'Star Sports Hindi', score: 89, audio: 86, overlay: 92 },
  { stream: 'Star Sports English', score: 87, audio: 84, overlay: 90 },
  { stream: 'JioCinema', score: 85, audio: 82, overlay: 88 },
];

// Verbal brand mentions by commentator — filter by brandId for Stream Data
export const verbalBrandMentionsByCommentator: { brandId: string; commentator: string; mentions: number; context: string }[] = [
  { brandId: 'bisleri', commentator: 'Harsha Bhogle', mentions: 18, context: 'Dugout cooler placement during boundary' },
  { brandId: 'bisleri', commentator: 'Sunil Gavaskar', mentions: 14, context: 'Strategic timeout hydration moment' },
  { brandId: 'bisleri', commentator: 'Ravi Shastri', mentions: 16, context: 'Product in use, fan drinking' },
  { brandId: 'bisleri', commentator: 'Aakash Chopra', mentions: 8, context: '#DRINKITUP campaign mention' },
  { brandId: 'bisleri', commentator: 'Irfan Pathan', mentions: 6, context: 'Stadium hoarding visibility' },
  { brandId: 'dream11', commentator: 'Harsha Bhogle', mentions: 24, context: 'Strategic timeout sponsor' },
  { brandId: 'dream11', commentator: 'Sunil Gavaskar', mentions: 11, context: 'Fantasy league CTA' },
  { brandId: 'dream11', commentator: 'Ravi Shastri', mentions: 19, context: 'Title sponsor callout' },
  { brandId: 'dream11', commentator: 'Aakash Chopra', mentions: 14, context: 'Captain pick moment' },
  { brandId: 'dream11', commentator: 'Irfan Pathan', mentions: 12, context: 'Fantasy league' },
  { brandId: 'tata', commentator: 'Harsha Bhogle', mentions: 15, context: 'EV branding near boundary' },
  { brandId: 'tata', commentator: 'Sunil Gavaskar', mentions: 12, context: 'Baja campaign mention' },
  { brandId: 'tata', commentator: 'Ravi Shastri', mentions: 22, context: 'Title sponsor' },
  { brandId: 'tata', commentator: 'Aakash Chopra', mentions: 10, context: 'Tata EV mention' },
  { brandId: 'tata', commentator: 'Irfan Pathan', mentions: 8, context: 'Corporate partnership' },
  { brandId: 'ceat', commentator: 'Harsha Bhogle', mentions: 12, context: 'Strategic timeout sponsor' },
  { brandId: 'ceat', commentator: 'Sunil Gavaskar', mentions: 18, context: 'Strategic timeout' },
  { brandId: 'ceat', commentator: 'Ravi Shastri', mentions: 14, context: 'Tyre imagery during action' },
  { brandId: 'ceat', commentator: 'Aakash Chopra', mentions: 9, context: 'CEAT strategic timeout slot' },
  { brandId: 'ceat', commentator: 'Irfan Pathan', mentions: 7, context: 'Boundary rope branding' },
];

// Brand-specific key moments (same images, contextual events per brand)
const IMG = {
  dugout: '/assets/imgff76546e-588a-48d7-a57c-8608c1436bcf.png',
  drinkitup: '/assets/imga1e9768b-84bb-4e91-89f1-d8b1e6f8035c.png',
  product: '/assets/img49e94247-2465-4cce-ba3b-ff4d8bb1c4b9.png',
  hoarding: '/assets/img4ce2bdcc-c723-4a89-a540-ef9032f9bebc.png',
  wicket: '/assets/imgc7ce8e61-5200-4262-b761-33eb731b5f9a.png',
  strategic: '/assets/imgec6d8a33-a7c8-437b-badb-b6d4ef13236c.png',
  drs: '/assets/imgaaea26fd-8af9-42dd-aaec-f0246f61f066.png',
};
const mk = (id: string, time: string, timeDisp: string, event: string, visibility: number, duration: number, impact: string, image: string) =>
  ({ id, timestamp: time, time: timeDisp, event, visibility, duration, durationDisplay: `${duration}s`, impact, image } as const);

export const streamDataByBrand: Record<string, {
  streamKpis: typeof streamKpis;
  keyMoments: Array<{ id: string; time: string; event: string; visibility: number; durationDisplay: string; impact: string; image: string }>;
  emotionByOverPhase: Array<{ phase: string; date: string; excitement: number; tension: number; joy: number; disappointment: number; anticipation?: number; surprise?: number; viewership?: number }>;
}> = {
  bisleri: {
    streamKpis: { avgFcs: 87, avgFcsDelta: 3.4, totalScreentime: 1_200_000_000, totalScreentimeDelta: 5.1, verbalMentions: 87, verbalMentionsSub: 'by commentators', roiMultiple: 315.6, roiMultipleDelta: 12.4 },
    keyMoments: [
      mk('b1', '19:34', '7:42 PM', 'Boundary replay — Dugout cooler in frame during six celebration', 98, 12.4, 'viral', IMG.dugout),
      mk('b2', '20:12', '8:15 PM', 'Strategic timeout — #DRINKITUP campaign, prime ad placement', 100, 8.2, 'high', IMG.strategic),
      mk('b3', '20:45', '8:32 PM', 'Wicket celebration — Product visible in dugout, hydration moment', 95, 15, 'viral', IMG.wicket),
      mk('b4', '21:02', '9:18 PM', 'DRS review — Fan drinking moment during replay', 99, 6.8, 'high', IMG.drs),
      mk('b5', '21:18', '7:15 PM', 'Mid-innings ad — Brand cooler placement, full branding', 91, 30, 'high', IMG.drinkitup),
      mk('b6', '19:58', '7:58 PM', 'Boundary near hoarding — Stadium branding in shot', 82, 10.2, 'medium', IMG.hoarding),
    ],
    emotionByOverPhase: emotionByOverPhase.map((p, i) => ({ ...p, anticipation: 55 + i * 6, surprise: 32 + i * 5, viewership: viewershipErratic.bisleri[i] })),
  },
  dream11: {
    streamKpis: { avgFcs: 91, avgFcsDelta: 4.2, totalScreentime: 1_200_000_000, totalScreentimeDelta: 6.2, verbalMentions: 87, verbalMentionsSub: 'by commentators', roiMultiple: 342.1, roiMultipleDelta: 15.2 },
    keyMoments: [
      mk('d1', '19:34', '7:42 PM', "Dhoni's last-ball six — Fantasy points spike, replay overlay", 98, 12.4, 'viral', IMG.dugout),
      mk('d2', '20:12', '8:15 PM', 'Strategic timeout — Team selection promo, caption visibility', 100, 8.2, 'high', IMG.strategic),
      mk('d3', '20:45', '8:32 PM', 'Super over start — Captain pick moment, high engagement', 95, 15, 'viral', IMG.drinkitup),
      mk('d4', '21:02', '9:18 PM', 'Winning moment — Fantasy winner reveal, DRS overlay slot', 99, 6.8, 'high', IMG.drs),
      mk('d5', '19:58', '7:58 PM', 'Boundary — Player stats overlay during fielding', 82, 10.2, 'medium', IMG.hoarding),
      mk('d6', '20:22', '8:22 PM', 'Key dismissal — Fantasy impact callout, product in frame', 91, 9.4, 'high', IMG.product),
    ],
    emotionByOverPhase: emotionByOverPhase.map((p, i) => ({ ...p, excitement: p.excitement + 3, tension: p.tension - 2, anticipation: 55 + i * 5, surprise: 35 + i * 4, viewership: viewershipErratic.dream11[i] })),
  },
  tata: {
    streamKpis: { avgFcs: 88, avgFcsDelta: 2.8, totalScreentime: 1_200_000_000, totalScreentimeDelta: 4.5, verbalMentions: 87, verbalMentionsSub: 'by commentators', roiMultiple: 298.4, roiMultipleDelta: 9.8 },
    keyMoments: [
      mk('t1', '19:34', '7:42 PM', 'Boundary replay — EV branding near boundary rope', 94, 12.4, 'viral', IMG.dugout),
      mk('t2', '20:12', '8:15 PM', 'Strategic timeout — Trusted partner moment, legacy branding', 97, 8.2, 'high', IMG.strategic),
      mk('t3', '20:45', '8:32 PM', 'Super over — Tata Baja campaign visibility', 93, 15, 'viral', IMG.product),
      mk('t4', '21:02', '9:18 PM', 'Winning moment — Corporate presence at celebration', 96, 6.8, 'high', IMG.drs),
      mk('t5', '21:18', '7:15 PM', 'Toss ceremony — Title sponsor full visibility', 88, 30, 'medium', IMG.drinkitup),
      mk('t6', '19:58', '7:58 PM', 'Boundary — Stadium hoarding, Tata group logo', 85, 10.2, 'medium', IMG.hoarding),
    ],
    emotionByOverPhase: emotionByOverPhase.map((p, i) => ({ ...p, excitement: p.excitement - 2, tension: p.tension + 4, anticipation: 48 + i * 6, surprise: 28 + i * 5, viewership: viewershipErratic.tata[i] })),
  },
  ceat: {
    streamKpis: { avgFcs: 84, avgFcsDelta: 5.1, totalScreentime: 1_200_000_000, totalScreentimeDelta: 7.2, verbalMentions: 87, verbalMentionsSub: 'by commentators', roiMultiple: 265.2, roiMultipleDelta: 11.3 },
    keyMoments: [
      mk('c1', '19:34', '7:42 PM', 'Boundary — Strategic timeout slot, tyre imagery near crease', 96, 12.4, 'viral', IMG.dugout),
      mk('c2', '20:12', '8:15 PM', 'Strategic timeout — CEAT slot, full branding frame', 100, 8.2, 'high', IMG.strategic),
      mk('c3', '20:45', '8:32 PM', 'Wicket celebration — CEAT clever near stumps', 94, 15, 'viral', IMG.wicket),
      mk('c4', '21:02', '9:18 PM', 'DRS overlay — Replay moment, brand placement', 92, 6.8, 'high', IMG.drs),
      mk('c5', '19:58', '7:58 PM', 'Boundary near hoarding — Stadium branding, tyre visibility', 86, 10.2, 'medium', IMG.hoarding),
      mk('c6', '20:22', '8:22 PM', 'Product in use — Cricketing action, tyre in frame', 89, 9.4, 'high', IMG.product),
    ],
    emotionByOverPhase: emotionByOverPhase.map((p, i) => ({ ...p, excitement: p.excitement + 5, tension: p.tension - 3, anticipation: 52 + i * 4, surprise: 38 + i * 3, viewership: viewershipErratic.ceat[i] })),
  },
};

// Emotion timeline: multiple emotions with visibility mins + impressions (millions)
export const emotionTimelineData: EmotionVisibilityPoint[] = [
  { time: '19:00', emotion: 'Excitement', intensity: 72, visibilityMinutes: 2.1, visibilityImpressionsM: 4.2 },
  { time: '19:00', emotion: 'Anticipation', intensity: 65, visibilityMinutes: 2.1, visibilityImpressionsM: 4.2 },
  { time: '19:00', emotion: 'Joy', intensity: 45, visibilityMinutes: 2.1, visibilityImpressionsM: 4.2 },
  { time: '19:00', emotion: 'Tension', intensity: 38, visibilityMinutes: 2.1, visibilityImpressionsM: 4.2 },
  { time: '19:00', emotion: 'Disappointment', intensity: 12, visibilityMinutes: 2.1, visibilityImpressionsM: 4.2 },
  { time: '19:15', emotion: 'Excitement', intensity: 78, visibilityMinutes: 4.3, visibilityImpressionsM: 8.6 },
  { time: '19:15', emotion: 'Anticipation', intensity: 88, visibilityMinutes: 4.3, visibilityImpressionsM: 8.6 },
  { time: '19:15', emotion: 'Joy', intensity: 62, visibilityMinutes: 4.3, visibilityImpressionsM: 8.6 },
  { time: '19:15', emotion: 'Tension', intensity: 55, visibilityMinutes: 4.3, visibilityImpressionsM: 8.6 },
  { time: '19:15', emotion: 'Disappointment', intensity: 22, visibilityMinutes: 4.3, visibilityImpressionsM: 8.6 },
  { time: '19:30', emotion: 'Excitement', intensity: 85, visibilityMinutes: 6.2, visibilityImpressionsM: 12.4 },
  { time: '19:30', emotion: 'Anticipation', intensity: 72, visibilityMinutes: 6.2, visibilityImpressionsM: 12.4 },
  { time: '19:30', emotion: 'Joy', intensity: 95, visibilityMinutes: 6.2, visibilityImpressionsM: 12.4 },
  { time: '19:30', emotion: 'Tension', intensity: 42, visibilityMinutes: 6.2, visibilityImpressionsM: 12.4 },
  { time: '19:30', emotion: 'Disappointment', intensity: 18, visibilityMinutes: 6.2, visibilityImpressionsM: 12.4 },
  { time: '19:45', emotion: 'Excitement', intensity: 90, visibilityMinutes: 3.1, visibilityImpressionsM: 6.2 },
  { time: '19:45', emotion: 'Anticipation', intensity: 68, visibilityMinutes: 3.1, visibilityImpressionsM: 6.2 },
  { time: '19:45', emotion: 'Joy', intensity: 82, visibilityMinutes: 3.1, visibilityImpressionsM: 6.2 },
  { time: '19:45', emotion: 'Tension', intensity: 58, visibilityMinutes: 3.1, visibilityImpressionsM: 6.2 },
  { time: '19:45', emotion: 'Disappointment', intensity: 25, visibilityMinutes: 3.1, visibilityImpressionsM: 6.2 },
  { time: '20:00', emotion: 'Excitement', intensity: 72, visibilityMinutes: 5.4, visibilityImpressionsM: 10.8 },
  { time: '20:00', emotion: 'Anticipation', intensity: 82, visibilityMinutes: 5.4, visibilityImpressionsM: 10.8 },
  { time: '20:00', emotion: 'Joy', intensity: 55, visibilityMinutes: 5.4, visibilityImpressionsM: 10.8 },
  { time: '20:00', emotion: 'Tension', intensity: 88, visibilityMinutes: 5.4, visibilityImpressionsM: 10.8 },
  { time: '20:00', emotion: 'Disappointment', intensity: 35, visibilityMinutes: 5.4, visibilityImpressionsM: 10.8 },
  { time: '20:15', emotion: 'Excitement', intensity: 92, visibilityMinutes: 8.1, visibilityImpressionsM: 16.2 },
  { time: '20:15', emotion: 'Anticipation', intensity: 65, visibilityMinutes: 8.1, visibilityImpressionsM: 16.2 },
  { time: '20:15', emotion: 'Joy', intensity: 98, visibilityMinutes: 8.1, visibilityImpressionsM: 16.2 },
  { time: '20:15', emotion: 'Tension', intensity: 48, visibilityMinutes: 8.1, visibilityImpressionsM: 16.2 },
  { time: '20:15', emotion: 'Disappointment', intensity: 15, visibilityMinutes: 8.1, visibilityImpressionsM: 16.2 },
  { time: '20:30', emotion: 'Excitement', intensity: 88, visibilityMinutes: 4.2, visibilityImpressionsM: 8.4 },
  { time: '20:30', emotion: 'Anticipation', intensity: 58, visibilityMinutes: 4.2, visibilityImpressionsM: 8.4 },
  { time: '20:30', emotion: 'Joy', intensity: 75, visibilityMinutes: 4.2, visibilityImpressionsM: 8.4 },
  { time: '20:30', emotion: 'Tension', intensity: 62, visibilityMinutes: 4.2, visibilityImpressionsM: 8.4 },
  { time: '20:30', emotion: 'Disappointment', intensity: 42, visibilityMinutes: 4.2, visibilityImpressionsM: 8.4 },
  { time: '20:45', emotion: 'Excitement', intensity: 55, visibilityMinutes: 3.0, visibilityImpressionsM: 6.0 },
  { time: '20:45', emotion: 'Anticipation', intensity: 45, visibilityMinutes: 3.0, visibilityImpressionsM: 6.0 },
  { time: '20:45', emotion: 'Joy', intensity: 38, visibilityMinutes: 3.0, visibilityImpressionsM: 6.0 },
  { time: '20:45', emotion: 'Tension', intensity: 52, visibilityMinutes: 3.0, visibilityImpressionsM: 6.0 },
  { time: '20:45', emotion: 'Disappointment', intensity: 78, visibilityMinutes: 3.0, visibilityImpressionsM: 6.0 },
];

// Social Data
export const conversations: Conversation[] = [
  { id: '1', platform: 'twitter', username: '@cricket_fan', text: 'Dream11 prediction on point today! MSD for the win! #IPL2025', sentiment: 'positive', likes: 2340, comments: 89, shares: 45, timestamp: '2m ago' },
  { id: '2', platform: 'instagram', username: 'sportsmemes.india', text: 'CRED ads during IPL are honestly the best part of the break 🎯', sentiment: 'positive', likes: 12500, comments: 234, shares: 890, timestamp: '5m ago' },
  { id: '3', platform: 'twitter', username: '@ipl_updates', text: "Tata's association with IPL has been a game changer for brand visibility", sentiment: 'neutral', likes: 892, comments: 23, shares: 12, timestamp: '8m ago' },
  { id: '4', platform: 'reddit', username: 'u/cricketnerd', text: 'The Swiggy ads are getting repetitive. Same joke every match.', sentiment: 'negative', likes: 456, comments: 78, shares: 5, timestamp: '12m ago' },
  { id: '5', platform: 'twitter', username: '@brandwatch_ipl', text: "JioCinema's free streaming is driving insane engagement. Big W for accessibility!", sentiment: 'positive', likes: 3420, comments: 156, shares: 234, timestamp: '15m ago' },
  { id: '6', platform: 'instagram', username: 'fan.cricket', text: 'Paytm par match dekhna >>>> best combo', sentiment: 'positive', likes: 8900, comments: 189, shares: 67, timestamp: '18m ago' },
  { id: '7', platform: 'youtube', username: 'Cricket Highlights', text: 'RuPay card visibility during boundary moments is insane this season', sentiment: 'positive', likes: 4200, comments: 112, shares: 89, timestamp: '22m ago' },
  { id: '8', platform: 'twitter', username: '@fantasy_guru', text: 'Myntra fashion collab with IPL teams - fire emoji 🔥', sentiment: 'positive', likes: 1890, comments: 45, shares: 23, timestamp: '28m ago' },
  { id: '9', platform: 'reddit', username: 'u/match_thread', text: 'Zee5 streaming quality vs JioCinema - anyone else noticing buffering?', sentiment: 'neutral', likes: 678, comments: 156, shares: 12, timestamp: '35m ago' },
];

export const themeData: ThemeData[] = [
  { name: 'Match Predictions', volume: 45000, sentiment: 0.72 },
  { name: 'Player Performance', volume: 38000, sentiment: 0.65 },
  { name: 'Brand Advertisements', volume: 28000, sentiment: 0.58 },
  { name: 'Memes & Humor', volume: 52000, sentiment: 0.82 },
  { name: 'Team Rivalries', volume: 41000, sentiment: 0.45 },
  { name: 'Umpiring/DRS', volume: 15000, sentiment: 0.35 },
  { name: 'Fantasy League', volume: 62000, sentiment: 0.78 },
];

export const wordCloudWords: WordCloudWord[] = [
  { text: 'IPL', value: 9500, sentiment: 'neutral' },
  { text: 'amazing', value: 3200, sentiment: 'positive' },
  { text: 'predictions', value: 2800, sentiment: 'neutral' },
  { text: 'best', value: 2600, sentiment: 'positive' },
  { text: 'match', value: 2400, sentiment: 'neutral' },
  { text: 'love', value: 2200, sentiment: 'positive' },
  { text: 'ads', value: 1900, sentiment: 'neutral' },
  { text: 'boring', value: 800, sentiment: 'negative' },
  { text: 'overrated', value: 650, sentiment: 'negative' },
  { text: 'GOAT', value: 1800, sentiment: 'positive' },
  { text: 'DRS', value: 1400, sentiment: 'neutral' },
  { text: 'viral', value: 1600, sentiment: 'positive' },
  { text: 'cricket', value: 4100, sentiment: 'neutral' },
  { text: 'team', value: 3500, sentiment: 'neutral' },
  { text: 'win', value: 2100, sentiment: 'positive' },
];

export const competitorMentions: CompetitorMention = {
  brandId: 'dream11',
  brandName: 'Dream11',
  volume: [98, 112, 87, 156, 121, 189, 145, 203, 178, 241, 198, 252],
  sentiment: [0.68, 0.70, 0.72, 0.75, 0.71, 0.78, 0.76, 0.79, 0.81, 0.83, 0.82, 0.84],
  timeline: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10', 'W11', 'W12'],
  mplVolume: [82, 95, 124, 118, 142, 131, 198, 156, 189, 207, 221, 234],
  credVolume: [68, 88, 72, 142, 95, 178, 112, 165, 145, 198, 176, 215],
  paytmVolume: [54, 78, 92, 98, 115, 145, 132, 178, 156, 189, 212, 198],
  verbatims: [
    'Dream11 predictions are spot on this season! 12/15 correct so far.',
    'MPL is doing well with their cashback offers - saw 3 ads last match.',
    'Both Dream11 and MPL going head to head in fantasy space.',
    'CRED ads during strategic timeout were hilarious - shared with friends.',
    'Tata branding on jersey stands out - great visibility during replays.',
  ],
};

export const geoSpikes: GeoSpike[] = [
  { state: 'Maharashtra', city: 'Mumbai', volume: 185000, topTopics: ['MI', 'Wankhede', 'Rohit'], spikeIntensity: 95, lat: 19.076, lng: 72.8777 },
  { state: 'Karnataka', city: 'Bangalore', volume: 142000, topTopics: ['RCB', 'Chinnaswamy', 'Kohli'], spikeIntensity: 88, lat: 12.9716, lng: 77.5946 },
  { state: 'Tamil Nadu', city: 'Chennai', volume: 128000, topTopics: ['CSK', 'Dhoni', 'DRS'], spikeIntensity: 85, lat: 13.0827, lng: 80.2707 },
  { state: 'Gujarat', city: 'Ahmedabad', volume: 95000, topTopics: ['GT', 'Hardik'], spikeIntensity: 72, lat: 23.0225, lng: 72.5714 },
  { state: 'Delhi', city: 'Delhi', volume: 112000, topTopics: ['DC', 'Pant'], spikeIntensity: 78, lat: 28.7041, lng: 77.1025 },
  { state: 'West Bengal', city: 'Kolkata', volume: 98000, topTopics: ['KKR', 'Eden'], spikeIntensity: 75, lat: 22.5726, lng: 88.3639 },
  { state: 'Rajasthan', city: 'Jaipur', volume: 62000, topTopics: ['RR', 'Sanju'], spikeIntensity: 58, lat: 26.9124, lng: 75.7873 },
];

const MEME_IMAGES = [
  '/assets/imgff76546e-588a-48d7-a57c-8608c1436bcf.png',
  '/assets/imga1e9768b-84bb-4e91-89f1-d8b1e6f8035c.png',
  '/assets/img49e94247-2465-4cce-ba3b-ff4d8bb1c4b9.png',
  '/assets/img4ce2bdcc-c723-4a89-a540-ef9032f9bebc.png',
  '/assets/imgc7ce8e61-5200-4262-b761-33eb731b5f9a.png',
  '/assets/imgec6d8a33-a7c8-437b-badb-b6d4ef13236c.png',
  '/assets/imgaaea26fd-8af9-42dd-aaec-f0246f61f066.png',
];
export const memeTemplates: MemeTemplate[] = [
  { id: '1', thumbnail: MEME_IMAGES[5], format: 'DRS Review Template', usageCount: 45000, growthRate: 125, sentiment: 'positive', badge: 'viral' },
  { id: '2', thumbnail: MEME_IMAGES[2], format: 'Strategic Timeout Meme', usageCount: 28000, growthRate: 89, sentiment: 'positive', badge: 'trending' },
  { id: '3', thumbnail: MEME_IMAGES[6], format: 'CSK Thala Audio', usageCount: 65000, growthRate: 210, sentiment: 'positive', badge: 'viral' },
  { id: '4', thumbnail: MEME_IMAGES[0], format: 'Boundary Celebration Clip', usageCount: 12000, growthRate: 45, sentiment: 'neutral', badge: 'new' },
];

export const competitorAlerts: CompetitorAlert[] = [
  { id: '1', brandId: 'cred', brandName: 'CRED', message: 'Brand CRED is gaining traction using humor around DRS memes in CSK matches.', severity: 'high', timestamp: '15m ago', suggestedAction: 'Monitor DRS-related creative opportunities' },
  { id: '2', brandId: 'swiggy', brandName: 'Swiggy', message: "Swiggy's match-night delivery campaign is trending in Mumbai & Bangalore.", severity: 'medium', timestamp: '45m ago', suggestedAction: 'Consider geo-targeted campaigns' },
];

export const crisisAlerts: CrisisAlert[] = [
  { id: '1', category: 'celebrity', severity: 'green', title: 'All Clear', description: 'No celebrity-related issues detected.', volumeSpike: 0, timestamp: 'Live' },
  { id: '2', category: 'brand', severity: 'yellow', title: 'Minor Sentiment Dip', description: 'Brand mentioned in umpiring controversy discussion. Monitoring.', volumeSpike: 15, timestamp: '1h ago' },
  { id: '3', category: 'advertisement', severity: 'green', title: 'Positive Reception', description: 'Latest ad creative receiving positive feedback.', volumeSpike: 0, timestamp: 'Live' },
];

export const influencers: Influencer[] = [
  { id: '1', handle: '@cricbuzz_official', platform: 'Twitter', followers: 8500000, engagementRate: 4.2, recentPost: 'Match preview: MI vs CSK...', rankBy: 'followers' },
  { id: '2', handle: 'sports_tak', platform: 'Instagram', followers: 4200000, engagementRate: 6.8, recentPost: 'Dhoni moments compilation...', rankBy: 'followers' },
  { id: '3', handle: '@IPL', platform: 'Twitter', followers: 12000000, engagementRate: 3.1, recentPost: 'Official match update...', rankBy: 'followers' },
  { id: '4', handle: 'cricket_memes_99', platform: 'Instagram', followers: 890000, engagementRate: 12.4, recentPost: 'DRS meme going viral...', rankBy: 'virality' },
  { id: '5', handle: 'fan_cricket_ugc', platform: 'YouTube', followers: 120000, engagementRate: 18.2, recentPost: 'Reaction to last over...', rankBy: 'ugc' },
  { id: '6', handle: '@ipl_memes', platform: 'Twitter', followers: 560000, engagementRate: 15.2, recentPost: 'Thala for a reason meme...', rankBy: 'virality' },
  { id: '7', handle: 'cricket_reactions', platform: 'YouTube', followers: 340000, engagementRate: 22.1, recentPost: 'Live reaction MI vs CSK...', rankBy: 'ugc' },
  { id: '8', handle: 'cricket_fan_tv', platform: 'YouTube', followers: 210000, engagementRate: 19.5, recentPost: 'Match analysis and predictions...', rankBy: 'ugc' },
];

export const narrativeThreads: NarrativeThread[] = [
  { id: '1', content: 'Dream11 prediction accuracy praise', type: 'organic', authenticityScore: 92, spreadCount: 4500 },
  { id: '2', content: 'CSK DRS meme wave', type: 'organic', authenticityScore: 88, spreadCount: 12000 },
  { id: '3', content: 'Brand X promotional push', type: 'paid', authenticityScore: 45, spreadCount: 3200 },
  { id: '4', content: 'Automated match updates', type: 'bot', authenticityScore: 12, spreadCount: 8900 },
];

// Bisleri-specific Social Intelligence data
export const trendingTopicsWordCloud: { text: string; value: number }[] = [
  { text: 'Dhoni', value: 98 },
  { text: 'Dream11', value: 92 },
  { text: 'CSK', value: 95 },
  { text: 'IPL2025', value: 88 },
  { text: 'MI', value: 85 },
  { text: 'Kohli', value: 90 },
  { text: 'RCB', value: 78 },
  { text: 'KKR', value: 72 },
  { text: 'Cricket', value: 82 },
  { text: 'Playoff', value: 68 },
  { text: 'Super Over', value: 75 },
  { text: 'Tata', value: 70 },
  { text: 'JioCinema', value: 85 },
  { text: 'CEAT', value: 62 },
  { text: 'Swiggy', value: 58 },
  { text: 'Fantasy', value: 80 },
  { text: 'Thala', value: 88 },
  { text: 'Wankhede', value: 55 },
  { text: 'Chinnaswamy', value: 52 },
  { text: 'DRS', value: 78 },
  { text: 'Boundary', value: 65 },
  { text: 'Wicket', value: 68 },
  { text: 'Strategic', value: 45 },
  { text: 'Memes', value: 72 },
  { text: 'Bisleri', value: 48 },
  { text: 'RuPay', value: 42 },
  { text: 'Eden Gardens', value: 50 },
  { text: 'Pant', value: 58 },
  { text: 'Rohit', value: 75 },
  { text: 'Hardik', value: 68 },
  { text: 'Six', value: 72 },
  { text: 'Four', value: 65 },
  { text: 'T20', value: 60 },
];

export const bisleriCompetitorAlerts = [
  { id: 'b1', severity: 'high' as const, competitor: 'My11Circle', timeAgo: '2h ago', description: 'Gaining traction using humor around DRS memes in CSK matches', mentions: '28K', trend: 'rising' as const },
  { id: 'b2', severity: 'medium' as const, competitor: 'MPL', timeAgo: '6h ago', description: 'Launched influencer campaign with 3 IPL players', mentions: '15K', trend: 'rising' as const },
  { id: 'b3', severity: 'low' as const, competitor: 'Paytm', timeAgo: '1d ago', description: 'Nostalgic campaign referencing old IPL sponsorship', mentions: '8K', trend: 'stable' as const },
  { id: 'b4', severity: 'medium' as const, competitor: 'Kinley', timeAgo: '4h ago', description: 'Hydration-focused stadium activation during MI vs CSK', mentions: '12K', trend: 'rising' as const },
];

export const bisleriCrisisMonitoring = [
  { id: 'cm1', type: 'Celebrity', entity: 'Player X', issue: 'Controversial celebration', mentions: '45K', status: 'monitoring' as const },
  { id: 'cm2', type: 'Brand', entity: 'Dream11', issue: 'Ad backlash – insensitive timing', mentions: '12K', status: 'resolved' as const },
  { id: 'cm3', type: 'Advertisement', entity: 'Tata Group', issue: 'Competitor comparison claims', mentions: '8K', status: 'watching' as const },
];

export const bisleriBotDetection = [
  { label: 'Bot Networks', description: 'Amplifying brand hashtags', count: 1240, pct: 3.2, status: 'flagged' as const, icon: 'briefcase' as const },
  { label: 'Paid Meme Farms', description: 'Coordinated meme posting', count: 340, pct: 0.8, status: 'monitoring' as const, icon: 'chat' as const },
  { label: 'Narrative Origins', description: 'Seeding viral narratives', count: 28, pct: 0.1, status: 'identified' as const, icon: 'globe' as const },
];

export const bisleriTopInfluencers = [
  { name: 'Tanmay Bhat', handle: '@taborat', platform: 'Instagram', followers: '4.2M', ugcScore: 92, virality: 95, recent: 'Dream11 collab' },
  { name: "Ashwin's Corner", handle: '@ashaborat', platform: 'YouTube', followers: '2.8M', ugcScore: 88, virality: 78, recent: 'Match analysis' },
  { name: 'Cricket Shazza', handle: '@shaborat', platform: 'X', followers: '1.5M', ugcScore: 95, virality: 85, recent: 'Meme compilation' },
  { name: 'IPL Insider', handle: '@iplinsider', platform: 'X', followers: '890K', ugcScore: 72, virality: 90, recent: 'Breaking news' },
  { name: 'Desi Sports Fan', handle: '@desisports', platform: 'Instagram', followers: '650K', ugcScore: 85, virality: 82, recent: 'Fan reaction' },
];
