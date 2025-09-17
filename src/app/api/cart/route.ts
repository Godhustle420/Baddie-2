import { NextResponse } from 'next/server'

// Simulate cart storage (in a real app, this would be in a database or session)
let cart: Array<{
  productId: string;
  quantity: number;
  addedAt: string;
}> = []

export async function GET() {
  return NextResponse.json({
    items: cart,
    total: cart.length,
    totalQuantity: cart.reduce((sum, item) => sum + item.quantity, 0)
  })
}

export async function POST(request: Request) {
  const body = await request.json()
  const { productId, quantity = 1 } = body

  if (!productId) {
    return NextResponse.json(
      { error: 'Product ID is required' },
      { status: 400 }
    )
  }

  // Check if item already exists in cart
  const existingItemIndex = cart.findIndex(item => item.productId === productId)

  if (existingItemIndex > -1) {
    // Update quantity if item already exists
    cart[existingItemIndex].quantity += quantity
  } else {
    // Add new item to cart
    cart.push({
      productId,
      quantity,
      addedAt: new Date().toISOString()
    })
  }

  return NextResponse.json({
    message: 'Item added to cart successfully',
    cart: {
      items: cart,
      total: cart.length,
      totalQuantity: cart.reduce((sum, item) => sum + item.quantity, 0)
    }
  })
}

export async function DELETE() {
  cart = []
  return NextResponse.json({
    message: 'Cart cleared successfully',
    cart: {
      items: [],
      total: 0,
      totalQuantity: 0
    }
  })
}