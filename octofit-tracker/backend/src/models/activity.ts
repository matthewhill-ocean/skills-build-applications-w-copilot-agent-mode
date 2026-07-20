import { Schema, model, type InferSchemaType, type Types } from 'mongoose';

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    type: {
      type: String,
      enum: ['run', 'ride', 'swim', 'strength', 'yoga', 'walk'],
      required: true,
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, required: true, min: 1 },
    distanceKm: { type: Number, min: 0 },
    loggedAt: { type: Date, required: true },
  },
  { timestamps: true }
);

export type ActivityDocument = Omit<InferSchemaType<typeof activitySchema>, 'user' | 'team'> & {
  user: Types.ObjectId;
  team: Types.ObjectId;
};

const Activity = model('Activity', activitySchema);

export default Activity;
