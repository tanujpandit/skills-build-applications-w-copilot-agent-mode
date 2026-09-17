# Octofit Tracker - React Frontend

This is the presentation tier for the Octofit Tracker multi-tier application, built with React 19 and Vite.

## Features

- **React 19 with Vite** - Fast, modern development experience with HMR
- **React Router DOM** - Client-side navigation between app sections
- **Bootstrap 5** - Responsive design and styling
- **Component-based Architecture** - Modular and maintainable code
- **API Integration** - Seamless communication with the backend logic tier

## Components

- **Activities** - Log and track user activities
- **Workouts** - Browse and manage personalized workout suggestions
- **Users** - User profile management
- **Teams** - Create and manage fitness teams
- **Leaderboard** - Competitive rankings and scoreboard

## Prerequisites

- Node.js (LTS recommended)
- npm (comes with Node.js)

## Installation

```bash
# Install dependencies
npm install --prefix octofit-tracker/frontend

# If not already installed, add required packages
npm install bootstrap react-router-dom --prefix octofit-tracker/frontend
```

## Configuration

### Required Environment Variables

The application requires the `VITE_CODESPACE_NAME` environment variable to connect to the backend API.

**Setup Steps:**

1. Copy the example environment file:
   ```bash
   cp octofit-tracker/frontend/.env.local.example octofit-tracker/frontend/.env.local
   ```

2. Edit `.env.local` and set your Codespace name:
   ```
   VITE_CODESPACE_NAME=your-codespace-name
   ```

   - Replace `your-codespace-name` with your actual GitHub Codespace name
   - Example: If your Codespace URL is `https://my-space-123.github.dev`, use `my-space-123`

### API Endpoints

The frontend communicates with the backend via the following base URL:
```
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/
```

Specific endpoints:
- `/activities/` - Activity logging and retrieval
- `/workouts/` - Workout management
- `/users/` - User profiles
- `/teams/` - Team management
- `/leaderboard/` - Leaderboard data

## Development

### Start Development Server

```bash
npm run dev --prefix octofit-tracker/frontend
```

The app will be available at `http://localhost:5173` (default Vite port).

### Build for Production

```bash
npm run build --prefix octofit-tracker/frontend
```

### Preview Production Build

```bash
npm run preview --prefix octofit-tracker/frontend
```

## Project Structure

```
octofit-tracker/frontend/
├── public/                  # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── Activities.jsx
│   │   ├── Leaderboard.jsx
│   │   ├── Teams.jsx
│   │   ├── Users.jsx
│   │   └── Workouts.jsx
│   ├── utils/
│   │   └── api.js         # API utility functions
│   ├── App.jsx            # Main app component with routing
│   ├── App.css            # App styling
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── .env.local.example     # Environment variable template
├── vite.config.js         # Vite configuration
├── package.json
└── index.html
```

## API Integration

All API calls use the utility functions in `src/utils/api.js`:

- `fetchData(endpoint)` - GET request
- `postData(endpoint, payload)` - POST request
- `updateData(endpoint, payload)` - PUT request
- `deleteData(endpoint)` - DELETE request

### Example Usage

```javascript
import { fetchData, postData } from '../utils/api';

// Fetch data
const activities = await fetchData('/activities/');

// Post new data
await postData('/activities/', {
  name: 'Running',
  duration: 30,
  calories: 300
});
```

The API utilities handle:
- Safe fallback if `VITE_CODESPACE_NAME` is unset
- Compatibility with paginated responses (`{ results: [...] }`)
- Compatibility with array responses
- Error handling and logging

## Technologies Used

- **React 19** - UI library
- **React Router DOM** - Client-side routing
- **Vite** - Build tool and dev server
- **Bootstrap 5** - CSS framework
- **JavaScript** - Programming language (ES6+)

## Troubleshooting

### "Cannot fetch data: VITE_CODESPACE_NAME is not configured"

**Solution:** Ensure `.env.local` file exists with `VITE_CODESPACE_NAME` properly set.

### API requests failing with 404

**Solution:** Verify that:
1. The backend logic tier is running on port 8000
2. Your Codespace name in `.env.local` matches your actual Codespace
3. The API endpoints are correctly implemented in the backend

### Port 5173 already in use

**Solution:** You can specify a different port:
```bash
npm run dev --prefix octofit-tracker/frontend -- --port 3000
```

## Next Steps

1. Ensure the backend logic tier is set up and running
2. Configure `.env.local` with your Codespace name
3. Start the development server
4. Navigate to the app and test the components
5. Verify API connectivity with the backend

## Additional Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vite.dev)
- [React Router Documentation](https://reactrouter.com)
- [Bootstrap Documentation](https://getbootstrap.com/docs)
