import { Schema, model, type InferSchemaType, type Types } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    period: { type: String, required: true, trim: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
  },
  { timestamps: true }
);

export type LeaderboardDocument = Omit<InferSchemaType<typeof leaderboardSchema>, 'team'> & {
  team: Types.ObjectId;
};

const Leaderboard = model('Leaderboard', leaderboardSchema);

export default Leaderboard;
