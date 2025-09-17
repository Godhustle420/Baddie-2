import Link from 'next/link'
import Image from 'next/image'
import { sampleProducts } from '@/lib/data'

export default function FeaturedProducts() {
  const featuredProducts = sampleProducts.slice(0, 6)

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">
            Featured Products
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Handpicked treasures that caught our eye this week
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group card hover:scale-105 transition-transform duration-300"
            >
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {product.isOnSale && (
                  <div className="absolute top-4 left-4">
                    <span className="badge badge-sale">
                      -{product.salePercentage}% OFF
                    </span>
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  <span className="badge badge-category">
                    {product.condition}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-2">
                  <span className="text-sm text-primary-600 font-medium">
                    {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {product.name}
                </h3>
                
                <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-neutral-900">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-neutral-500 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  
                  {product.size && (
                    <span className="text-sm text-neutral-500">
                      Size {product.size}
                    </span>
                  )}
                </div>
                
                <div className="mt-4 flex flex-wrap gap-1">
                  {product.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-xs bg-neutral-100 text-neutral-600 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/products" className="btn-primary">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  )
}