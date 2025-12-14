'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SiteLayout } from '@/components/layout/SiteLayout'
import Link from 'next/link'
import { SAFETY_FEATURES } from '@/lib/constants'
import {
  ShieldCheckIcon,
  UserCheckIcon,
  AlertIcon,
  MessageIcon,
  HistoryIcon,
  ClockIcon,
  LockIcon,
  CheckCircleIcon,
  DownloadIcon,
  MapPinIcon,
  UsersIcon,
  SparklesIcon,
  IconMap,
} from '@/components/ui/icon'
import { PageHero } from '@/components/shared/PageHero'
import { GlowHighlight, StepCounter, ScrollReveal, FloatingOrb } from '@/components/shared/animations'
import { AlternatingContent, AsymmetricGrid } from '@/components/shared/layouts'
import { ANIMATION_CONFIG } from '@/lib/animation-config'

const safetyIconMap: Record<string, React.FC<{ className?: string; size?: number }>> = {
  ShieldCheck: ShieldCheckIcon,
  UserCheck: UserCheckIcon,
  AlertTriangle: AlertIcon,
}

const moreSafetyMeasures = [
  { icon: MessageIcon, title: 'Chat Records', description: 'All conversations saved and accessible for dispute resolution' },
  { icon: HistoryIcon, title: 'Trip History', description: 'Complete record of all your rides maintained securely' },
  { icon: ClockIcon, title: '24-Hour Support', description: 'Dispute resolution team responds within 24 hours' },
  { icon: LockIcon, title: 'Data Privacy', description: 'Your personal information encrypted and protected' },
]

const sosFeatures = [
  { icon: MapPinIcon, label: 'Your live GPS location' },
  { icon: UsersIcon, label: 'Trip details (source/destination)' },
  { icon: UserCheckIcon, label: 'Co-rider information' },
  { icon: ClockIcon, label: 'Timestamp of alert' },
]

const sosHowItWorks = [
  'Add up to 3 emergency contacts',
  'One-tap SOS activation',
  'Instant SMS & app notification',
  'Live location tracking link',
]

// Enhanced Safety Feature Card with Asymmetric Layout
function SafetyFeatureCard({
  feature,
  index,
  isInView,
}: {
  feature: typeof SAFETY_FEATURES[0]
  index: number
  isInView: boolean
}) {
  const Icon = safetyIconMap[feature.icon]
  const isEven = index % 2 === 0
  const color = isEven ? 'teal' : 'primary'

  return (
    <AlternatingContent
      index={index}
      className="mb-8"
      content={
        <motion.div
          initial={{ opacity: 0, x: isEven ? -50 : 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: index * 0.2 }}
        >
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 ${isEven ? 'bg-teal/10' : 'bg-primary/10'}`}>
            <StepCounter step={index + 1} isActive={true} size="sm" color={color} />
            <span className={`text-sm font-medium ${isEven ? 'text-teal' : 'text-primary'}`}>
              Safety Feature
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-4">{feature.title}</h3>
          <p className="text-muted-foreground mb-6 text-lg">{feature.description}</p>
          <ul className="space-y-3">
            {feature.points.map((point, i) => (
              <motion.li
                key={point}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex items-start gap-3"
              >
                <motion.div
                  className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${isEven ? 'bg-teal/20' : 'bg-primary/20'}`}
                  whileHover={{ scale: 1.2 }}
                >
                  <CheckCircleIcon className={`w-4 h-4 ${isEven ? 'text-teal' : 'text-primary'}`} />
                </motion.div>
                <span className="text-foreground">{point}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      }
      visual={
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center"
        >
          <GlowHighlight isActive={true} color={color} intensity="medium" pulse={true}>
            <motion.div
              className={`w-40 h-40 md:w-56 md:h-56 rounded-3xl flex items-center justify-center ${isEven ? 'bg-gradient-to-br from-teal/20 to-teal/5' : 'bg-gradient-to-br from-primary/20 to-primary/5'}`}
              whileHover={{ scale: 1.05, rotate: 5 }}
              animate={{ rotate: [0, 2, -2, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Icon className={`w-20 h-20 md:w-28 md:h-28 ${isEven ? 'text-teal' : 'text-primary'}`} />
            </motion.div>
          </GlowHighlight>
        </motion.div>
      }
    />
  )
}

// SOS Step with Enhanced Animation
function SOSStep({
  step,
  index,
  isActive,
  total,
}: {
  step: string
  index: number
  isActive: boolean
  total: number
}) {
  return (
    <motion.div
      className="flex items-center gap-4 relative"
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
    >
      {/* Step number with glow */}
      <GlowHighlight isActive={isActive} color="teal" pulse={isActive} className="flex-shrink-0">
        <motion.div
          className={`
            w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg
            transition-all duration-500
            ${isActive ? 'bg-teal text-white shadow-lg shadow-teal/40' : 'bg-teal/20 text-teal'}
          `}
          animate={isActive ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.6 }}
        >
          {index + 1}
        </motion.div>
      </GlowHighlight>

      {/* Content */}
      <motion.span
        className={`text-lg ${isActive ? 'text-white font-medium' : 'text-white/70'}`}
        animate={isActive ? { x: [0, 5, 0] } : {}}
        transition={{ duration: 0.5 }}
      >
        {step}
      </motion.span>

      {/* Connection line */}
      {index < total - 1 && (
        <motion.div
          className="absolute left-6 top-14 w-0.5 h-6 bg-gradient-to-b from-teal/50 to-transparent"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15 + 0.2 }}
        />
      )}
    </motion.div>
  )
}

