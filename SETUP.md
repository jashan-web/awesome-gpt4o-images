# Setup Guide

This guide will help you set up and run the GPT-4o Images Gallery web application.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

## Installation

### Option 1: Install All Dependencies at Once

```bash
npm run install:all
```

### Option 2: Install Separately

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
cd web
npm install
```

## Running the Application

### Development Mode

You need to run both the backend API server and the frontend development server.

**Terminal 1 - Backend API:**
```bash
npm run dev:server
# or
cd server && npm run dev
```

The backend will run on `http://localhost:3001`

**Terminal 2 - Frontend:**
```bash
npm run dev:web
# or
cd web && npm run dev
```

The frontend will run on `http://localhost:3000`

### Production Mode

**Build the frontend:**
```bash
npm run build:web
```

**Start the backend:**
```bash
npm run start:server
```

## Project Structure

```
awesome-gpt4o-images/
├── cases/              # Case data (YAML files + images) - PRESERVED
├── gen-tool/           # README generator - PRESERVED
├── server/             # Backend API (NEW)
│   └── src/
│       ├── routes/     # API routes
│       ├── services/   # Business logic
│       └── utils/      # Utilities
├── web/                # Frontend (NEW)
│   └── src/
│       ├── components/ # React components
│       ├── pages/      # Page components
│       ├── hooks/      # Custom hooks
│       └── services/   # API client
└── package.json        # Root workspace config
```

## API Endpoints

- `GET /api/showcases` - Get all showcases (with pagination/filtering)
- `GET /api/showcases/:id` - Get single showcase
- `GET /api/showcases/:id/artwork` - Get showcase image
- `GET /api/stats` - Get statistics
- `GET /api/health` - Health check

## Features

- ✅ Modern React + Tailwind CSS UI
- ✅ Responsive design
- ✅ Search and filter capabilities
- ✅ Bilingual support (English/Chinese)
- ✅ Image modal viewer
- ✅ Copy prompts to clipboard
- ✅ Full compatibility with existing case data
- ✅ Preserves gen-tool functionality

## Troubleshooting

**Port already in use:**
- Backend: Change `PORT` in `server/src/server.js` or set `PORT` environment variable
- Frontend: Change port in `web/vite.config.js`

**API connection errors:**
- Ensure backend is running before starting frontend
- Check that backend is on port 3001
- Verify CORS is enabled in backend

**Case data not loading:**
- Ensure `cases/` directory exists with valid YAML files
- Check server logs for parsing errors

