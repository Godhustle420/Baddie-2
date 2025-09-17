# Baddie Thrift - Vintage & Designer Fashion Store

A sleek online thrift store built with Next.js, featuring a beautiful pink and gold theme. This project provides a complete e-commerce starter for vintage and designer fashion with modern design and sustainable shopping focus.

## 🌟 Features

- **Modern Design**: Pink and gold themed UI with smooth animations
- **Product Catalog**: Browse products with descriptions, prices, and condition details
- **Category Navigation**: Easy browsing by clothing categories
- **Sale System**: Special sale days with discount tracking
- **Responsive Design**: Fully responsive across all devices
- **API Ready**: Stub API routes for backend integration
- **Deployment Ready**: Configured for Vercel (frontend) and Railway (backend)

## 🎨 Design Theme

- **Primary Colors**: Pink (#ec4899) and Gold (#f59e0b)
- **Typography**: Inter font family for modern readability
- **Components**: Custom styled with Tailwind CSS
- **Animations**: Smooth transitions and hover effects

## 🛍️ Pages & Features

### Homepage
- Hero section with call-to-action
- Featured products showcase
- Category navigation
- Active sale promotions

### Product Pages
- Detailed product information
- Image galleries
- Related product suggestions
- Add to cart functionality

### Category Pages
- Filtered product listings
- Category-specific filtering
- Sort and search capabilities

### Sale Page
- Discounted items showcase
- Sale statistics
- Special promotion displays

## 🔧 Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS with custom theme
- **Images**: Next.js Image optimization
- **API**: Next.js API routes (stub implementation)
- **Deployment**: Vercel (frontend) + Railway (backend)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Godhustle420/Baddie-2.git
cd Baddie-2
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── categories/        # Category pages
│   ├── products/          # Product pages
│   ├── sale/              # Sale page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── FeaturedProducts.tsx
│   ├── Categories.tsx
│   └── SaleSection.tsx
├── lib/                   # Utilities and data
│   └── data.ts           # Sample data
└── types/                 # TypeScript types
    └── index.ts
```

## 🎯 Sample Data

The project includes sample data for:
- **6 Products**: Vintage blazers, designer bags, jewelry, etc.
- **6 Categories**: Dresses, Tops, Blazers, Bags, Shoes, Jewelry
- **Sale Events**: Pink Friday Sale, Golden Weekend
- **Product Features**: Prices, conditions, sizes, brands, tags

## 🌐 API Endpoints

### Products
- `GET /api/products` - List products with filtering
- `GET /api/products/[id]` - Get specific product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/[id]` - Update product (admin)
- `DELETE /api/products/[id]` - Delete product (admin)

### Categories
- `GET /api/categories` - List all categories
- `POST /api/categories` - Create category (admin)

### Cart
- `GET /api/cart` - Get cart contents
- `POST /api/cart` - Add item to cart
- `DELETE /api/cart` - Clear cart

## 🚀 Deployment

### Vercel (Frontend)
1. Connect your GitHub repository to Vercel
2. Configure build settings (auto-detected)
3. Deploy with zero configuration

### Railway (Backend)
1. Connect repository to Railway
2. Configure environment variables
3. Deploy API services

The project includes configuration files:
- `vercel.json` - Vercel deployment settings
- `railway.toml` - Railway deployment configuration

## 🎨 Customization

### Colors
Update the theme in `tailwind.config.js`:
```javascript
colors: {
  primary: { /* pink shades */ },
  secondary: { /* gold shades */ }
}
```

### Sample Data
Modify `/src/lib/data.ts` to add your own:
- Products with real images
- Categories and descriptions
- Sale events and promotions

### Styling
Custom components are in `/src/app/globals.css`:
- `.btn-primary` - Primary buttons
- `.btn-secondary` - Secondary buttons  
- `.card` - Product cards
- `.badge` - Sale and category badges

## 🛒 E-commerce Features

### Product Management
- Product listings with images
- Price and discount tracking
- Condition ratings (excellent, good, fair)
- Size and brand information
- Tag-based organization

### Shopping Experience
- Category-based navigation
- Search and filtering
- Sale and discount displays
- Related product suggestions
- Responsive product grids

### Sale System
- Discount percentage tracking
- Sale end dates
- Category-specific sales
- Promotional banners

## 📱 Responsive Design

- **Mobile First**: Designed for mobile, enhanced for desktop
- **Breakpoints**: Tailwind's responsive system
- **Images**: Optimized loading with Next.js Image
- **Navigation**: Collapsible mobile menu

## 🔮 Future Enhancements

- User authentication
- Shopping cart persistence
- Payment integration
- Inventory management
- Order tracking
- Customer reviews
- Wishlist functionality
- Advanced search filters

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For questions or support, please open an issue on GitHub.

---

**Baddie Thrift** - Sustainable fashion for the modern baddie 💖✨