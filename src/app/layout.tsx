import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Baddie Thrift - Vintage & Designer Fashion',
  description: 'Discover unique vintage and designer fashion pieces at Baddie Thrift. Quality pre-loved clothing, accessories, and more.',
  keywords: 'thrift, vintage, designer, fashion, clothing, accessories, sustainable fashion',
  authors: [{ name: 'Baddie Thrift' }],
  openGraph: {
    title: 'Baddie Thrift - Vintage & Designer Fashion',
    description: 'Discover unique vintage and designer fashion pieces at Baddie Thrift.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}