import { Router, Request, Response } from 'express';
import { Activity } from '../models/Activity.js';

const router = Router();

// Get all activities
router.get('/', async (_request: Request, response: Response) => {
  try {
    const activities = await Activity.find().populate('user');
    response.json(activities);
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch activities' });
  }
});

// Get activity by ID
router.get('/:id', async (request: Request, response: Response) => {
  try {
    const activity = await Activity.findById(request.params.id).populate('user');
    if (!activity) {
      response.status(404).json({ error: 'Activity not found' });
      return;
    }
    response.json(activity);
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch activity' });
  }
});

// Create new activity
router.post('/', async (request: Request, response: Response) => {
  try {
    const activity = new Activity(request.body);
    await activity.save();
    response.status(201).json(activity);
  } catch (error) {
    response.status(400).json({ error: 'Failed to create activity' });
  }
});

// Update activity
router.put('/:id', async (request: Request, response: Response) => {
  try {
    const activity = await Activity.findByIdAndUpdate(request.params.id, request.body, { new: true });
    if (!activity) {
      response.status(404).json({ error: 'Activity not found' });
      return;
    }
    response.json(activity);
  } catch (error) {
    response.status(400).json({ error: 'Failed to update activity' });
  }
});

// Delete activity
router.delete('/:id', async (request: Request, response: Response) => {
  try {
    const activity = await Activity.findByIdAndDelete(request.params.id);
    if (!activity) {
      response.status(404).json({ error: 'Activity not found' });
      return;
    }
    response.json({ message: 'Activity deleted successfully' });
  } catch (error) {
    response.status(500).json({ error: 'Failed to delete activity' });
  }
});

export default router;
