# OctoFit Backend Setup Guide

## Prerequisites

- Node.js (LTS)
- MongoDB (running on port 27017)
- npm

## Installation

1. Install dependencies:
```bash
npm install
```

2. Build TypeScript:
```bash
npm run build
```

## Running the Application

### Development Mode (with hot reload)
```bash
npm run dev
```

The server will start on `http://localhost:8000` with auto-reload on file changes.

### Production Mode
```bash
npm run build
npm start
```

The server will start on port 8000.

## Database Setup

### Start MongoDB

Ensure MongoDB is running on `localhost:27017`:
```bash
mongod --dbpath /data/db
```

### Seed the Database

Populate `octofit_db` with sample data:
```bash
npm run seed
```

This script will:
1. Connect to MongoDB on port 27017
2. Clear existing collections
3. Insert sample data for:
   - 4 Users (Alice, Bob, Carol, David)
   - 3 Teams with members and ownership
   - 6 Activities with various types and metrics
   - 4 Workouts (easy, medium, hard difficulties)
   - 7 Leaderboard entries across teams

## API Endpoints

### Health Check
```
GET /api/health
```

### Users
- `GET /api/users` - List all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Teams
- `GET /api/teams` - List all teams
- `GET /api/teams/:id` - Get team by ID
- `POST /api/teams` - Create new team
- `PUT /api/teams/:id` - Update team
- `DELETE /api/teams/:id` - Delete team

### Activities
- `GET /api/activities` - List all activities
- `GET /api/activities/:id` - Get activity by ID
- `POST /api/activities` - Create new activity
- `PUT /api/activities/:id` - Update activity
- `DELETE /api/activities/:id` - Delete activity

### Leaderboard
- `GET /api/leaderboard` - Get all leaderboard entries (sorted by score)
- `GET /api/leaderboard/:id` - Get leaderboard entry by ID
- `POST /api/leaderboard` - Create new leaderboard entry
- `PUT /api/leaderboard/:id` - Update leaderboard entry
- `DELETE /api/leaderboard/:id` - Delete leaderboard entry

### Workouts
- `GET /api/workouts` - List all workouts
- `GET /api/workouts/:id` - Get workout by ID
- `POST /api/workouts` - Create new workout
- `PUT /api/workouts/:id` - Update workout
- `DELETE /api/workouts/:id` - Delete workout

## Environment Variables

- `PORT` - Server port (default: 8000)
- `MONGODB_URI` - MongoDB connection string (default: mongodb://localhost:27017/octofit_db)
- `CODESPACE_NAME` - GitHub Codespace name (optional, for Codespace URL generation)

## Verifying the Setup

1. Start the dev server:
```bash
npm run dev
```

2. Test the health endpoint:
```bash
curl http://localhost:8000/api/health
```

3. Seed the database (in another terminal):
```bash
npm run seed
```

4. Test the API endpoints:
```bash
curl http://localhost:8000/api/users
curl http://localhost:8000/api/teams
curl http://localhost:8000/api/activities
curl http://localhost:8000/api/workouts
curl http://localhost:8000/api/leaderboard
```

## Database Schema

### User
- `name`: String (required)
- `email`: String (required, unique)
- `password`: String (required)
- `profile.bio`: String (optional)
- `profile.avatar`: String (optional)
- `createdAt`: Date
- `updatedAt`: Date

### Team
- `name`: String (required)
- `description`: String (optional)
- `owner`: ObjectId (User reference, required)
- `members`: [ObjectId] (User references)
- `createdAt`: Date
- `updatedAt`: Date

### Activity
- `user`: ObjectId (User reference, required)
- `type`: String (required)
- `duration`: Number (minutes, required)
- `distance`: Number (km, optional)
- `calories`: Number (optional)
- `description`: String (optional)
- `createdAt`: Date
- `updatedAt`: Date

### Workout
- `name`: String (required)
- `description`: String (required)
- `exercises`: Array (required)
  - `name`: String
  - `sets`: Number
  - `reps`: Number
- `difficulty`: Enum ('easy', 'medium', 'hard')
- `createdAt`: Date
- `updatedAt`: Date

### Leaderboard
- `user`: ObjectId (User reference, required)
- `team`: ObjectId (Team reference, required)
- `score`: Number (default: 0)
- `rank`: Number (default: 0)
- `createdAt`: Date
- `updatedAt`: Date
