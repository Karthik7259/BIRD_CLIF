import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PropTypes from 'prop-types';

const SliderControls = ({ onPrev, onNext }) => {
  return (
    <div className="absolute top-1/2 right-8 z-30 flex flex-col gap-4 transform -translate-y-1/2">
      <button 
        onClick={onPrev}
        className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm 
                 flex items-center justify-center transition-all duration-300 border border-white/20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button 
        onClick={onNext}
        className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm 
                 flex items-center justify-center transition-all duration-300 border border-white/20"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

SliderControls.propTypes = {
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired
};

export default SliderControls;