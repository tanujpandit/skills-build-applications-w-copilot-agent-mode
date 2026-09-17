import { Router, Request, Response } from 'express';
import { Workout } from '../models/Workout.js';

const router = Router();

// Get all workouts
router.get('/', async (_request: Request, response: Response) => {
  try {
    const workouts = await Workout.find();
    response.json(workouts);
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch workouts' });
  }
});

// Get workout by ID
router.get('/:id', async (request: Request, response: Response) => {
  try {
    const workout = await Workout.findById(request.params.id);
    if (!workout) {
      response.status(404).json({ error: 'Workout not found' });
      return;
    }
    response.json(workout);
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch workout' });
  }
});

// Create new workout
router.post('/', async (request: Request, response: Response) => {
  try {
    const workout = new Workout(request.body);
    await workout.save();
    response.status(201).json(workout);
  } catch (error) {
    response.status(400).json({ error: 'Failed to create workout' });
  }
});

// Update workout
router.put('/:id', async (request: Request, response: Response) => {
  try {
    const workout = await Workout.findByIdAndUpdate(request.params.id, request.body, { new: true });
    if (!workout) {
      response.status(404).json({ error: 'Workout not found' });
      return;
    }
    response.json(workout);
  } catch (error) {
    response.status(400).json({ error: 'Failed to update workout' });
  }
});

// Delete workout
router.delete('/:id', async (request: Request, response: Response) => {
  try {
    const workout = await Workout.findByIdAndDelete(request.params.id);
    if (!workout) {
      response.status(404).json({ error: 'Workout not found' });
      return;
    }
    response.json({ message: 'Workout deleted successfully' });
  } catch (error) {
    response.status(500).json({ error: 'Failed to delete workout' });
  }
});

export default router;
