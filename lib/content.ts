// Static content for frontend-only deployment
// Database calls are disabled - all functions return static defaults
// To enable database: see lib/config.ts

// Types for content
export interface HeroContentData {
  id: string
  headline: string
  subtext: string
  badge: string | null
  ctaPrimary: string | null
  ctaSecondary: string | null
  isActive: boolean
}

export interface StatisticData {
  id: string
  label: string
  value: number
  prefix: string
  suffix: string
  icon: string | null
  order: number
  isActive: boolean
}

export interface FeatureData {
  id: string
  title: string
  description: string
  icon: string
  order: number
  isActive: boolean
}

export interface HowItWorksStepData {
  id: string
  step: number
  title: string
  description: string
  icon: string
  order: number
  isActive: boolean
}

export interface TestimonialData {
  id: string
  quote: string
  author: string
  role: string | null
  location: string | null
  avatarUrl: string | null
  rating: number
  order: number
  isActive: boolean
}

export interface AboutContentData {
  id: string
  key: string
  title: string | null
  content: string
  order: number
}

export interface BlogData {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  imageUrl: string | null
  published: boolean
  createdAt: Date
  updatedAt: Date
}

export interface FAQData {
  id: string
  question: string
  answer: string
  category: string
  order: number
  isActive: boolean
}

// Default content (static data)
const DEFAULT_HERO: HeroContentData = {
  id: 'default',
  headline: 'Pool Cabs. Save Money. Go Green.',
  subtext: 'Pool and go — with or without a car. Match with verified co-riders, share the journey, and save up to 75%. Join India\'s greenest commuting movement.',
  badge: "India's #1 Cab Pooling Platform",
  ctaPrimary: 'Download Free',
  ctaSecondary: 'See How It Works',
  isActive: true,
}

const DEFAULT_STATS: StatisticData[] = [
  { id: '1', label: 'App Downloads', value: 7000, prefix: '', suffix: '+', icon: 'Download', order: 1, isActive: true },
  { id: '2', label: 'Peak Daily Rides', value: 110, prefix: '', suffix: '+', icon: 'Car', order: 2, isActive: true },
  { id: '3', label: 'Cost Savings', value: 75, prefix: '', suffix: '%', icon: 'Wallet', order: 3, isActive: true },
  { id: '4', label: 'Active Users', value: 400, prefix: '', suffix: '+', icon: 'Users', order: 4, isActive: true },
]

const DEFAULT_FEATURES: FeatureData[] = [
  { id: '1', title: 'Save Up to 75%', description: 'Share cab fares and save significant money on your daily commute', icon: 'Wallet', order: 1, isActive: true },
  { id: '2', title: 'Aadhaar Verified', description: 'All users verified via Aadhaar KYC powered by DigiLocker', icon: 'ShieldCheck', order: 2, isActive: true },
  { id: '3', title: 'Female-Only Option', description: 'Women can connect only with verified female riders for added safety', icon: 'Users', order: 3, isActive: true },
  { id: '4', title: 'Real-time & Scheduled', description: 'Find rides instantly or plan ahead for your convenience', icon: 'Clock', order: 4, isActive: true },
  { id: '5', title: 'Green Cab Pooling', description: '4 people, 1 cab = 75% less pollution. We pool commercial cabs, not private cars — legal AND eco-friendly', icon: 'Leaf', order: 5, isActive: true },
  { id: '6', title: 'Pool Your Way', description: 'No car? Book a cab together. Have a car? Offer rides. Two options, same savings, one green mission.', icon: 'Shuffle', order: 6, isActive: true },
]

const DEFAULT_STEPS: HowItWorksStepData[] = [
  { id: '1', step: 1, title: 'Enter Your Destination', description: 'Set your pickup and drop location in the app', icon: 'MapPin', order: 1, isActive: true },
  { id: '2', step: 2, title: 'Find Your Match', description: 'Our algorithm finds people going to the same destination within 750m', icon: 'Search', order: 2, isActive: true },
  { id: '3', step: 3, title: 'Pool Together & Save', description: 'Book a cab together or join a self-drive ride. Split costs and save up to 75%', icon: 'Users', order: 3, isActive: true },
]

