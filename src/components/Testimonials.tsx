
import React, { useRef, useEffect, useState } from 'react';
import { Quote, Sparkles, Star } from 'lucide-react';

const Testimonial = ({ quote, author, role, company, index }) => {
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
      className={`glass-card hover:shadow-xl transition-all duration-700 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="p-6">
        <div className="flex mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-codegenius-purple text-codegenius-purple" />
          ))}
        </div>
        
        <blockquote className="mb-6 relative">
          <Quote className="absolute -top-2 -left-2 h-6 w-6 text-codegenius-purple/20" />
          <p className="text-codegenius-black/80 pl-4">{quote}</p>
        </blockquote>
        
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-codegenius-purple/20 flex items-center justify-center text-codegenius-purple font-bold">
            {author.charAt(0)}
          </div>
          <div className="ml-3">
            <p className="font-medium text-codegenius-black">{author}</p>
            <p className="text-sm text-codegenius-black/60">{role}, {company}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
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

  const testimonials = [
    {
      quote: "CodeGenius has transformed our development workflow. What used to take days now takes minutes. The quality of the generated code is consistently impressive.",
      author: "Sarah Johnson",
      role: "CTO",
      company: "TechFusion"
    },
    {
      quote: "As a solo developer, CodeGenius feels like having an entire development team at my fingertips. I can prototype ideas and build MVPs in record time.",
      author: "Michael Chen",
      role: "Indie Developer",
      company: "PixelPerfect Apps"
    },
    {
      quote: "The code refactoring capabilities alone are worth the price. CodeGenius helped us modernize our legacy codebase with minimal effort.",
      author: "Emma Rodriguez",
      role: "Lead Engineer",
      company: "DataStream Inc."
    },
    {
      quote: "I was skeptical about AI-generated code, but CodeGenius changed my mind. The output is clean, well-documented, and follows best practices.",
      author: "James Wilson",
      role: "Senior Developer",
      company: "CloudNine Solutions"
    }
  ];

  return (
    <section id="testimonials" className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-glow opacity-30 blur-3xl"></div>
      
      <div className="section-container" ref={headerRef}>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div 
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="inline-flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm mb-6 border border-codegenius-purple/20">
              <Sparkles size={16} className="text-codegenius-purple" />
              <span className="text-sm font-medium text-codegenius-black">Success Stories</span>
            </div>
          </div>
          
          <h2 
            className={`text-4xl md:text-5xl font-bold mb-6 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'
            }`}
          >
            What <span className="text-gradient">Developers</span> Are Saying
          </h2>
          
          <p 
            className={`text-lg text-codegenius-black/80 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'
            }`}
          >
            Join thousands of developers and teams who are accelerating their workflow with CodeGenius.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial 
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              company={testimonial.company}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
