import { Schema, model, type InferSchemaType, type Types } from 'mongoose';

const workoutSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    goal: { type: String, required: true, trim: true },
    intensity: {
      type: String,
      enum: ['low', 'medium', 'high'],
      required: true,
    },
    estimatedMinutes: { type: Number, required: true, min: 5 },
    exercises: [{ type: String, required: true, trim: true }],
  },
  { timestamps: true }
);

export type WorkoutDocument = Omit<InferSchemaType<typeof workoutSchema>, 'user'> & {
  user: Types.ObjectId;
};

const Workout = model('Workout', workoutSchema);

export default Workout;
