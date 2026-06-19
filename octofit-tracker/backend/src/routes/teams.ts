import { Router, Request, Response } from 'express';
import { Team } from '../models';

const router = Router();

// GET all teams
router.get('/', async (req: Request, res: Response) => {
  const teams = await Team.find().populate('members').lean();
  res.json({ message: 'Get all teams', data: teams });
});

// GET team by ID
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const team = await Team.findById(id).populate('members').lean();
  if (!team) return res.status(404).json({ message: 'Team not found' });
  res.json({ message: `Get team ${id}`, data: team });
});

// POST create new team
router.post('/', async (req: Request, res: Response) => {
  const payload = req.body;
  const created = await Team.create(payload);
  res.status(201).json({ message: 'Team created', data: created });
});

// PUT update team
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;
  const updated = await Team.findByIdAndUpdate(id, updates, { new: true }).lean();
  if (!updated) return res.status(404).json({ message: 'Team not found' });
  res.json({ message: `Team ${id} updated`, data: updated });
});

// DELETE team
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const removed = await Team.findByIdAndDelete(id).lean();
  if (!removed) return res.status(404).json({ message: 'Team not found' });
  res.json({ message: `Team ${id} deleted`, data: removed });
});

export default router;
