
import React, { useRef, useEffect, useState } from 'react';
import { ArrowRight, Code, Zap } from 'lucide-react';

const CTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <section className="py-20 relative overflow-hidden glow">
      <div 
        ref={ref}
        className={`section-container bg-gradient-to-r from-codegenius-purple to-codegenius-purple-dark rounded-3xl p-10 md:p-16 text-white relative z-10 transition-all duration-1000 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your <br />
              Development Workflow?
            </h2>
            <p className="text-white/80 mb-8 max-w-md">
              Join thousands of developers who are shipping better code, faster. Try CodeGenius today and experience the future of coding.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="https://code-gnerator-one.vercel.app/" 
                className="inline-flex items-center justify-center bg-white text-codegenius-purple rounded-full px-6 py-3 font-medium hover:bg-white/90 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
              >
                <Zap size={18} className="mr-2" />
                Get Started Free
              </a>
              <a 
                href="#features" 
                className="inline-flex items-center justify-center bg-transparent border border-white/30 rounded-full px-6 py-3 font-medium hover:bg-white/10 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
              >
                <Code size={18} className="mr-2" />
                Learn More
              </a>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <div className="text-lg font-medium">Why CodeGenius?</div>
                <ArrowRight className="h-5 w-5 text-white/70" />
              </div>
              
              <ul className="space-y-4">
                {[
                  "10x faster development cycles",
                  "Production-ready code out of the box",
                  "Support for 20+ programming languages",
                  "Advanced code refactoring and optimization",
                  "Seamless integration with your workflow"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-medium mr-3 mt-0.5">
                      {index + 1}
                    </div>
                    <span className="text-white/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -right-5 -top-5 h-16 w-16 bg-white/5 rounded-full blur-xl"></div>
            <div className="absolute -left-10 -bottom-10 h-24 w-24 bg-white/5 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
