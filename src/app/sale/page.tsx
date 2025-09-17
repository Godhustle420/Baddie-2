import Link from 'next/link'
import Image from 'next/image'
import { sampleProducts, sampleSaleDays } from '@/lib/data'

export default function SalePage() {
  const saleProducts = sampleProducts.filter(p => p.isOnSale)
  const activeSale = sampleSaleDays.find(sale => sale.isActive)

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sale Header */}
        {activeSale && (
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 mb-12 text-center text-white">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">{activeSale.title}</h1>
            <p className="text-xl mb-6 opacity-90">{activeSale.description}</p>
            <div className="text-6xl font-bold mb-4">{activeSale.discountPercentage}% OFF</div>
            <p className="text-lg opacity-80">
              Sale ends {new Date(activeSale.endDate).toLocaleDateString()}
            </p>
          </div>
        )}

        {/* Sale Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-primary-600 mb-2">{saleProducts.length}</div>
            <div className="text-neutral-600">Items on Sale</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-secondary-600 mb-2">
              {Math.round(saleProducts.reduce((avg, p) => avg + (p.salePercentage || 0), 0) / saleProducts.length)}%
            </div>
            <div className="text-neutral-600">Average Discount</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-primary-600 mb-2">
              ${Math.round(saleProducts.reduce((total, p) => total + ((p.originalPrice || p.price) - p.price), 0))}
            </div>
            <div className="text-neutral-600">Total Savings</div>
          </div>
        </div>

        {/* Filter and Sort */}
        <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
          <div className="flex flex-wrap gap-4 items-center justify-between">
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
                <label className="text-sm font-medium text-neutral-700">Discount:</label>
                <select className="border border-neutral-300 rounded-lg px-3 py-1 text-sm">
                  <option value="">Any Discount</option>
                  <option value="20">20% or more</option>
                  <option value="30">30% or more</option>
                  <option value="40">40% or more</option>
                  <option value="50">50% or more</option>
                </select>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-neutral-700">Sort by:</label>
              <select className="border border-neutral-300 rounded-lg px-3 py-1 text-sm">
                <option value="discount-high">Highest Discount</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Sale Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {saleProducts.map((product) => (
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
                <div className="absolute top-3 left-3">
                  <span className="badge badge-sale text-sm font-bold">
                    -{product.salePercentage}% OFF
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="badge badge-category text-xs">
                    {product.condition}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  Save ${(product.originalPrice || product.price) - product.price}
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
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-neutral-900">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-neutral-500 line-through">
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

        {/* No Sale Message */}
        {saleProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💸</div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">No items on sale right now</h3>
            <p className="text-neutral-600 mb-6">
              Check back soon for amazing deals on vintage and designer pieces!
            </p>
            <Link href="/products" className="btn-primary">
              Browse All Products
            </Link>
          </div>
        )}

        {/* Load More */}
        {saleProducts.length > 0 && (
          <div className="text-center mt-12">
            <button className="btn-secondary">
              Load More Sale Items
            </button>
          </div>
        )}
      </div>
    </div>
  )
}