const DEFAULT_TESTIMONIALS: TestimonialData[] = [
  { id: '1', quote: 'Snapgo has saved me so much money! I used to spend Rs.400 for my daily commute, now I only pay Rs.100 by sharing with fellow students. Amazing concept!', author: 'Priya S.', role: 'College Student', location: 'Sharda University', avatarUrl: null, rating: 5, order: 1, isActive: true },
  { id: '2', quote: 'As a working professional, Snapgo has made my daily travel both affordable and social. I have made great connections with fellow commuters.', author: 'Rahul K.', role: 'IT Professional', location: 'Greater Noida', avatarUrl: null, rating: 5, order: 2, isActive: true },
  { id: '3', quote: 'The female-only option makes me feel safe. I can now travel without worrying about security while saving money.', author: 'Ananya M.', role: 'Graduate Student', location: 'Delhi NCR', avatarUrl: null, rating: 5, order: 3, isActive: true },
]

const DEFAULT_ABOUT: Record<string, AboutContentData> = {
  origin: { id: 'default-origin', key: 'origin', title: 'Our Origin', content: "It was a regular day when we, Mohit and Surya Purohit, were heading to Ghaziabad Railway Station from our society. We booked a cab and noticed another person also taking a cab from our area. When we reached the station, we saw the same person at the parking lot. That's when it hit us - we both paid Rs.300 separately for the same route. If we had known we were going to the same place, we could have shared the ride and paid just Rs.300 total, saving Rs.300 together!", order: 1 },
  spark: { id: 'default-spark', key: 'spark', title: 'The Spark', content: "This sparked an idea, but we didn't want to do traditional carpooling with private cars — that's not legal for commercial use and bypasses taxi drivers who depend on fares. Instead, we pioneered 'Cab Pooling' — pooling commercial cabs among verified riders. It's 100% legal, supports drivers, AND reduces road emissions by 75%. That's how Snapgo was born.", order: 2 },
  mission: { id: 'default-mission', key: 'mission', title: 'Our Mission', content: 'To make travel affordable and accessible for everyone through cab pooling — connecting people who share similar routes while supporting drivers and reducing environmental impact.', order: 3 },
  vision: { id: 'default-vision', key: 'vision', title: 'Our Vision', content: "To become India's most trusted cab pooling platform, where every shared ride means savings for riders, earnings for drivers, and a greener planet for everyone.", order: 4 },
  values: { id: 'default-values', key: 'values', title: 'Our Values', content: 'Legal and ethical operations, driver-friendly ecosystem, environmental sustainability, user safety, and creating value for our entire community.', order: 5 },
}

const DEFAULT_APP_LINKS = {
  android: { url: 'https://play.google.com/store/apps/details?id=in.snapgo.app&hl=en_IN', isLive: true, qrCodeUrl: '/images/qr code/playstore-qr.png' },
  ios: { url: 'https://apps.apple.com/in/app/snapgo-connect-split-fare/id6748761741', isLive: true, qrCodeUrl: '/images/qr code/appstore-qr.png' },
}

const DEFAULT_SOCIAL = {
  facebook: 'https://www.facebook.com/profile.php?id=61578285621863',
  instagram: 'https://www.instagram.com/snapgo.co.in/',
  linkedin: 'https://www.linkedin.com/company/snapgo-service-private-limited/',
}

const DEFAULT_CONTACT = {
  email: 'info@snapgo.co.in',
  phone: '+91 6398786105',
  address: 'Block 45, Sharda University, Knowledge Park 3, Greater Noida, Uttar Pradesh, India',
}

