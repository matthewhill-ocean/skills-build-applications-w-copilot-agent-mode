"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const activity_1 = __importDefault(require("../models/activity"));
const leaderboard_1 = __importDefault(require("../models/leaderboard"));
const team_1 = __importDefault(require("../models/team"));
const user_1 = __importDefault(require("../models/user"));
const workout_1 = __importDefault(require("../models/workout"));
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        console.log('Seed the octofit_db database with test data');
        await Promise.all([
            activity_1.default.deleteMany({}),
            leaderboard_1.default.deleteMany({}),
            workout_1.default.deleteMany({}),
            team_1.default.deleteMany({}),
            user_1.default.deleteMany({}),
        ]);
        const users = await user_1.default.insertMany([
            {
                name: 'Mia Chen',
                email: 'mia.chen@example.com',
                age: 29,
                fitnessLevel: 'advanced',
                totalPoints: 1420,
            },
            {
                name: 'Ravi Patel',
                email: 'ravi.patel@example.com',
                age: 34,
                fitnessLevel: 'intermediate',
                totalPoints: 1165,
            },
            {
                name: 'Elena Garcia',
                email: 'elena.garcia@example.com',
                age: 27,
                fitnessLevel: 'intermediate',
                totalPoints: 980,
            },
            {
                name: 'Noah Williams',
                email: 'noah.williams@example.com',
                age: 31,
                fitnessLevel: 'beginner',
                totalPoints: 640,
            },
            {
                name: 'Ava Johnson',
                email: 'ava.johnson@example.com',
                age: 25,
                fitnessLevel: 'advanced',
                totalPoints: 1330,
            },
        ]);
        const teams = await team_1.default.insertMany([
            {
                name: 'Summit Sprinters',
                description: 'High-energy runners and interval specialists.',
                members: [users[0]._id, users[1]._id, users[4]._id],
                captain: users[0]._id,
            },
            {
                name: 'Core Collective',
                description: 'Strength-focused members building consistency.',
                members: [users[2]._id, users[3]._id],
                captain: users[2]._id,
            },
        ]);
        await activity_1.default.insertMany([
            {
                user: users[0]._id,
                team: teams[0]._id,
                type: 'run',
                durationMinutes: 52,
                caloriesBurned: 610,
                distanceKm: 10.4,
                loggedAt: new Date('2026-07-16T06:30:00Z'),
            },
            {
                user: users[1]._id,
                team: teams[0]._id,
                type: 'ride',
                durationMinutes: 46,
                caloriesBurned: 520,
                distanceKm: 18.2,
                loggedAt: new Date('2026-07-17T07:10:00Z'),
            },
            {
                user: users[2]._id,
                team: teams[1]._id,
                type: 'strength',
                durationMinutes: 58,
                caloriesBurned: 470,
                loggedAt: new Date('2026-07-17T18:20:00Z'),
            },
            {
                user: users[3]._id,
                team: teams[1]._id,
                type: 'walk',
                durationMinutes: 40,
                caloriesBurned: 230,
                distanceKm: 4.9,
                loggedAt: new Date('2026-07-18T12:00:00Z'),
            },
            {
                user: users[4]._id,
                team: teams[0]._id,
                type: 'swim',
                durationMinutes: 37,
                caloriesBurned: 410,
                distanceKm: 1.6,
                loggedAt: new Date('2026-07-19T06:50:00Z'),
            },
        ]);
        await leaderboard_1.default.insertMany([
            {
                period: '2026-W29',
                team: teams[0]._id,
                points: 3915,
                rank: 1,
            },
            {
                period: '2026-W29',
                team: teams[1]._id,
                points: 1620,
                rank: 2,
            },
        ]);
        await workout_1.default.insertMany([
            {
                user: users[0]._id,
                title: 'Tempo Run + Mobility',
                goal: 'Improve 10K pace while maintaining recovery.',
                intensity: 'high',
                estimatedMinutes: 60,
                exercises: ['15-min warm-up jog', '4 x 8-min tempo', 'Hip mobility flow'],
            },
            {
                user: users[2]._id,
                title: 'Full Body Strength Circuit',
                goal: 'Build foundational strength for race season.',
                intensity: 'medium',
                estimatedMinutes: 50,
                exercises: ['Goblet squats', 'Push-ups', 'Dumbbell rows', 'Dead bugs'],
            },
            {
                user: users[3]._id,
                title: 'Starter Cardio Mix',
                goal: 'Increase weekly activity with low-impact sessions.',
                intensity: 'low',
                estimatedMinutes: 35,
                exercises: ['Brisk walk intervals', 'Bodyweight lunges', 'Stretch cooldown'],
            },
        ]);
        console.log('Database seeding complete with users, teams, activities, leaderboard, and workouts');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
