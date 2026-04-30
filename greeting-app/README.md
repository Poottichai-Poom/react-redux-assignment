 # Expense Tracker

 A React + Vite expense tracker with:

 - Dark / light theme support using CSS Modules and CSS variables
 - Monthly budget tracking with percentage used
 - Export expenses as CSV
 - Live OpenWeather forecast for today
 - Dedicated staging branch for preview deployments

 ## Features

 - Theme toggle with persisted user preference
 - Weather widget using OpenWeather API
 - Budget progress bar and alerts for high spending
 - Export all expenses to a CSV file
 - Staging branch supports separate Vercel preview

 ## Setup

 1. Copy `.env.example` to `.env` at the project root
 2. Add your OpenWeather API key using `REACT_APP_OPENWEATHER_KEY`
 3. (Optional) set `REACT_APP_OPENWEATHER_CITY` for the fallback location
 4. Run:

```bash
npm install
npm run dev
```

## Environment variables

```bash
REACT_APP_OPENWEATHER_KEY=your-openweather-api-key
REACT_APP_OPENWEATHER_CITY=Bangkok
VITE_APP_APP_TITLE=My Expense Tracker
VITE_APP_VERSION=1.0.0
```

## Preview

![Live expense tracker screenshot](./screenshot.svg)

## Notes

 - The app will load a weather forecast from the OpenWeather API.
 - Theme selection is saved to `localStorage`.
 - A staging branch is used to generate an isolated Vercel preview URL when the repo is connected to Vercel.
