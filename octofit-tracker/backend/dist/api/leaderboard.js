"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const leaderboard_1 = __importDefault(require("../models/leaderboard"));
const leaderboardRouter = (0, express_1.Router)();
leaderboardRouter.get('/', async (_req, res) => {
    try {
        const standings = await leaderboard_1.default.find()
            .populate('team', 'name')
            .sort({ rank: 1 })
            .lean();
        res.status(200).json(standings);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch leaderboard', error });
    }
});
exports.default = leaderboardRouter;
