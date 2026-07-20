"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 8000;
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    const status = database_1.default.readyState === 1 ? 'connected' : 'disconnected';
    res.status(200).json({ status: 'ok', database: status });
});
app.listen(port, () => {
    console.log(`OctoFit backend listening on port ${port}`);
});
