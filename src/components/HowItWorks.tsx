
import React, { useRef, useEffect, useState } from 'react';
import { BrainCircuit, Code, MessageSquare, Sparkles } from 'lucide-react';

const HowItWorks = () => {
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

  const steps = [
    {
      icon: <MessageSquare className="h-8 w-8 text-white" />,
      title: "Describe Your Needs",
      description: "Use natural language to explain what you want to build. Be as specific or general as you like."
    },
    {
      icon: <BrainCircuit className="h-8 w-8 text-white" />,
      title: "AI Analysis",
      description: "Our advanced AI model understands your requirements and identifies the best approach to implement them."
    },
    {
      icon: <Code className="h-8 w-8 text-white" />,
      title: "Code Generation",
      description: "Receive optimized, production-ready code based on the latest programming best practices."
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-codegenius-black/95 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/3 w-72 h-72 bg-purple-glow opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-glow opacity-10 blur-3xl"></div>
      
      <div className="section-container relative z-10" ref={ref}>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div 
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="inline-flex items-center space-x-1 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm mb-6 border border-white/10">
              <Sparkles size={16} className="text-codegenius-purple-light" />
              <span className="text-sm font-medium text-white/90">Simple Process</span>
            </div>
          </div>
          
          <h2 
            className={`text-4xl md:text-5xl font-bold mb-6 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'
            }`}
          >
            How <span className="text-codegenius-purple-light">CodeGenius</span> Works
          </h2>
          
          <p 
            className={`text-lg text-white/80 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'
            }`}
          >
            From concept to code in three simple steps. Our streamlined process makes generating professional code effortless.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-codegenius-purple/0 via-codegenius-purple/50 to-codegenius-purple/0 transform -translate-y-1/2 z-0"></div>
          
          {steps.map((step, index) => (
            <div
              key={index}
              className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 relative z-10 transition-all duration-700 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Step number */}
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-codegenius-purple flex items-center justify-center font-bold text-white border-4 border-codegenius-black/95">
                {index + 1}
              </div>
              
              <div className="flex flex-col items-center text-center pt-4">
                <div className="w-16 h-16 rounded-xl bg-codegenius-purple flex items-center justify-center mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-white/70">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div 
          className={`mt-16 text-center transition-all duration-700 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <a href="https://code-gnerator-one.vercel.app/" className="btn-primary bg-codegenius-purple hover:bg-codegenius-purple-dark">
            Try It Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
