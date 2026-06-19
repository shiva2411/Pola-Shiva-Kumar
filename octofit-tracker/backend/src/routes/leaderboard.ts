import { Router, Request, Response } from 'express';
import { Leaderboard } from '../models';

const router = Router();

// GET global leaderboard
router.get('/', async (req: Request, res: Response) => {
  const rows = await Leaderboard.find({ period: 'weekly' }).populate('user team').sort({ score: -1 }).limit(100).lean();
  res.json({ message: 'Get global leaderboard', data: rows });
});

// GET team leaderboard
router.get('/team/:teamId', async (req: Request, res: Response) => {
  const { teamId } = req.params;
  const rows = await Leaderboard.find({ team: teamId }).populate('user team').sort({ score: -1 }).lean();
  res.json({ message: `Get leaderboard for team ${teamId}`, teamId, data: rows });
});

// GET user ranking
router.get('/user/:userId', async (req: Request, res: Response) => {
  const { userId } = req.params;
  const row = await Leaderboard.findOne({ user: userId }).populate('user team').lean();
  if (!row) return res.status(404).json({ message: 'Ranking not found for user' });
  res.json({ message: `Get ranking for user ${userId}`, data: row });
});

export default router;
