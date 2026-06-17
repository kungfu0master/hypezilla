import { Canvas } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Float, Environment } from '@react-three/drei';

export function ThreeBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none" style={{ transform: 'translateZ(-80px)' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#cc2428" />
        <pointLight position={[0, 0, 0]} intensity={2} color="#ff4d50" />
        
        {/* Main shape changing blob - Highly transparent and fluid */}
        <Float speed={1.5} rotationIntensity={1.5} floatIntensity={2}>
          <Sphere args={[1, 48, 48]} scale={1.8}>
            <MeshDistortMaterial
              color="#ffffff"
              attach="material"
              distort={0.6}
              speed={1.2}
              roughness={0}
              metalness={0.9}
              transmission={1}
              ior={1.5}
              thickness={1.5}
              transparent
              opacity={0.3}
            />
          </Sphere>
        </Float>
        
        {/* Secondary inner blob - Adds depth */}
        <Float speed={2} rotationIntensity={3} floatIntensity={2}>
          <Sphere args={[1, 24, 24]} scale={1.2} position={[0.2, 0.1, 0]}>
            <MeshDistortMaterial
              color="#cc2428"
              attach="material"
              distort={0.4}
              speed={2}
              roughness={0.2}
              metalness={0.8}
              transparent
              opacity={0.2}
            />
          </Sphere>
        </Float>

        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
