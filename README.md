# BirdClif - Bird Species Detection System

A web-based application for detecting and identifying bird species from audio recordings using AI.

## Project Structure
```
BirdClif/
├── backend/              # Flask server and ML model
│   ├── ml model/        # Machine learning model and API
│   │   ├── app.py       # Main Flask application
│   │   ├── model_cache/ # Pre-trained model files
│   │   └── uploads/     # Temporary storage for uploaded files
│   └── requirements.txt # Python dependencies
└── frontend/           # React frontend application
    ├── public/        # Static assets
    ├── src/           # Source code
    └── package.json   # Node.js dependencies
```

## Backend Setup

### Prerequisites
- Python 3.9 or higher
- pip (Python package installer)
- Virtual environment (recommended)

### Installation

1. Create and activate a virtual environment:
```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate
```

2. Install required packages:
```powershell
pip install -r requirements.txt
```

3. Start the Flask server:
```powershell
cd "ml model"
python app.py
```

The backend server will start on `http://localhost:5000`

## Frontend Setup

### Prerequisites
- Node.js 16.x or higher
- npm (Node.js package manager)

### Installation

1. Install dependencies:
```powershell
cd frontend
npm install
```

2. Start the development server:
```powershell
npm run dev
```

The frontend application will start on `http://localhost:5173`

## API Documentation

### Bird Species Detection API

#### POST /api/classify
Analyze an audio file to detect bird species.

**Endpoint:** `http://localhost:5000/api/classify`

**Method:** POST

**Content-Type:** multipart/form-data

**Request Body:**
- `file`: Audio file (Supported formats: MP3, WAV, M4A)

**Response:**
```json
{
    "prediction": "Little Tinamou",
    
}
```

**Error Response:**
```json
{
    "error": "Error message description",
    "status": 400
}
```

#### GET /api/health
Check if the API server is running.

**Endpoint:** `http://localhost:5000/api/health`

**Method:** GET

**Response:**
```json
{
    "status": "healthy",
    "version": "1.0.0"
}
```



## Development

### Backend
- The Flask application (`app.py`) handles API requests and ML model inference
- Audio files are temporarily stored in the `uploads/` directory
- The ML model is loaded from `model_cache/`

### Frontend
- Built with React + Vite
- Uses Tailwind CSS for styling
- Components are in `src/components/`
- Static assets in `public/`

## Building for Production



## Troubleshooting

### Common Issues

1. **Model not loading**
   - Ensure all model files are present in `model_cache/`
   - Check Python/PyTorch versions

2. **Audio file upload fails**
   - Check file format (MP3, WAV, M4A supported)
   - Verify file size (max 10MB)
   - Ensure `uploads/` directory exists and is writable

3. **CORS issues**
   - Verify CORS settings in Flask app
   - Check API URL in frontend environment

## License

This project is licensed under the MIT License - see the LICENSE file for details.
