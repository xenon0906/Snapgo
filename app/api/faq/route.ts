import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { validateAdminSession } from '@/lib/api-auth'

// GET all FAQs
export async function GET() {
  try {
    const faqs = await prisma.fAQ.findMany({
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(faqs)
  } catch (error) {
    console.error('Error fetching FAQs:', error)
    return NextResponse.json({ error: 'Failed to fetch FAQs' }, { status: 500 })
  }
}

// POST create new FAQ
export async function POST(request: NextRequest) {
  try {
    const isAdmin = await validateAdminSession(request)
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { question, answer, category, visible, order } = body

    const faq = await prisma.fAQ.create({
      data: {
        question,
        answer,
        category: category || 'general',
        visible: visible ?? true,
        order: order || 0,
      },
    })

    return NextResponse.json(faq, { status: 201 })
  } catch (error) {
    console.error('Error creating FAQ:', error)
    return NextResponse.json({ error: 'Failed to create FAQ' }, { status: 500 })
  }
}

// PUT update multiple FAQs (for reordering)
export async function PUT(request: NextRequest) {
  try {
    const isAdmin = await validateAdminSession(request)
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { faqs } = body

    // Update all FAQs in a transaction
    await prisma.$transaction(
      faqs.map((faq: any) =>
        prisma.fAQ.update({
          where: { id: faq.id },
          data: {
            question: faq.question,
            answer: faq.answer,
            category: faq.category,
            visible: faq.visible,
            order: faq.order,
          },
        })
      )
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating FAQs:', error)
    return NextResponse.json({ error: 'Failed to update FAQs' }, { status: 500 })
  }
}

// DELETE FAQ
export async function DELETE(request: NextRequest) {
  try {
    const isAdmin = await validateAdminSession(request)
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'FAQ ID required' }, { status: 400 })
    }

    await prisma.fAQ.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting FAQ:', error)
    return NextResponse.json({ error: 'Failed to delete FAQ' }, { status: 500 })
  }
}
