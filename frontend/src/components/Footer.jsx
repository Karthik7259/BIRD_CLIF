import React from 'react';
import { PawPrint, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-950 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <PawPrint className="h-8 w-8 text-amber-500" />
              <span className="font-bold text-xl">WildLife</span>
            </div>
            <p className="text-slate-400 mb-6">
              Leveraging technology for wildlife conservation and biodiversity research in tropical ecosystems.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="social-link">
                <Facebook size={20} />
              </a>
              <a href="#" className="social-link">
                <Twitter size={20} />
              </a>
              <a href="#" className="social-link">
                <Instagram size={20} />
              </a>
              <a href="#" className="social-link">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#home" className="footer-link">Home</a></li>
              <li><a href="#animals" className="footer-link">Animals</a></li>
              <li><a href="#conservation" className="footer-link">Conservation</a></li>
              <li><a href="#gallery" className="footer-link">Gallery</a></li>
              <li><a href="#about" className="footer-link">About Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="footer-heading">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-slate-400">
                <MapPin size={18} />
                <span>123 Conservation Way, Tropical Forest</span>
              </li>
              <li className="flex items-center space-x-3 text-slate-400">
                <Phone size={18} />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3 text-slate-400">
                <Mail size={18} />
                <span>info@wildlife-ai.org</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="footer-heading">Newsletter</h3>
            <p className="text-slate-400 mb-4">
              Subscribe to our newsletter for updates on our conservation efforts.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-slate-800 rounded-lg border border-slate-700 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all"
              />
              <button type="submit" className="btn btn-primary w-full">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8">
          <p className="text-center text-slate-400 text-sm">
            © {new Date().getFullYear()} Wildlife. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;