'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SiteLayout } from '@/components/layout/SiteLayout'
import Link from 'next/link'
import {
  MapPinIcon,
  SearchIcon,
  UsersIcon,
  MessageIcon,
  NavigationIcon,
  WalletIcon,
  CalendarIcon,
  ArrowRightIcon,
  ZapIcon,
  TargetIcon,
  DownloadIcon,
  SparklesIcon,
} from '@/components/ui/icon'
import { PageHero } from '@/components/shared/PageHero'
import { StepSequence, StepItem, StepDots, ScrollReveal, FloatingOrb } from '@/components/shared/animations'
import { GlowHighlight, StepCounter } from '@/components/shared/animations'
import { FlowingLine } from '@/components/shared/animations/ConnectionLine'
import { AsymmetricSection } from '@/components/shared/layouts'
import { ANIMATION_CONFIG } from '@/lib/animation-config'

interface StepData {
  icon: React.FC<{ className?: string; size?: number }>
  title: string
  description: string
}

const realTimeSteps: StepData[] = [
  { icon: MapPinIcon, title: 'Enter Locations', description: 'Set current location (or use auto-detect) and destination, specify number of people' },
  { icon: SearchIcon, title: 'Smart Search', description: 'Choose preferences: number of riders, gender filter (female-only option), search radius (750m default)' },
  { icon: UsersIcon, title: 'Find Matches', description: 'Algorithm finds verified users within 750m of source and destination, see profiles and KYC status' },
  { icon: MessageIcon, title: 'Connect & Chat', description: 'Send ride requests to matches, once accepted, chat in group to coordinate pickup and time' },
  { icon: NavigationIcon, title: 'Meet at Midpoint', description: 'App suggests optimal meeting point convenient for everyone, navigate using built-in map' },
  { icon: WalletIcon, title: 'Share & Save', description: 'Book cab together, share fare equally, save up to 75%' },
]

const scheduledSearchSteps: StepData[] = [
  { icon: MapPinIcon, title: 'Enter Trip Details', description: 'Source, destination, date, time' },
  { icon: SearchIcon, title: 'Browse Available Rides', description: 'See rides within 2km radius matching schedule' },
  { icon: ArrowRightIcon, title: 'Send Join Request', description: 'Request to join rides that match needs' },
  { icon: UsersIcon, title: 'Get Confirmed', description: 'Host accepts request and you\'re in' },
]

const scheduledCreateSteps: StepData[] = [
  { icon: MapPinIcon, title: 'Set Ride Details', description: 'Pickup, destination, date, time, seats needed' },
  { icon: UsersIcon, title: 'Add Preferences', description: 'Gender preference, additional notes' },
  { icon: ZapIcon, title: 'Publish Ride', description: 'Your ride becomes visible to nearby users' },
  { icon: TargetIcon, title: 'Accept Requests', description: 'Review and accept join requests' },
]

