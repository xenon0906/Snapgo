'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { SiteLayout } from '@/components/layout/SiteLayout'
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react'
import { PageHero } from '@/components/shared/PageHero'

interface Blog {
  id: string
  title: string
  slug: string
  excerpt: string | null
  imageUrl: string | null
  createdAt: Date
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

function estimateReadTime(excerpt: string | null): string {
  const words = excerpt?.split(' ').length || 100
  const minutes = Math.ceil(words / 200) + 3
  return `${minutes} min read`
}

function BlogCard({ blog, index }: { blog: Blog; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Link href={`/blog/${blog.slug}`}>
        <Card className="h-full group overflow-hidden hover:shadow-xl transition-all duration-200 cursor-pointer">
          {/* Image */}
          <div className="relative h-48 overflow-hidden bg-muted">
            {blog.imageUrl ? (
              <Image
                src={blog.imageUrl}
                alt={blog.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary to-teal flex items-center justify-center">
                <span className="text-4xl font-bold text-white opacity-30">
                  {blog.title.charAt(0)}
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          <CardContent className="p-6">
            {/* Meta */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(blog.createdAt)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {estimateReadTime(blog.excerpt)}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold mb-2 group-hover:text-teal transition-colors line-clamp-2">
              {blog.title}
            </h3>

            {/* Excerpt */}
            {blog.excerpt && (
              <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                {blog.excerpt}
              </p>
            )}

            {/* Read more */}
            <motion.div
              className="flex items-center gap-2 text-teal font-medium text-sm"
              whileHover={{ x: 5 }}
            >
              Read more
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}

export function BlogList({ blogs }: { blogs: Blog[] }) {
  return (
    <SiteLayout>
      <PageHero
        badge="Blog"
        title="Latest from"
        titleHighlight="Snapgo"
        description="Tips, stories, and insights about ride-sharing, saving money, and sustainable travel in India."
        icon={<BookOpen className="w-5 h-5" />}
      />

      {/* Blog Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {blogs.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog, index) => (
                <BlogCard key={blog.id} blog={blog} index={index} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-6"
              >
                <span className="text-4xl">📝</span>
              </motion.div>
              <h2 className="text-2xl font-bold mb-4">No articles yet</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                We're working on some great content. Check back soon for tips on saving money, ride-sharing stories, and more!
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </SiteLayout>
  )
}
