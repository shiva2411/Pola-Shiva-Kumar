import { Schema, model, Document, Types } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash?: string;
  team?: Types.ObjectId;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String },
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
  createdAt: { type: Date, default: () => new Date() }
});

export default model<IUser>('User', UserSchema);
