# PanPanFR Portfolio Website - Project Context

## Project Overview

This is a modern, high-performance personal portfolio website built with React, TypeScript, and Vite. The project showcases a neobrutalist design aesthetic with multi-language support, dark/light themes, and dynamic content management through Google Sheets integration.

**Live Site:** https://panpanfr.my.id/

## Technology Stack

### Core Technologies
- **Vite 7.0.6** - Next-generation frontend build tool with HMR
- **React 19.1.1** - Modern React with concurrent features
- **TypeScript 5.8.3** - Type-safe JavaScript development
- **Tailwind CSS 4.1.11** - Utility-first CSS framework with Vite integration

### Key Dependencies
- **React Router DOM 7.7.1** - Client-side routing with language-based routes
- **Framer Motion 12.23.12** - Production-ready animations
- **SWR 2.3.6** - Data fetching and caching
- **Chart.js 4.5.0** - Data visualization for statistics
- **PapaParse 5.5.3** - CSV parsing for Google Sheets data
- **Zod 4.1.9** - Runtime type validation
- **Lucide React 0.544.0** - Icon library
- **React Fast Marquee 1.6.5** - Scrolling animations

### Development Tools
- **ESLint 9.32.0** - Code linting with React-specific rules
- **Prettier 3.6.2** - Code formatting
- **Terser 5.43.1** - JavaScript minification

## Project Structure

```
src/
├── components/     # Reusable UI components
├── contexts/       # React contexts for state management
├── lib/           # Utility functions and configurations
├── pages/         # Route-based page components
├── assets/        # Static assets (images, fonts)
├── App.tsx        # Main application component with routing
├── main.tsx       # Application entry point
└── sw.ts          # Service worker for PWA functionality
```

## Key Features

### Multi-Language Support
- Language-based routing (`/en`, `/id`, etc.)
- Automatic language detection and redirection
- Content managed through Google Sheets with language-specific tabs

### Performance Optimizations
- **PWA Support** with service worker and caching strategies
- **Code Splitting** with lazy-loaded pages
- **Manual Chunking** for optimal caching (React, charts, utils, data)
- **Non-blocking CSS** loading with preload hints
- **Security Headers** for production deployment

### Data Management
- **Google Sheets API** integration for content management
- **SWR** for efficient data fetching and caching
- **Zod schemas** for runtime type validation
- **GitHub API** integration for contribution statistics

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (with --host flag)
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Preview production build
npm run preview
```

## Environment Configuration

The project uses environment variables for configuration. Copy `.env.example` to `.env` and update:

```env
VITE_FULL_NAME="Your Full Name"
VITE_NICKNAME="YourNickname"
VITE_TITLE="Your Professional Title"
VITE_SPREADSHEET_ID="your_spreadsheet_id_here"
VITE_GITHUB_LINK="https://github.com/yourusername"
VITE_LINKEDIN_LINK="https://www.linkedin.com/in/yourname"
VITE_CONTRIBUTIONS_LANGS_COUNT=10
VITE_CONTRIBUTIONS_INCLUDE_ALL_COMMITS=false
VITE_GITHUB_API_LINK="https://your-github-stats-api.vercel.app"
VITE_WEBSITE_LINK="https://yourusername.github.io"
```

## Deployment & CI/CD

### GitHub Actions
- **CI Pipeline** (`ci.yml`): Runs on push/PR to main branch
  - Node.js 20 setup with npm caching
  - Dependencies installation with `npm ci`
  - Linting and build verification
- **Auto-deployment** to GitHub Pages via Actions

### Vercel Configuration
- **Security headers** including CSP, HSTS, and various protections
- **GitHub integration** with silent deployment mode

### Build Configuration
- **Base path**: Configurable for different deployment targets
- **Terser minification** for production builds
- **Source maps** disabled for production
- **Manual chunk splitting** for optimal caching

## Development Conventions

### Code Style
- **TypeScript strict mode** enabled
- **ESLint** with React hooks and refresh rules
- **Prettier** for consistent formatting
- **Functional components** with hooks
- **Lazy loading** for route components

### File Organization
- **Components** in dedicated directories with clear separation
- **Context providers** for global state management
- **Utility functions** in `lib/` directory
- **Type definitions** co-located with implementation

### Performance Considerations
- **React.memo** and **useMemo** for optimization
- **Lazy loading** for code splitting
- **Efficient caching** strategies with SWR
- **Optimized bundle** size with manual chunking

## Security Features

- **Content Security Policy** with strict directives
- **Security headers** (X-Frame-Options, X-Content-Type-Options, etc.)
- **HTTPS enforcement** with HSTS
- **Server information hiding**
- **CORS restrictions** for external APIs

## Content Management

### Google Sheets Integration
- **Spreadsheet ID** configuration in environment variables
- **Plain text formatting** required for data compatibility
- **Multiple language support** through sheet tabs
- **Real-time content updates** without redeployment

### GitHub Integration
- **Contribution statistics** via GitHub API
- **Private repository support** with custom API setup
- **Language-specific contribution** filtering

## Browser Support

- **Modern browsers** with ES6+ support
- **PWA features** for mobile experience
- **Responsive design** for all screen sizes
- **Dark/light theme** support with system preference detection

## Common Issues & Solutions

### Google Sheets Data
- Ensure all data is formatted as **plain text** in Google Sheets
- Check **spreadsheet ID** and sharing permissions
- Verify **API quota** and rate limits

### GitHub Contributions
- Set **VITE_GITHUB_LINK** correctly in environment
- For private repos, set up **custom API endpoint**
- Configure **language count** and **commit inclusion** settings

### Development
- Use **npm ci** for clean installs in CI
- Check **Node.js version** (requires v20+)
- Verify **environment variables** are set correctly

## Performance Metrics

- **Lighthouse scores** optimized for performance
- **Core Web Vitals** monitoring with Vercel Speed Insights
- **Bundle size** optimization with code splitting
- **Caching strategies** for external resources (fonts, APIs)