/** Consistent sample data for the landing page. */

export const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Product', href: '#product' },
  { label: 'Pipeline', href: '#pipeline' },
]

export const FEATURES = [
  {
    icon: 'Globe',
    title: 'Website & CMS',
    description:
      'Publish landing pages and blog posts without a developer. Every page is fast, responsive, and connected to your lead flow.',
  },
  {
    icon: 'Users',
    title: 'Lead Management',
    description:
      'Capture every inquiry, de-duplicate automatically, and assign it to the right rep in seconds.',
  },
  {
    icon: 'Target',
    title: 'Campaign Tracking',
    description:
      'Follow each campaign from first click to closed deal with UTM attribution built in.',
  },
  {
    icon: 'Zap',
    title: 'Automation',
    description:
      'Trigger follow-ups, reminders, and status changes so nothing slips through the cracks.',
  },
  {
    icon: 'BarChart3',
    title: 'Analytics',
    description:
      'See conversion, response time, and revenue impact in one clear dashboard.',
  },
] as const

export const PIPELINE_STAGES = [
  {
    name: 'New',
    value: 128,
    color: 'bg-blue-500',
    deals: [
      { name: 'Acme Corp', amount: '$2,400', tag: 'Inbound' },
      { name: 'Brightpath', amount: '$1,800', tag: 'Referral' },
    ],
  },
  {
    name: 'Contacted',
    value: 84,
    color: 'bg-indigo-500',
    deals: [
      { name: 'Northwind', amount: '$3,200', tag: 'Outbound' },
      { name: 'Globex', amount: '$2,100', tag: 'Inbound' },
    ],
  },
  {
    name: 'Qualified',
    value: 46,
    color: 'bg-violet-500',
    deals: [
      { name: 'Initech', amount: '$5,600', tag: 'Demo' },
      { name: 'Umbrella', amount: '$4,000', tag: 'Inbound' },
    ],
  },
  {
    name: 'Proposal',
    value: 21,
    color: 'bg-emerald-500',
    deals: [
      { name: 'Stark Industries', amount: '$8,900', tag: 'Renewal' },
      { name: 'Wayne Enterprises', amount: '$7,300', tag: 'Demo' },
    ],
  },
  {
    name: 'Won',
    value: 14,
    color: 'bg-emerald-600',
    deals: [
      { name: 'Hooli', amount: '$9,400', tag: 'Closed' },
      { name: 'Pied Piper', amount: '$6,100', tag: 'Closed' },
    ],
  },
] as const

export const KPIS = [
  { label: 'Total Revenue', value: '$23,890', delta: '+18.2%' },
  { label: 'Total Leads', value: '1,248', delta: '+124' },
  { label: 'Conversion Rate', value: '6.8%', delta: '+1.3%' },
  { label: 'AI Insight Score', value: '87/100', delta: '+1.3%' },
] as const

export const TRAFFIC_SOURCES = [
  { name: 'Organic Search', value: 38, visitors: '12,480', delta: '+14%' },
  { name: 'Paid Ads', value: 27, visitors: '8,920', delta: '+9%' },
  { name: 'Social Media', value: 18, visitors: '5,410', delta: '-1.1%' },
  { name: 'Email Marketing', value: 9, visitors: '2,740', delta: '+18%' },
] as const

export const TOP_CAMPAIGNS = [
  { name: 'Instagram Retargeting', metric: '9.4% Conversion', badge: 'Best' },
  { name: 'Google Search Ads', metric: 'Rp12.4M Revenue', badge: 'Highest' },
  { name: 'Email Re-engagement', metric: '+18% Open Rate', badge: 'Fastest' },
  { name: 'Facebook Lead Campaign', metric: '428 Leads', badge: 'Most' },
] as const
