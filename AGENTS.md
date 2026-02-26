# Doctor Suciu Dental Clinic - Agent Documentation

## Project Overview

This is a **React + TypeScript + Vite** web application for Doctor Suciu Dental Clinic, a dental practice website featuring:

- **Public Website**: Responsive dental clinic website with services, team, gallery, and appointment booking
- **Admin Panel**: CMS for managing content (services, doctors, gallery, appointments, blog, FAQ)
- **Dual Viewport Architecture**: Separate mobile and desktop experiences optimized for each form factor
- **CMS Backend**: Supabase PostgreSQL database with Row Level Security (RLS)

**Language**: Romanian (RO) - All UI text and content is in Romanian.

---

## Technology Stack

| Category | Technology |
|----------|------------|
| Framework | React 19 (with StrictMode) |
| Language | TypeScript 5.9 |
| Build Tool | Vite 7 |
| Styling | Tailwind CSS 3.4 + CSS Variables |
| UI Components | shadcn/ui (New York style) |
| Icons | Lucide React |
| Animations | GSAP + Framer Motion |
| Backend | Supabase (PostgreSQL + Auth + Storage) |
| Forms | React Hook Form + Zod |
| Routing | React Router DOM 7 |
| Deployment | Vercel |

---

## Project Structure

```
src/
├── admin/                    # Admin Panel (CMS)
│   ├── components/           # Admin-specific components
│   │   ├── AdminLayout.tsx   # Main admin layout with sidebar
│   │   ├── ImageCropper.tsx  # Image cropping utility
│   │   └── ImageCropSelector.tsx
│   ├── context/
│   │   └── AuthContext.tsx   # Admin authentication (localStorage-based)
│   ├── hooks/                # Admin-specific hooks
│   ├── pages/                # Admin page components
│   │   ├── LoginPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── ServicesPage.tsx
│   │   ├── DoctorsPage.tsx
│   │   ├── AppointmentsPage.tsx
│   │   ├── BlogPage.tsx
│   │   ├── GalleryPage.tsx
│   │   ├── BeforeAfterPage.tsx
│   │   ├── FAQPage.tsx
│   │   ├── SettingsPage.tsx
│   │   └── AnalyticsPage.tsx
│   ├── types/
│   │   └── index.ts          # Admin TypeScript types
│   └── index.tsx             # Admin routes configuration
│
├── components/
│   ├── ui/                   # shadcn/ui components (50+ components)
│   ├── animations/           # Animation components
│   │   ├── FadeIn.tsx
│   │   ├── ScrollReveal.tsx
│   │   ├── CountUp.tsx
│   │   └── ...
│   └── WhatsAppButton.tsx
│
├── desktop/                  # Desktop-specific app
│   └── DesktopApp.tsx        # Desktop routes and layout
│
├── mobile/                   # Mobile-specific app
│   ├── MobileApp.tsx         # Mobile routes and layout
│   ├── MobileHomePage.tsx
│   └── sections/             # Mobile section components
│
├── hooks/                    # Shared custom hooks
│   ├── useIsMobile.ts        # Viewport detection (768px breakpoint)
│   ├── useCMSData.ts         # CMS data fetching
│   ├── useSupabaseCMS.ts     # Supabase CMS operations
│   └── ...
│
├── lib/                      # Utilities
│   ├── utils.ts              # cn() utility for Tailwind
│   ├── supabase.ts           # Supabase client + types
│   └── cms.ts                # CMS helper functions
│
├── pages/                    # Public page components
│   ├── HomePage.tsx
│   ├── ServicesPage.tsx
│   ├── ContactPage.tsx
│   └── DoctorProfilePage.tsx
│
├── sections/                 # Desktop section components
│   ├── Navigation.tsx
│   ├── HeroSection.tsx
│   ├── ServicesSection.tsx
│   ├── TeamSection.tsx
│   ├── ReviewsSection.tsx
│   ├── BeforeAfterSection.tsx
│   ├── ClinicGallery.tsx
│   ├── ContactSection.tsx
│   └── Footer.tsx
│
├── App.tsx                   # Root component with viewport switch
├── main.tsx                  # Entry point
├── index.css                 # Global styles + CSS variables
└── mobile.css                # Mobile-specific styles

supabase/
├── schema.sql                # Database schema definition
├── seed.sql                  # Seed data
└── *.sql                     # Migration files
```

---

