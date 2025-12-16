# ☁️ Cloud Weather

> Real-time Cloud Service Status Monitor with Weather-based Interface

Monitor the status of major cloud services (AWS, Cloudflare, GitHub, Vercel) in real-time with an intuitive weather-based visualization.

![Cloud Weather Preview](./public/og-image.png)

## ✨ Features

### Core Features
- 🌤️ **Weather-based Status Visualization** - Service status represented as weather conditions (Sunny, Cloudy, Rainy, Stormy)
- ⚡ **Real-time Monitoring** - Auto-refresh every minute to keep you updated
- 📊 **Incident Tracking** - View recent incidents and service updates from the last 7 days
- 🔍 **Advanced Filtering** - Filter incidents by service, impact level, and status
- 🎨 **Beautiful UI** - Modern, responsive design with smooth animations
- 📱 **PWA Support** - Install as a progressive web app on any device

### Enhanced UX
- ✅ **Data Freshness Indicator** - Always know when data was last updated
- 🔄 **Manual Refresh** - Instantly refresh data with one click
- 🌐 **Network Status Detection** - Alerts when offline/online
- ⚠️ **Smart Error Handling** - Clear error messages when services are unavailable
- 📄 **Pagination** - Show More/Less for better performance

### Accessibility & SEO
- ♿ **WCAG 2.1 AA Compliant** - Skip links, ARIA labels, keyboard navigation
- 🔍 **SEO Optimized** - Schema.org structured data, Open Graph, Twitter Cards
- 🎯 **Enhanced Focus Visibility** - Clear focus indicators for keyboard users
- 📱 **Mobile Optimized** - Responsive design with touch-friendly controls

### Performance
- 🚀 **Fast Initial Load** - Optimized pagination (10 items initially)
- 💾 **Smart Caching** - 60s revalidation for fresh data
- ⚡ **Lazy Loading** - Load more incidents on demand
- 📉 **75% Smaller Payload** - Reduced initial data load

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Date Handling**: [date-fns](https://date-fns.org/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **PWA**: [@ducanh2912/next-pwa](https://github.com/DuCanhGH/next-pwa)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/cloud-weather.git
cd cloud-weather
```

2. Install dependencies
```bash
pnpm install
# or
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

Edit `.env.local` and update the following:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. Run the development server
```bash
pnpm dev
# or
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📦 Build for Production

```bash
pnpm build
pnpm start
```

## 🧪 Quality Checks

```bash
# Type checking
npx tsc --noEmit

# Linting
pnpm lint

# Auto-fix linting issues
pnpm lint:fix
```

## 📁 Project Structure

```
cloud-weather/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Home page (Server Component)
│   ├── error.tsx          # Error boundary
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── AutoRefresh.tsx   # Auto-refresh indicator
│   ├── DashboardClient.tsx
│   ├── ScrollToTop.tsx
│   ├── ServiceCard.tsx   # Service status card
│   ├── StatsSummary.tsx  # Statistics cards
│   ├── TimelineWithFilters.tsx
│   └── WeatherIcon.tsx   # Weather icon component
├── hooks/                 # Custom React hooks
│   ├── useDebounce.ts
│   └── useIncidentFilters.ts
├── lib/                   # Utility functions and APIs
│   ├── api/              # API integration
│   │   ├── aws.ts
│   │   ├── cloudflare.ts
│   │   ├── github.ts
│   │   ├── vercel.ts
│   │   ├── incidents.ts
│   │   ├── fetch-helper.ts
│   │   └── types.ts
│   ├── constants.ts      # Shared constants
│   ├── date-utils.ts     # Date utilities
│   ├── text-utils.tsx    # Text utilities
│   └── utils.ts          # General utilities
├── public/               # Static assets
└── tailwind.config.mjs   # Tailwind configuration
```

## 🌐 Monitored Services

- **AWS** - Amazon Web Services
- **Cloudflare** - CDN and security services
- **GitHub** - Code hosting platform
- **Vercel** - Deployment platform

## 🎨 Weather Status Mapping

| Weather | Status | Description |
|---------|--------|-------------|
| ☀️ Sunny | Operational | All systems operational |
| ⛅ Cloudy | Degraded | Minor performance issues |
| ☁️ Overcast | Partial Outage | Some services affected |
| 🌧️ Rainy | Major Outage | Significant service disruption |
| ⛈️ Stormy | Critical | Critical system failure |

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- Status data provided by official status pages of each service
- Icons from [React Icons](https://react-icons.github.io/react-icons/)
- Design inspiration from modern weather apps

## 📧 Contact

Project Link: [https://github.com/yourusername/cloud-weather](https://github.com/yourusername/cloud-weather)

---

Made with ❤️ by Cloud Weather Team
