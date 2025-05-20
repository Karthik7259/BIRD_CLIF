import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import PropTypes from 'prop-types';

const SliderItem = ({ 
  image, 
  title, 
  description, 
  category,
  isActive 
}) => {
  const contentRef = useRef(null);
  
  useEffect(() => {
    if (isActive && contentRef.current) {
      // Reset positions
      gsap.set(contentRef.current.querySelectorAll('.animate-item'), {
        y: 50,
        opacity: 0
      });
      
      // Animate in
      gsap.to(contentRef.current.querySelectorAll('.animate-item'), {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.3
      });
    }
  }, [isActive]);

  return (
    <div className={`slider-item ${isActive ? 'active' : ''}`}>
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div ref={contentRef} className="relative z-20 flex items-end h-full pb-20 md:pb-32">
        <div className="container mx-auto px-6 md:px-10">
          <div className="max-w-2xl">
            <span className="animate-item inline-block px-3 py-1 bg-amber-500/90 text-slate-950 
                        text-xs tracking-wider uppercase rounded mb-4">
              {category}
            </span>
            <h1 className="animate-item text-4xl md:text-6xl font-bold mb-4 leading-tight">
              {title}
            </h1>
            <p className="animate-item text-white/80 text-lg md:text-xl mb-8 max-w-xl">
              {description}
            </p>
            <div className="animate-item">
              <Link to={"/ml"} className="btn btn-primary mr-4">
                Learn More
              </Link>
              <button className="btn border border-white/30 hover:bg-white/10">
                Watch Video
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

SliderItem.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired
};

export default SliderItem;