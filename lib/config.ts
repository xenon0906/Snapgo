// ============================================================================
// ADMIN DASHBOARD & DATABASE CONFIGURATION
// ============================================================================
//
// CURRENT MODE: Static (frontend-only deployment)
// The admin dashboard is currently in static mode - changes won't persist.
// A warning banner is displayed in the admin panel when in static mode.
//
// ============================================================================
// TO ENABLE DATABASE & ADMIN PERSISTENCE:
// ============================================================================
//
// STEP 1: Set up your database
// ----------------------------------
// Choose one of these providers and get a connection URL:
// - Vercel Postgres: https://vercel.com/docs/storage/vercel-postgres
// - PlanetScale: https://planetscale.com
// - Supabase: https://supabase.com
// - Railway: https://railway.app
// - Local MySQL: mysql://user:pass@localhost:3306/snapgo_db
//
// STEP 2: Add environment variable in Vercel
// ----------------------------------
// Go to Vercel Dashboard > Project Settings > Environment Variables
// Add: DATABASE_URL = "your-connection-string"
//
// STEP 3: Update this file
// ----------------------------------
// Change the line below from:
//   export const USE_DATABASE = false
// To:
//   export const USE_DATABASE = process.env.DATABASE_URL ? true : false
//
// STEP 4: Run database migrations
// ----------------------------------
// npx prisma generate
// npx prisma db push
// npx prisma db seed  (optional: seeds initial content)
//
// STEP 5: Redeploy to Vercel
// ----------------------------------
// Push changes or trigger a redeploy in Vercel dashboard
//
// ============================================================================
// WHAT HAPPENS WHEN ENABLED:
// ============================================================================
// - Admin dashboard changes persist to database
// - Warning banner disappears from admin panel
// - Content can be managed via /admin routes
// - All CRUD operations work for blogs, team, FAQ, stats, etc.
// - Instagram reels can be managed dynamically
//
// ============================================================================

export const USE_DATABASE = false

// When ready to enable, change to:
// export const USE_DATABASE = process.env.DATABASE_URL ? true : false
