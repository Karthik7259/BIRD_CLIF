import React from 'react';
import { Camera, Brain, LineChart, Shield, Leaf, Share2 } from 'lucide-react';

const Features = () => {
  return (
    <section id="features" className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">AI-Powered Biodiversity Monitoring</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Our innovative solution combines cutting-edge technology with conservation efforts to protect and study wildlife in tropical ecosystems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="feature-card">
            <div className="feature-icon">
              <Camera className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Real-time Monitoring</h3>
            <p className="text-slate-400">
              Advanced camera systems for continuous, non-invasive wildlife observation in their natural habitat.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Brain className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">ML Species Recognition</h3>
            <p className="text-slate-400">
              Machine learning algorithms accurately identify and classify species without human intervention.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <LineChart className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Data Analytics</h3>
            <p className="text-slate-400">
              Comprehensive analysis of biodiversity patterns and trends for informed conservation decisions.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Safe Monitoring</h3>
            <p className="text-slate-400">
              Eliminates risks associated with manual species identification and physical inspection.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Leaf className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Ecosystem Protection</h3>
            <p className="text-slate-400">
              Supports conservation efforts by providing valuable data about ecosystem health and biodiversity.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Share2 className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Research Collaboration</h3>
            <p className="text-slate-400">
              Platform for researchers to share data and insights, advancing biodiversity science globally.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;