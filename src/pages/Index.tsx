
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import CTA from '../components/CTA';
import AICodeVisualization from '../components/ThreeDModels';

const Index = () => {
  useEffect(() => {
    document.title = "CodeGenius | AI Code Generator";
  }, []);

  return (
    <div className="min-h-screen overflow-hidden">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <AICodeVisualization />
      <CTA />
    </div>
  );
};

export default Index;
