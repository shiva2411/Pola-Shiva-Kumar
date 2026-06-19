import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';

const app: Express = express();
const PORT = 8000;
const MONGODB_URI = 'mongodb://localhost:27017/octofit_db';

// Codespaces support: construct API URL based on CODESPACE_NAME
const getApiUrl = (): string => {
  const codespaceName = process.env.CODESPACE_NAME;
  if (codespaceName) {
    return `https://${codespaceName}-${PORT}.app.github.dev`;
  }
  return `http://localhost:${PORT}`;
};

app.use(express.json());

// MongoDB Connection
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'Backend is running',
    port: PORT,
    apiUrl: getApiUrl(),
    environment: process.env.CODESPACE_NAME ? 'Codespaces' : 'Local'
  });
});

// API Routes
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

// Start server
app.listen(PORT, () => {
  const apiUrl = getApiUrl();
  console.log(`\n✓ Server is running on port ${PORT}`);
  console.log(`✓ API URL: ${apiUrl}`);
  console.log(`✓ Health check: ${apiUrl}/health`);
  console.log(`✓ Frontend will run on port 5173`);
  console.log(`✓ MongoDB will run on port 27017\n`);
});

export default app;
