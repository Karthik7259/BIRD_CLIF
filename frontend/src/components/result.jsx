import{ useEffect } from 'react';
import { ArrowLeft, Volume2, Calendar, MapPin, Info } from 'lucide-react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';

const Result = () => {  const navigate = useNavigate();
  const location = useLocation();
  
  // Log the received state data
  console.log('Result page received state:', location.state);
  
  // If no state is present, redirect back to detection page
  if (!location.state?.birdName) {
    console.log('No bird name found in state, redirecting...');
    return <Navigate to="/" replace />;
  }

  const birdName = location.state.birdName;
  const birdInfo = location.state.birdInfo;

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header Section */}
      <div className="bg-slate-900/95 shadow-lg backdrop-blur-sm py-4">
        <div className="container mx-auto px-4">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Detection</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="bg-slate-900/80 rounded-xl overflow-hidden backdrop-blur-sm">
          <div className="grid md:grid-cols-2">
            {/* Left Column - Image Section */}
            <div className="relative min-h-[400px] md:min-h-[600px]">
              <div className="absolute inset-0">              <img 
                  src={birdInfo.image} 
                  alt={birdName}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Species Name Overlay */}
              <div className="absolute top-4 right-4 bg-green-500/90 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                Detected Species
              </div>
            </div>

            {/* Right Column - Details Section */}
            <div className="p-8">
              <div className="space-y-6">
                {/* Header */}
                <div>
                  <h1 className="text-2xl font-bold text-white mb-2">{birdName}</h1>
                  <p className="text-amber-500 italic">{birdInfo.scientificName}</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Calendar size={16} />
                      <span className="text-sm">Detected</span>
                    </div>
                    <p className="text-white">{new Date().toLocaleDateString()}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Volume2 size={16} />
                      <span className="text-sm">Song Type</span>
                    </div>
                    <p className="text-white">{birdInfo.song}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-slate-400">
                      <MapPin size={16} />
                      <span className="text-sm">Habitat</span>
                    </div>
                    <p className="text-white">{birdInfo.habitat}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Info size={16} />
                      <span className="text-sm">Diet</span>
                    </div>
                    <p className="text-white">{birdInfo.diet}</p>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h2 className="text-lg font-semibold text-white mb-2">About</h2>
                  <p className="text-slate-300 leading-relaxed">
                    {birdInfo.description}
                  </p>
                </div>

                {/* Audio File Info */}
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <Volume2 className="text-amber-500" />
                    <span className="text-sm text-slate-300">
                      Analyzed Audio: {location.state.audioFile}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Result;
