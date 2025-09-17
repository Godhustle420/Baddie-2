import { NextResponse } from 'next/server'
import { sampleProducts } from '@/lib/data'

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function GET(
  request: Request,
  { params }: RouteParams
) {
  const { id } = await params
  const product = sampleProducts.find(p => p.id === id)

  if (!product) {
    return NextResponse.json(
      { error: 'Product not found' },
      { status: 404 }
    )
  }

  return NextResponse.json(product)
}

// This would typically update a product (admin functionality)
export async function PUT(
  request: Request,
  { params }: RouteParams
) {
  const { id } = await params
  const body = await request.json()
  const product = sampleProducts.find(p => p.id === id)

  if (!product) {
    return NextResponse.json(
      { error: 'Product not found' },
      { status: 404 }
    )
  }

  // In a real app, this would update the database
  return NextResponse.json({
    message: 'Product updated successfully',
    id: id,
    ...body
  })
}

// This would typically delete a product (admin functionality)
export async function DELETE(
  request: Request,
  { params }: RouteParams
) {
  const { id } = await params
  const product = sampleProducts.find(p => p.id === id)

  if (!product) {
    return NextResponse.json(
      { error: 'Product not found' },
      { status: 404 }
    )
  }

  // In a real app, this would delete from the database
  return NextResponse.json({
    message: 'Product deleted successfully',
    id: id
  })
}