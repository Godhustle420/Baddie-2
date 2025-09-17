import Link from 'next/link'
import Image from 'next/image'
import { sampleProducts } from '@/lib/data'

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">All Products</h1>
          <p className="text-xl text-neutral-600">
            Discover our complete collection of vintage and designer pieces
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-neutral-700">Category:</label>
              <select className="border border-neutral-300 rounded-lg px-3 py-1 text-sm">
                <option value="">All Categories</option>
                <option value="dresses">Dresses</option>
                <option value="tops">Tops</option>
                <option value="blazers">Blazers</option>
                <option value="bags">Bags</option>
                <option value="shoes">Shoes</option>
                <option value="jewelry">Jewelry</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-neutral-700">Price:</label>
              <select className="border border-neutral-300 rounded-lg px-3 py-1 text-sm">
                <option value="">Any Price</option>
                <option value="0-25">$0 - $25</option>
                <option value="25-50">$25 - $50</option>
                <option value="50-100">$50 - $100</option>
                <option value="100+">$100+</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-neutral-700">Condition:</label>
              <select className="border border-neutral-300 rounded-lg px-3 py-1 text-sm">
                <option value="">Any Condition</option>
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
              </select>
            </div>
            <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
              Clear Filters
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sampleProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group card hover:scale-105 transition-transform duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {product.isOnSale && (
                  <div className="absolute top-3 left-3">
                    <span className="badge badge-sale text-xs">
                      -{product.salePercentage}% OFF
                    </span>
                  </div>
                )}
                <div className="absolute top-3 right-3">
                  <span className="badge badge-category text-xs">
                    {product.condition}
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <div className="mb-1">
                  <span className="text-xs text-primary-600 font-medium uppercase">
                    {product.category}
                  </span>
                </div>
                
                <h3 className="text-sm font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                  {product.name}
                </h3>
                
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-1">
                    <span className="text-lg font-bold text-neutral-900">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-neutral-500 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  
                  {product.size && (
                    <span className="text-xs text-neutral-500">
                      Size {product.size}
                    </span>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {product.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="text-xs bg-neutral-100 text-neutral-600 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="btn-secondary">
            Load More Products
          </button>
        </div>
      </div>
    </div>
  )
}