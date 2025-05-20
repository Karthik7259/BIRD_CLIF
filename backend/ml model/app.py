import warnings
from cryptography.utils import CryptographyDeprecationWarning
warnings.filterwarnings('ignore', category=CryptographyDeprecationWarning)
warnings.filterwarnings('ignore', module='paramiko')
warnings.filterwarnings('ignore', category=DeprecationWarning)
warnings.filterwarnings('ignore', category=UserWarning)

from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
import librosa
from transformers import AutoFeatureExtractor, AutoModelForAudioClassification
import os
import tempfile

app = Flask(__name__)
# Enable CORS for all routes
CORS(app, resources={
    r"/*": {
        "origins": "*",  # Allow all origins in development
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization", "Accept"]
    }
})

UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), "uploads")
MODEL_NAME = "dima806/bird_sounds_classification"
MODEL_DIR = os.path.join(os.path.dirname(__file__), "model_cache")

# Ensure upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(MODEL_DIR, exist_ok=True)

# Check if model already exists locally
def ensure_model_downloaded():
    if not os.path.exists(os.path.join(MODEL_DIR, "config.json")):
        print("Model not found locally. Downloading from Hugging Face...")
        AutoFeatureExtractor.from_pretrained(MODEL_NAME).save_pretrained(MODEL_DIR)
        AutoModelForAudioClassification.from_pretrained(MODEL_NAME).save_pretrained(MODEL_DIR)
        print("Model downloaded and saved.")

# Load model and extractor
ensure_model_downloaded()
extractor = AutoFeatureExtractor.from_pretrained(MODEL_DIR)
model = AutoModelForAudioClassification.from_pretrained(MODEL_DIR)

@app.route("/api/classify", methods=["POST"])
def classify_audio():
    print("Received request files:", request.files.keys())
    print("Request headers:", dict(request.headers))
    print("Processing audio classification request...")
    
    if "file" not in request.files:
        print("No file found in request")
        return jsonify({"error": "No file part"}), 400
        
    file = request.files["file"]
    
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400
        
    # Check file extension
    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in [".wav", ".mp3"]:
        return jsonify({"error": "Invalid file type. Only .wav and .mp3 supported."}), 400
      # Save the uploaded file temporarily
    temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=ext)
    file.save(temp_file.name)
    temp_file.close()
    print(f"Saved uploaded file temporarily as: {temp_file.name}")
    
    try:
        print("Loading audio file with librosa...")
        # Process the audio file
        waveform, sr = librosa.load(temp_file.name, sr=extractor.sampling_rate)
        print(f"Audio loaded successfully. Sample rate: {sr}, Waveform shape: {waveform.shape}")
        inputs = extractor(waveform, sampling_rate=extractor.sampling_rate, return_tensors="pt")
          # Make prediction
        print("Running model prediction...")
        with torch.no_grad():
            logits = model(**inputs).logits
            predicted_class_id = torch.argmax(logits).item()
            predicted_label = model.config.id2label[predicted_class_id]
            print(f"Predicted class ID: {predicted_class_id}, Label: {predicted_label}")
        
        # Return only the prediction as JSON
        response = {
            "prediction": predicted_label
        }
        print("Sending prediction response:", response)
        
        return jsonify(response), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
        
    finally:
        # Clean up the temporary file
        if os.path.exists(temp_file.name):
            os.unlink(temp_file.name)

# Add a simple health check endpoint
@app.route("/api/health", methods=["GET"])
def health_check():
    return jsonify({"status": "ok", "model": MODEL_NAME}), 200

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)