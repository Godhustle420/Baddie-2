'use client'

import { X, Plus, Minus, Trash2 } from 'lucide-react'
import { useCartStore, useUIStore } from '@/store'
import Link from 'next/link'

export default function CartSlideout() {
  const { 
    items, 
    removeItem, 
    updateQuantity, 
    getTotalPrice, 
    clearCart 
  } = useCartStore()
  const { isCartOpen, toggleCart } = useUIStore()

  if (!isCartOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={toggleCart} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-4 py-6">
            <h2 className="text-lg font-medium text-gray-900">Shopping Cart</h2>
            <button
              onClick={toggleCart}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">Your cart is empty</p>
                <Link href="/products" onClick={toggleCart}>
                  <span className="btn-primary inline-block">Start Shopping</span>
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex space-x-4">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.product.images[0] || '/placeholder-product.jpg'}
                        alt={item.product.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <Link href={`/products/${item.product.id}`} onClick={toggleCart}>
                            {item.product.title}
                          </Link>
                        </h3>
                        <p className="ml-4">${item.product.price.toFixed(2)}</p>
                      </div>
                      
                      <p className="mt-1 text-sm text-gray-500">
                        {item.product.brand} • {item.product.size}
                      </p>

                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="text-gray-900 font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.productId)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                <p>Subtotal</p>
                <p>${getTotalPrice().toFixed(2)}</p>
              </div>
              
              <p className="mt-0.5 text-sm text-gray-500 mb-6">
                Shipping and taxes calculated at checkout.
              </p>

              <div className="space-y-4">
                <Link href="/checkout" onClick={toggleCart}>
                  <span className="w-full btn-primary block text-center py-3">
                    Checkout
                  </span>
                </Link>
                
                <button
                  onClick={clearCart}
                  className="w-full text-center text-sm text-gray-500 hover:text-gray-700"
                >
                  Clear Cart
                </button>
              </div>

              <div className="mt-6 text-center text-sm text-gray-500">
                <p>
                  or{' '}
                  <Link href="/products" onClick={toggleCart}>
                    <span className="text-primary-600 font-medium hover:text-primary-500">
                      Continue Shopping →
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}