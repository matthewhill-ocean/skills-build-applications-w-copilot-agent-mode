import express, { type Request, type Response } from 'express';

import db from './config/database';

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(express.json());

app.get('/api/health', (_req: Request, res: Response) => {
  const status = db.readyState === 1 ? 'connected' : 'disconnected';
  res.status(200).json({ status: 'ok', database: status });
});

app.listen(port, () => {
  console.log(`OctoFit backend listening on port ${port}`);
});
