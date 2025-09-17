import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { sampleProducts } from '@/lib/data'

interface ProductPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const product = sampleProducts.find(p => p.id === id)

  if (!product) {
    notFound()
  }

  const relatedProducts = sampleProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li><Link href="/" className="text-neutral-500 hover:text-primary-600">Home</Link></li>
            <li><span className="text-neutral-400">/</span></li>
            <li><Link href="/products" className="text-neutral-500 hover:text-primary-600">Products</Link></li>
            <li><span className="text-neutral-400">/</span></li>
            <li><Link href={`/categories/${product.category}`} className="text-neutral-500 hover:text-primary-600 capitalize">{product.category}</Link></li>
            <li><span className="text-neutral-400">/</span></li>
            <li><span className="text-neutral-900">{product.name}</span></li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative h-96 lg:h-[600px] rounded-2xl overflow-hidden">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {product.isOnSale && (
                <div className="absolute top-4 left-4">
                  <span className="badge badge-sale">
                    -{product.salePercentage}% OFF
                  </span>
                </div>
              )}
            </div>
            
            {/* Additional Images */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.slice(1).map((image, index) => (
                  <div key={index} className="relative h-20 rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 2}`}
                      fill
                      className="object-cover cursor-pointer hover:scale-110 transition-transform"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="mb-2">
                <span className="text-sm text-primary-600 font-medium uppercase">
                  {product.category}
                </span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
                {product.name}
              </h1>
              <p className="text-lg text-neutral-600">
                {product.description}
              </p>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-neutral-900">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-neutral-500 line-through">
                  ${product.originalPrice}
                </span>
              )}
              {product.isOnSale && (
                <span className="badge badge-sale">
                  Save ${product.originalPrice! - product.price}
                </span>
              )}
            </div>

            {/* Product Details */}
            <div className="grid grid-cols-2 gap-4 p-6 bg-neutral-50 rounded-lg">
              <div>
                <span className="text-sm font-medium text-neutral-700">Condition:</span>
                <p className="text-neutral-900 capitalize">{product.condition}</p>
              </div>
              {product.size && (
                <div>
                  <span className="text-sm font-medium text-neutral-700">Size:</span>
                  <p className="text-neutral-900">{product.size}</p>
                </div>
              )}
              {product.brand && (
                <div>
                  <span className="text-sm font-medium text-neutral-700">Brand:</span>
                  <p className="text-neutral-900">{product.brand}</p>
                </div>
              )}
              <div>
                <span className="text-sm font-medium text-neutral-700">Category:</span>
                <p className="text-neutral-900 capitalize">{product.category}</p>
              </div>
            </div>

            {/* Tags */}
            <div>
              <span className="text-sm font-medium text-neutral-700 mb-2 block">Tags:</span>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span key={tag} className="badge badge-category">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button className="w-full btn-primary text-lg py-4">
                Add to Cart
              </button>
              <button className="w-full btn-secondary text-lg py-4">
                Add to Wishlist
              </button>
            </div>

            {/* Sale End Date */}
            {product.isOnSale && product.saleEndDate && (
              <div className="p-4 bg-primary-50 rounded-lg">
                <p className="text-sm text-primary-700">
                  ⏰ Sale ends on {new Date(product.saleEndDate).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-neutral-900 mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/products/${relatedProduct.id}`}
                  className="group card hover:scale-105 transition-transform duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={relatedProduct.images[0]}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {relatedProduct.isOnSale && (
                      <div className="absolute top-3 left-3">
                        <span className="badge badge-sale text-xs">
                          -{relatedProduct.salePercentage}% OFF
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {relatedProduct.name}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-neutral-900">
                        ${relatedProduct.price}
                      </span>
                      {relatedProduct.originalPrice && (
                        <span className="text-sm text-neutral-500 line-through">
                          ${relatedProduct.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}