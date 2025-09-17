'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Clock, Flame, ArrowRight } from 'lucide-react'

interface FlashSale {
  id: string
  title: string
  discountPercentage: number
  endTime: Date
  productCount: number
  image: string
}

export default function FlashSales() {
  const [timeLeft, setTimeLeft] = useState<{ [key: string]: string }>({})

  const flashSales: FlashSale[] = [
    {
      id: '1',
      title: 'Designer Handbags',
      discountPercentage: 40,
      endTime: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours from now
      productCount: 25,
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3'
    },
    {
      id: '2',
      title: 'Vintage Denim',
      discountPercentage: 30,
      endTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
      productCount: 18,
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d'
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft: { [key: string]: string } = {}
      
      flashSales.forEach(sale => {
        const now = new Date().getTime()
        const distance = sale.endTime.getTime() - now
        
        if (distance > 0) {
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
          const seconds = Math.floor((distance % (1000 * 60)) / 1000)
          
          newTimeLeft[sale.id] = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        } else {
          newTimeLeft[sale.id] = '00:00:00'
        }
      })
      
      setTimeLeft(newTimeLeft)
    }, 1000)

    return () => clearInterval(timer)
  }, [flashSales])

  return (
    <section className="py-16 bg-gradient-to-r from-red-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-100 text-red-800 text-sm font-medium mb-4">
            <Flame size={16} className="mr-2" />
            Flash Sales
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
            Limited Time Offers
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't miss out on these incredible deals. Limited quantities available!
          </p>
        </div>

        {/* Flash Sales Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {flashSales.map((sale) => (
            <div key={sale.id} className="relative bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow">
              {/* Background Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={sale.image}
                  alt={sale.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40" />
                
                {/* Discount Badge */}
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full font-bold">
                  {sale.discountPercentage}% OFF
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{sale.title}</h3>
                <p className="text-gray-600 mb-4">{sale.productCount} items available</p>
                
                {/* Countdown Timer */}
                <div className="mb-6">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Clock size={16} className="mr-2" />
                    Ends in:
                  </div>
                  <div className="text-2xl font-bold text-red-600 font-mono">
                    {timeLeft[sale.id] || '00:00:00'}
                  </div>
                </div>

                {/* CTA Button */}
                <Link href={`/flash-sales/${sale.id}`}>
                  <span className="btn-primary w-full flex items-center justify-center group-hover:bg-primary-700">
                    Shop Now
                    <ArrowRight size={16} className="ml-2" />
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center">
          <Link href="/flash-sales">
            <span className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium">
              View All Flash Sales
              <ArrowRight size={16} className="ml-2" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}