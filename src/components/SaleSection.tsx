import Link from 'next/link'
import { sampleSaleDays } from '@/lib/data'

export default function SaleSection() {
  const activeSale = sampleSaleDays.find(sale => sale.isActive)

  if (!activeSale) return null

  return (
    <section className="bg-gradient-to-r from-primary-500 to-secondary-500 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-6">
          <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-2">
            <span className="text-white text-sm font-medium">🔥 Limited Time Offer</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            {activeSale.title}
          </h2>
          
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            {activeSale.description}
          </p>
          
          <div className="text-6xl lg:text-7xl font-bold text-white">
            {activeSale.discountPercentage}% OFF
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/sale" 
              className="bg-white text-primary-600 font-semibold py-3 px-8 rounded-full hover:bg-neutral-100 transition-colors shadow-lg"
            >
              Shop Sale Items
            </Link>
            <Link 
              href="/products" 
              className="bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-full hover:bg-white hover:text-primary-600 transition-colors"
            >
              View All Products
            </Link>
          </div>
          
          {/* Sale end countdown would go here */}
          <div className="text-white/80 text-sm">
            Sale ends {new Date(activeSale.endDate).toLocaleDateString()}
          </div>
        </div>
      </div>
    </section>
  )
}