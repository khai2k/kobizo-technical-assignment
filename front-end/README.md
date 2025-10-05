# Frontend - Next.js Application

A modern Next.js application built with TypeScript and CSS Modules for the Kobizo technical assignment.

## Features

- ⚡ **Next.js 14** with App Router
- 🔷 **TypeScript** for type safety
- 🎨 **CSS Modules** for scoped styling
- 📱 **Responsive Design** for all devices
- 🚀 **Fast Performance** with optimized builds

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Navigate to the front-end directory:

   ```bash
   cd front-end
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create environment file:

   ```bash
   echo "NEXT_PUBLIC_API_URL=http://localhost:3001" > .env.local
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   ├── page.module.css  # Page styles
│   └── products/
│       ├── page.tsx     # Products catalog page
│       └── page.module.css
├── components/
│   ├── Header.tsx       # Header component
│   ├── Header.module.css
│   ├── Main.tsx         # Main content
│   ├── Main.module.css
│   ├── ProductCard.tsx  # Product card component
│   ├── ProductCard.module.css
│   ├── ProductGrid.tsx  # Product grid component
│   ├── ProductGrid.module.css
│   ├── ProductFilters.tsx # Product filters
│   ├── ProductFilters.module.css
│   ├── Pagination.tsx   # Pagination component
│   └── Pagination.module.css
└── lib/
    └── api.ts           # API client
```

## Styling

This project uses CSS Modules for component-scoped styling. Each component has its own `.module.css` file that provides:

- Scoped styles (no global conflicts)
- Responsive design with mobile-first approach
- Modern CSS features (Grid, Flexbox, CSS Variables)

## Development

The application follows Next.js best practices:

- App Router for modern routing
- TypeScript for type safety
- CSS Modules for maintainable styles
- Responsive design patterns
- Clean component architecture
