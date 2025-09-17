// Placeholder components for remaining home sections

export default function FeaturedProducts() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-display font-bold text-center mb-12">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="card">
              <div className="h-64 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Product {i}</span>
              </div>
              <div className="p-4">
                <h3 className="font-medium">Featured Item {i}</h3>
                <p className="text-primary-600 font-bold">$29.99</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}