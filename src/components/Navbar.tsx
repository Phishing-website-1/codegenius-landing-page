
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="#" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-gradient">CodeGenius</span>
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <a href="#features" className="text-codegenius-black hover:text-codegenius-purple transition-colors duration-300">Features</a>
              <a href="#how-it-works" className="text-codegenius-black hover:text-codegenius-purple transition-colors duration-300">How It Works</a>
              <a href="#testimonials" className="text-codegenius-black hover:text-codegenius-purple transition-colors duration-300">Testimonials</a>
              <a href="https://code-gnerator-one.vercel.app/" className="btn-primary">
                Try CodeGenius
              </a>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-codegenius-black hover:text-codegenius-purple focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a 
              href="#features" 
              className="block py-2 px-3 text-codegenius-black hover:text-codegenius-purple transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              className="block py-2 px-3 text-codegenius-black hover:text-codegenius-purple transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              How It Works
            </a>
            <a 
              href="#testimonials" 
              className="block py-2 px-3 text-codegenius-black hover:text-codegenius-purple transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              Testimonials
            </a>
            <a 
              href="https://code-gnerator-one.vercel.app/" 
              className="block py-2 px-3 text-codegenius-purple font-medium"
              onClick={() => setIsOpen(false)}
            >
              Try CodeGenius
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
