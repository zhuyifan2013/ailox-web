export interface AppItem {
  id: string
  name: string
  tagline: string
  description: string
  icon: string
  color: string
  gradient: string
  tags: string[]
  status: 'live' | 'beta' | 'coming-soon'
}

export const APPS: AppItem[] = [
  {
    id: 'aily-notes',
    name: 'Aily Notes',
    tagline: 'AI-powered smart notes',
    description: 'Capture thoughts and let AI organize, summarize, and connect your ideas automatically.',
    icon: '📝',
    color: '#6366f1',
    gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    tags: ['AI-Powered', 'Notes', 'Productivity'],
    status: 'live',
  },
  {
    id: 'aily-goals',
    name: 'Aily Goals',
    tagline: 'Achieve more with AI coaching',
    description: 'Set goals, track progress, and receive personalized AI coaching to stay on track.',
    icon: '🎯',
    color: '#06b6d4',
    gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)',
    tags: ['Goals', 'AI Coach', 'Habits'],
    status: 'live',
  },
  {
    id: 'aily-journal',
    name: 'Aily Journal',
    tagline: 'Reflective journaling with AI insights',
    description: 'Daily journaling that analyzes your mood patterns and surfaces meaningful insights over time.',
    icon: '📖',
    color: '#f0abfc',
    gradient: 'linear-gradient(135deg, #f0abfc, #e879f9)',
    tags: ['Journal', 'Mental Health', 'AI Insights'],
    status: 'live',
  },
  {
    id: 'aily-focus',
    name: 'Aily Focus',
    tagline: 'Deep work, powered by AI',
    description: 'AI-adaptive focus sessions that learn your peak hours and optimize your work blocks.',
    icon: '⚡',
    color: '#fbbf24',
    gradient: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
    tags: ['Focus', 'Pomodoro', 'Deep Work'],
    status: 'beta',
  },
  {
    id: 'aily-read',
    name: 'Aily Read',
    tagline: 'Read smarter, not harder',
    description: 'Import any content and chat with it. AI extracts key ideas and creates personalized summaries.',
    icon: '📚',
    color: '#34d399',
    gradient: 'linear-gradient(135deg, #34d399, #10b981)',
    tags: ['Reading', 'Summarization', 'Learning'],
    status: 'beta',
  },
  {
    id: 'aily-habit',
    name: 'Aily Habit',
    tagline: 'Build habits that stick',
    description: 'Habit tracking with behavioral AI that predicts streaks and prevents drop-off before it happens.',
    icon: '🔥',
    color: '#fb7185',
    gradient: 'linear-gradient(135deg, #fb7185, #f43f5e)',
    tags: ['Habits', 'Streak', 'Behavioral AI'],
    status: 'coming-soon',
  },
  {
    id: 'aily-plan',
    name: 'Aily Plan',
    tagline: 'Your AI project planner',
    description: 'Break down any project into actionable tasks with AI-generated timelines and resource estimates.',
    icon: '🗺️',
    color: '#818cf8',
    gradient: 'linear-gradient(135deg, #818cf8, #6366f1)',
    tags: ['Planning', 'Projects', 'AI Tasks'],
    status: 'coming-soon',
  },
  {
    id: 'aily-connect',
    name: 'Aily Connect',
    tagline: 'Knowledge graph for your life',
    description: 'Automatically connects insights across all your Aily apps into a unified personal knowledge base.',
    icon: '🌐',
    color: '#38bdf8',
    gradient: 'linear-gradient(135deg, #38bdf8, #0ea5e9)',
    tags: ['Knowledge Graph', 'Cross-App', 'AI Memory'],
    status: 'coming-soon',
  },
]

export const STATS = [
  { label: 'Apps in Ecosystem', value: '8+' },
  { label: 'Unified Backend', value: '1' },
  { label: 'AI Models', value: '3+' },
  { label: 'Users (Beta)', value: '200+' },
]

export const PHILOSOPHY = [
  {
    icon: '🧠',
    title: 'AI-First, Not AI-Added',
    description:
      'Every app is built around AI capabilities from day one — not bolted on as an afterthought. Intelligence is the core layer, not a feature.',
  },
  {
    icon: '🔗',
    title: 'One Ecosystem, Many Apps',
    description:
      'All apps share a unified backend, user profile, and AI memory. Your notes inform your goals. Your journal feeds your habits. Everything connects.',
  },
  {
    icon: '🌱',
    title: 'For a Better Life',
    description:
      'We build tools that compound over time. The longer you use them, the more they understand you — and the more value they return.',
  },
]

export const ROADMAP = [
  {
    quarter: 'Q3 2024',
    title: 'Foundation',
    items: ['Aily Notes v1.0', 'Aily Goals v1.0', 'Unified Auth & Backend'],
    status: 'done' as const,
  },
  {
    quarter: 'Q4 2024',
    title: 'Expansion',
    items: ['Aily Journal v1.0', 'Aily Focus Beta', 'Cross-app AI Memory'],
    status: 'done' as const,
  },
  {
    quarter: 'Q1 2025',
    title: 'Intelligence Layer',
    items: ['Aily Read Beta', 'AI Insights Dashboard', 'Mobile Apps (iOS)'],
    status: 'active' as const,
  },
  {
    quarter: 'Q2 2025',
    title: 'Habits & Planning',
    items: ['Aily Habit v1.0', 'Aily Plan v1.0', 'Android Apps'],
    status: 'upcoming' as const,
  },
  {
    quarter: 'Q3 2025',
    title: 'Connected Knowledge',
    items: ['Aily Connect v1.0', 'Knowledge Graph UI', 'API for Developers'],
    status: 'upcoming' as const,
  },
]
