import React, { useState, useRef, useEffect } from 'react';
import { Mic, Upload, Music2, ChevronRight } from 'lucide-react';
import Footer from './Footer';
import { backgroundVideos } from '../data/videos';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000';  // Add this at the top of the file after imports

const SpeciesDetection = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Change video every 10 seconds
    const intervalId = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % backgroundVideos.length);
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // When video source changes, play the new video
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play();
    }
  }, [currentVideoIndex]);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedFile) {
      setIsUploading(true);
      setError(null);
      
      try {
        // First check if the server is running
        try {
          console.log('Checking server health...');
          const healthResponse = await axios.get(`${API_URL}/api/health`, {
            timeout: 5000 // 5 second timeout for health check
          });
          console.log('Server health check response:', healthResponse.data);
        } catch (error) {
          console.error('Server health check failed:', error);
          if (error.code === 'ECONNREFUSED') {
            throw new Error('Cannot connect to server. Please ensure the Flask server is running on port 5000.');
          }
          throw new Error(`Server health check failed: ${error.message}`);
        }

        // Create FormData to send the file
        const formData = new FormData();
        formData.append('file', selectedFile);

        // Send the file to the backend
        const response = await axios.post(`${API_URL}/api/classify`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json'
          },
          withCredentials: false,
          timeout: 30000 // 30 second timeout
        });

        // Navigate to result page with just the prediction and filename
        navigate('/result', {
          state: {
            birdName: response.data.prediction,
            audioFile: selectedFile.name
          }
        });
      } catch (err) {
        console.error('Error uploading file:', err);
        const errorMessage = err.response?.data?.error || err.message || 'Failed to analyze the audio';
        setError(errorMessage);
        alert(errorMessage); // Show error to user
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col relative">
      {/* Background Video */}
      <div className="fixed inset-0 w-full h-full overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" /> {/* Overlay */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          playsInline
        >
          <source src={backgroundVideos[currentVideoIndex].url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Content */}
      <div className="relative z-20">
        {/* Header Section */}
        <header className="bg-slate-900/50 shadow-lg backdrop-blur-sm py-6">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-center">
              Species Detection
            </h1>
            <p className="text-slate-300 text-center mt-2 max-w-2xl mx-auto">
              Upload an audio file of bird sounds and our AI will help identify the species
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            {/* Upload Card */}
            <div className="bg-slate-900/80 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-slate-800/50">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* File Upload Area */}
                <div 
                  className="border-2 border-dashed border-slate-700 rounded-lg p-8 text-center hover:border-amber-500 transition-colors cursor-pointer bg-slate-950/50"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="audio/*"
                    className="hidden"
                  />
                  <Upload className="w-12 h-12 mx-auto text-amber-500 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Upload Audio File</h3>
                  <p className="text-slate-300 text-sm mb-4">
                    Drag and drop your audio file here, or click to select
                  </p>
                  <p className="text-xs text-slate-400">
                    Supported formats: MP3, WAV, M4A (Max size: 10MB)
                  </p>
                  {selectedFile && (
                    <div className="mt-4 p-3 bg-slate-800/80 rounded-lg inline-flex items-center gap-2">
                      <Music2 className="text-amber-500" size={20} />
                      <span className="text-sm">{selectedFile.name}</span>
                    </div>
                  )}
                </div>

                {/* Record Option */}
                <div className="text-center">
                  <span className="text-slate-300">or</span>
                </div>
                
                <button
                  type="button"
                  className="w-full py-4 border border-slate-700 rounded-lg flex items-center justify-center gap-3 hover:bg-slate-800/80 transition-colors bg-slate-900/50"
                >
                  <Mic className="text-amber-500" />
                  <span>Record Audio</span>
                </button>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!selectedFile || isUploading}
                  className={`w-full btn btn-primary flex items-center justify-center gap-2 ${
                    (!selectedFile || isUploading) ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isUploading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <span>Detect Species</span>
                      <ChevronRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Features Section */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="feature-card bg-slate-900/80 backdrop-blur-sm border-slate-800/50">
                <h3 className="text-lg font-semibold mb-2">Advanced AI Detection</h3>
                <p className="text-slate-300">
                  Our machine learning model accurately identifies bird species from their calls
                </p>
              </div>
              <div className="feature-card bg-slate-900/80 backdrop-blur-sm border-slate-800/50">
                <h3 className="text-lg font-semibold mb-2">Instant Results</h3>
                <p className="text-slate-300">
                  Get detailed information about detected species within seconds
                </p>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default SpeciesDetection;
