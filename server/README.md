# GPT-4o Gallery API Server

Backend API server for the GPT-4o Images Gallery web application.

## Features

- RESTful API for accessing case/showcase data
- Reads from existing YAML case files
- Image serving
- Filtering and search capabilities
- Statistics endpoint

## Installation

```bash
cd server
npm install
```

## Usage

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

The server will run on `http://localhost:3001` by default.

## API Endpoints

### GET /api/showcases
Get all showcases with optional filtering and pagination.

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20)
- `author` - Filter by author
- `tool` - Filter by creation tool
- `search` - Search in titles and prompts
- `sort` - Sort order: 'asc' or 'desc' (default: 'desc')

**Example:**
```
GET /api/showcases?page=1&limit=20&search=chibi
```

### GET /api/showcases/:id
Get a single showcase by ID.

**Example:**
```
GET /api/showcases/1
```

### GET /api/showcases/:id/artwork
Get the image for a showcase.

**Example:**
```
GET /api/showcases/1/artwork
```

### GET /api/stats
Get statistics about all showcases.

**Example:**
```
GET /api/stats
```

### GET /api/health
Health check endpoint.

## Data Structure

The API reads from the existing `cases/` directory structure:
- Each case directory contains `case.yml` and `ATTRIBUTION.yml`
- Images are served from the case directories
- No modifications to existing data structure required

