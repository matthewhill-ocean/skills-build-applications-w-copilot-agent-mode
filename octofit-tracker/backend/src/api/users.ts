import { Router, type Request, type Response } from 'express';
import User from '../models/user';

const usersRouter = Router();

usersRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const users = await User.find().sort({ totalPoints: -1 }).lean();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error });
  }
});

export default usersRouter;
