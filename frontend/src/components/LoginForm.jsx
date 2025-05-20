import React from 'react';
import { X } from 'lucide-react';
import PropTypes from 'prop-types';

const LoginForm = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-slate-900 p-8 rounded-xl shadow-xl w-full max-w-md relative border border-slate-800">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
        
        <h2 className="text-2xl font-bold mb-6">Welcome Back</h2>
        
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 bg-slate-800 rounded-lg border border-slate-700 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all"
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 bg-slate-800 rounded-lg border border-slate-700 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all"
              placeholder="Enter your password"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="w-4 h-4 rounded border-slate-700 text-amber-500 focus:ring-amber-500" />
              <span className="ml-2 text-sm text-slate-300">Remember me</span>
            </label>
            <a href="#" className="text-sm text-amber-500 hover:text-amber-400">Forgot password?</a>
          </div>
          
          <button
            type="submit"
            className="w-full bg-amber-500 text-slate-900 py-2 px-4 rounded-lg font-medium hover:bg-amber-400 transition-colors"
          >
            Sign In
          </button>
          
          <p className="text-center text-sm text-slate-400">
            Don't have an account?{' '}
            <a href="#" className="text-amber-500 hover:text-amber-400">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

LoginForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default LoginForm;