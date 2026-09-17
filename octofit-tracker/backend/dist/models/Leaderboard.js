import mongoose, { Schema } from 'mongoose';
const leaderboardSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    score: { type: Number, required: true, default: 0 },
    rank: { type: Number, required: true, default: 0 },
}, { timestamps: true });
export const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);
