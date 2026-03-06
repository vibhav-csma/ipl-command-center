# Consuma IPL Command Center

A real-time brand intelligence dashboard for IPL (Indian Premier League), built by Consuma. Analyze, visualize, and internalize your brand's perception across stream data and social conversations.

## Features

### IPL Overview
- **Brand Rank** - Overall brand performance across IPL ecosystem
- **Emotion Rank** - Brands ranked by emotional resonance
- **Exposure Airtime** - Cumulative exposure (Broadcast, OTT, Social)
- **Conversational Mentions** - Total mentions with platform breakdown
- **Sentiment Performance** - Positive/negative/neutral over season

### Brand Stream Data
- **FCS (Functional Coverage Score)** - Logo visibility, product placement, jersey, stadium, digital overlay
- **Screentime** - By match / overall / stream / language
- **Verbal Mentions** - Commentator mentions timeline
- **Key Visibility Moments** - JioHotstar-style callouts
- **Emotion x Brand Visibility** - Audience emotional state correlation
- **ROI Calculator** - Ad spend vs return

### Brand Social Data
- **Real-time Conversations** - Live feed with sentiment/themes/word cloud
- **Competitor Mentions** - Trendlines, verbatims, volume
- **Geographic Spikes** - State/city level conversation hotspots
- **Emerging Memes** - Trending templates, audio formats
- **Competitor Alerts** - Actionable notifications
- **Crisis Monitoring** - Celebrity/brand/advertisement
- **Top Influencers** - By followers, UGC, virality
- **Narrative Origin** - Organic vs bot vs paid

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS v4
- Recharts
- React Router
- Framer Motion
- Lucide React

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Build

```bash
npm run build
npm run preview
```

## Project Structure

- `src/pages/` - Route pages (IPL Overview, Brand Stream, Brand Social)
- `src/components/` - Reusable and feature components
- `src/data/` - Mock data (swap for live APIs)
- `src/types/` - TypeScript definitions
