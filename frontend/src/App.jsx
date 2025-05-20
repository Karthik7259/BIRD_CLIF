import  { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSlider from './components/HeroSlider';
import Features from './components/Features';
import Footer from './components/Footer';
import Speciesdetection from './components/speciesdetection';
import Result from './components/result';
import gsap from 'gsap';

// Create Home component to hold the main content
const Home = () => {
  return (
    <>
    <Navbar />
      <HeroSlider />
      <Features />
      <Footer />
       <Navbar />
    </>
  );
};

// Learn component


function App() {
  useEffect(() => {
    // Initial page load animation
    gsap.fromTo(
      'body',
      { opacity: 0 },
      { 
        opacity: 1, 
        duration: 1.5, 
        ease: 'power2.out'
      }
    );

    // Create a timeline for the page load animations
    const tl = gsap.timeline();
    
    tl.fromTo(
      '.nav-animation',
      { y: -20, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.5, 
        stagger: 0.1,
        ease: 'power1.out'
      }
    );
  }, []);

  return (
    <Router>
      <div className="app">
       
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ml" element={<Speciesdetection />} />
            <Route path="/result" element={< Result />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;