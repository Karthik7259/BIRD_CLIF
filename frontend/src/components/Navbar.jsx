import React, { useState, useEffect } from 'react';
import { Menu, X, PawPrint } from 'lucide-react';
import LoginForm from './LoginForm';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-slate-900/95 shadow-lg backdrop-blur-sm py-3' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <PawPrint className="h-8 w-8 text-amber-500" />
              <span className="font-bold text-xl tracking-tight">WildLife</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <a href="#home" className="nav-link active">Home</a>
              <a href="#animals" className="nav-link">Animals</a>
              <a href="#conservation" className="nav-link">Conservation</a>
              <a href="#gallery" className="nav-link">Gallery</a>
              <a href="#about" className="nav-link">About</a>
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <button 
                onClick={() => setIsLoginOpen(true)}
                className="btn border border-white/30 hover:bg-white/10"
              >
                Login
              </button>
              <a href="#donate" className="btn btn-primary">
                Support Us
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-amber-500 focus:outline-none"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              isMenuOpen ? 'max-h-96 mt-4' : 'max-h-0'
            }`}
          >
            <div className="flex flex-col space-y-3 pb-5">
              <a href="#home" className="nav-link active">Home</a>
              <a href="#animals" className="nav-link">Animals</a>
              <a href="#conservation" className="nav-link">Conservation</a>
              <a href="#gallery" className="nav-link">Gallery</a>
              <a href="#about" className="nav-link">About</a>
              <button 
                onClick={() => setIsLoginOpen(true)}
                className="btn border border-white/30 hover:bg-white/10 text-center"
              >
                Login
              </button>
              <a href="#donate" className="btn btn-primary text-center">
                Support Us
              </a>
            </div>
          </div>
        </div>
      </nav>

      <LoginForm isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
};

export default Navbar;