## Build Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Linting
npm run lint
```

---

## Environment Variables

Create `.env.local` file with:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

**Note**: All env variables must be prefixed with `VITE_` to be accessible in client code.

---

## Architecture Details

### Viewport Switching

The app uses a breakpoint-based architecture (768px) to serve completely separate experiences:

```typescript
// App.tsx
function ViewportSwitch() {
  const isMobile = useIsMobile(); // matchMedia-based, 768px breakpoint
  return isMobile ? <MobileApp /> : <DesktopApp />;
}
```

- **DesktopApp**: Full desktop experience with hover effects, larger layouts
- **MobileApp**: Touch-optimized mobile experience with bottom bar navigation
- **Admin routes** (`/admin/*`) bypass viewport switching

### Admin Authentication

- **Method**: Local storage-based session (NOT Supabase Auth)
- **Credentials**: Hardcoded (Base64 encoded in AuthContext.tsx)
- **Default credentials**: `admin` / `DSC2024!Team`
- **Session duration**: 8 hours
- **Security features**: Rate limiting (5 attempts), lockout (15 min), activity logging

### Database Schema (Supabase)

| Table | Purpose |
|-------|---------|
| `services` | Dental services catalog |
| `doctors` | Medical team members |
| `before_after` | Before/after treatment photos |
| `gallery` | Clinic gallery images |
| `reviews` | Patient testimonials |
| `faq` | Frequently asked questions |
| `blog_posts` | Blog articles |
| `appointments` | Appointment requests |
| `site_settings` | Site configuration |

All tables have RLS enabled with public read access and authenticated full access.

---

## Code Style Guidelines

### Imports
- Use `@/` alias for all project imports
- Group imports: React → Libraries → Components → Hooks → Utils → Types

### Tailwind Classes
- Use `cn()` utility from `lib/utils.ts` for conditional classes
- Follow shadcn/ui patterns for component styling
- Custom medical color palette defined in `tailwind.config.js`:
  - `medical.navy` - Primary brand color (#1e3a5f)
  - `medical.teal` - Secondary accent (#0d9488)
  - `medical.coral` - Warm accent (#e07a5f)
  - `medical.cream` - Background (#faf9f7)

### Component Patterns
- Use functional components with TypeScript interfaces
- Prefer composition over inheritance
- Animation components are in `/components/animations`

### Naming Conventions
- Components: PascalCase (e.g., `ServiceCard.tsx`)
- Hooks: camelCase with `use` prefix (e.g., `useCMSData.ts`)
- Utilities: camelCase (e.g., `utils.ts`)
- Types/Interfaces: PascalCase (e.g., `Service`, `Doctor`)

---

## Deployment

### Vercel Configuration (`vercel.json`)

- **Framework**: Vite
- **Output**: `dist/`
- **Routing**: SPA fallback to `index.html`
- **Security headers**: XSS protection, frame options, content-type
- **Caching**: Assets cached for 1 year

### Deploy Commands

```bash
# Login
npx vercel login

# Add environment variables
npx vercel env add VITE_SUPABASE_URL
npx vercel env add VITE_SUPABASE_ANON_KEY

# Deploy to production
npx vercel --prod
```

---

## Testing Strategy

Currently, the project does **not** have automated tests configured. Testing is done manually:

1. **Local Development**: `npm run dev`
2. **Preview**: `npm run build && npm run preview`
3. **Production**: Deploy to Vercel and verify

### Manual Testing Checklist

- [ ] Mobile viewport (320px - 768px)
- [ ] Desktop viewport (> 768px)
- [ ] Admin panel navigation
- [ ] Image uploads in admin
- [ ] Form submissions (appointments, contact)
- [ ] Supabase data fetching

---

## Security Considerations

### Admin Panel
- Credentials are Base64 encoded (NOT encrypted) in source
- Session stored in localStorage (vulnerable to XSS)
- Rate limiting implemented for login attempts
- In production, migrate to Supabase Auth or backend authentication

### Supabase
- RLS policies are permissive (`USING (true)` for authenticated users)
- Review and tighten policies before production
- Storage bucket `cms-images` should have proper policies

### Client-Side
- No CSRF protection (not needed for Supabase REST API)
- Environment variables exposed to client (by design for Supabase)

---

## Key Files Reference

| File | Purpose |
|------|---------|
| `vite.config.ts` | Vite configuration, path aliases, build optimization |
| `tailwind.config.js` | Theme configuration, custom colors, animations |
| `components.json` | shadcn/ui configuration |
| `tsconfig.app.json` | TypeScript compiler options |
| `src/lib/supabase.ts` | Database client and TypeScript interfaces |
| `src/admin/context/AuthContext.tsx` | Admin authentication logic |
| `supabase/schema.sql` | Database schema |

---

## Common Tasks

### Adding a New shadcn/ui Component

```bash
npx shadcn add <component-name>
```

### Adding a New Page

1. Create component in `src/pages/` (public) or `src/admin/pages/` (admin)
2. Add route in `src/desktop/DesktopApp.tsx` or `src/mobile/MobileApp.tsx` (public)
3. Add route in `src/admin/index.tsx` (admin)

### Modifying Database Schema

1. Edit `supabase/schema.sql`
2. Apply changes in Supabase SQL Editor
3. Test locally before deploying

---

## Troubleshooting

### Supabase Connection Issues
- Check `.env.local` variables
- Verify Supabase project is running
- Check browser console for errors
- Run `testSupabaseConnection()` from browser console

### Build Errors
- Ensure all imports use `@/` alias correctly
- Check TypeScript errors: `npx tsc --noEmit`
- Clear `node_modules` and reinstall if needed

### Mobile/Desktop Not Switching
- Check `useIsMobile` hook is working
- Verify CSS breakpoint matches hook (768px)
- Clear localStorage if stuck state
