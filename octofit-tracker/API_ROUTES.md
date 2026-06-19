# OctoFit Tracker API Routes

## Base URL
- **Local**: `http://localhost:8000`
- **Codespaces**: `https://{CODESPACE_NAME}-8000.app.github.dev`

## Endpoints

### Health Check
- `GET /health` - Server status and configuration

### Users (`/api/users`)
- `GET /api/users/` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users/` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Teams (`/api/teams`)
- `GET /api/teams/` - Get all teams
- `GET /api/teams/:id` - Get team by ID
- `POST /api/teams/` - Create new team
- `PUT /api/teams/:id` - Update team
- `DELETE /api/teams/:id` - Delete team

### Activities (`/api/activities`)
- `GET /api/activities/` - Get all activities
- `GET /api/activities/:id` - Get activity by ID
- `POST /api/activities/` - Log new activity
- `PUT /api/activities/:id` - Update activity
- `DELETE /api/activities/:id` - Delete activity

### Leaderboard (`/api/leaderboard`)
- `GET /api/leaderboard/` - Get global leaderboard
- `GET /api/leaderboard/team/:teamId` - Get team leaderboard
- `GET /api/leaderboard/user/:userId` - Get user ranking

### Workouts (`/api/workouts`)
- `GET /api/workouts/` - Get all workouts
- `GET /api/workouts/:id` - Get workout by ID
- `POST /api/workouts/` - Create new workout
- `GET /api/workouts/suggestions/:userId` - Get personalized workout suggestions
- `PUT /api/workouts/:id` - Update workout
- `DELETE /api/workouts/:id` - Delete workout

## Running the Server

### Development
```bash
cd octofit-tracker/backend
npm run dev
```

### Production
```bash
cd octofit-tracker/backend
npm run build
npm start
```

## Port Configuration
- **Backend API**: Port 8000
- **Frontend**: Port 5173
- **MongoDB**: Port 27017
