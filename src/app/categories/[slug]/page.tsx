import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { sampleCategories, sampleProducts } from '@/lib/data'

interface CategoryPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = sampleCategories.find(c => c.slug === slug)

  if (!category) {
    notFound()
  }

  const categoryProducts = sampleProducts.filter(p => p.category === category.id)

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li><Link href="/" className="text-neutral-500 hover:text-primary-600">Home</Link></li>
            <li><span className="text-neutral-400">/</span></li>
            <li><Link href="/products" className="text-neutral-500 hover:text-primary-600">Products</Link></li>
            <li><span className="text-neutral-400">/</span></li>
            <li><span className="text-neutral-900">{category.name}</span></li>
          </ol>
        </nav>

        {/* Category Header */}
        <div className="mb-12">
          <div className="relative h-64 rounded-2xl overflow-hidden mb-8">
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-4xl lg:text-5xl font-bold mb-4">{category.name}</h1>
                <p className="text-xl opacity-90">{category.description}</p>
                <p className="text-lg mt-2">{category.productCount} items available</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter and Sort */}
        <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-4 items-center">
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
              {category.id === 'tops' || category.id === 'dresses' || category.id === 'blazers' ? (
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-neutral-700">Size:</label>
                  <select className="border border-neutral-300 rounded-lg px-3 py-1 text-sm">
                    <option value="">Any Size</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                  </select>
                </div>
              ) : null}
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-neutral-700">Sort by:</label>
              <select className="border border-neutral-300 rounded-lg px-3 py-1 text-sm">
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categoryProducts.map((product) => (
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
                <h3 className="text-sm font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                  {product.name}
                </h3>
                
                <p className="text-neutral-600 text-xs mb-3 line-clamp-2">
                  {product.description}
                </p>
                
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

        {/* No Products Message */}
        {categoryProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">😔</div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">No products found</h3>
            <p className="text-neutral-600 mb-6">
              We don&apos;t have any {category.name.toLowerCase()} in stock right now, but check back soon!
            </p>
            <Link href="/products" className="btn-primary">
              Browse All Products
            </Link>
          </div>
        )}

        {/* Load More */}
        {categoryProducts.length > 0 && (
          <div className="text-center mt-12">
            <button className="btn-secondary">
              Load More {category.name}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}