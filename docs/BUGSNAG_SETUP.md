# Bugsnag Error Tracking Setup

Simple setup for Bugsnag error tracking in the Blackjack Strategy Simulator.

## Quick Setup

1. **Go to [bugsnag.com](https://bugsnag.com)**
2. **Click "Start free trial"** (7,500 events/month free)
3. **Create project**: Choose "Browser" → "React"
4. **Copy API key** from the setup screen
5. **Create `.env.local`**:
   ```env
   VITE_ENABLE_ERROR_TRACKING=true
   VITE_BUGSNAG_API_KEY=your_api_key_here
   ```

That's it! Your error tracking is ready.

## Test It

1. Run `npm run dev`
2. Add this to any component temporarily:
   ```jsx
   throw new Error("Test error for Bugsnag");
   ```
3. Check your Bugsnag dashboard

## Features

- 7,500 errors/month free
- Real-time error notifications
- Automatic React error boundaries
- User context tracking
- Environment filtering (dev/staging/production)