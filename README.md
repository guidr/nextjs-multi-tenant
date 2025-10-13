# Next.js Multi-Tenant Application with ISR

A reference implementation demonstrating how to build a secure multi-tenant Next.js application using subdomain-based tenant identification and Incremental Static Regeneration (ISR).

## 🎯 Overview

This project serves as an example and template for building multi-tenant applications in Next.js where:
- **Tenant identification** is based on the request subdomain
- **ISR (Incremental Static Regeneration)** is used for dynamic content with caching
- **Data isolation** is guaranteed between tenants at the routing level
- **URL rewriting** keeps tenant identifiers hidden from end users

## 🚨 The Problem

When using ISR in a multi-tenant application with a common route structure, there's a critical issue: **cached pages can leak data between tenants**.

![ISR Multi-Tenant Problem](./Architecting%20Multi-Tenant%20Solutions%20with%20Next.js%20and%20the%20App%20Router.png)

As illustrated above, when multiple tenants share the same route (e.g., `/dinner`), Next.js may serve a cached version of the page to the wrong tenant, causing data leakage.

## ✅ The Solution

This repository demonstrates the solution presented in the talk **[Building Secure Multi-Tenant Apps with Next.js](https://www.youtube.com/watch?v=GWdySmcNKwo)** by [Guilherme Dalla Rosa](https://www.linkedin.com/in/guidr).

### Dynamic Route Segment

All routes are nested under a `[tenant]` dynamic segment in the App Router

```
src/app/[tenant]/
├── page.tsx          # Home page
└── dinner/
    └── page.tsx      # Dinner page with ISR
```

### Middleware-Based Rewriting

The middleware (`src/middleware.ts`) detects the tenant from the subdomain and rewrites the URL:
```
chicken.demo.local/dinner  →  /chicken/dinner (internal)
fox.demo.local/dinner  →  /fox/dinner (internal)
```

### Tenant-Scoped Caching

Because each tenant has its own route segment, ISR caches are isolated per tenant, preventing data leakage.

## 📋 Prerequisites

Before running the project, you need to configure local DNS entries to map the example tenant subdomains to localhost.

Edit your hosts file and add the following lines:

```
127.0.0.1	chicken.demo.local
127.0.0.1	fox.demo.local
```

**Hosts file location:**
- **macOS/Linux**: `/etc/hosts` (requires sudo: `sudo nano /etc/hosts`)
- **Windows**: `C:\Windows\System32\drivers\etc\hosts` (run editor as Administrator)

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will start on port 3000. Access the demo tenants at:

- **Chicken Tenant**: http://chicken.demo.local:3000
- **Fox Tenant**: http://fox.demo.local:3000

### Available Routes

Each tenant has access to:
- `/` - Home dashboard
- `/dinner` - Tonight's dinner menu (ISR enabled, 60s revalidation)

### Other Commands

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🏗️ Project Structure

```
/
├── src/
│   ├── middleware.ts              # Tenant detection and URL rewriting
│   ├── app/
│   │   ├── [tenant]/              # Tenant-scoped routes
│   │   │   ├── page.tsx           # Home page (ISR)
│   │   │   ├── layout.tsx         # Tenant layout
│   │   │   └── dinner/
│   │   │       └── page.tsx       # Dinner page (ISR with 60s cache)
│   │   ├── layout.tsx             # Root layout
│   │   └── globals.css
│   ├── components/
│   │   └── ui/                    # Reusable UI components
│   ├── data/
│   │   └── tenants.json           # Tenant configuration
│   └── lib/
│       ├── tenant.ts              # Tenant data utilities
│       └── utils.ts
├── public/
│   └── images/                    # Static assets
└── package.json
```

## 🔑 How It Works

```mermaid
sequenceDiagram
    participant Browser
    participant Middleware
    participant Page
    participant getTenant()
    participant Cache

    Browser->>Middleware: GET chicken.demo.local/dinner
    Middleware->>Middleware: Extract "chicken" from subdomain
    Middleware->>Page: Rewrite to /chicken/dinner<br/>+ Add x-tenant header
    Page->>getTenant(): Load tenant configuration
    getTenant()-->>Page: Return tenant data
    Page->>Cache: Check cache for /chicken/dinner
    alt Cache Hit (< 60s)
        Cache-->>Page: Return cached data
    else Cache Miss or Stale
        Page->>Page: Fetch fresh data
        Page->>Cache: Store with 60s TTL
    end
    Page-->>Browser: Render personalized page
```

### Request Flow

1. **[Middleware](src/middleware.ts)** intercepts the incoming request at `chicken.demo.local/dinner`
   - Extracts `chicken` from the subdomain using regex pattern matching
   - Rewrites the URL internally to `/chicken/dinner` (tenant-scoped route)
   - Adds `x-tenant: chicken` header for debugging purposes

2. **[Page Component](src/app/[tenant]/dinner/page.tsx)** receives the rewritten request
   - Loads tenant-specific configuration from [`tenants.json`](src/data/tenants.json)
   - Fetches data with caching enabled using `unstable_cache` (simulating API calls)
   - Cache is scoped to the tenant route segment, ensuring data isolation

3. **Caching Strategy**
   - ISR with 60-second revalidation (`revalidate: 60`)
   - Each tenant gets its own cache entry (e.g., `/chicken/dinner`, `/fox/dinner`)
   - Stale-While-Revalidate (SWR) serves cached content while refreshing in the background

### Real-World API Integration

In production scenarios with external APIs, you can leverage Next.js native fetch caching:

```typescript
const response = await fetch(`https://api.example.com/tenant/${tenantId}/dinner`, {
  next: {
    revalidate: 60, // Cache for 60 seconds
  },
})
```

This approach provides the same caching benefits with automatic revalidation and SWR support.

## 🛠️ Tech Stack

- [Next.js 15](https://nextjs.org/) with App Router
- [React 19](https://react.dev/)
- [Upstash Redis](https://upstash.com/) for data storage
- [Tailwind 4](https://tailwindcss.com/) for styling
- [shadcn/ui](https://ui.shadcn.com/) for the design system

## 📝 Adding a New Tenant

1. Edit `src/data/tenants.json`:
   ```json
   {
     "newtenantid": {
       "emoji": "🦆",
       "name": "Duck",
       "status": "Active",
       "favouriteDish": {
         "name": "Pizza",
         "image": "/images/pizza.png"
       }
     }
   }
   ```

2. Add DNS entry to `/etc/hosts`:
   ```
   127.0.0.1	duck.demo.local
   ```

3. Restart the dev server and access at `http://duck.demo.local:3000`

## 🤝 Contributing

This is a demonstration project. Feel free to fork and adapt it to your needs!

## 📄 License

MIT
