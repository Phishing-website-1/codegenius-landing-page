import React, { useRef, useState, useEffect } from 'react';
import { Sparkles, Code, Database, Braces } from 'lucide-react';

// Main component - renamed but keeping the same file for now
const AICodeVisualization = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="ai-visualization" 
      className="py-20 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-glow opacity-30 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-glow opacity-30 blur-3xl"></div>
      
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div 
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="inline-flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm mb-6 border border-codegenius-purple/20">
              <Code size={16} className="text-codegenius-purple" />
              <span className="text-sm font-medium text-codegenius-black">AI-Powered Code Generation</span>
            </div>
          </div>
          
          <h2 
            className={`text-4xl md:text-5xl font-bold mb-6 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'
            }`}
          >
            How <span className="text-gradient">CodeGenius</span> Works
          </h2>
          
          <p 
            className={`text-lg text-codegenius-black/80 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'
            }`}
          >
            CodeGenius uses advanced machine learning algorithms to understand your requirements and generate 
            high-quality, production-ready code. Our AI has been trained on millions of code repositories 
            to ensure it follows best practices and coding standards.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Code visualization placeholder - removed image */}
          <div 
            className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
            }`}
          >
            <div className="glass-card p-6 rounded-xl h-full flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-20 h-20 mx-auto mb-4 bg-codegenius-purple/20 rounded-full flex items-center justify-center">
                  <Code size={40} className="text-codegenius-purple" />
                </div>
                <h3 className="text-xl font-bold mb-2">AI-Powered Code Generation</h3>
                <p className="text-codegenius-black/70">
                  Our advanced algorithms transform your ideas into clean, efficient code
                </p>
              </div>
            </div>
          </div>
          
          {/* Features explanation */}
          <div className={`space-y-8 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
          }`}>
            <div className="flex space-x-4">
              <div className="shrink-0 h-12 w-12 bg-codegenius-purple/10 rounded-xl flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-codegenius-purple" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Smart Context Understanding</h3>
                <p className="text-codegenius-black/70">
                  Our AI understands the context of your project, making it capable of generating code that fits 
                  seamlessly with your existing codebase and follows your preferred coding style.
                </p>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <div className="shrink-0 h-12 w-12 bg-codegenius-purple/10 rounded-xl flex items-center justify-center">
                <Code className="h-6 w-6 text-codegenius-purple" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Multi-language Support</h3>
                <p className="text-codegenius-black/70">
                  CodeGenius supports over 20 programming languages and frameworks, including JavaScript, TypeScript, 
                  Python, Java, Go, React, Vue, Angular, and many more.
                </p>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <div className="shrink-0 h-12 w-12 bg-codegenius-purple/10 rounded-xl flex items-center justify-center">
                <Database className="h-6 w-6 text-codegenius-purple" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Continuous Learning</h3>
                <p className="text-codegenius-black/70">
                  Our AI gets smarter with every interaction. It learns from your feedback and coding patterns to 
                  provide increasingly accurate and tailored code suggestions.
                </p>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <div className="shrink-0 h-12 w-12 bg-codegenius-purple/10 rounded-xl flex items-center justify-center">
                <Braces className="h-6 w-6 text-codegenius-purple" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Code Refactoring & Optimization</h3>
                <p className="text-codegenius-black/70">
                  Beyond generating new code, CodeGenius can refactor and optimize existing code to improve
                  performance, readability, and maintainability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AICodeVisualization;
