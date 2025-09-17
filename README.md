# Thrift Store Platform

A comprehensive thrift store platform with seamless onboarding, beautiful design, and strong integrations.

## Features

### 🚀 Seamless Onboarding
- Guided setup wizard with interactive tooltips
- Step-by-step store configuration
- Progress tracking and onboarding assistance

### 🎨 Enhanced UI/UX
- Modern, polished design themes
- Responsive component library
- Dark/light mode support
- Smooth animations and transitions

### 🛍️ Social Commerce Integrations
- Facebook Shop integration
- TikTok Shop integration
- Cross-platform product synchronization
- Social media authentication

### 💳 Payment Gateway Options
- Stripe payment processing
- PayPal integration
- Multiple payment methods
- Secure checkout flow

### 📦 Shipping Integration
- Real-time shipping rates
- Shipping label generation
- Multiple carrier support
- Package tracking

### 📚 Documentation & Support
- Comprehensive API documentation
- User guides and tutorials
- FAQ system
- Support ticket management

### 👥 Community Features
- Customer reviews and ratings
- User wishlists
- Live shopping events
- Social sharing capabilities

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animations
- **React Hook Form** - Form handling
- **Zustand** - State management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **Prisma** - Database ORM
- **PostgreSQL** - Database
- **Redis** - Caching and sessions

### Integrations
- **Stripe** - Payment processing
- **PayPal** - Alternative payments
- **Facebook Graph API** - Social commerce
- **TikTok Shop API** - Social commerce
- **Various Shipping APIs** - Logistics

## Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/Godhustle420/Baddie-2.git
   cd Baddie-2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start development servers**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000

## Project Structure

```
├── client/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/           # App router pages
│   │   ├── components/    # Reusable components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions
│   │   ├── stores/        # Zustand stores
│   │   └── types/         # TypeScript definitions
│   ├── public/            # Static assets
│   └── package.json
├── server/                # Node.js backend application
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── middleware/    # Express middleware
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   └── utils/         # Utility functions
│   ├── prisma/            # Database schema and migrations
│   └── package.json
├── docs/                  # Documentation
└── package.json           # Root package.json
```

## Development

### Prerequisites
- Node.js 18+
- PostgreSQL 15+
- Redis 7+
- npm or yarn

### Environment Setup
1. Copy environment templates
2. Configure database connections
3. Set up API keys for integrations
4. Start development services

### Testing
```bash
npm test                   # Run all tests
npm run client:test        # Frontend tests
npm run server:test        # Backend tests
```

### Linting
```bash
npm run lint              # Lint all code
npm run client:lint       # Frontend linting
npm run server:lint       # Backend linting
```

## Deployment

### Production Build
```bash
npm run build
npm start
```

### Environment Variables
See `.env.example` for required environment variables.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For questions and support:
- Documentation: `/docs`
- Issues: GitHub Issues
- Community: Discord/Slack (links in docs)