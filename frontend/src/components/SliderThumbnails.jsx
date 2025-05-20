import React from 'react';
import PropTypes from 'prop-types';

const SliderThumbnails = ({ 
  images, 
  titles, 
  activeIndex, 
  onSelect 
}) => {
  return (
    <div className="absolute top-[65%] bottom-10 left-85 right-0 z-30">
      <div className="container mx-auto px-6">
        <div className="thumbnail-container">
          {images.map((image, index) => (
            <div
              key={index}
              className={`thumbnail ${activeIndex === index ? 'active' : ''}`}
              onClick={() => onSelect(index)}
            >
              <img 
                src={image} 
                alt={titles[index]} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="absolute bottom-0 left-0 right-0 p-2">
                <p className="text-xs text-white/90 truncate">{titles[index]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

SliderThumbnails.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  titles: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeIndex: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default SliderThumbnails;