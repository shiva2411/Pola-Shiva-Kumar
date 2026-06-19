import { Schema, model, Document, Types } from 'mongoose';

export interface IActivity extends Document {
  user: Types.ObjectId;
  activityType: string;
  durationMinutes: number;
  calories?: number;
  date: Date;
}

const ActivitySchema = new Schema<IActivity>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  activityType: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  calories: { type: Number },
  date: { type: Date, default: () => new Date() }
});

export default model<IActivity>('Activity', ActivitySchema);
