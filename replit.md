# Website Development Quotation Estimator

## Overview

This is a full-stack web application that helps generate accurate project estimates for website development. The app allows users to fill out a detailed form with project requirements and automatically calculates pricing based on complexity, features, and time requirements. It's built with a React frontend, Express backend, and uses PostgreSQL with Drizzle ORM for data persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for development and production builds
- **UI Framework**: Tailwind CSS with shadcn/ui components
- **State Management**: React Hook Form for form handling, TanStack Query for server state
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with CSS variables for theming

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **API Design**: RESTful endpoints for quotation management
- **Middleware**: Express JSON parsing, custom logging, error handling
- **Development**: Hot reload with Vite integration in development mode

### Database Architecture
- **Database**: PostgreSQL (configured for use with Neon Database)
- **ORM**: Drizzle ORM with schema-first approach
- **Schema Location**: `/shared/schema.ts` for type sharing between frontend and backend
- **Migrations**: Drizzle Kit for database migrations

## Key Components

### Core Data Models
- **Users**: Basic user management (id, username, password)
- **Quotations**: Comprehensive quotation records with client info, project details, technical requirements, and pricing calculations

### Form Management
- **Multi-section Form**: Client info, project details, technical requirements, design preferences, and features
- **Validation**: Zod schemas for type-safe form validation
- **Dynamic Pricing**: Real-time calculation based on complexity and selected features

### Pricing Engine
- **Hourly Rates**: Role-based pricing (junior, mid, senior, specialist, designer, PM, QA)
- **Feature Costing**: Detailed breakdown of costs for different features and complexity levels
- **Indian Market Pricing**: Rates adjusted for 2025 Indian market standards

### Google Drive Integration
- **OAuth Authentication**: Google OAuth for secure access to user's Drive
- **Excel Export**: Form data exported to Excel format and stored in Google Drive
- **Automatic File Management**: Creates new files or appends to existing ones
- **CSV Export Fallback**: Direct CSV download when Google Drive is not connected
- **Domain Authorization**: Requires domain registration in Google Cloud Console
- **Error Handling**: Detailed error messages for troubleshooting OAuth issues

## Data Flow

1. **User Input**: Client fills out comprehensive quotation form
2. **Real-time Calculation**: Pricing engine calculates costs based on selections
3. **Form Submission**: Data validated and sent to backend API
4. **Database Storage**: Quotation saved to PostgreSQL via Drizzle ORM
5. **Google Drive Export**: Form data exported to Excel and saved to user's Google Drive
6. **Response**: Success confirmation returned to user

## External Dependencies

### Core Dependencies
- **UI Components**: Radix UI primitives with shadcn/ui styling
- **Form Handling**: React Hook Form with Zod validation
- **Database**: Drizzle ORM with PostgreSQL driver (@neondatabase/serverless)
- **HTTP Client**: TanStack Query for API calls
- **Styling**: Tailwind CSS with various utility plugins

### Google Integration
- **Authentication**: Google OAuth 2.0 for Drive access
- **API Access**: Google Drive API for file management
- **File Format**: Excel export functionality for quotation data

### Development Tools
- **Build**: Vite with React plugin
- **TypeScript**: Full TypeScript support across frontend and backend
- **ESBuild**: Production backend bundling
- **Development**: Hot reload and error overlay support

## Deployment Strategy

### Development Setup
- **Environment**: NODE_ENV=development
- **Database**: Requires DATABASE_URL environment variable
- **Google APIs**: Requires GOOGLE_CLIENT_ID and GOOGLE_API_KEY
- **Hot Reload**: Vite dev server with backend proxy

### Production Build
- **Frontend**: Vite build to `/dist/public`
- **Backend**: ESBuild bundle to `/dist/index.js`
- **Database**: Drizzle migrations via `npm run db:push`
- **Static Assets**: Served from `/dist/public`

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string (required)
- `GOOGLE_CLIENT_ID`: Google OAuth client ID for Drive access
- `GOOGLE_API_KEY`: Google API key for Drive API
- `NODE_ENV`: Environment mode (development/production)

### File Structure
- `/client`: React frontend application
- `/server`: Express backend with API routes
- `/shared`: Shared TypeScript schemas and types
- `/attached_assets`: Static HTML/CSS/JS files for reference
- `/dist`: Production build output directory