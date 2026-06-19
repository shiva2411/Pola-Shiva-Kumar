import { Router, Request, Response } from 'express';
import { Workout } from '../models';

const router = Router();

// GET all workouts
router.get('/', async (req: Request, res: Response) => {
  const workouts = await Workout.find().limit(100).lean();
  res.json({ message: 'Get all workouts', data: workouts });
});

// GET workout by ID
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const workout = await Workout.findById(id).lean();
  if (!workout) return res.status(404).json({ message: 'Workout not found' });
  res.json({ message: `Get workout ${id}`, data: workout });
});

// POST create new workout
router.post('/', async (req: Request, res: Response) => {
  const payload = req.body;
  const created = await Workout.create(payload);
  res.status(201).json({ message: 'Workout created', data: created });
});

// GET personalized workout suggestions
router.get('/suggestions/:userId', async (req: Request, res: Response) => {
  const { userId } = req.params;
  // Simple suggestion: return top 3 workouts
  const suggestions = await Workout.find().limit(3).lean();
  res.json({ message: `Get workout suggestions for user ${userId}`, userId, suggestions });
});

// PUT update workout
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;
  const updated = await Workout.findByIdAndUpdate(id, updates, { new: true }).lean();
  if (!updated) return res.status(404).json({ message: 'Workout not found' });
  res.json({ message: `Workout ${id} updated`, data: updated });
});

// DELETE workout
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const removed = await Workout.findByIdAndDelete(id).lean();
  if (!removed) return res.status(404).json({ message: 'Workout not found' });
  res.json({ message: `Workout ${id} deleted`, data: removed });
});

export default router;
