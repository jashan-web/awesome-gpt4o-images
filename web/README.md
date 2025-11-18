# GPT-4o Gallery Web Frontend

Modern React frontend for the GPT-4o Images Gallery.

## Features

- 🎨 Modern, clean UI with Tailwind CSS
- 📱 Fully responsive design
- 🔍 Search and filter capabilities
- 🌐 Bilingual support (English/Chinese)
- ⚡ Fast loading with lazy images
- 🖼️ Image modal viewer
- 📋 Copy prompts to clipboard

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- React Router
- Axios

## Installation

```bash
cd web
npm install
```

## Development

```bash
npm run dev
```

The app will run on `http://localhost:3000` (make sure the backend API is running on port 3001).

## Build

```bash
npm run build
```

## Project Structure

```
web/
├── src/
│   ├── components/
│   │   ├── layout/       # Navigation, Footer, AppLayout
│   │   ├── gallery/      # GalleryView, ArtworkCard, SearchBar, FilterPanel
│   │   ├── detail/       # CaseDetail, PromptViewer, AttributionInfo, ImageModal
│   │   └── common/       # LoadingSpinner, ErrorMessage
│   ├── pages/            # HomePage, CaseDetailPage
│   ├── hooks/            # useLanguage, useShowcases
│   ├── services/         # API client
│   ├── utils/            # Constants, translations
│   ├── App.jsx
│   └── main.jsx
└── public/
```

## Environment Variables

Create a `.env` file if you need to customize the API URL:

```
VITE_API_URL=http://localhost:3001/api
```

