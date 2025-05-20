import React, { useState, useEffect, useCallback } from 'react';
import SliderItem from './SliderItem';
import SliderControls from './SliderControls';
import SliderThumbnails from './SliderThumbnails';
import animalData from '../data/animals';

const HeroSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  
  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % animalData.length);
  }, []);

  const goToPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + animalData.length) % animalData.length);
  }, []);

  const goToSlide = useCallback((index) => {
    setActiveIndex(index);
    // Pause autoplay briefly when manually changing slides
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 5000);
  }, []);

  // Setup autoplay
  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      goToNext();
    }, 6000);
    
    return () => clearInterval(interval);
  }, [autoplay, goToNext]);

  return (
    <section id="home" className="relative overflow-hidden w-full slider-container">
      <div className="relative h-full">
        {animalData.map((animal, index) => (
          <SliderItem
            key={animal.id}
            image={animal.image}
            title={animal.title}
            description={animal.description}
            category={animal.category}
            isActive={index === activeIndex}
          />
        ))}
      </div>
      
      <SliderControls onNext={goToNext} onPrev={goToPrev} />
      
      <SliderThumbnails
        images={animalData.map(animal => animal.image)}
        titles={animalData.map(animal => animal.title)}
        activeIndex={activeIndex}
        onSelect={goToSlide}
      />
    </section>
  );
};

export default HeroSlider;