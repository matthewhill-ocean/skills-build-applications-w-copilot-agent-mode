"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const workout_1 = __importDefault(require("../models/workout"));
const workoutsRouter = (0, express_1.Router)();
workoutsRouter.get('/', async (_req, res) => {
    try {
        const workouts = await workout_1.default.find()
            .populate('user', 'name email fitnessLevel')
            .sort({ createdAt: -1 })
            .lean();
        res.status(200).json(workouts);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch workouts', error });
    }
});
exports.default = workoutsRouter;
