'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { ABOUT_STORY, JOURNEY_TIMELINE, SITE_CONFIG } from '@/lib/constants'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SiteLayout } from '@/components/layout/SiteLayout'
import { MessageCircle, Car, Award, TrendingUp, Target, Eye, Heart, Users, Lightbulb, ArrowRight } from 'lucide-react'
import { PageHero } from '@/components/shared/PageHero'
import { ScrollReveal } from '@/components/shared/animations'
import { ANIMATION_CONFIG } from '@/lib/animation-config'
import { cn } from '@/lib/utils'

const timelineIcons: Record<string, React.ElementType> = {
  MessageCircle,
  Car,
  Award,
  TrendingUp,
}

function FounderStory() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-20 md:py-24 bg-muted/30 relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-primary/5 blur-[100px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal direction="up" className="text-center mb-10">
            <Badge variant="teal" className="mb-4">Our Story</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How <span className="text-primary">Snapgo</span> Was Born
            </h2>
          </ScrollReveal>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: ANIMATION_CONFIG.entrance.duration, delay: 0.1, ease: ANIMATION_CONFIG.entrance.ease }}
            className="space-y-6"
          >
            <Card className="overflow-hidden hover:shadow-lg transition-shadow border-border/50">
              <CardContent className="p-8 md:p-12">
                  <div className="flex items-start gap-4 mb-6">
                    <motion.div
                      whileHover={{ rotate: 15, scale: 1.1 }}
                      className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0"
                      animate={isInView ? { rotate: [0, 5, -5, 0] } : {}}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    >
                      <Lightbulb className="w-8 h-8 text-primary" />
                    </motion.div>
                    <div>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        {ABOUT_STORY.origin}
                      </p>
                    </div>
                  </div>

                  <motion.blockquote
                    className="border-l-4 border-primary pl-6 py-4 my-6 bg-primary/5 rounded-r-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.1, duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
                  >
                    <p className="text-xl font-medium italic text-foreground">
                      "{ABOUT_STORY.spark}"
                    </p>
                  </motion.blockquote>

                  <div className="flex items-center gap-4 pt-4">
                    <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-teal/10 border border-primary/20 flex items-center justify-center overflow-hidden p-2">
                      <Image
                        src="/images/logo/Snapgo%20Logo%20Blue.png"
                        alt="Snapgo"
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">Mohit & Surya Purohit</p>
                      <p className="text-sm text-muted-foreground">Co-Founders, Snapgo</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function MissionVisionValues() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeIndex, setActiveIndex] = useState(0)

  const items = [
    {
      icon: Target,
      title: 'Mission',
      content: ABOUT_STORY.mission,
      bgClass: 'bg-primary/10',
      textClass: 'text-primary',
    },
    {
      icon: Eye,
      title: 'Vision',
      content: ABOUT_STORY.vision,
      bgClass: 'bg-teal-500/10',
      textClass: 'text-teal-600',
    },
    {
      icon: Heart,
      title: 'Values',
      content: ABOUT_STORY.values,
      bgClass: 'bg-primary/10',
      textClass: 'text-primary',
    },
  ]

  // Auto-advance active item
  useEffect(() => {
    if (!isInView) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length)
    }, ANIMATION_CONFIG.highlight.autoAdvanceDelay)

    return () => clearInterval(interval)
  }, [isInView, items.length])

  return (
    <section ref={ref} className="py-20 md:py-24 bg-background relative">
      <div className="container mx-auto px-4">
        <ScrollReveal direction="up" className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Drives Us
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Our core beliefs that guide every decision we make.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {items.map((item, index) => {
            const isActive = activeIndex === index

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: ANIMATION_CONFIG.entrance.duration, delay: index * 0.05, ease: ANIMATION_CONFIG.entrance.ease }}
                whileHover={{ y: -5 }}
                onClick={() => setActiveIndex(index)}
                className="cursor-pointer"
              >
                <Card className={cn(
                  "h-full transition-all duration-200",
                  isActive
                    ? "shadow-lg border-primary/30"
                    : "hover:shadow-md"
                )}>
                  <CardContent className="p-8 text-center">
                    <div className={`w-16 h-16 rounded-2xl ${item.bgClass} flex items-center justify-center mx-auto mb-5`}>
                      <item.icon className={`w-8 h-8 ${item.textClass}`} />
                    </div>
                    <h3 className={cn(
                      "text-xl font-semibold mb-3 transition-colors",
                      isActive && item.textClass
                    )}>
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{item.content}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Timeline() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-20 md:py-24 bg-gradient-to-br from-primary to-primary/90 text-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
        backgroundSize: '40px 40px',
      }} />

      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal direction="up" className="text-center mb-12">
          <Badge className="mb-4 bg-white/20 text-white border-white/30">Our Journey</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Milestones Along the Way
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto text-lg">
            From a simple idea to a growing platform connecting thousands of commuters.
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {JOURNEY_TIMELINE.map((item, index) => {
            const Icon = timelineIcons[item.icon]

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: ANIMATION_CONFIG.entrance.duration, delay: index * 0.08, ease: ANIMATION_CONFIG.entrance.ease }}
              >
                <Card className="h-full bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-colors">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-white">
                      {item.title}
                    </h3>
                    <p className="text-white/70 text-sm">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function TeamSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-20 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <ScrollReveal direction="up" className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Meet the Founders
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            The passionate duo behind Snapgo's mission to revolutionize urban transportation.
          </p>
        </ScrollReveal>

        <div className="flex flex-wrap justify-center gap-8 max-w-3xl mx-auto">
          {SITE_CONFIG.founders.map((founder, index) => (
            <motion.div
              key={founder}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: ANIMATION_CONFIG.entrance.duration, delay: index * 0.1, ease: ANIMATION_CONFIG.entrance.ease }}
              whileHover={{ y: -5 }}
            >
              <Card className="w-64 text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-teal-500 mx-auto mb-5 flex items-center justify-center">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-1">
                    {founder}
                  </h3>
                  <p className="text-muted-foreground">Co-Founder</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA to view full team */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          <a
            href="/team"
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
          >
            View full team
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default function AboutPage() {
  return (
    <SiteLayout>
      <PageHero
        badge="About Us"
        title="Revolutionizing Urban"
        titleHighlight="Transportation"
        description="Connect with people going to the same destination. Share a cab, split the fare, and reduce your carbon footprint together."
        trustBadges={[
          { label: 'DPIIT Certified', variant: 'primary' },
          { label: 'Startup India', variant: 'teal' },
        ]}
      />

      <FounderStory />
      <MissionVisionValues />
      <Timeline />
      <TeamSection />
    </SiteLayout>
  )
}
