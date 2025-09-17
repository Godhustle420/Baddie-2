export default function Newsletter() {
  return (
    <section className="py-16 bg-primary-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-display font-bold text-white mb-4">
          Stay in the Loop
        </h2>
        <p className="text-xl text-primary-100 mb-8">
          Get notified about flash sales, new arrivals, and exclusive events
        </p>
        
        <div className="max-w-md mx-auto flex gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-white focus:border-transparent"
          />
          <button className="btn-secondary px-6 py-3 bg-white text-primary-600 hover:bg-gray-100">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  )
}