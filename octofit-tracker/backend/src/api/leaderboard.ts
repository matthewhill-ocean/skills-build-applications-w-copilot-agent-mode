import { Router, type Request, type Response } from 'express';
import Leaderboard from '../models/leaderboard';

const leaderboardRouter = Router();

leaderboardRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const standings = await Leaderboard.find()
      .populate('team', 'name')
      .sort({ rank: 1 })
      .lean();

    res.status(200).json(standings);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch leaderboard', error });
  }
});

export default leaderboardRouter;
