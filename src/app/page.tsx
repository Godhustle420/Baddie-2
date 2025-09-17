import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/home/HeroSection'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import FlashSales from '@/components/home/FlashSales'
import SocialProof from '@/components/home/SocialProof'
import LiveShoppingEvents from '@/components/home/LiveShoppingEvents'
import Newsletter from '@/components/home/Newsletter'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <HeroSection />
        <FlashSales />
        <FeaturedProducts />
        <LiveShoppingEvents />
        <SocialProof />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}