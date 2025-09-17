'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Sparkles, Heart, Share2 } from 'lucide-react'

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const slides = [
    {
      id: 1,
      title: "Discover Your Next Favorite Piece",
      subtitle: "Shop unique, pre-loved fashion with social selling features",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
      cta: "Shop Now",
      highlight: "New Arrivals"
    },
    {
      id: 2,
      title: "Share Your Style, Earn Rewards",
      subtitle: "Use referral codes and share to your social media for exclusive discounts",
      image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2",
      cta: "Start Sharing",
      highlight: "Social Rewards"
    },
    {
      id: 3,
      title: "Live Shopping Events",
      subtitle: "Join exclusive live shopping sessions with your favorite influencers",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d",
      cta: "Watch Live",
      highlight: "Live Now"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${slide.image})`
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Highlight Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-600 text-white text-sm font-medium mb-6 animate-pulse-slow">
            <Sparkles size={16} className="mr-2" />
            {slides[currentSlide].highlight}
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight">
            {slides[currentSlide].title}
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            {slides[currentSlide].subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/products" className="btn-primary px-8 py-4 text-lg font-semibold flex items-center group">
              {slides[currentSlide].cta}
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link href="/live" className="btn-secondary px-8 py-4 text-lg font-semibold border-2 border-white text-white hover:bg-white hover:text-gray-900 transition-colors">
              Join Live Shopping
            </Link>
          </div>

          {/* Social Features Highlight */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 text-white">
              <Heart className="mx-auto mb-3 text-primary-400" size={32} />
              <h3 className="font-semibold mb-2">Save Favorites</h3>
              <p className="text-sm text-gray-300">Create wishlists and get notified about price drops</p>
            </div>
            
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 text-white">
              <Share2 className="mx-auto mb-3 text-primary-400" size={32} />
              <h3 className="font-semibold mb-2">Share & Earn</h3>
              <p className="text-sm text-gray-300">Share products to your social media and earn rewards</p>
            </div>
            
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 text-white">
              <Sparkles className="mx-auto mb-3 text-primary-400" size={32} />
              <h3 className="font-semibold mb-2">Flash Sales</h3>
              <p className="text-sm text-gray-300">Exclusive limited-time offers and bundle deals</p>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 text-white animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}