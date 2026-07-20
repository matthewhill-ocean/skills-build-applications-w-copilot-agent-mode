import express, { type Request, type Response } from 'express';

import activitiesRouter from './api/activities';
import leaderboardRouter from './api/leaderboard';
import teamsRouter from './api/teams';
import usersRouter from './api/users';
import workoutsRouter from './api/workouts';
import { getApiBaseUrl } from './config/apiBaseUrl';
import db from './config/database';

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.get('/api/health', (_req: Request, res: Response) => {
  const status = db.readyState === 1 ? 'connected' : 'disconnected';
  res.status(200).json({ status: 'ok', database: status });
});

app.listen(port, () => {
  console.log(`OctoFit backend listening on port ${port}`);
  console.log(`API base URL: ${getApiBaseUrl()}`);
});
