import mongoose from 'mongoose';
import { User } from '../models/User.js';
import { Team } from '../models/Team.js';
import { Activity } from '../models/Activity.js';
import { Leaderboard } from '../models/Leaderboard.js';
import { Workout } from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    // Clear existing data
    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await Leaderboard.deleteMany({});
    await Workout.deleteMany({});
    console.log('Cleared existing data');

    // Create users
    const users = await User.create([
      {
        name: 'Alice Johnson',
        email: 'alice@example.com',
        password: 'hashedpassword123',
        profile: {
          bio: 'Fitness enthusiast and marathon runner',
          avatar: 'https://api.example.com/avatars/alice.jpg',
        },
      },
      {
        name: 'Bob Smith',
        email: 'bob@example.com',
        password: 'hashedpassword456',
        profile: {
          bio: 'CrossFit coach and health advocate',
          avatar: 'https://api.example.com/avatars/bob.jpg',
        },
      },
      {
        name: 'Carol Davis',
        email: 'carol@example.com',
        password: 'hashedpassword789',
        profile: {
          bio: 'Yoga instructor and wellness mentor',
          avatar: 'https://api.example.com/avatars/carol.jpg',
        },
      },
      {
        name: 'David Wilson',
        email: 'david@example.com',
        password: 'hashedpassword012',
        profile: {
          bio: 'Personal trainer specializing in strength training',
          avatar: 'https://api.example.com/avatars/david.jpg',
        },
      },
    ]);
    console.log(`Created ${users.length} users`);

    // Create teams
    const teams = await Team.create([
      {
        name: 'Morning Warriors',
        description: 'Early risers focused on morning workouts',
        owner: users[0]._id,
        members: [users[0]._id, users[1]._id],
      },
      {
        name: 'Fitness Legends',
        description: 'Elite athletes pushing their limits',
        owner: users[1]._id,
        members: [users[1]._id, users[2]._id, users[3]._id],
      },
      {
        name: 'Wellness Circle',
        description: 'Community focused on holistic health',
        owner: users[2]._id,
        members: [users[2]._id, users[0]._id],
      },
    ]);
    console.log(`Created ${teams.length} teams`);

    // Create activities
    const activities = await Activity.create([
      {
        user: users[0]._id,
        type: 'running',
        duration: 45,
        distance: 7.5,
        calories: 600,
        description: 'Morning run in the park',
      },
      {
        user: users[0]._id,
        type: 'cycling',
        duration: 60,
        distance: 25,
        calories: 700,
        description: 'Trail cycling adventure',
      },
      {
        user: users[1]._id,
        type: 'strength_training',
        duration: 90,
        calories: 800,
        description: 'Upper body strength session',
      },
      {
        user: users[1]._id,
        type: 'running',
        duration: 30,
        distance: 5,
        calories: 400,
        description: 'Evening jog',
      },
      {
        user: users[2]._id,
        type: 'yoga',
        duration: 60,
        calories: 300,
        description: 'Vinyasa flow session',
      },
      {
        user: users[3]._id,
        type: 'strength_training',
        duration: 75,
        calories: 750,
        description: 'Full body workout',
      },
    ]);
    console.log(`Created ${activities.length} activities`);

    // Create workouts
    const workouts = await Workout.create([
      {
        name: 'Beginner Full Body',
        description: 'Perfect for starting your fitness journey',
        exercises: [
          { name: 'Squats', sets: 3, reps: 12 },
          { name: 'Push-ups', sets: 3, reps: 10 },
          { name: 'Plank', sets: 3, reps: 30 },
        ],
        difficulty: 'easy',
      },
      {
        name: 'Intermediate Upper Body',
        description: 'Build strength in chest, back, and arms',
        exercises: [
          { name: 'Bench Press', sets: 4, reps: 8 },
          { name: 'Lat Pulldowns', sets: 4, reps: 10 },
          { name: 'Dumbbell Rows', sets: 3, reps: 10 },
          { name: 'Barbell Curls', sets: 3, reps: 12 },
        ],
        difficulty: 'medium',
      },
      {
        name: 'Advanced HIIT Circuit',
        description: 'High intensity interval training for maximum burn',
        exercises: [
          { name: 'Burpees', sets: 5, reps: 15 },
          { name: 'Jump Squats', sets: 5, reps: 20 },
          { name: 'Mountain Climbers', sets: 5, reps: 30 },
          { name: 'High Knees', sets: 5, reps: 20 },
        ],
        difficulty: 'hard',
      },
      {
        name: 'Core Strengthening',
        description: 'Focus on building abdominal and core strength',
        exercises: [
          { name: 'Crunches', sets: 3, reps: 15 },
          { name: 'Leg Raises', sets: 3, reps: 12 },
          { name: 'Russian Twists', sets: 3, reps: 20 },
          { name: 'Bicycle Crunches', sets: 3, reps: 20 },
        ],
        difficulty: 'medium',
      },
    ]);
    console.log(`Created ${workouts.length} workouts`);

    // Create leaderboard entries
    const leaderboardEntries = await Leaderboard.create([
      {
        user: users[0]._id,
        team: teams[0]._id,
        score: 1500,
        rank: 1,
      },
      {
        user: users[1]._id,
        team: teams[0]._id,
        score: 1200,
        rank: 2,
      },
      {
        user: users[1]._id,
        team: teams[1]._id,
        score: 2000,
        rank: 1,
      },
      {
        user: users[2]._id,
        team: teams[1]._id,
        score: 1800,
        rank: 2,
      },
      {
        user: users[3]._id,
        team: teams[1]._id,
        score: 1600,
        rank: 3,
      },
      {
        user: users[2]._id,
        team: teams[2]._id,
        score: 1400,
        rank: 1,
      },
      {
        user: users[0]._id,
        team: teams[2]._id,
        score: 1100,
        rank: 2,
      },
    ]);
    console.log(`Created ${leaderboardEntries.length} leaderboard entries`);

    console.log('Database seeding complete');
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

