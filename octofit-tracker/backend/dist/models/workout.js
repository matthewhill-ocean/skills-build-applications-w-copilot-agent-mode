"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const workoutSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    goal: { type: String, required: true, trim: true },
    intensity: {
        type: String,
        enum: ['low', 'medium', 'high'],
        required: true,
    },
    estimatedMinutes: { type: Number, required: true, min: 5 },
    exercises: [{ type: String, required: true, trim: true }],
}, { timestamps: true });
const Workout = (0, mongoose_1.model)('Workout', workoutSchema);
exports.default = Workout;