export default function SafetyPage() {
  const mainRef = useRef<HTMLDivElement>(null)
  const sosRef = useRef<HTMLDivElement>(null)
  const moreRef = useRef<HTMLDivElement>(null)
  const mainInView = useInView(mainRef, { once: true, margin: '-100px' })
  const sosInView = useInView(sosRef, { once: true, margin: '-100px' })
  const moreInView = useInView(moreRef, { once: true, margin: '-100px' })

  // Auto-advance SOS steps
  const [activeSOSStep, setActiveSOSStep] = useState(0)
  useEffect(() => {
    if (!sosInView) return
    const interval = setInterval(() => {
      setActiveSOSStep((prev) => (prev + 1) % 4)
    }, 2500)
    return () => clearInterval(interval)
  }, [sosInView])

  return (
    <SiteLayout>
      <PageHero
        badge="Safety First"
        title="Your Safety is"
        titleHighlight="Our Priority"
        description="Multiple layers of security to ensure every ride is safe and verified."
        icon={<ShieldCheckIcon className="w-5 h-5" />}
        trustBadges={[
          { label: '100% KYC Verified', variant: 'teal' },
          { label: 'SOS Protection', variant: 'primary' },
        ]}
      />

      {/* Main Safety Features - Asymmetric Layout */}
      <section ref={mainRef} className="py-20 bg-background relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-20 right-0 w-[400px] h-[400px] rounded-full bg-teal/5 blur-[100px]"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 12, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 left-0 w-[300px] h-[300px] rounded-full bg-primary/5 blur-[80px]"
            animate={{ scale: [1.2, 1, 1.2] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal direction="up" className="text-center mb-16">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-teal/10 rounded-full mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <ShieldCheckIcon className="w-5 h-5 text-teal" />
              <span className="text-teal font-medium">Core Safety Features</span>
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Built-in <span className="text-teal">Protection</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every feature designed with your safety in mind.
            </p>
          </ScrollReveal>

          <div className="max-w-5xl mx-auto space-y-16">
            {SAFETY_FEATURES.slice(0, 2).map((feature, index) => (
              <SafetyFeatureCard
                key={feature.title}
                feature={feature}
                index={index}
                isInView={mainInView}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SOS Feature - Enhanced with Step Sequence */}
      <section ref={sosRef} className="py-20 bg-gray-900 text-white relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-red-500/10 blur-[150px]"
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal direction="up" className="text-center mb-12">
              {/* Pulsing emergency icon */}
              <motion.div
                className="relative w-24 h-24 mx-auto mb-6"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full bg-red-500/20"
                  animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full bg-red-500/30"
                  animate={{ scale: [1, 1.3], opacity: [0.4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                />
                <div className="absolute inset-0 rounded-full bg-red-500/20 flex items-center justify-center">
                  <AlertIcon className="w-12 h-12 text-red-400" />
                </div>
              </motion.div>

              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Emergency <span className="text-red-400">SOS</span> Feature
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto text-lg">
                Your safety net in case of emergencies. Instantly alert trusted contacts with your location and trip details.
              </p>
            </ScrollReveal>

            {/* Two-column layout */}
            <div className="grid md:grid-cols-2 gap-10">
              {/* What Gets Shared */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={sosInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="bg-white/5 border-white/10 hover:border-red-500/30 transition-all h-full">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-white flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                        <AlertIcon className="w-5 h-5 text-red-400" />
                      </div>
                      What Gets Shared
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {sosFeatures.map((item, index) => {
                      const Icon = item.icon
                      return (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, x: -20 }}
                          animate={sosInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                          whileHover={{ x: 5 }}
                        >
                          <motion.div
                            className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                          >
                            <Icon className="w-6 h-6 text-red-400" />
                          </motion.div>
                          <span className="text-white/90 font-medium">{item.label}</span>
                        </motion.div>
                      )
                    })}
                  </CardContent>
                </Card>
              </motion.div>

              {/* How It Works - Step Sequence */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={sosInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className="bg-white/5 border-white/10 hover:border-teal/30 transition-all h-full">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-white flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-teal/20 flex items-center justify-center">
                        <SparklesIcon className="w-5 h-5 text-teal" />
                      </div>
                      How It Works
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {sosHowItWorks.map((step, index) => (
                      <SOSStep
                        key={step}
                        step={step}
                        index={index}
                        isActive={activeSOSStep === index}
                        total={sosHowItWorks.length}
                      />
                    ))}

                    {/* Progress indicator */}
                    <div className="flex justify-center gap-2 pt-4">
                      {sosHowItWorks.map((_, index) => (
                        <motion.button
                          key={index}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            activeSOSStep === index ? 'w-6 bg-teal' : 'w-1.5 bg-white/30'
                          }`}
                          onClick={() => setActiveSOSStep(index)}
                          whileHover={{ scale: 1.2 }}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* More Safety Measures - Asymmetric Grid */}
      <section ref={moreRef} className="py-20 bg-muted/50 relative overflow-hidden">
        {/* Floating background orbs */}
        <FloatingOrb
          className="absolute top-20 right-10 opacity-20"
          size="lg"
          color="blue"
          speed={0.4}
        />

        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal direction="up" className="text-center mb-12">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <LockIcon className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium">Additional Protection</span>
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              More Safety <span className="text-primary">Measures</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Additional features that ensure your peace of mind.
            </p>
          </ScrollReveal>

          {/* Asymmetric grid layout */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {moreSafetyMeasures.map((item, index) => {
              const Icon = item.icon
              const isOdd = index % 2 !== 0
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30, x: isOdd ? 20 : -20 }}
                  animate={moreInView ? { opacity: 1, y: 0, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className={isOdd ? 'lg:mt-8' : ''}
                >
                  <GlowHighlight isActive={false} color="primary">
                    <Card className="h-full text-center hover:shadow-xl hover:border-primary/30 transition-all duration-500">
                      <CardContent className="p-6">
                        <motion.div
                          className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          <Icon className="w-8 h-8 text-primary" />
                        </motion.div>
                        <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </CardContent>
                    </Card>
                  </GlowHighlight>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Trust Statement - CTA */}
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
          <ScrollReveal direction="up" className="max-w-3xl mx-auto">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-8"
            >
              <ShieldCheckIcon className="w-12 h-12 text-teal-300" />
            </motion.div>

            <blockquote className="text-xl md:text-2xl font-medium text-white mb-8 leading-relaxed">
              "From day one, safety has been our top priority. Every feature, every verification, every protection is designed to ensure your journey is secure."
            </blockquote>

            <Badge className="bg-white/20 text-white border-0 text-lg px-6 py-2 mb-10">
              100% KYC Verified Platform
            </Badge>

            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              <Button size="xl" className="bg-white text-primary hover:bg-white/90 shadow-2xl shadow-white/20" asChild>
                <Link href="/#download">
                  <DownloadIcon className="w-5 h-5 mr-2" />
                  Download Snapgo
                </Link>
              </Button>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>
    </SiteLayout>
  )
}
