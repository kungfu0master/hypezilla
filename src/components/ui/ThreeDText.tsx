import { useRef, useState, ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface ThreeDTextProps {
  children: ReactNode;
}

export function Interactive3DTilt({ children, intensity = 10, className = "" }: { children: ReactNode; intensity?: number; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseY, [0.5, -0.5], [intensity, -intensity]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [intensity, -intensity]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = event.clientX - rect.left;
    const mouseYPos = event.clientY - rect.top;

    x.set(mouseXPos / width - 0.5);
    y.set(mouseYPos / height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <div 
      className={`relative group [perspective:1000px] ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </div>
  );
}

export function Interactive3DText({ children }: ThreeDTextProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseY, [0.5, -0.5], [10, -10]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [10, -10]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = event.clientX - rect.left;
    const mouseYPos = event.clientY - rect.top;

    x.set(mouseXPos / width - 0.5);
    y.set(mouseYPos / height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <div 
      className="relative group [perspective:1000px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D Digital Aura (R3F) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 group-hover:opacity-70 transition-opacity duration-500 scale-150">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={1.5} />
          <pointLight position={[10, 10, 10]} intensity={2} color="#cc2428" />
          <Float speed={4} rotationIntensity={0.5} floatIntensity={1}>
            <Aura />
          </Float>
        </Canvas>
      </div>

      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </div>
  );
}

function Aura() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 32, 32]} />
        <MeshDistortMaterial
          color="#cc2428"
          speed={3}
          distort={0.4}
          radius={1}
          wireframe
          opacity={0.15}
          transparent
        />
      </mesh>
      <Sphere args={[1.5, 32, 32]} scale={1.2}>
        <meshBasicMaterial color="#eab308" wireframe opacity={0.05} transparent />
      </Sphere>
    </group>
  );
}
