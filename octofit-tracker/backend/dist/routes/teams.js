import { Router } from 'express';
import { Team } from '../models/Team.js';
const router = Router();
// Get all teams
router.get('/', async (_request, response) => {
    try {
        const teams = await Team.find().populate('owner').populate('members');
        response.json(teams);
    }
    catch (error) {
        response.status(500).json({ error: 'Failed to fetch teams' });
    }
});
// Get team by ID
router.get('/:id', async (request, response) => {
    try {
        const team = await Team.findById(request.params.id).populate('owner').populate('members');
        if (!team) {
            response.status(404).json({ error: 'Team not found' });
            return;
        }
        response.json(team);
    }
    catch (error) {
        response.status(500).json({ error: 'Failed to fetch team' });
    }
});
// Create new team
router.post('/', async (request, response) => {
    try {
        const team = new Team(request.body);
        await team.save();
        response.status(201).json(team);
    }
    catch (error) {
        response.status(400).json({ error: 'Failed to create team' });
    }
});
// Update team
router.put('/:id', async (request, response) => {
    try {
        const team = await Team.findByIdAndUpdate(request.params.id, request.body, { new: true });
        if (!team) {
            response.status(404).json({ error: 'Team not found' });
            return;
        }
        response.json(team);
    }
    catch (error) {
        response.status(400).json({ error: 'Failed to update team' });
    }
});
// Delete team
router.delete('/:id', async (request, response) => {
    try {
        const team = await Team.findByIdAndDelete(request.params.id);
        if (!team) {
            response.status(404).json({ error: 'Team not found' });
            return;
        }
        response.json({ message: 'Team deleted successfully' });
    }
    catch (error) {
        response.status(500).json({ error: 'Failed to delete team' });
    }
});
export default router;
