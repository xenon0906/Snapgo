'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SiteLayout } from '@/components/layout/SiteLayout'
import Link from 'next/link'
import {
  ShieldCheckIcon,
  UsersIcon,
  MapPinIcon,
  AlertIcon,
  MessageIcon,
  ClockIcon,
  NavigationIcon,
  WalletIcon,
  LeafIcon,
  HistoryIcon,
  ZapIcon,
  SearchIcon,
  TargetIcon,
  EyeIcon,
  EditIcon,
  DownloadIcon,
  SparklesIcon,
  ArrowRightIcon,
} from '@/components/ui/icon'
import { ArrowDown } from 'lucide-react'
import { PageHero } from '@/components/shared/PageHero'
import { GlowHighlight, ScrollReveal, StaggerReveal, StaggerItem, FloatingOrb } from '@/components/shared/animations'
import { AlternatingContent } from '@/components/shared/layouts'
import { ANIMATION_CONFIG } from '@/lib/animation-config'

interface CoreFeature {
  icon: React.FC<{ className?: string; size?: number }>
  title: string
  description: string
  highlight?: boolean
}

const coreFeatures: CoreFeature[] = [
  {
    icon: ShieldCheckIcon,
    title: 'Aadhaar KYC Verification',
    description: 'All users verified via Aadhaar and DigiLocker. KYC-approved badge visible on profiles. No fake profiles, no gender manipulation.',
    highlight: true,
  },
  {
    icon: UsersIcon,
    title: 'Female-Only Option',
    description: 'Women can filter to connect only with verified female riders for added safety and comfort.',
    highlight: true,
  },
  {
    icon: MapPinIcon,
    title: 'Smart Radius Matching',
    description: '750m radius matching for source and destination ensures perfect route alignment; expandable to 1km.',
  },
  {
    icon: AlertIcon,
    title: 'SOS Safety Feature',
    description: 'One-tap emergency alert shares live location and trip details with saved emergency contacts.',
    highlight: true,
  },
  {
    icon: MessageIcon,
    title: 'In-App Chat',
    description: 'Secure group chat created when riders match; coordinate pickup and timing easily.',
  },
  {
    icon: ClockIcon,
    title: 'Real-Time & Scheduled',
    description: 'Find rides instantly or plan ahead; flexible options for spontaneous and planned trips.',
  },
  {
    icon: NavigationIcon,
    title: 'Preferred Path Suggestion',
    description: 'App calculates and suggests optimal meeting point convenient for all riders.',
  },
  {
    icon: WalletIcon,
    title: 'Fare Transparency',
    description: 'Clear cost breakdown, save up to 75% vs solo cabs, instant refund if no match found.',
  },
  {
    icon: LeafIcon,
    title: 'Eco-Friendly Impact',
    description: 'Track carbon footprint savings; every shared ride reduces traffic and pollution.',
  },
  {
    icon: HistoryIcon,
    title: 'Trip History',
    description: 'Complete record of all your rides maintained securely for reference.',
  },
]

const realTimeFeatures = [
  { icon: ZapIcon, label: 'Instant Matching', description: 'Algorithm finds riders within seconds ready to travel now' },
  { icon: MapPinIcon, label: 'Location Auto-Detect', description: 'Use current location or manually enter source/destination' },
  { icon: TargetIcon, label: 'Flexible Radius', description: 'Start with 750m, expand to 1km after 1 minute if no match' },
  { icon: EyeIcon, label: 'Live Profile Viewing', description: 'See verified profiles with KYC status in real-time' },
  { icon: MessageIcon, label: 'Quick Chat', description: 'Group chat activates immediately after match' },
  { icon: UsersIcon, label: 'Smart Filters', description: 'Filter by number of people, gender preference' },
]

const scheduledFeatures = [
  { icon: EditIcon, label: 'Create Ride', description: 'Post trip details for others to join' },
  { icon: SearchIcon, label: 'Search Rides', description: 'Find existing rides matching your route' },
  { icon: UsersIcon, label: 'Send Request', description: 'Request to join rides, wait for approval' },
  { icon: ShieldCheckIcon, label: 'Accept Requests', description: 'Review and approve join requests' },
  { icon: EditIcon, label: 'Edit Trip', description: 'Modify ride details anytime before trip' },
  { icon: HistoryIcon, label: 'Trip Management', description: 'View hosted and joined trips separately' },
]

