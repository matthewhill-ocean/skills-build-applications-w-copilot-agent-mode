"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const activities_1 = __importDefault(require("./api/activities"));
const leaderboard_1 = __importDefault(require("./api/leaderboard"));
const teams_1 = __importDefault(require("./api/teams"));
const users_1 = __importDefault(require("./api/users"));
const workouts_1 = __importDefault(require("./api/workouts"));
const apiBaseUrl_1 = require("./config/apiBaseUrl");
const database_1 = __importDefault(require("./config/database"));
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 8000;
app.use(express_1.default.json());
app.use('/api/users', users_1.default);
app.use('/api/teams', teams_1.default);
app.use('/api/activities', activities_1.default);
app.use('/api/leaderboard', leaderboard_1.default);
app.use('/api/workouts', workouts_1.default);
app.get('/api/health', (_req, res) => {
    const status = database_1.default.readyState === 1 ? 'connected' : 'disconnected';
    res.status(200).json({ status: 'ok', database: status });
});
app.listen(port, () => {
    console.log(`OctoFit backend listening on port ${port}`);
    console.log(`API base URL: ${(0, apiBaseUrl_1.getApiBaseUrl)()}`);
});