const DEFAULT_BLOGS: BlogData[] = [
  {
    id: '1',
    title: 'How Carpooling Saves You Money Every Month',
    slug: 'carpooling-saves-money',
    excerpt: 'Learn how sharing rides can reduce your travel costs by up to 75% and put more money back in your pocket.',
    content: `Carpooling has become one of the most effective ways to cut down on daily commute expenses. With Snapgo, users are saving an average of ₹3,000-5,000 per month on their travel costs.

## The Math Behind Savings

When you share a cab with 3 other verified riders:
- A ₹400 solo cab ride becomes ₹100 per person
- That's 75% savings on every single trip
- Over 20 working days, that's ₹6,000 saved monthly

## Real Stories from Our Users

"I was spending ₹8,000/month on cabs alone. With Snapgo, I now spend just ₹2,000. The extra money helps me save for my future." - Rahul, IT Professional

## Getting Started

Download Snapgo today and start matching with verified co-riders heading your way. Your wallet will thank you!`,
    imageUrl: '/images/blog/carpooling-savings.jpg',
    published: true,
    createdAt: new Date('2024-12-01'),
    updatedAt: new Date('2024-12-01'),
  },
  {
    id: '2',
    title: 'Safety First: How Snapgo Keeps You Protected',
    slug: 'safety-first-snapgo',
    excerpt: 'Discover the safety features that make Snapgo the most trusted ride-sharing platform in India.',
    content: `At Snapgo, your safety is our top priority. We've built multiple layers of protection to ensure every ride is secure.

## Aadhaar Verification

Every user on Snapgo is verified through Aadhaar KYC powered by DigiLocker. This means:
- Government-verified identity
- Real photos matched to profiles
- No fake accounts or anonymous users

## Female-Only Option

Women riders can choose to match only with other verified female riders, providing an extra layer of comfort and security.

## In-App Safety Features

- Real-time ride tracking
- Emergency SOS button
- Share ride details with family
- Rating system for accountability

## Our Commitment

We're building a community based on trust and transparency. Every feature we develop prioritizes your safety above all else.`,
    imageUrl: '/images/blog/safety-features.jpg',
    published: true,
    createdAt: new Date('2024-11-15'),
    updatedAt: new Date('2024-11-15'),
  },
  {
    id: '3',
    title: 'Cab Pooling vs Carpooling: Why Snapgo is the Greener Choice',
    slug: 'eco-friendly-commuting',
    excerpt: 'Discover why cab pooling is smarter than carpooling — legal, driver-friendly, and 75% less emissions per person.',
    content: `When it comes to reducing your carbon footprint, not all shared rides are equal. Here's why Snapgo's cab pooling is the smarter, greener choice.

## Carpooling vs Cab Pooling: What's the Difference?

**Traditional Carpooling (Private Cars):**
- Uses private vehicles for commercial purposes (not legal in India)
- Bypasses taxi drivers who depend on fares for their livelihood
- Same car, same emissions — whether 1 passenger or 4

**Snapgo's Cab Pooling:**
- Uses commercial taxis and cabs (100% legal)
- Supports drivers — they still earn their fares
- 4 people in 1 cab = 75% less pollution per person

## The Environmental Math

When 4 people share ONE cab instead of taking 4 separate ones:
- 75% fewer vehicles on the road
- 75% less fuel consumed
- 75% fewer emissions released

## The Triple Win

With Snapgo's cab pooling approach:
- **Drivers Win**: Continue earning with full fares
- **Planet Wins**: 4 people in 1 cab instead of 4 cabs
- **You Win**: Save up to 75% on every ride

## Why Pay for the Full Cab?

Every time you use Snapgo, you're saving money AND the environment. That's the power of cab pooling — legal, ethical, and genuinely green.

Download Snapgo today and be part of the sustainable commuting revolution!`,
    imageUrl: '/images/blog/eco-friendly.jpg',
    published: true,
    createdAt: new Date('2024-11-01'),
    updatedAt: new Date('2024-11-01'),
  },
]

