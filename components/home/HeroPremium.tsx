'use client'

import { useRef, useState, useEffect } from 'react'
import { useInView } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { Download, ArrowRight, Play } from 'lucide-react'
import { HeroContentData } from '@/lib/content'

// Animated counter component - Rapido style
function AnimatedMetric({ value, suffix = '', label, isEco = false }: { value: number; suffix?: string; label: string; isEco?: boolean }) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true)
      let startTime: number
      const duration = 2000
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / duration, 1)
        setCount(Math.floor(progress * value))
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }
  }, [isInView, value, hasAnimated])

  return (
    <div ref={ref} className="text-center">
      <div className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold ${isEco ? 'text-emerald-500' : 'text-gray-900'}`}>
        {count.toLocaleString()}{suffix}
      </div>
      <div className={`text-xs sm:text-sm md:text-base mt-1 ${isEco ? 'text-emerald-600' : 'text-gray-500'}`}>{label}</div>
    </div>
  )
}

// Default hero content
const DEFAULT_HERO: HeroContentData = {
  id: 'default',
  headline: 'Share Rides. Save More.',
  subtext: 'Connect with verified co-riders heading your way. Save up to 75% on your daily commute while reducing your carbon footprint.',
  badge: "India's #1 Ride-Sharing Platform",
  ctaPrimary: 'Download App',
  ctaSecondary: 'Watch Demo',
  isActive: true,
}

interface HeroPremiumProps {
  hero?: HeroContentData
}

export function HeroPremium({ hero }: HeroPremiumProps = {}) {
  const displayHero = hero || DEFAULT_HERO

  // Impact metrics - Rapido style
  const metrics = [
    { value: 8500, suffix: '+', label: 'Downloads' },
    { value: 150, suffix: '+', label: 'Daily Rides' },
    { value: 500, suffix: '+', label: 'Trees Saved', isEco: true },
  ]

  return (
    <section className="hero-viewport bg-white">
      <div className="container mx-auto px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            {/* Bold stacked headline - Rapido inspired */}
            <h1 className="text-[1.75rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6">
              <span className="text-gray-900 block whitespace-nowrap">Share Rides.</span>
              <span className="text-[#0e4493] block whitespace-nowrap">Save ₹12,000/year.</span>
            </h1>

            {/* Subheadline - clean, single paragraph */}
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {displayHero.subtext}
            </p>

            {/* Impact Metrics Row - Rapido style */}
            <div className="flex justify-center lg:justify-start gap-4 sm:gap-6 md:gap-10 lg:gap-12 mb-10 py-6 border-y border-gray-100">
              {metrics.map((metric) => (
                <AnimatedMetric
                  key={metric.label}
                  value={metric.value}
                  suffix={metric.suffix}
                  label={metric.label}
                  isEco={metric.isEco}
                />
              ))}
            </div>

            {/* CTAs - prominent, clean */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button
                size="xl"
                className="w-full sm:w-auto bg-[#0e4493] hover:bg-[#0a3577] text-white px-8"
                asChild
              >
                <Link href="#download">
                  <Download className="w-5 h-5 mr-2" />
                  {displayHero.ctaPrimary || 'Download App'}
                </Link>
              </Button>
              <Button
                size="xl"
                variant="outline"
                className="w-full sm:w-auto border-gray-300 hover:bg-gray-50 px-8"
                asChild
              >
                <Link href="/about">
                  <Play className="w-5 h-5 mr-2" />
                  {displayHero.ctaSecondary || 'Watch Demo'}
                </Link>
              </Button>
            </div>

            {/* Trust badges - simple inline text */}
            <div className="flex items-center justify-center lg:justify-start gap-2 text-sm text-gray-500">
              <span className="font-medium text-gray-700">DPIIT Certified</span>
              <span>•</span>
              <span className="font-medium text-gray-700">Startup India</span>
              <span>•</span>
              <span className="font-medium text-gray-700">Startup Uttarakhand</span>
            </div>
          </div>

          {/* Right side - Phone mockup like App Preview section */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-[200px] xs:w-[220px] sm:w-[247px] md:w-[285px] lg:w-[304px] max-w-[70vw] aspect-[9/19] rounded-[2.5rem] overflow-hidden shadow-2xl">
              {/* Phone frame */}
              <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 rounded-[2.5rem]" />
              {/* Screen */}
              <div className="absolute inset-[3px] rounded-[2.3rem] overflow-hidden bg-black">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl z-20" />
                <Image
                  src="/images/mockups/home-screen.png"
                  alt="Snapgo App"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
