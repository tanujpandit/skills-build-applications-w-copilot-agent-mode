import { Router, Request, Response } from 'express';
import { Leaderboard } from '../models/Leaderboard.js';

const router = Router();

// Get all leaderboard entries
router.get('/', async (_request: Request, response: Response) => {
  try {
    const entries = await Leaderboard.find().sort({ score: -1 }).populate('user').populate('team');
    response.json(entries);
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// Get leaderboard by ID
router.get('/:id', async (request: Request, response: Response) => {
  try {
    const entry = await Leaderboard.findById(request.params.id).populate('user').populate('team');
    if (!entry) {
      response.status(404).json({ error: 'Leaderboard entry not found' });
      return;
    }
    response.json(entry);
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch leaderboard entry' });
  }
});

// Create new leaderboard entry
router.post('/', async (request: Request, response: Response) => {
  try {
    const entry = new Leaderboard(request.body);
    await entry.save();
    response.status(201).json(entry);
  } catch (error) {
    response.status(400).json({ error: 'Failed to create leaderboard entry' });
  }
});

// Update leaderboard entry
router.put('/:id', async (request: Request, response: Response) => {
  try {
    const entry = await Leaderboard.findByIdAndUpdate(request.params.id, request.body, { new: true });
    if (!entry) {
      response.status(404).json({ error: 'Leaderboard entry not found' });
      return;
    }
    response.json(entry);
  } catch (error) {
    response.status(400).json({ error: 'Failed to update leaderboard entry' });
  }
});

// Delete leaderboard entry
router.delete('/:id', async (request: Request, response: Response) => {
  try {
    const entry = await Leaderboard.findByIdAndDelete(request.params.id);
    if (!entry) {
      response.status(404).json({ error: 'Leaderboard entry not found' });
      return;
    }
    response.json({ message: 'Leaderboard entry deleted successfully' });
  } catch (error) {
    response.status(500).json({ error: 'Failed to delete leaderboard entry' });
  }
});

export default router;
