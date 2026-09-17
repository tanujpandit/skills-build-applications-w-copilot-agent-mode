import mongoose, { Schema } from 'mongoose';
const teamSchema = new Schema({
    name: { type: String, required: true },
    description: String,
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });
export const Team = mongoose.model('Team', teamSchema);