const savingsExample = [
  { type: 'Solo Cab', cost: 400, prefix: '₹', description: 'Expensive & Lonely', colorClass: 'from-gray-200 to-gray-100 border-gray-300', textColor: 'text-gray-600' },
  { type: 'With Snapgo', cost: 100, prefix: '₹', description: '4 People Sharing', colorClass: 'from-teal/20 to-teal/10 border-teal/50', textColor: 'text-teal' },
  { type: 'Savings', cost: 300, prefix: '₹', suffix: ' per trip', description: '75% savings', colorClass: 'from-green-500/20 to-green-600/10 border-green-500/30', textColor: 'text-green-500' },
  { type: 'Monthly', cost: 6000, prefix: '₹', suffix: ' saved', description: 'Using Snapgo 20x/month', colorClass: 'from-primary/20 to-primary/10 border-primary/50', textColor: 'text-primary' },
]

// Individual Feature Card - Each has its own scroll trigger
function FeatureCard({ feature, index }: { feature: CoreFeature; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px', amount: 0.3 })
  const Icon = feature.icon
  const [isHovered, setIsHovered] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Ensure animations only run after hydration
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Alternate animation directions for visual interest - deterministic based on index
  const patterns = [
    { x: -100, y: 50, rotate: -5 },   // From left
    { x: 0, y: 100, rotate: 0 },      // From bottom
    { x: 100, y: 50, rotate: 5 },     // From right
    { x: -80, y: 80, rotate: -3 },    // From bottom-left
    { x: 0, y: 120, rotate: 0 },      // From far bottom
    { x: 80, y: 80, rotate: 3 },      // From bottom-right
  ]
  const initial = patterns[index % patterns.length]
  const isHighlighted = feature.highlight
  const shouldAnimate = isMounted && isInView

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        x: initial.x,
        y: initial.y,
        rotate: initial.rotate,
        scale: 0.8
      }}
      animate={shouldAnimate ? {
        opacity: 1,
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1
      } : { opacity: 0, x: initial.x, y: initial.y, rotate: initial.rotate, scale: 0.8 }}
      transition={{
        duration: 0.4,
        delay: 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ y: -12, scale: 1.03 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="h-full"
    >
      <GlowHighlight isActive={isHovered || !!isHighlighted} color={isHighlighted ? 'teal' : 'primary'} intensity={isHighlighted ? 'medium' : 'low'}>
        <Card className={`h-full transition-all duration-500 ${isHighlighted ? 'border-teal/30 bg-gradient-to-br from-teal/5 to-transparent' : 'border-muted'} hover:shadow-2xl`}>
          <CardContent className="p-6">
            {/* Icon with animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={shouldAnimate ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
              transition={{ duration: 0.2, delay: 0.1, type: 'spring', stiffness: 250, damping: 12 }}
              whileHover={{ scale: 1.15, rotate: 10 }}
              className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${isHighlighted ? 'bg-teal/20' : 'bg-muted'}`}
            >
              <Icon className={`w-7 h-7 ${isHighlighted ? 'text-teal' : 'text-primary'}`} />
            </motion.div>

            {/* Title with slide-in */}
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={shouldAnimate ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.15, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
              className="text-lg font-bold mb-2"
            >
              {feature.title}
              {isHighlighted && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={shouldAnimate ? { scale: 1 } : { scale: 0 }}
                  transition={{ delay: 0.6, type: 'spring' }}
                  className="ml-2 inline-block"
                >
                  <Badge variant="teal" className="text-xs">Key Feature</Badge>
                </motion.span>
              )}
            </motion.h3>

            {/* Description with fade-in */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.15, delay: 0.12, ease: [0.34, 1.56, 0.64, 1] }}
              className="text-sm text-muted-foreground leading-relaxed"
            >
              {feature.description}
            </motion.p>

            {/* Animated decorative line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={shouldAnimate ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.2, delay: 0.15, ease: [0.34, 1.56, 0.64, 1] }}
              style={{ transformOrigin: 'left' }}
              className={`mt-4 h-1 rounded-full ${isHighlighted ? 'bg-gradient-to-r from-teal to-teal/30' : 'bg-gradient-to-r from-primary/50 to-transparent'}`}
            />
          </CardContent>
        </Card>
      </GlowHighlight>
    </motion.div>
  )
}

// Feature list item with connection line
function FeatureListItem({
  feature,
  index,
  isInView,
  isLast,
  variant,
  isMounted = true
}: {
  feature: { icon: React.FC<{ className?: string; size?: number }>; label: string; description: string }
  index: number
  isInView: boolean
  isLast: boolean
  variant: 'teal' | 'primary'
  isMounted?: boolean
}) {
  const Icon = feature.icon
  const [isHovered, setIsHovered] = useState(false)
  const bgColor = variant === 'teal' ? 'bg-teal/10' : 'bg-primary/10'
  const iconColor = variant === 'teal' ? 'text-teal' : 'text-primary'
  const lineColor = variant === 'teal' ? 'from-teal/50' : 'from-primary/50'
  const shouldAnimate = isMounted && isInView

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, x: variant === 'teal' ? -20 : 20 }}
        animate={shouldAnimate ? { opacity: 1, x: 0 } : { opacity: 0, x: variant === 'teal' ? -20 : 20 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ x: variant === 'teal' ? 5 : -5 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="relative z-10"
      >
        <GlowHighlight isActive={isHovered} color={variant} intensity="low">
          <div className="flex items-start gap-3 p-4 bg-background rounded-lg hover:shadow-md transition-all">
            <div className={`w-10 h-10 rounded-lg ${bgColor} flex items-center justify-center flex-shrink-0 relative`}>
              <Icon className={`w-5 h-5 ${iconColor}`} />
              {/* Step number */}
              <motion.div
                className={`absolute -top-2 -right-2 w-5 h-5 rounded-full ${variant === 'teal' ? 'bg-teal' : 'bg-primary'} text-white text-xs font-bold flex items-center justify-center`}
                initial={{ scale: 0 }}
                animate={shouldAnimate ? { scale: 1 } : { scale: 0 }}
                transition={{ delay: index * 0.1 + 0.3, type: 'spring' }}
              >
                {index + 1}
              </motion.div>
            </div>
            <div>
              <h4 className="font-medium">{feature.label}</h4>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          </div>
        </GlowHighlight>
      </motion.div>

      {/* Connection line to next item */}
      {!isLast && (
        <div className="absolute left-7 top-16 h-8 w-px overflow-hidden">
          <motion.div
            className={`h-full w-full bg-gradient-to-b ${lineColor} to-transparent`}
            initial={{ scaleY: 0 }}
            animate={shouldAnimate ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
            style={{ transformOrigin: 'top' }}
          />
        </div>
      )}
    </div>
  )
}

