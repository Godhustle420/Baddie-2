export default function LiveShoppingEvents() {
  return (
    <section className="py-16 bg-gradient-to-r from-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
            Live Shopping Events
          </h2>
          <p className="text-lg text-gray-600">
            Join exclusive live shopping sessions with influencers and stylists
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold">LIVE</span>
          </div>
          <h3 className="text-xl font-bold mb-2">Summer Style Session</h3>
          <p className="text-gray-600 mb-4">Join Sarah for a live styling session</p>
          <button className="btn-primary">Join Live Event</button>
        </div>
      </div>
    </section>
  )
}