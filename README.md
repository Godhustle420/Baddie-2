# Baddie Thrift - Advanced Social Selling Thrift Store

A modern, feature-rich thrift store application with advanced social selling capabilities, built with Next.js 14, TypeScript, and Tailwind CSS.

## 🌟 Features

### Social Selling & Engagement
- **Social Login**: Facebook, TikTok, and Google authentication
- **Share to Story/Reel**: Direct sharing buttons for products to social media stories
- **Referral System**: Influencer codes with commission tracking
- **Social Proof**: Recent purchases, reviews, and activity feeds
- **Live Shopping Events**: Embedded live shopping sessions with influencers

### Store Features
- **Wishlist/Favorites**: Save and organize favorite items
- **Flash Sales**: Time-limited offers with countdown timers
- **Product Bundles**: Curated product combinations with discounts
- **Smart Search & Filters**: Advanced product discovery
- **Cart Abandonment**: Automated reminder system

### Tech & Analytics
- **Advanced Analytics Dashboard**: Comprehensive insights and metrics
- **Pixel Tracking**: Meta (Facebook) and TikTok pixel integration
- **Automated Inventory Sync**: Real-time stock management
- **Mobile PWA Support**: Progressive Web App capabilities
- **Localization**: Multi-language and currency support

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **State Management**: Zustand
- **Data Fetching**: React Query
- **Analytics**: Recharts for dashboards
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

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

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration values.

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 PWA Support

The application is configured as a Progressive Web App with:
- Offline capabilities
- App shortcuts for quick access
- Mobile-optimized experience
- Installable on mobile devices

## 🔧 Configuration

### Social Login Setup

1. **Facebook Login**:
   - Create a Facebook App at [developers.facebook.com](https://developers.facebook.com)
   - Add Facebook Login product
   - Set redirect URI: `http://localhost:3000/api/auth/callback/facebook`

2. **Google Login**:
   - Create project at [console.cloud.google.com](https://console.cloud.google.com)
   - Enable Google+ API
   - Create OAuth 2.0 credentials

3. **TikTok Login**:
   - Apply for TikTok for Developers access
   - Create app and get client credentials

### Analytics Setup

1. **Meta Pixel**:
   - Create pixel at [business.facebook.com](https://business.facebook.com)
   - Add pixel ID to environment variables

2. **TikTok Pixel**:
   - Set up TikTok Ads Manager
   - Create pixel and add ID to environment

3. **Google Analytics**:
   - Create GA4 property
   - Add measurement ID to environment

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/             # React components
│   ├── auth/              # Authentication components
│   ├── analytics/         # Analytics dashboard
│   ├── cart/              # Shopping cart
│   ├── home/              # Homepage sections
│   ├── layout/            # Layout components
│   ├── referrals/         # Referral system
│   ├── search/            # Search functionality
│   └── social/            # Social sharing
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
├── store/                 # Zustand state management
├── types/                 # TypeScript type definitions
└── utils/                 # Helper functions
```

## 🎨 Design System

The application uses a cohesive design system with:
- **Primary Colors**: Pink/Rose (#ec4899)
- **Secondary Colors**: Blue (#0ea5e9)
- **Typography**: System fonts for performance
- **Components**: Modular, reusable design components
- **Responsive**: Mobile-first design approach

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- AWS Amplify
- DigitalOcean App Platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the example environment variables

## 🔮 Roadmap

- [ ] Real-time chat for live shopping
- [ ] AI-powered product recommendations
- [ ] Augmented reality try-on features
- [ ] Advanced inventory management
- [ ] Multi-vendor marketplace
- [ ] Subscription box service
- [ ] Mobile app (React Native)

---

Built with ❤️ for sustainable fashion and social commerce.