// Animated counter for savings
function AnimatedCost({
  value,
  prefix = '',
  suffix = '',
  isInView,
  delay = 0
}: {
  value: number
  prefix?: string
  suffix?: string
  isInView: boolean
  delay?: number
}) {
  const [displayValue, setDisplayValue] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  // Set mounted state after hydration
  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (isInView && isMounted) {
      const timer = setTimeout(() => {
        const duration = 1000
        const steps = 30
        const increment = value / steps
        let current = 0
        const interval = setInterval(() => {
          current += increment
          if (current >= value) {
            setDisplayValue(value)
            clearInterval(interval)
          } else {
            setDisplayValue(Math.floor(current))
          }
        }, duration / steps)
        return () => clearInterval(interval)
      }, delay)
      return () => clearTimeout(timer)
    }
  }, [isInView, isMounted, value, delay])

  // Show static value on server, animated value on client
  return (
    <span suppressHydrationWarning>
      {prefix}{isMounted ? displayValue.toLocaleString() : '0'}{suffix}
    </span>
  )
}

// Savings card with flow animation
function SavingsCard({
  item,
  index,
  isInView,
  isLast
}: {
  item: typeof savingsExample[0]
  index: number
  isInView: boolean
  isLast: boolean
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="relative flex items-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.2, delay: index * 0.03, ease: [0.34, 1.56, 0.64, 1] }}
        whileHover={{ scale: 1.05, y: -5 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="flex-1"
      >
        <GlowHighlight
          isActive={isHovered || (isInView && index === 2)}
          color={index === 0 ? 'primary' : index === 2 ? 'teal' : 'primary'}
          intensity={index === 2 ? 'medium' : 'low'}
        >
          <Card className={`text-center bg-gradient-to-br ${item.colorClass} hover:shadow-lg transition-all border`}>
            <CardContent className="p-6">
              <div className="text-sm font-medium mb-2 opacity-80">{item.type}</div>
              <div className={`text-2xl md:text-3xl font-bold mb-1 ${item.textColor}`}>
                <AnimatedCost
                  value={item.cost}
                  prefix={item.prefix}
                  suffix={item.suffix}
                  isInView={isInView}
                  delay={index * 200}
                />
              </div>
              <div className="text-xs opacity-70">{item.description}</div>
            </CardContent>
          </Card>
        </GlowHighlight>
      </motion.div>

      {/* Arrow to next card */}
      {!isLast && (
        <motion.div
          className="hidden sm:flex items-center justify-center w-8 flex-shrink-0"
          initial={{ opacity: 0, x: -10 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
          transition={{ delay: index * 0.15 + 0.3 }}
        >
          <motion.div
            animate={isInView ? { x: [0, 5, 0] } : { x: 0 }}
            transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
          >
            <ArrowRightIcon className="w-5 h-5 text-muted-foreground" />
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default function FeaturesPage() {
  const headerRef = useRef<HTMLDivElement>(null)
  const detailsRef = useRef<HTMLDivElement>(null)
  const savingsRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-50px' })
  const detailsInView = useInView(detailsRef, { once: true, margin: '-100px' })
  const savingsInView = useInView(savingsRef, { once: true, margin: '-100px' })
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Combined animation triggers
  const headerShouldAnimate = isMounted && headerInView
  const detailsShouldAnimate = isMounted && detailsInView
  const savingsShouldAnimate = isMounted && savingsInView

  return (
    <SiteLayout>
      <PageHero
        badge="Features"
        title="Powerful Features for"
        titleHighlight="Safe & Smart Travel"
        description="Every feature is designed with your safety, savings, and convenience in mind."
        icon={<SparklesIcon className="w-5 h-5" />}
        trustBadges={[
          { label: '10+ Features', variant: 'primary' },
          { label: 'Save 75%', variant: 'teal' },
        ]}
      />

      {/* Core Features - ALL 10 with Individual Animations */}
      <section className="py-20 bg-background relative overflow-hidden">
        {/* Animated background orbs */}
        <FloatingOrb
          className="absolute top-20 right-10"
          size="xl"
          color="teal"
          speed={0.3}
        />
        <FloatingOrb
          className="absolute top-1/2 left-10"
          size="lg"
          color="purple"
          speed={0.5}
        />
        <FloatingOrb
          className="absolute bottom-20 right-1/4"
          size="md"
          color="gradient"
          speed={0.4}
        />

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header with Animation */}
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 60 }}
            animate={headerShouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={headerShouldAnimate ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <Badge className="mb-4 text-base px-4 py-1">Core Features</Badge>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={headerShouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.05, duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              10 Powerful Features
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={headerShouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.08, duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Everything you need for a safe, affordable, and eco-friendly commute.
            </motion.p>

            {/* Animated progress dots */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={headerShouldAnimate ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
              transition={{ delay: 0.1, duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
              className="flex justify-center gap-2 mt-8"
            >
              {coreFeatures.map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={headerShouldAnimate ? { scale: 1 } : { scale: 0 }}
                  transition={{ delay: 0.6 + i * 0.05, type: 'spring' }}
                  className={`w-3 h-3 rounded-full ${coreFeatures[i].highlight ? 'bg-teal' : 'bg-muted-foreground/30'}`}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* ALL 10 Features Grid - Each Animates Individually */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {coreFeatures.map((feature, index) => (
              <FeatureCard key={feature.title} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Features */}
      <section ref={detailsRef} className="py-16 bg-muted/50 relative overflow-hidden">
        {/* Background decoration */}
        <FloatingOrb
          className="absolute top-10 left-0 opacity-20"
          size="xl"
          color="gradient"
          speed={0.4}
        />

        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal direction="up" className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Two Ways to Ride
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose between instant matching or planned rides based on your needs.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Real-Time Features */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={detailsShouldAnimate ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
              transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <div className="mb-6 flex items-center gap-3">
                <motion.div
                  className="w-12 h-12 rounded-xl bg-teal/20 flex items-center justify-center"
                  initial={{ rotate: 0 }}
                  animate={detailsShouldAnimate ? { rotate: 360 } : { rotate: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  <ZapIcon className="w-6 h-6 text-teal" />
                </motion.div>
                <div>
                  <Badge variant="teal" className="mb-1">Real-Time</Badge>
                  <h3 className="text-2xl font-bold">Instant Matching</h3>
                </div>
              </div>
              <div className="space-y-2">
                {realTimeFeatures.map((feature, index) => (
                  <FeatureListItem
                    key={feature.label}
                    feature={feature}
                    index={index}
                    isInView={detailsInView}
                    isLast={index === realTimeFeatures.length - 1}
                    variant="teal"
                    isMounted={isMounted}
                  />
                ))}
              </div>
            </motion.div>

            {/* Scheduled Features */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={detailsShouldAnimate ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
              transition={{ duration: 0.2, delay: 0.03, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <div className="mb-6 flex items-center gap-3">
                <motion.div
                  className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center"
                  initial={{ scale: 1 }}
                  animate={detailsShouldAnimate ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                  transition={{ duration: 1, delay: 0.7 }}
                >
                  <ClockIcon className="w-6 h-6 text-primary" />
                </motion.div>
                <div>
                  <Badge className="mb-1">Scheduled</Badge>
                  <h3 className="text-2xl font-bold">Plan Ahead</h3>
                </div>
              </div>
              <div className="space-y-2">
                {scheduledFeatures.map((feature, index) => (
                  <FeatureListItem
                    key={feature.label}
                    feature={feature}
                    index={index}
                    isInView={detailsInView}
                    isLast={index === scheduledFeatures.length - 1}
                    variant="primary"
                    isMounted={isMounted}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Flowing arrow between columns */}
          <motion.div
            className="hidden md:flex justify-center items-center py-8"
            initial={{ opacity: 0 }}
            animate={detailsShouldAnimate ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1 }}
          >
            <div className="flex items-center gap-4 px-6 py-3 rounded-full bg-background border">
              <span className="text-sm font-medium text-teal">Real-Time</span>
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ArrowRightIcon className="w-5 h-5 text-muted-foreground" />
              </motion.div>
              <span className="text-sm text-muted-foreground">or</span>
              <motion.div
                animate={{ x: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ArrowRightIcon className="w-5 h-5 text-muted-foreground rotate-180" />
              </motion.div>
              <span className="text-sm font-medium text-primary">Scheduled</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Savings Example */}
      <section ref={savingsRef} className="py-16 bg-background relative overflow-hidden">
        {/* Floating background orbs */}
        <FloatingOrb
          className="absolute bottom-20 right-20 opacity-30"
          size="lg"
          color="teal"
          speed={0.6}
        />

        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal direction="up" className="text-center mb-12">
            <Badge variant="teal" className="mb-4">Save Money</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Real Savings Example
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See how much you can save with Snapgo on your daily commute.
            </p>
          </ScrollReveal>

          {/* Progress indicator */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={savingsShouldAnimate ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
            transition={{ duration: 0.25, delay: 0.08, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <div className="flex items-center gap-2 max-w-3xl w-full px-4">
              {savingsExample.map((_, index) => (
                <div key={index} className="flex-1 flex items-center">
                  <motion.div
                    className={`w-3 h-3 rounded-full ${index === 2 ? 'bg-teal' : 'bg-muted-foreground/30'}`}
                    initial={{ scale: 0 }}
                    animate={savingsShouldAnimate ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: 0.3 + index * 0.15 }}
                  />
                  {index < savingsExample.length - 1 && (
                    <motion.div
                      className="flex-1 h-0.5 bg-muted-foreground/20 mx-1"
                      initial={{ scaleX: 0 }}
                      animate={savingsShouldAnimate ? { scaleX: 1 } : { scaleX: 0 }}
                      transition={{ delay: 0.4 + index * 0.15, duration: 0.3 }}
                      style={{ transformOrigin: 'left' }}
                    />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {savingsExample.map((item, index) => (
              <SavingsCard
                key={item.type}
                item={item}
                index={index}
                isInView={savingsShouldAnimate}
                isLast={index === savingsExample.length - 1}
              />
            ))}
          </div>

          {/* Summary highlight */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={savingsShouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2, duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-teal/10 to-green-500/10 border border-teal/20">
              <WalletIcon className="w-6 h-6 text-teal" />
              <span className="text-lg font-semibold">
                Save up to <span className="text-teal">₹72,000</span> per year with Snapgo!
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/90 relative overflow-hidden">
        {/* Animated mesh background */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-white/10 blur-[100px]"
            animate={{ scale: [1, 1.3, 1], x: [0, 50, 0] }}
            transition={{ duration: 12, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-white/10 blur-[80px]"
            animate={{ scale: [1.2, 1, 1.2], y: [0, -50, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />

        <div className="container mx-auto px-4 text-center relative z-10">
          <ScrollReveal direction="up">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-2 glass-dark rounded-full mb-6"
            >
              <SparklesIcon className="w-4 h-4 text-teal-300" />
              <span className="text-white text-sm font-semibold">Get Started</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Experience All Features{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-teal-100">Today</span>
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Download Snapgo and discover why thousands of users trust us for their daily commute.
            </p>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              <Button size="xl" className="bg-white text-primary hover:bg-white/90 shadow-2xl shadow-white/20" asChild>
                <Link href="/#download">
                  <DownloadIcon className="w-5 h-5 mr-2" />
                  Download Now
                </Link>
              </Button>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>
    </SiteLayout>
  )
}
