import { Schema, model, type InferSchemaType, type Types } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true, trim: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    captain: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export type TeamDocument = Omit<InferSchemaType<typeof teamSchema>, 'members' | 'captain'> & {
  members: Types.ObjectId[];
  captain: Types.ObjectId;
};

const Team = model('Team', teamSchema);

export default Team;
