import { Router, type Request, type Response } from 'express';
import Workout from '../models/workout';

const workoutsRouter = Router();

workoutsRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const workouts = await Workout.find()
      .populate('user', 'name email fitnessLevel')
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch workouts', error });
  }
});

export default workoutsRouter;
