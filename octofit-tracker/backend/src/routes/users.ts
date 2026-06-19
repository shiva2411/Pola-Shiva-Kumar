import { Router, Request, Response } from 'express';
import { User } from '../models';

const router = Router();

// GET all users
router.get('/', async (req: Request, res: Response) => {
  const users = await User.find().limit(100).lean();
  res.json({ message: 'Get all users', data: users });
});

// GET user by ID
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findById(id).lean();
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ message: `Get user ${id}`, data: user });
});

// POST create new user
router.post('/', async (req: Request, res: Response) => {
  const payload = req.body;
  const created = await User.create(payload);
  res.status(201).json({ message: 'User created', data: created });
});

// PUT update user
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;
  const updated = await User.findByIdAndUpdate(id, updates, { new: true }).lean();
  if (!updated) return res.status(404).json({ message: 'User not found' });
  res.json({ message: `User ${id} updated`, data: updated });
});

// DELETE user
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const removed = await User.findByIdAndDelete(id).lean();
  if (!removed) return res.status(404).json({ message: 'User not found' });
  res.json({ message: `User ${id} deleted`, data: removed });
});

export default router;
