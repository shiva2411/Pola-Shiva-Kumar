import { Router, Request, Response } from 'express';
import { Activity } from '../models';

const router = Router();

// GET all activities
router.get('/', async (req: Request, res: Response) => {
  const activities = await Activity.find().populate('user').sort({ date: -1 }).limit(200).lean();
  res.json({ message: 'Get all activities', data: activities });
});

// GET activity by ID
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const activity = await Activity.findById(id).populate('user').lean();
  if (!activity) return res.status(404).json({ message: 'Activity not found' });
  res.json({ message: `Get activity ${id}`, data: activity });
});

// POST log new activity
router.post('/', async (req: Request, res: Response) => {
  const payload = req.body;
  const created = await Activity.create(payload);
  res.status(201).json({ message: 'Activity logged', data: created });
});

// PUT update activity
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;
  const updated = await Activity.findByIdAndUpdate(id, updates, { new: true }).lean();
  if (!updated) return res.status(404).json({ message: 'Activity not found' });
  res.json({ message: `Activity ${id} updated`, data: updated });
});

// DELETE activity
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const removed = await Activity.findByIdAndDelete(id).lean();
  if (!removed) return res.status(404).json({ message: 'Activity not found' });
  res.json({ message: `Activity ${id} deleted`, data: removed });
});

export default router;
