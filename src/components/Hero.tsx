import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary-100/20 to-secondary-100/20"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold">
                <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  Vintage
                </span>
                <br />
                <span className="text-neutral-900">
                  Meets Modern
                </span>
              </h1>
              <p className="text-xl text-neutral-600 max-w-lg">
                Discover unique pre-loved fashion pieces that tell a story. Sustainable style for the conscious baddie.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products" className="btn-primary text-center">
                Shop Now
              </Link>
              <Link href="/categories" className="btn-secondary text-center">
                Browse Categories
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">500+</div>
                <div className="text-sm text-neutral-600">Unique Items</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary-600">50%</div>
                <div className="text-sm text-neutral-600">Average Savings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">100%</div>
                <div className="text-sm text-neutral-600">Authentic</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-slide-up">
            <div className="relative w-full h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=800&fit=crop"
                alt="Vintage fashion collection"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* Floating badges */}
            <div className="absolute -top-4 -left-4 bg-white rounded-full p-4 shadow-lg animate-bounce">
              <div className="text-center">
                <div className="text-lg font-bold text-primary-600">NEW</div>
                <div className="text-xs text-neutral-600">Arrivals</div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full p-4 shadow-lg">
              <div className="text-center">
                <div className="text-lg font-bold">40%</div>
                <div className="text-xs">OFF</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}