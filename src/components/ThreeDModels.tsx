
import React, { useRef, Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Text3D, Center, Float } from '@react-three/drei';
import { Sparkles, Code, Database, Braces } from 'lucide-react';
import { Group, MathUtils, Vector3 } from 'three';

// Code Particle System component
const CodeParticles = () => {
  const particlesRef = useRef<Group>(null);
  const particleCount = 50;
  const particles = Array.from({ length: particleCount });
  
  // Programming language names for particles
  const languages = [
    "JavaScript", "Python", "Java", "TypeScript", 
    "C++", "Go", "Rust", "PHP", "Ruby", "Swift"
  ];
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      
      // Animate each particle child
      particlesRef.current.children.forEach((particle, i) => {
        // Pulsating animation
        const t = state.clock.getElapsedTime() + i;
        particle.scale.x = particle.scale.y = 0.8 + Math.sin(t * 2) * 0.1;
        
        // Random subtle movement
        particle.position.y += Math.sin(t + i) * 0.002;
        
        // Reset if it goes too far
        if (particle.position.y > 3) particle.position.y = -3;
      });
    }
  });

  return (
    <group ref={particlesRef}>
      {particles.map((_, i) => {
        // Generate a random position in a spherical formation
        const angle = (i / particleCount) * Math.PI * 2;
        const radius = 3 + Math.random() * 2; // Random radius between 3-5
        const y = (Math.random() - 0.5) * 5; // Random y position
        
        return (
          <mesh 
            key={i} 
            position={[
              Math.sin(angle) * radius,
              y,
              Math.cos(angle) * radius
            ]}
            rotation={[0, Math.random() * Math.PI * 2, 0]}
          >
            <Text3D
              font="/fonts/Inter_Bold.json"
              size={0.15}
              height={0.02}
              curveSegments={4}
            >
              {languages[i % languages.length]}
              <meshStandardMaterial 
                color={i % 3 === 0 ? "#8B5CF6" : (i % 3 === 1 ? "#ffffff" : "#10b981")}
                emissive={i % 3 === 0 ? "#8B5CF6" : (i % 3 === 1 ? "#ffffff" : "#10b981")}
                emissiveIntensity={0.5}
                metalness={0.8}
                roughness={0.2}
              />
            </Text3D>
          </mesh>
        );
      })}
    </group>
  );
};

// Code Generation Beam component
const CodeBeam = () => {
  const beamRef = useRef<Group>(null);
  
  useFrame(({ clock }) => {
    if (beamRef.current) {
      const t = clock.getElapsedTime();
      // Pulse effect
      beamRef.current.scale.x = 1 + Math.sin(t * 3) * 0.2;
      beamRef.current.scale.z = 1 + Math.sin(t * 3) * 0.2;
      // Rotation
      beamRef.current.rotation.y = t * 0.5;
    }
  });
  
  return (
    <group ref={beamRef}>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 6, 32]} />
        <meshStandardMaterial 
          color="#8B5CF6" 
          emissive="#8B5CF6"
          emissiveIntensity={2}
          opacity={0.7}
          transparent={true}
        />
      </mesh>
    </group>
  );
};

// Central CodeGenius Logo
const CodeGeniusLogo = () => {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Center position={[0, 0, 0]}>
        <Text3D
          font="/fonts/Inter_Bold.json"
          size={0.7}
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
            emissive="#8B5CF6"
            emissiveIntensity={0.5}
          />
        </Text3D>
      </Center>
    </Float>
  );
};

// Binary code particles
const BinaryParticles = () => {
  const particlesRef = useRef<Group>(null);
  const particleCount = 30;
  
  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.children.forEach((particle, i) => {
        // Move particles downward
        particle.position.y -= 0.02;
        
        // Reset position when reaching bottom
        if (particle.position.y < -5) {
          particle.position.y = 5;
          particle.position.x = (Math.random() - 0.5) * 10;
          particle.position.z = (Math.random() - 0.5) * 10;
        }
      });
    }
  });
  
  return (
    <group ref={particlesRef}>
      {Array.from({ length: particleCount }).map((_, i) => (
        <Text3D
          key={i}
          font="/fonts/Inter_Bold.json"
          position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
          ]}
          size={0.2}
          height={0.01}
        >
          {Math.random() > 0.5 ? "1" : "0"}
          <meshStandardMaterial 
            color="#ffffff" 
            emissive="#ffffff"
            emissiveIntensity={0.5}
            opacity={0.7}
            transparent={true}
          />
        </Text3D>
      ))}
    </group>
  );
};

// Main 3D scene
const CodeAnimation = () => {
  return (
    <>
      <BinaryParticles />
      <CodeParticles />
      <CodeBeam />
      <CodeGeniusLogo />
    </>
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
              <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
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
                <CodeAnimation />
                <Environment preset="city" />
              </Suspense>
              
              <OrbitControls 
                enableZoom={false} 
                enablePan={false} 
                autoRotate={true}
                autoRotateSpeed={0.5}
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
