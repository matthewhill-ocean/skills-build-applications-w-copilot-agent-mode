import { Router, type Request, type Response } from 'express';
import Activity from '../models/activity';

const activitiesRouter = Router();

activitiesRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const activities = await Activity.find()
      .populate('user', 'name email')
      .populate('team', 'name')
      .sort({ loggedAt: -1 })
      .lean();

    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch activities', error });
  }
});

export default activitiesRouter;
