import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, Product, User, Wishlist } from '@/types'

interface CartStore {
  items: CartItem[]
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity = 1) => {
        const items = get().items
        const existingItem = items.find(item => item.productId === product.id)
        
        if (existingItem) {
          set({
            items: items.map(item =>
              item.productId === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          })
        } else {
          set({
            items: [...items, {
              id: Date.now().toString(),
              productId: product.id,
              product,
              quantity,
              addedAt: new Date()
            }]
          })
        }
      },
      removeItem: (productId) => {
        set({
          items: get().items.filter(item => item.productId !== productId)
        })
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }
        
        set({
          items: get().items.map(item =>
            item.productId === productId
              ? { ...item, quantity }
              : item
          )
        })
      },
      clearCart: () => set({ items: [] }),
      getTotalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
      getTotalPrice: () => get().items.reduce((total, item) => total + (item.product.price * item.quantity), 0)
    }),
    {
      name: 'cart-storage'
    }
  )
)

interface WishlistStore {
  items: Product[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  clearWishlist: () => void
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        const items = get().items
        if (!items.find(item => item.id === product.id)) {
          set({ items: [...items, product] })
        }
      },
      removeItem: (productId) => {
        set({
          items: get().items.filter(item => item.id !== productId)
        })
      },
      isInWishlist: (productId) => {
        return get().items.some(item => item.id === productId)
      },
      clearWishlist: () => set({ items: [] })
    }),
    {
      name: 'wishlist-storage'
    }
  )
)

interface UserStore {
  user: User | null
  preferences: any
  setUser: (user: User | null) => void
  updatePreferences: (preferences: any) => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      preferences: {
        language: 'en',
        currency: 'USD',
        notifications: {
          email: true,
          push: true,
          sms: false
        }
      },
      setUser: (user) => set({ user }),
      updatePreferences: (preferences) => set({ preferences })
    }),
    {
      name: 'user-storage'
    }
  )
)

interface SearchStore {
  query: string
  filters: any
  results: Product[]
  isLoading: boolean
  setQuery: (query: string) => void
  setFilters: (filters: any) => void
  setResults: (results: Product[]) => void
  setLoading: (isLoading: boolean) => void
  clearSearch: () => void
}

export const useSearchStore = create<SearchStore>((set) => ({
  query: '',
  filters: {},
  results: [],
  isLoading: false,
  setQuery: (query) => set({ query }),
  setFilters: (filters) => set({ filters }),
  setResults: (results) => set({ results }),
  setLoading: (isLoading) => set({ isLoading }),
  clearSearch: () => set({ query: '', filters: {}, results: [] })
}))

interface UIStore {
  isMobileMenuOpen: boolean
  isCartOpen: boolean
  isSearchOpen: boolean
  toggleMobileMenu: () => void
  toggleCart: () => void
  toggleSearch: () => void
  closeAll: () => void
}

export const useUIStore = create<UIStore>((set) => ({
  isMobileMenuOpen: false,
  isCartOpen: false,
  isSearchOpen: false,
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
  closeAll: () => set({ isMobileMenuOpen: false, isCartOpen: false, isSearchOpen: false })
}))