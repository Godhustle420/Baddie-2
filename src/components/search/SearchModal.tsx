'use client'

import { useState, useEffect } from 'react'
import { Search, X, Filter, TrendingUp } from 'lucide-react'
import { useSearchStore, useUIStore } from '@/store'
import { Product } from '@/types'

export default function SearchModal() {
  const { isSearchOpen, toggleSearch } = useUIStore()
  const { query, setQuery, results, setResults, isLoading, setLoading } = useSearchStore()
  const [suggestions] = useState([
    'vintage denim',
    'designer handbags',
    'retro sneakers',
    'boho dresses',
    'leather jackets'
  ])

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    setLoading(true)
    try {
      // Simulated search results - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const mockResults: Product[] = [
        {
          id: '1',
          title: 'Vintage Levi\'s Denim Jacket',
          price: 45,
          originalPrice: 65,
          images: ['https://images.unsplash.com/photo-1551698618-1dfe5d97d256'],
          category: 'outerwear',
          brand: 'Levi\'s',
          condition: 'good',
          tags: ['vintage', 'denim', 'jacket'],
          stock: 1,
          sellerId: 'seller1',
          seller: {} as any,
          featured: false,
          views: 120,
          likes: 15,
          sharesCount: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
          description: 'Classic vintage denim jacket'
        }
      ]
      
      setResults(mockResults)
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      handleSearch(query)
    }, 300)

    return () => clearTimeout(debounceTimer)
  }, [query])

  if (!isSearchOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={toggleSearch} />
      
      <div className="absolute top-0 left-0 right-0 bg-white shadow-xl">
        <div className="max-w-3xl mx-auto">
          {/* Search Header */}
          <div className="flex items-center border-b border-gray-200 px-6 py-4">
            <Search className="text-gray-400 mr-3" size={20} />
            <input
              type="text"
              placeholder="Search for items, brands, categories..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 border-none outline-none text-lg"
              autoFocus
            />
            <button className="text-gray-400 hover:text-gray-600 ml-3">
              <Filter size={20} />
            </button>
            <button
              onClick={toggleSearch}
              className="text-gray-400 hover:text-gray-600 ml-3"
            >
              <X size={20} />
            </button>
          </div>

          {/* Search Content */}
          <div className="max-h-96 overflow-y-auto">
            {!query ? (
              /* Search Suggestions */
              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                    <TrendingUp size={16} className="mr-2" />
                    Trending Searches
                  </h3>
                  <div className="space-y-2">
                    {suggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => setQuery(suggestion)}
                        className="block text-left w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Popular Categories</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {['Women\'s Clothing', 'Men\'s Fashion', 'Accessories', 'Shoes', 'Bags', 'Jewelry'].map((category) => (
                      <button
                        key={category}
                        onClick={() => setQuery(category.toLowerCase())}
                        className="text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md border border-gray-200"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : isLoading ? (
              /* Loading State */
              <div className="p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
                <p className="text-gray-500 mt-2">Searching...</p>
              </div>
            ) : results.length > 0 ? (
              /* Search Results */
              <div className="p-6">
                <p className="text-sm text-gray-500 mb-4">
                  {results.length} results for "{query}"
                </p>
                <div className="space-y-4">
                  {results.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-md cursor-pointer"
                      onClick={() => {
                        toggleSearch()
                        // Navigate to product
                      }}
                    >
                      <img
                        src={product.images[0] || '/placeholder-product.jpg'}
                        alt={product.title}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900">{product.title}</h4>
                        <p className="text-sm text-gray-500">{product.brand}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-sm font-medium text-primary-600">
                            ${product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-400 line-through">
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : query ? (
              /* No Results */
              <div className="p-6 text-center">
                <p className="text-gray-500 mb-4">No results found for "{query}"</p>
                <p className="text-sm text-gray-400">
                  Try different keywords or browse our categories
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}