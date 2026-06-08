# TrackSphere Documentation

## Overview
TrackSphere is a full-stack fitness, social networking, and safety platform.

## Sprint 1 — Foundation
- Monorepo with npm workspaces + Turborepo
- Next.js 15 frontend (dark theme, neon green accents)
- Express + TypeScript API
- Prisma ORM with PostgreSQL
- JWT Authentication
- Landing, Login, Register, and Dashboard pages

## Getting Started

### Prerequisites
- Node.js >= 18
- PostgreSQL database
- npm >= 10

### Setup
```bash
# Install all dependencies
npm install

# Configure environment
cp apps/api/.env.example apps/api/.env
# Edit .env with your DATABASE_URL and JWT_SECRET

# Generate Prisma client
cd apps/api && npx prisma generate

# Push schema to database
npx prisma db push

# Run development servers
cd ../.. && npm run dev
```

### Project Structure
```
tracksphere/
├── apps/
│   ├── web/          # Next.js 15 frontend
│   └── api/          # Express + TypeScript backend
├── packages/
│   ├── types/        # Shared TypeScript types
│   ├── validation/   # Shared Zod schemas
│   └── ui/           # Shared UI components
└── docs/             # Documentation
```
