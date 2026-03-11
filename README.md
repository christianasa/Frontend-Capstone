# RunTrack 

A full-stack half marathon training app built with React, React Native, Node.js, Express, and MongoDB. RunTrack helps users follow a personalized 6-week training plan, log their runs, and track their progress toward race day.

## Backend link: https://github.com/christianasa/Capstone-Backend
---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [API Routes](#api-routes)
- [Data Models](#data-models)
- [Pages](#pages)
- [Third Party API](#third-party-api)
- [Future Features](#future-features)

---

## About

RunTrack was built as a capstone project for a software engineering program. The goal was to create a real-world full-stack application that solves a personal problem — training for a half marathon without the cost of a running coach. RunTrack gives users a structured 6-week training plan and a way to log and visualize their progress toward race day (April 19th, 2026).

---

## Features

- 🗓️ **6-Week Training Plan** — A structured schedule that builds up to 10 miles by week 6
- ✍️ **Run Logging** — Add, edit, and delete run entries with date, distance, duration, type, and notes
- 📊 **Progress Dashboard** — Visual bar chart and stats including total miles, avg pace, and longest run
- ⏳ **Race Countdown** — Live countdown to race day on the home page
- 📱 **Web + Mobile** — Built with React for web and React Native for mobile, sharing one backend


---

## Project Structure

```
capstone/
├── Backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── models/
│   │   ├── run.js             # Run schema
│   │   └── user.js            # User schema
│   ├── routes/
│   │   ├── Auth.js            # Strava OAuth routes
│   │   └── Runs.js            # Run CRUD routes
│   ├── .env                   # Environment variables (not committed)
│   ├── .gitignore
│   ├── package.json
│   └── Server.js              # Express server entry point
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   └── Navbar.css
    │   ├── pages/
    │   │   ├── Home.jsx + Home.css
    │   │   ├── TrainingPlan.jsx + TrainingPlan.css
    │   │   ├── LogRun.jsx + LogRun.css
    │   │   └── Dashboard.jsx + Dashboard.css
    │   ├── App.jsx
    │   ├── App.css
    │   └── main.jsx
    ├── index.html
    └── vite.config.js
```

---




PORT=3000
MONGO_URI=mongodb://localhost:27017/runtrack
STRAVA_CLIENT_ID=your_client_id_here
STRAVA_CLIENT_SECRET=your_client_secret_here
STRAVA_REDIRECT_URI=http://localhost:3000/auth/callback
```



## API Routes

### Auth Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/auth/login` | Redirects user to Strava login page |
| GET | `/auth/callback` | Handles Strava OAuth callback, returns access token |

### Run Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/runs` | Get all runs |
| GET | `/runs/:id` | Get a single run by ID |
| POST | `/runs` | Create a new run |
| PUT | `/runs/:id` | Update an existing run |
| DELETE | `/runs/:id` | Delete a run |

---

## Data Models

### Run Schema

```js
{
  userId:           ObjectId,   // Reference to User (optional)
  name:             String,     // Run name
  date:             Date,       // Date of run (required)
  distance_miles:   Number,     // Distance in miles (required)
  duration_minutes: Number,     // Duration in minutes (required)
  pace:             String,     // Pace in mm:ss per mile
  notes:            String,     // How did it feel?
  runType:          String,     // Easy | Tempo | Long | Race | Other
  createdAt:        Date        // Auto-generated timestamp
}
```

### User Schema

```js
{
  stravaId:     String,   // Strava athlete ID (required, unique)
  name:         String,   // Athlete name (required)
  email:        String,   // Email address
  accessToken:  String,   // Strava access token
  refreshToken: String,   // Strava refresh token
  raceDate:     Date,     // Target race date
  createdAt:    Date      // Auto-generated timestamp
}
```

---

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Welcome page with race countdown and quick stats |
| Training Plan | `/training-plan` | 6-week schedule with checkboxes to mark runs complete |
| Log a Run | `/log-run` | Form to add runs + table to edit or delete past runs |
| Dashboard | `/dashboard` | Bar chart of recent runs and summary stats |

---

## Third Party API

This app integrates with the **Strava API v3** to pull in real running activity data.

- **Base URL:** `https://www.strava.com/api/v3`
- **Auth:** OAuth 2.0
- **Docs:** [developers.strava.com](https://developers.strava.com/)
- **Rate Limit:** 200 requests per 15 minutes, 2,000 per day

Data pulled from Strava includes distance, moving time, pace, and elevation gain.

---

