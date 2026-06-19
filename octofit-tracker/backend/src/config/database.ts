import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://localhost:27017/octofit_db';

export const connectDatabase = async (): Promise<void> => {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');
};

export default mongoose;
