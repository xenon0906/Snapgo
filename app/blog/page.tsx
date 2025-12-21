import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { BlogList } from './BlogList'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read the latest articles about ride-sharing, saving money on commute, and sustainable travel tips from snapgo.',
}

export const dynamic = 'force-dynamic'

async function getBlogs() {
  try {
    const blogs = await prisma.blog.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        imageUrl: true,
        createdAt: true,
      },
    })
    return blogs
  } catch (error) {
    console.error('Error fetching blogs:', error)
    return []
  }
}

export default async function BlogPage() {
  const blogs = await getBlogs()
  return <BlogList blogs={blogs} />
}
