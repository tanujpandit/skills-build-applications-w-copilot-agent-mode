import mongoose, { Schema } from 'mongoose';
const activitySchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    distance: Number,
    calories: Number,
    description: String,
}, { timestamps: true });
export const Activity = mongoose.model('Activity', activitySchema);
