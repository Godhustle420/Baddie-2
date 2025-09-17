import Hero from '@/components/Hero'
import FeaturedProducts from '@/components/FeaturedProducts'
import Categories from '@/components/Categories'
import SaleSection from '@/components/SaleSection'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <SaleSection />
      <FeaturedProducts />
      <Categories />
    </div>
  )
}