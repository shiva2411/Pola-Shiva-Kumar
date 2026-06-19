import { Schema, model, Document, Types } from 'mongoose';

export interface ILeaderboard extends Document {
  user?: Types.ObjectId;
  team?: Types.ObjectId;
  score: number;
  rank?: number;
  period?: string; // e.g., 'weekly', 'monthly'
  createdAt: Date;
}

const LeaderboardSchema = new Schema<ILeaderboard>({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
  score: { type: Number, required: true },
  rank: { type: Number },
  period: { type: String },
  createdAt: { type: Date, default: () => new Date() }
});

export default model<ILeaderboard>('Leaderboard', LeaderboardSchema);
