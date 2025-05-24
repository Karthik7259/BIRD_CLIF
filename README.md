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



## Deployment on Render

### Prerequisites
- A Render account (https://render.com)
- Git repository hosted on GitHub/GitLab
- Google Gemini API key

### Deployment Steps

1. **Fork/Push your repository**
   - Make sure your code is in a Git repository
   - Push to GitHub/GitLab

2. **Create New Web Service on Render**
   - Log in to your Render dashboard
   - Click "New +"
   - Select "Web Service"
   - Connect your repository

3. **Configure Backend Service**
   - Name: `birdclif-api`
   - Environment: `Python 3.9`
   - Build Command: `cd backend && pip install -r requirements.txt`
   - Start Command: `cd "ml model" && gunicorn app:app`
   - Add Environment Variables:
     - `FLASK_ENV`: `production`
     - `GEMINI_API_KEY`: Your Gemini API key
     - `MODEL_PATH`: `model_cache/`

4. **Configure Frontend Service**
   - Create another Web Service
   - Name: `birdclif-frontend`
   - Environment: `Node`
   - Build Command: `cd frontend && npm install && npm run build`
   - Start Command: `cd frontend && npm run preview -- --host 0.0.0.0 --port $PORT`
   - Add Environment Variables:
     - `VITE_API_URL`: URL of your backend service (e.g., `https://birdclif-api.onrender.com`)

5. **Verify Deployment**
   - Check the deployment logs for both services
   - Test the health endpoint: `https://birdclif-api.onrender.com/api/health`
   - Access your frontend application: `https://birdclif-frontend.onrender.com`

### Automatic Deployments

Render automatically deploys:
- When you push to your main/master branch
- When you manually trigger a deploy from the dashboard

### Troubleshooting

1. **Model Loading Issues**
   - Check if model files are properly uploaded
   - Verify Python version compatibility
   - Check deployment logs for errors

2. **Frontend Connection Issues**
   - Verify `VITE_API_URL` is correct
   - Check CORS configuration in backend
   - Ensure API endpoints are accessible

3. **Memory/Performance Issues**
   - Consider upgrading to a paid plan for better resources
   - Optimize model loading and caching
   - Monitor resource usage in Render dashboard

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

## Deployment

### Prerequisites for Deployment
- A [Render.com](https://render.com) account
- Git repository with your project
- Gemini API key

### Deployment Steps

1. **Fork and Clone the Repository**
   - Fork this repository to your GitHub account
   - Clone your forked repository locally

2. **Setup Environment Variables**
   In your Render.com dashboard:
   - Navigate to the "Environment" section
   - Add the following variables:
     - `GEMINI_API_KEY`: Your Gemini API key
     - `FLASK_ENV`: Set to `production`
     - `NODE_ENV`: Set to `production`

3. **Deploy the Backend**
   - In Render.com dashboard, click "New +"
   - Select "Web Service"
   - Connect your GitHub repository
   - Choose the "Python" environment
   - Set name to "birdclif-api"
   - The build and start commands are configured in `render.yaml`
   - Click "Create Web Service"

4. **Deploy the Frontend**
   - Click "New +" again
   - Select "Web Service"
   - Connect the same repository
   - Choose the "Node" environment
   - Set name to "birdclif-frontend"
   - The build and start commands are configured in `render.yaml`
   - Click "Create Web Service"

5. **Verify Deployment**
   - Wait for both services to finish deploying
   - The backend API will be available at `https://birdclif-api.onrender.com`
   - The frontend will be available at `https://birdclif-frontend.onrender.com`

### Troubleshooting

1. **Model Loading Issues**
   - Check if the model files are properly cached in the `model_cache` directory
   - Verify that the disk storage is properly mounted

2. **API Connection Issues**
   - Ensure the `VITE_API_URL` in the frontend service points to your backend service URL
   - Check CORS settings in the backend if you encounter cross-origin issues

3. **File Upload Issues**
   - Verify that the uploads directory is properly mounted
   - Check file permissions on the mounted storage

### Maintenance

- Monitor your application logs in the Render dashboard
- Set up automated deployments by enabling "Auto-Deploy" in your service settings
- Regularly check for package updates and security patches
- Monitor disk usage for the uploads directory
