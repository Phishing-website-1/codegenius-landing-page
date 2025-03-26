
import React, { useRef, Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useGLTF, Environment, Text3D, Center } from '@react-three/drei';
import { Sparkles, Code, Database, Braces } from 'lucide-react';
import { Group } from 'three';

// Rotating code blocks component
const CodeBlocks = (props) => {
  const group = useRef<Group>(null);
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group ref={group} {...props}>
      {/* Code blocks arranged in a circle */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <mesh 
          key={i} 
          position={[
            Math.sin(i / 6 * Math.PI * 2) * 2.5,
            Math.random() * 0.5 - 0.25,
            Math.cos(i / 6 * Math.PI * 2) * 2.5
          ]}
          rotation={[0, i / 6 * Math.PI * 2, 0]}
          scale={[0.8, 1, 0.05]}
        >
          <boxGeometry />
          <meshStandardMaterial 
            color={i % 2 === 0 ? "#8B5CF6" : "#ffffff"} 
            metalness={0.8} 
            roughness={0.2} 
          />
        </mesh>
      ))}
      
      {/* Central CodeGenius text */}
      <Center position={[0, 0, 0]}>
        <Text3D
          font="/fonts/Inter_Bold.json"
          size={0.5}
          height={0.1}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          {`< CodeGenius />`}
          <meshStandardMaterial 
            color="#8B5CF6" 
            metalness={0.8}
            roughness={0.2}
          />
        </Text3D>
      </Center>
    </group>
  );
};

// Main 3D Models component
const ThreeDModels = () => {
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
      id="3d-models" 
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
          {/* 3D Model Display */}
          <div 
            className={`h-[500px] glass-card transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
            }`}
          >
            <Canvas shadows dpr={[1, 2]}>
              <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={50} />
              <ambientLight intensity={0.5} />
              <spotLight 
                position={[10, 10, 10]} 
                angle={0.15} 
                penumbra={1} 
                intensity={1} 
                castShadow 
              />
              <pointLight position={[-10, -10, -10]} intensity={1} />
              
              <Suspense fallback={null}>
                <CodeBlocks position={[0, 0, 0]} />
                <Environment preset="city" />
              </Suspense>
              
              <OrbitControls 
                enableZoom={false} 
                enablePan={false} 
                autoRotate={false}
                minPolarAngle={Math.PI / 3}
                maxPolarAngle={Math.PI / 1.5}
              />
            </Canvas>
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

export default ThreeDModels;
