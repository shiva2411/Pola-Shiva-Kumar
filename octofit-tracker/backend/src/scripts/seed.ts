/**
 * Seed the octofit_db database with test data
 */
import mongoose from 'mongoose';
import { User, Team, Activity, Workout, Leaderboard } from '../models';

const MONGODB_URI = 'mongodb://localhost:27017/octofit_db';

async function seed() {
  console.log('Seed the octofit_db database with test data');
  await mongoose.connect(MONGODB_URI);

  // Clear existing data
  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Workout.deleteMany({}),
    Leaderboard.deleteMany({}),
  ]);

  // Create teams
  const teamA = await Team.create({ name: 'Team Phoenix', description: 'Morning runners', members: [] });
  const teamB = await Team.create({ name: 'Team Aurora', description: 'Evening cyclists', members: [] });

  // Create users
  const users = await User.create([
    { name: 'Alice Park', email: 'alice@example.com', team: teamA._id },
    { name: 'Bob Singh', email: 'bob@example.com', team: teamA._id },
    { name: 'Carlos Mendes', email: 'carlos@example.com', team: teamB._id },
    { name: 'Dana Lee', email: 'dana@example.com', team: teamB._id }
  ]);

  // Update teams with members
  teamA.members = [users[0]._id, users[1]._id];
  teamB.members = [users[2]._id, users[3]._id];
  await teamA.save();
  await teamB.save();

  // Create workouts
  const workout1 = await Workout.create({
    name: 'Full Body HIIT',
    exercises: [
      { name: 'Jumping Jacks', durationMinutes: 5 },
      { name: 'Push Ups', sets: 3, reps: 12 },
      { name: 'Burpees', durationMinutes: 5 }
    ],
    durationMinutes: 30,
    difficulty: 'hard',
    createdBy: users[0]._id
  });

  const workout2 = await Workout.create({
    name: 'Morning Yoga Flow',
    exercises: [
      { name: 'Sun Salutation', durationMinutes: 10 },
      { name: 'Tree Pose', durationMinutes: 5 }
    ],
    durationMinutes: 20,
    difficulty: 'easy',
    createdBy: users[2]._id
  });

  // Create activities
  const now = new Date();
  await Activity.create([
    { user: users[0]._id, activityType: 'running', durationMinutes: 45, calories: 420, date: new Date(now.getTime() - 1000 * 60 * 60 * 24) },
    { user: users[1]._id, activityType: 'cycling', durationMinutes: 60, calories: 600, date: new Date(now.getTime() - 1000 * 60 * 60 * 48) },
    { user: users[2]._id, activityType: 'yoga', durationMinutes: 30, calories: 120, date: new Date(now.getTime() - 1000 * 60 * 60 * 12) },
    { user: users[3]._id, activityType: 'swimming', durationMinutes: 50, calories: 500, date: new Date(now.getTime() - 1000 * 60 * 60 * 72) }
  ]);

  // Create leaderboard simple scores
  await Leaderboard.create([
    { user: users[0]._id, team: teamA._id, score: 1500, rank: 1, period: 'weekly' },
    { user: users[1]._id, team: teamA._id, score: 1200, rank: 2, period: 'weekly' },
    { user: users[2]._id, team: teamB._id, score: 1300, rank: 1, period: 'weekly' },
    { user: users[3]._id, team: teamB._id, score: 1100, rank: 2, period: 'weekly' }
  ]);

  console.log('Seeding complete. Inserted sample teams, users, workouts, activities, and leaderboard entries.');

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
