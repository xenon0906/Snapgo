import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { BlogPost } from './BlogPost'
import { SITE_CONFIG } from '@/lib/constants'

export const revalidate = 3600

interface Props {
  params: { slug: string }
}

async function getBlog(slug: string) {
  try {
    const blog = await prisma.blog.findUnique({
      where: { slug, published: true },
    })
    return blog
  } catch (error) {
    console.error('Error fetching blog:', error)
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params
  const blog = await getBlog(slug)

  if (!blog) {
    return {
      title: 'Blog Post Not Found',
    }
  }

  return {
    title: blog.title,
    description: blog.metaDesc || blog.excerpt || `Read ${blog.title} on snapgo blog`,
    keywords: blog.keywords ? JSON.parse(blog.keywords as string) : undefined,
    openGraph: {
      title: blog.title,
      description: blog.metaDesc || blog.excerpt || undefined,
      type: 'article',
      publishedTime: blog.createdAt.toISOString(),
      modifiedTime: blog.updatedAt.toISOString(),
      images: blog.imageUrl ? [{ url: blog.imageUrl }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.metaDesc || blog.excerpt || undefined,
      images: blog.imageUrl ? [blog.imageUrl] : undefined,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = params
  const blog = await getBlog(slug)

  if (!blog) {
    notFound()
  }

  // JSON-LD structured data for the article
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    description: blog.metaDesc || blog.excerpt,
    image: blog.imageUrl,
    datePublished: blog.createdAt.toISOString(),
    dateModified: blog.updatedAt.toISOString(),
    author: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.url}/images/logo/Snapgo%20Logo%20White.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_CONFIG.url}/blog/${blog.slug}`,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPost blog={blog} />
    </>
  )
}
