import { NextResponse } from 'next/server'
import { sampleCategories } from '@/lib/data'

export async function GET() {
  return NextResponse.json({
    categories: sampleCategories,
    total: sampleCategories.length
  })
}

// This would typically create a new category (admin functionality)
export async function POST(request: Request) {
  const body = await request.json()
  
  // In a real app, this would save to a database
  return NextResponse.json(
    { 
      message: 'Category created successfully',
      id: `cat-${Date.now()}`,
      ...body 
    },
    { status: 201 }
  )
}