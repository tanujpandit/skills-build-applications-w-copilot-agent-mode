import mongoose, { Schema } from 'mongoose';
const workoutSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    exercises: [
        {
            name: { type: String, required: true },
            sets: { type: Number, required: true },
            reps: { type: Number, required: true },
        },
    ],
    difficulty: { type: String, required: true, enum: ['easy', 'medium', 'hard'] },
}, { timestamps: true });
export const Workout = mongoose.model('Workout', workoutSchema);
