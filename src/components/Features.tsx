
import React, { useRef, useEffect, useState } from 'react';
import { Code, GithubIcon, Hammer, LayoutGrid, Lightbulb, Repeat, Settings, Sparkles, Zap } from 'lucide-react';

const FeatureCard = ({ icon, title, description, index }) => {
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
    <div 
      ref={ref}
      className={`glass-card p-6 transition-all duration-700 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-codegenius-purple/10 text-codegenius-purple mb-5">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-codegenius-black">{title}</h3>
      <p className="text-codegenius-black/70">{description}</p>
    </div>
  );
};

const Features = () => {
  const [isVisible, setIsVisible] = useState(false);
  const headerRef = useRef(null);

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

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, []);

  const features = [
    {
      icon: <Code size={24} />,
      title: "Multiple Languages Support",
      description: "Generate code in JavaScript, Python, Java, TypeScript, Go, and many more languages with expert-level quality."
    },
    {
      icon: <Zap size={24} />,
      title: "Lightning Fast",
      description: "Get production-ready code in seconds, not minutes. Speed up your development workflow dramatically."
    },
    {
      icon: <Settings size={24} />,
      title: "Customizable Output",
      description: "Adjust parameters to control code style, complexity, and documentation level to match your project needs."
    },
    {
      icon: <GithubIcon size={24} />,
      title: "Version Control Integration",
      description: "Seamlessly integrate with GitHub, GitLab, and Bitbucket for instant commits and PRs."
    },
    {
      icon: <Lightbulb size={24} />,
      title: "Smart Suggestions",
      description: "Intelligent code recommendations based on your existing codebase and best practices."
    },
    {
      icon: <LayoutGrid size={24} />,
      title: "Complete Solutions",
      description: "Generate entire components, functions, classes, or even full-stack applications from natural language descriptions."
    },
    {
      icon: <Hammer size={24} />,
      title: "Code Refactoring",
      description: "Transform legacy code into modern, optimized solutions with intelligent refactoring suggestions."
    },
    {
      icon: <Repeat size={24} />,
      title: "Continuous Learning",
      description: "Our AI model improves with each interaction, delivering increasingly accurate and relevant code over time."
    }
  ];

  return (
    <section id="features" className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-64 h-64 bg-purple-glow opacity-30 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-glow opacity-20 blur-3xl"></div>
      
      <div className="section-container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16" ref={headerRef}>
          <div 
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="inline-flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm mb-6 border border-codegenius-purple/20">
              <Sparkles size={16} className="text-codegenius-purple" />
              <span className="text-sm font-medium text-codegenius-black">Powerful Capabilities</span>
            </div>
          </div>
          
          <h2 
            className={`text-4xl md:text-5xl font-bold mb-6 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'
            }`}
          >
            <span className="text-gradient">Advanced Features</span> for <br />Modern Development
          </h2>
          
          <p 
            className={`text-lg text-codegenius-black/80 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'
            }`}
          >
            CodeGenius combines cutting-edge AI with deep programming knowledge to deliver code that's not just functional, but elegantly crafted.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
