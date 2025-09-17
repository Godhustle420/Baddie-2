import { NextResponse } from 'next/server'
import { sampleProducts } from '@/lib/data'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const search = searchParams.get('search')
  const minPrice = searchParams.get('minPrice')
  const maxPrice = searchParams.get('maxPrice')
  const condition = searchParams.get('condition')
  const sale = searchParams.get('sale')
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '12')

  let filteredProducts = [...sampleProducts]

  // Apply filters
  if (category) {
    filteredProducts = filteredProducts.filter(p => p.category === category)
  }

  if (search) {
    const searchLower = search.toLowerCase()
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(searchLower) ||
      p.description.toLowerCase().includes(searchLower) ||
      p.tags.some(tag => tag.toLowerCase().includes(searchLower))
    )
  }

  if (minPrice) {
    filteredProducts = filteredProducts.filter(p => p.price >= parseInt(minPrice))
  }

  if (maxPrice) {
    filteredProducts = filteredProducts.filter(p => p.price <= parseInt(maxPrice))
  }

  if (condition) {
    filteredProducts = filteredProducts.filter(p => p.condition === condition)
  }

  if (sale === 'true') {
    filteredProducts = filteredProducts.filter(p => p.isOnSale)
  }

  // Pagination
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex)

  return NextResponse.json({
    products: paginatedProducts,
    pagination: {
      page,
      limit,
      total: filteredProducts.length,
      totalPages: Math.ceil(filteredProducts.length / limit),
      hasNext: endIndex < filteredProducts.length,
      hasPrev: page > 1
    }
  })
}

// This would typically create a new product (admin functionality)
export async function POST(request: Request) {
  const body = await request.json()
  
  // In a real app, this would save to a database
  // For now, just return a success response
  
  return NextResponse.json(
    { 
      message: 'Product created successfully',
      id: `new-${Date.now()}`,
      ...body 
    },
    { status: 201 }
  )
}