const DEFAULT_FAQS: FAQData[] = [
  {
    id: '1',
    question: 'How does Snapgo work?',
    answer: 'Snapgo offers two ways to pool: No car? Match with verified co-riders, book a cab together via any app (Ola, Uber, etc.), and split the fare. Have a car? Create a ride for others to join. Either way, save up to 75% while reducing your carbon footprint.',
    category: 'general',
    order: 1,
    isActive: true,
  },
  {
    id: '2',
    question: 'Is Snapgo safe to use?',
    answer: 'Yes! Safety is our top priority. All users are verified through Aadhaar KYC powered by DigiLocker. We also offer a female-only option for women riders, real-time ride tracking, emergency SOS features, and a rating system for accountability.',
    category: 'safety',
    order: 2,
    isActive: true,
  },
  {
    id: '3',
    question: 'How much can I save with Snapgo?',
    answer: 'You can save up to 75% on your cab fares! For example, a ₹400 solo ride becomes just ₹100 when shared with 3 other riders. Regular users save ₹3,000-5,000 per month on average.',
    category: 'pricing',
    order: 3,
    isActive: true,
  },
  {
    id: '4',
    question: 'What is the female-only option?',
    answer: 'The female-only option allows women riders to match exclusively with other verified female riders. This feature provides an extra layer of comfort and security for women commuters.',
    category: 'safety',
    order: 4,
    isActive: true,
  },
  {
    id: '5',
    question: 'Can I schedule rides in advance?',
    answer: 'Yes! Snapgo supports both real-time and scheduled rides. You can plan your rides ahead of time for regular commutes or upcoming trips, ensuring you always have a match when you need one.',
    category: 'features',
    order: 5,
    isActive: true,
  },
  {
    id: '6',
    question: 'Where is Snapgo available?',
    answer: 'Snapgo is currently available in Delhi NCR, including Greater Noida, Noida, and surrounding areas. We are rapidly expanding to more cities across India.',
    category: 'general',
    order: 6,
    isActive: true,
  },
  {
    id: '7',
    question: 'How do I verify my account?',
    answer: 'Account verification is done through Aadhaar KYC powered by DigiLocker. Simply follow the in-app prompts to complete your verification. The process is quick, secure, and protects everyone in our community.',
    category: 'account',
    order: 7,
    isActive: true,
  },
  {
    id: '8',
    question: 'What happens if my match cancels?',
    answer: 'If your co-rider cancels, we immediately search for another match. You can also choose to proceed solo or wait for a new match. Our algorithm works quickly to minimize any inconvenience.',
    category: 'features',
    order: 8,
    isActive: true,
  },
  {
    id: '9',
    question: 'Why cab pooling instead of carpooling?',
    answer: 'Traditional carpooling uses private cars for commercial purposes, which is not legal in India and bypasses taxi drivers who depend on fares. Snapgo pioneered cab pooling — we connect riders to share commercial cabs. This is 100% legal, supports driver livelihoods, AND reduces road emissions by 75% per person. Same destination, shared cab, triple benefit!',
    category: 'general',
    order: 9,
    isActive: true,
  },
  {
    id: '10',
    question: 'Is cab pooling legal?',
    answer: 'Yes! Unlike carpooling with private vehicles (which is not legal for commercial use in India), cab pooling uses commercial taxis and cabs that are already licensed for passenger transport. Snapgo simply helps riders find others heading the same way to share the fare. It is 100% legal and supports the driver ecosystem.',
    category: 'general',
    order: 10,
    isActive: true,
  },
]

// Static data functions (no database calls)
export async function getHeroContent(): Promise<HeroContentData> {
  return DEFAULT_HERO
}

export async function getStats(): Promise<StatisticData[]> {
  return DEFAULT_STATS
}

export async function getFeatures(): Promise<FeatureData[]> {
  return DEFAULT_FEATURES
}

export async function getHowItWorksSteps(): Promise<HowItWorksStepData[]> {
  return DEFAULT_STEPS
}

export async function getTestimonials(): Promise<TestimonialData[]> {
  return DEFAULT_TESTIMONIALS
}

export async function getAboutContent(): Promise<Record<string, AboutContentData>> {
  return DEFAULT_ABOUT
}

export async function getAppStoreLinks() {
  return DEFAULT_APP_LINKS
}

export async function getSocialLinks() {
  return DEFAULT_SOCIAL
}

export async function getContactInfo() {
  return DEFAULT_CONTACT
}

export async function getBlogs(): Promise<BlogData[]> {
  return DEFAULT_BLOGS.filter(blog => blog.published)
}

export async function getBlogBySlug(slug: string): Promise<BlogData | null> {
  return DEFAULT_BLOGS.find(blog => blog.slug === slug && blog.published) || null
}

export async function getFAQs(): Promise<FAQData[]> {
  return DEFAULT_FAQS.filter(faq => faq.isActive)
}

export async function getFAQsByCategory(category: string): Promise<FAQData[]> {
  return DEFAULT_FAQS.filter(faq => faq.category === category && faq.isActive)
}

// Helper to get all content at once (for home page)
export async function getAllHomeContent() {
  const [hero, stats, features, howItWorks, testimonials, appLinks] = await Promise.all([
    getHeroContent(),
    getStats(),
    getFeatures(),
    getHowItWorksSteps(),
    getTestimonials(),
    getAppStoreLinks(),
  ])

  return { hero, stats, features, howItWorks, testimonials, appLinks }
}

// Export defaults for direct access if needed
export {
  DEFAULT_HERO,
  DEFAULT_STATS,
  DEFAULT_FEATURES,
  DEFAULT_STEPS,
  DEFAULT_TESTIMONIALS,
  DEFAULT_ABOUT,
  DEFAULT_APP_LINKS,
  DEFAULT_SOCIAL,
  DEFAULT_CONTACT,
  DEFAULT_BLOGS,
  DEFAULT_FAQS,
}
