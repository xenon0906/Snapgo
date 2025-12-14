'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SiteLayout } from '@/components/layout/SiteLayout'
import { PageHero } from '@/components/shared/PageHero'
import { ScrollReveal } from '@/components/shared/animations'
import { TEAM_MEMBERS } from '@/lib/constants'
import { Linkedin, Twitter, Mail, Users, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface TeamMember {
  id?: string
  name: string
  bio?: string | null
  details?: string | null
  imageUrl?: string | null
  portraitUrl?: string | null
  email?: string | null
  linkedin?: string | null
  twitter?: string | null
  order: number
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

function getGradientClass(index: number): string {
  const gradients = [
    'from-primary to-primary/70',
    'from-teal-500 to-teal-600',
    'from-primary to-teal-500',
    'from-teal-600 to-primary',
    'from-primary/80 to-teal-500/80',
    'from-teal-500 to-primary/70',
    'from-primary/90 to-teal-600',
  ]
  return gradients[index % gradients.length]
}

function TeamMemberCard({ member, index }: { member: TeamMember; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.25, delay: index * 0.05, ease: [0.34, 1.56, 0.64, 1] }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="h-full"
    >
      <Card className={cn(
        "h-full overflow-hidden transition-all duration-200",
        isHovered ? "shadow-lg border-primary/30" : "shadow-sm hover:shadow-md"
      )}>
        <CardContent className="p-0 flex flex-col h-full">
          {/* Portrait Photo Section */}
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-gradient-to-br">
            {member.portraitUrl ? (
              <Image
                src={member.portraitUrl}
                alt={member.name}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            ) : (
              <div className={cn(
                "w-full h-full bg-gradient-to-br flex flex-col items-center justify-center",
                getGradientClass(index)
              )}>
                {/* Large initials as placeholder */}
                <span className="text-5xl md:text-6xl font-bold text-white/90 mb-2">
                  {getInitials(member.name)}
                </span>
                <User className="w-12 h-12 text-white/40" />
              </div>
            )}

            {/* Hover overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0.3 }}
              transition={{ duration: 0.2 }}
            />

            {/* Name overlay on image */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-xl md:text-2xl font-bold text-white drop-shadow-lg">
                {member.name}
              </h3>
            </div>
          </div>

          {/* Details/Information Box */}
          <div className="p-5 flex flex-col flex-grow bg-white">
            {/* Details box */}
            {(member.details || member.bio) && (
              <div className="mb-4 p-4 bg-muted/50 rounded-lg border border-border/50">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {member.details || member.bio}
                </p>
              </div>
            )}

            {/* If no details, show placeholder */}
            {!member.details && !member.bio && (
              <div className="mb-4 p-4 bg-muted/30 rounded-lg border border-dashed border-border/50">
                <p className="text-sm text-muted-foreground/60 italic text-center">
                  Information coming soon
                </p>
              </div>
            )}

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-auto pt-2">
              {member.email && (
                <motion.a
                  href={`mailto:${member.email}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-colors duration-150"
                >
                  <Mail className="w-4 h-4" />
                </motion.a>
              )}
              {member.linkedin && (
                <motion.a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-[#0077B5] hover:text-white transition-colors duration-150"
                >
                  <Linkedin className="w-4 h-4" />
                </motion.a>
              )}
              {member.twitter && (
                <motion.a
                  href={member.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-[#1DA1F2] hover:text-white transition-colors duration-150"
                >
                  <Twitter className="w-4 h-4" />
                </motion.a>
              )}
              {!member.email && !member.linkedin && !member.twitter && (
                <span className="text-xs text-muted-foreground/50">No social links</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function TeamGrid() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [animationParent] = useAutoAnimate()

  useEffect(() => {
    async function fetchTeamMembers() {
      try {
        const res = await fetch('/api/team')
        if (res.ok) {
          const data = await res.json()
          if (data && data.length > 0) {
            setTeamMembers(data)
          } else {
            // Fall back to constants if no data in DB
            setTeamMembers(TEAM_MEMBERS as TeamMember[])
          }
        } else {
          setTeamMembers(TEAM_MEMBERS as TeamMember[])
        }
      } catch (error) {
        console.error('Error fetching team:', error)
        setTeamMembers(TEAM_MEMBERS as TeamMember[])
      } finally {
        setLoading(false)
      }
    }
    fetchTeamMembers()
  }, [])

  return (
    <section ref={ref} className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <ScrollReveal direction="up" className="text-center mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            Our People
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Meet the <span className="text-primary">Team</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The passionate individuals behind Snapgo who are working to revolutionize urban transportation in India.
          </p>
        </ScrollReveal>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div
            ref={animationParent}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {teamMembers.map((member, index) => (
              <TeamMemberCard key={member.id || member.name} member={member} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function JoinTeamSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <Users className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold mb-4">
            Want to Join Our Team?
          </h2>
          <p className="text-muted-foreground mb-8">
            We're always looking for talented individuals who share our passion for making urban transportation
            more accessible and affordable. If you're excited about building something meaningful, we'd love to hear from you.
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors duration-150"
          >
            Get in Touch
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default function TeamPage() {
  return (
    <SiteLayout>
      <PageHero
        badge="Our Team"
        title="The People Behind"
        titleHighlight="Snapgo"
        description="Meet the dedicated team working to transform how India commutes. Together, we're building a more connected and sustainable future."
        icon={<Users className="w-5 h-5" />}
      />

      <TeamGrid />
      <JoinTeamSection />
    </SiteLayout>
  )
}
