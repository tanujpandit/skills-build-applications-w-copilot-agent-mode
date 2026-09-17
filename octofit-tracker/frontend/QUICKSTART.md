# 🐙 Octofit Tracker React Frontend - Quick Start

## What's Been Updated

✅ **React 19 Presentation Tier** with full multi-tier application support:
- React Router DOM navigation
- 5 feature components (Activities, Workouts, Users, Teams, Leaderboard)
- Bootstrap 5 responsive styling
- Vite environment variables for API configuration
- Centralized API utility layer

## Quick Setup (3 steps)

### 1️⃣ Configure Environment
```bash
cp octofit-tracker/frontend/.env.local.example octofit-tracker/frontend/.env.local
```

Edit `.env.local` and set your Codespace name:
```
VITE_CODESPACE_NAME=your-codespace-name
```

### 2️⃣ Install Dependencies (if needed)
```bash
npm install --prefix octofit-tracker/frontend
```

### 3️⃣ Start the App
```bash
npm run dev --prefix octofit-tracker/frontend
```

Visit: **http://localhost:5173**

## Component Overview

| Component | Purpose | Features |
|-----------|---------|----------|
| 🏠 **Home** | App overview | Configuration info, quick links |
| 📊 **Activities** | Log workouts | Form to log, list recent activities |
| 💪 **Workouts** | Fitness plans | Browse, create with difficulty levels |
| 👥 **Users** | Profiles | Create profiles, view user stats |
| 👨‍👩‍👧‍👦 **Teams** | Group management | Create teams, view member stats |
| 🏆 **Leaderboard** | Rankings | Competitive scoreboard |

## API Connectivity

The app communicates with the backend via:
```
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

**Supported response formats:**
- Paginated: `{ results: [...], count, next }`
- Array: `[...]`

Both are automatically handled!

## Key Files

```
octofit-tracker/frontend/
├── src/
│   ├── App.jsx                    # Main app with routing
│   ├── components/
│   │   ├── Activities.jsx
│   │   ├── Workouts.jsx
│   │   ├── Users.jsx
│   │   ├── Teams.jsx
│   │   └── Leaderboard.jsx
│   └── utils/
│       └── api.js                 # API helper functions
├── .env.local                     # Configuration (create from example)
├── .env.local.example             # Configuration template
├── FRONTEND_SETUP.md              # Detailed setup guide
└── package.json                   # Dependencies
```

## Environment Configuration

**Required:** `VITE_CODESPACE_NAME`
- Example: If Codespace URL is `https://my-space-abc.github.dev`, set `my-space-abc`
- Safe fallback with warnings if not set

**Docs:** See `.env.local.example` and `FRONTEND_SETUP.md`

## Development Scripts

```bash
# Start dev server (HMR enabled)
npm run dev --prefix octofit-tracker/frontend

# Build for production
npm run build --prefix octofit-tracker/frontend

# Preview production build
npm run preview --prefix octofit-tracker/frontend

# Run linter
npm run lint --prefix octofit-tracker/frontend
```

## Technology Stack

- **React 19** - Latest hooks & features
- **React Router DOM v7** - Client-side routing
- **Vite** - Fast dev & build
- **Bootstrap 5** - Responsive UI
- **JavaScript ES6+** - Modern JavaScript

## Features

✨ **Modern Architecture**
- Component-based design
- React Hooks (useState, useEffect)
- Client-side routing
- Responsive Bootstrap layout

🔗 **API Integration**
- Centralized fetch utilities
- Error handling & logging
- Automatic response format handling
- Loading states & user feedback

🎨 **User Experience**
- Dark navbar navigation
- Card layouts with hover effects
- Form validation
- Error alerts
- Mobile responsive

⚙️ **Configuration**
- Environment variables via Vite
- Safe fallback warnings
- Example template provided

## Troubleshooting

**"Cannot fetch data: VITE_CODESPACE_NAME is not configured"**
→ Create `.env.local` from `.env.local.example` and add your Codespace name

**API requests failing**
→ Check backend is running on port 8000 & Codespace name is correct

**Port 5173 in use**
→ `npm run dev --prefix octofit-tracker/frontend -- --port 3000`

## Full Setup Guide

For detailed instructions, see: **FRONTEND_SETUP.md**

---

**Ready?** Follow the 3-step Quick Setup above and start building! 🚀
