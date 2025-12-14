'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { SiteLayout } from '@/components/layout/SiteLayout'
import { SITE_CONFIG } from '@/lib/constants'
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, MessageSquare, HelpCircle, AlertCircle } from 'lucide-react'
import { PageHero } from '@/components/shared/PageHero'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
})

type ContactForm = z.infer<typeof contactSchema>

const contactMethods = [
  {
    icon: Mail,
    title: 'Email',
    value: SITE_CONFIG.email,
    description: 'Response within 24 hours',
    href: `mailto:${SITE_CONFIG.email}`,
  },
  {
    icon: Phone,
    title: 'Phone',
    value: SITE_CONFIG.phone,
    description: 'Mon-Fri, 9 AM - 6 PM IST',
    href: `tel:${SITE_CONFIG.phone}`,
  },
  {
    icon: MapPin,
    title: 'Address',
    value: 'Block 45, Sharda University',
    description: 'Greater Noida, India',
    href: '#',
  },
]

const helpSections = [
  {
    icon: HelpCircle,
    title: 'General Inquiries',
    description: 'For questions about Snapgo, features, or how the app works, email info@snapgo.co.in',
  },
  {
    icon: AlertCircle,
    title: 'Report an Issue',
    description: 'Experiencing problems or want to report a dispute? Use in-app help desk or email with details',
  },
  {
    icon: Clock,
    title: 'Response Time',
    description: 'We aim to respond to all inquiries within 24 hours. Urgent safety issues get immediate response.',
  },
]

export default function ContactPage() {
  const formRef = useRef<HTMLDivElement>(null)
  const formInView = useInView(formRef, { once: true, margin: '-100px' })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log('Form submitted:', data)
    setIsSubmitting(false)
    setIsSubmitted(true)
    reset()
  }

  return (
    <SiteLayout>
      <PageHero
        badge="Contact Us"
        title="Get in"
        titleHighlight="Touch"
        description="Have questions, feedback, or need support? We're here to help you."
        icon={<MessageSquare className="w-5 h-5" />}
        trustBadges={[
          { label: '24hr Response', variant: 'teal' },
        ]}
      />

      {/* Contact Methods */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
            {contactMethods.map((method, index) => {
              const Icon = method.icon
              return (
                <motion.a
                  key={method.title}
                  href={method.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.03, ease: [0.34, 1.56, 0.64, 1] }}
                  whileHover={{ y: -5 }}
                  className="block"
                >
                  <Card className="h-full text-center hover:shadow-xl hover:border-teal/50 transition-all duration-300 cursor-pointer group">
                    <CardContent className="p-6">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-14 h-14 rounded-xl bg-teal/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-teal/20 transition-colors"
                      >
                        <Icon className="w-7 h-7 text-teal" />
                      </motion.div>
                      <h3 className="font-semibold mb-1">{method.title}</h3>
                      <p className="text-primary font-medium mb-1">{method.value}</p>
                      <p className="text-sm text-muted-foreground">{method.description}</p>
                    </CardContent>
                  </Card>
                </motion.a>
              )
            })}
          </div>

          {/* Contact Form & Help */}
          <div ref={formRef} className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={formInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.3 }}
            >
              <Card className="hover:shadow-xl transition-all">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>

                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-16 h-16 rounded-full bg-teal/20 flex items-center justify-center mx-auto mb-4"
                      >
                        <CheckCircle className="w-8 h-8 text-teal" />
                      </motion.div>
                      <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                      <p className="text-muted-foreground mb-4">
                        Thank you for reaching out. We'll get back to you within 24 hours.
                      </p>
                      <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                        Send another message
                      </Button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name</Label>
                        <Input
                          id="name"
                          placeholder="John Doe"
                          {...register('name')}
                          className={errors.name ? 'border-red-500' : ''}
                        />
                        {errors.name && (
                          <p className="text-sm text-red-500">{errors.name.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          {...register('email')}
                          className={errors.email ? 'border-red-500' : ''}
                        />
                        {errors.email && (
                          <p className="text-sm text-red-500">{errors.email.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          placeholder="How can we help?"
                          {...register('subject')}
                          className={errors.subject ? 'border-red-500' : ''}
                        />
                        {errors.subject && (
                          <p className="text-sm text-red-500">{errors.subject.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          placeholder="Tell us more about your inquiry..."
                          rows={5}
                          {...register('message')}
                          className={errors.message ? 'border-red-500' : ''}
                        />
                        {errors.message && (
                          <p className="text-sm text-red-500">{errors.message.message}</p>
                        )}
                      </div>

                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          type="submit"
                          variant="gradient"
                          size="lg"
                          className="w-full"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="w-5 h-5 mr-2" />
                              Send Message
                            </>
                          )}
                        </Button>
                      </motion.div>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Help */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={formInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.2, delay: 0.05, ease: [0.34, 1.56, 0.64, 1] }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold">Quick Help</h2>

              {helpSections.map((section, index) => {
                const Icon = section.icon
                return (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={formInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <Card className="hover:shadow-md transition-all">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0"
                          >
                            <Icon className="w-6 h-6 text-primary" />
                          </motion.div>
                          <div>
                            <h3 className="font-semibold mb-1">{section.title}</h3>
                            <p className="text-sm text-muted-foreground">{section.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}

              {/* Company Badge */}
              <motion.div
                whileHover={{ scale: 1.02 }}
              >
                <Card className="bg-gradient-to-r from-primary to-teal text-white">
                  <CardContent className="p-6 text-center">
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4"
                    >
                      <MessageSquare className="w-8 h-8" />
                    </motion.div>
                    <p className="font-medium">
                      {SITE_CONFIG.legalName}
                    </p>
                    <p className="text-sm text-white/80 mt-2">
                      Officially registered and recognized by the Government of India under the Startup India initiative
                    </p>
                    <div className="flex justify-center gap-2 mt-4">
                      <Badge className="bg-white/20 text-white border-0">DPIIT Certified</Badge>
                      <Badge className="bg-white/20 text-white border-0">Startup India</Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}
