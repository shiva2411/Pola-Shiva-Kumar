import { Schema, model, Document, Types } from 'mongoose';

export interface IExercise {
  name: string;
  sets?: number;
  reps?: number;
  durationMinutes?: number;
}

export interface IWorkout extends Document {
  name: string;
  exercises: IExercise[];
  durationMinutes?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  createdBy?: Types.ObjectId;
  createdAt: Date;
}

const ExerciseSchema = new Schema<IExercise>({
  name: { type: String, required: true },
  sets: { type: Number },
  reps: { type: Number },
  durationMinutes: { type: Number }
});

const WorkoutSchema = new Schema<IWorkout>({
  name: { type: String, required: true },
  exercises: { type: [ExerciseSchema], default: [] },
  durationMinutes: { type: Number },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'] },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: () => new Date() }
});

export default model<IWorkout>('Workout', WorkoutSchema);