// Enhanced Step Card with asymmetric layout support
function EnhancedStepCard({
  step,
  index,
  isActive,
  alignment = 'center',
  color = 'teal',
}: {
  step: StepData
  index: number
  isActive: boolean
  alignment?: 'left' | 'right' | 'center'
  color?: 'teal' | 'primary'
}) {
  const Icon = step.icon
  const isLeft = alignment === 'left'
  const isRight = alignment === 'right'

  const colorClasses = {
    teal: {
      icon: 'bg-teal/10 text-teal',
      iconActive: 'bg-teal text-white shadow-lg shadow-teal/30',
      border: 'border-teal/50',
      glow: 'teal' as const,
    },
    primary: {
      icon: 'bg-primary/10 text-primary',
      iconActive: 'bg-primary text-white shadow-lg shadow-primary/30',
      border: 'border-primary/50',
      glow: 'primary' as const,
    },
  }

  return (
    <GlowHighlight isActive={isActive} color={colorClasses[color].glow} pulse={isActive}>
      <Card className={`
        h-full transition-all duration-500
        ${isActive ? `border-2 ${colorClasses[color].border} shadow-xl` : 'border border-border/50'}
        hover:shadow-xl
      `}>
        <CardContent className={`p-6 ${isRight ? 'text-right' : isLeft ? 'text-left' : 'text-center'}`}>
          {/* Header with step number and icon */}
          <div className={`flex items-center gap-4 mb-4 ${isRight ? 'flex-row-reverse' : ''}`}>
            <StepCounter step={index + 1} isActive={isActive} size="md" color={color} />
            <motion.div
              className={`
                w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300
                ${isActive ? colorClasses[color].iconActive : colorClasses[color].icon}
              `}
              whileHover={{ scale: 1.1, rotate: 5 }}
              animate={isActive ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <Icon className="w-7 h-7" />
            </motion.div>
          </div>

          {/* Content */}
          <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
          <p className="text-muted-foreground text-sm">{step.description}</p>
        </CardContent>
      </Card>
    </GlowHighlight>
  )
}

// Scheduled Step Item with vertical connection
function ScheduledStepItem({
  step,
  index,
  isActive,
  color = 'teal',
}: {
  step: StepData
  index: number
  isActive: boolean
  color?: 'teal' | 'primary'
}) {
  const Icon = step.icon

  const colorClasses = {
    teal: {
      counter: 'bg-teal text-white',
      counterInactive: 'bg-teal/20 text-teal',
      icon: 'text-teal',
    },
    primary: {
      counter: 'bg-primary text-white',
      counterInactive: 'bg-primary/20 text-primary',
      icon: 'text-primary',
    },
  }

  return (
    <motion.div
      className="flex items-start gap-4 relative"
      initial={{ opacity: 0, x: color === 'teal' ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
      whileHover={{ x: color === 'teal' ? 5 : -5 }}
    >
      {/* Step number */}
      <motion.div
        className={`
          w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm
          transition-all duration-300
          ${isActive ? colorClasses[color].counter : colorClasses[color].counterInactive}
          ${isActive ? 'shadow-lg scale-110' : ''}
        `}
        animate={isActive ? { scale: [1, 1.15, 1] } : {}}
        transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
      >
        {index + 1}
      </motion.div>

      {/* Content */}
      <div className="flex-1 pb-6">
        <div className="flex items-center gap-2 mb-1">
          <Icon className={`w-5 h-5 ${colorClasses[color].icon}`} />
          <h4 className="font-semibold">{step.title}</h4>
        </div>
        <p className="text-sm text-muted-foreground">{step.description}</p>
      </div>

      {/* Connection line to next step */}
      {index < 3 && (
        <div className="absolute left-5 top-12 w-0.5 h-[calc(100%-48px)] bg-gradient-to-b from-current to-transparent opacity-40" />
      )}
    </motion.div>
  )
}

export default function HowItWorksPage() {
  const realTimeRef = useRef<HTMLDivElement>(null)
  const scheduledRef = useRef<HTMLDivElement>(null)
  const realTimeInView = useInView(realTimeRef, { once: true, margin: '-100px' })
  const scheduledInView = useInView(scheduledRef, { once: true, margin: '-100px' })
  const [activeRealTimeStep, setActiveRealTimeStep] = useState(0)

  return (
    <SiteLayout>
      <PageHero
        badge="How It Works"
        title="Two Ways to"
        titleHighlight="Share Rides"
        description="Whether you need a ride right now or want to plan ahead, Snapgo has you covered with flexible options."
        icon={<NavigationIcon className="w-5 h-5" />}
      />

      {/* Real-Time Rides - Enhanced with Step Sequence */}
      <section ref={realTimeRef} className="py-20 bg-background relative overflow-hidden">
        {/* Floating background orbs */}
        <FloatingOrb
          className="absolute top-20 right-10 opacity-30"
          size="lg"
          color="teal"
          speed={0.3}
        />
        <FloatingOrb
          className="absolute bottom-40 left-20 opacity-20"
          size="md"
          color="purple"
          speed={0.5}
        />

        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal direction="up" className="text-center mb-12">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-teal/10 rounded-full mb-4"
            >
              <ZapIcon className="w-5 h-5 text-teal" />
              <span className="text-teal font-medium">Real-Time Rides</span>
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Find a Ride <span className="text-teal">Instantly</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Instant matching with nearby riders within 750m radius. Expand to 1km if no match found.
            </p>

            {/* Step progress dots */}
            <div className="flex justify-center gap-2 mb-8">
              {realTimeSteps.map((_, index) => (
                <motion.button
                  key={index}
                  className={`
                    h-2 rounded-full transition-all duration-300
                    ${activeRealTimeStep === index ? 'w-8 bg-teal' : 'w-2 bg-teal/30'}
                  `}
                  onClick={() => setActiveRealTimeStep(index)}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>
          </ScrollReveal>

          {/* Steps Grid with Asymmetric Layout */}
          <StepSequence
            steps={6}
            direction="horizontal"
            showConnections={true}
            connectionStyle="flowing"
            autoAdvance={true}
            autoAdvanceDelay={3500}
            className="max-w-7xl mx-auto"
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {realTimeSteps.map((step, index) => {
                // Asymmetric: odd indices align right, even align left
                const alignment = index % 2 === 0 ? 'left' : 'right'
                return (
                  <StepItem key={step.title} index={index}>
                    {(isActive) => (
                      <EnhancedStepCard
                        step={step}
                        index={index}
                        isActive={isActive}
                        alignment={alignment}
                        color="teal"
                      />
                    )}
                  </StepItem>
                )
              })}
            </div>
          </StepSequence>
        </div>
      </section>

      {/* Scheduled Rides - Asymmetric Two-Column Layout */}
      <section ref={scheduledRef} className="py-20 bg-muted/50 relative overflow-hidden">
        {/* Floating background orbs */}
        <FloatingOrb
          className="absolute top-10 left-10 opacity-20"
          size="xl"
          color="gradient"
          speed={0.4}
        />

        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal direction="up" className="text-center mb-12">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4"
            >
              <CalendarIcon className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium">Scheduled Rides</span>
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Plan Ahead for <span className="text-primary">Better Matches</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              2km search radius for more options. Create or join existing rides for guaranteed matches.
            </p>
          </ScrollReveal>

          {/* Asymmetric Two-Column Layout */}
          <AsymmetricSection index={0} gap="lg" className="max-w-5xl mx-auto">
            {/* Search for Rides - Left Side */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={scheduledInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.2, delay: 0.05, ease: [0.34, 1.56, 0.64, 1] }}
              whileHover={{ y: -5 }}
            >
              <Card className="hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-teal/30">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3">
                    <motion.div
                      className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <SearchIcon className="w-5 h-5 text-teal" />
                    </motion.div>
                    <span>Search for Rides</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {scheduledSearchSteps.map((step, index) => (
                    <ScheduledStepItem
                      key={step.title}
                      step={step}
                      index={index}
                      isActive={false}
                      color="teal"
                    />
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Create a Ride - Right Side */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={scheduledInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.2, delay: 0.08, ease: [0.34, 1.56, 0.64, 1] }}
              whileHover={{ y: -5 }}
            >
              <Card className="hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-primary/30">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3">
                    <motion.div
                      className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"
                      whileHover={{ scale: 1.1, rotate: -5 }}
                    >
                      <ZapIcon className="w-5 h-5 text-primary" />
                    </motion.div>
                    <span>Create a Ride</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {scheduledCreateSteps.map((step, index) => (
                    <ScheduledStepItem
                      key={step.title}
                      step={step}
                      index={index}
                      isActive={false}
                      color="primary"
                    />
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </AsymmetricSection>

          {/* Connection indicator between cards */}
          <motion.div
            className="hidden md:flex justify-center my-8"
            initial={{ opacity: 0, scale: 0 }}
            animate={scheduledInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-0.5 bg-gradient-to-r from-teal to-transparent" />
              <motion.div
                className="w-10 h-10 rounded-full bg-gradient-to-r from-teal to-primary flex items-center justify-center"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              >
                <ArrowRightIcon className="w-5 h-5 text-white" />
              </motion.div>
              <div className="w-16 h-0.5 bg-gradient-to-l from-primary to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-primary to-primary/90 relative overflow-hidden">
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
              <span className="text-white text-sm font-semibold">Start Your Journey</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-teal-100">Saving?</span>
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Download Snapgo now and join thousands of users already saving on their daily commute.
            </p>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              <Button size="xl" className="bg-white text-primary hover:bg-white/90 shadow-2xl shadow-white/20" asChild>
                <Link href="/#download">
                  <DownloadIcon className="w-5 h-5 mr-2" />
                  Download App
                </Link>
              </Button>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>
    </SiteLayout>
  )
}
