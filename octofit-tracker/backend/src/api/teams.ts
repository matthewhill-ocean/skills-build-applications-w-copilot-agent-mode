import { Router, type Request, type Response } from 'express';
import Team from '../models/team';

const teamsRouter = Router();

teamsRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const teams = await Team.find()
      .populate('captain', 'name email')
      .populate('members', 'name email fitnessLevel totalPoints')
      .lean();

    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch teams', error });
  }
});

export default teamsRouter;
