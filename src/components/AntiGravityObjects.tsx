import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, GradientTexture, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const ObjectMesh = ({ position, color, type }: { position: [number, number, number], color: string | string[], type: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialPos = useMemo(() => new THREE.Vector3(...position), [position]);
  const currentPos = useRef(new THREE.Vector3(...position));
  const velocity = useRef(new THREE.Vector3(0, 0, 0));
  const { viewport, mouse } = useThree();

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Unproject mouse coordinates to world coordinates at the object's z depth
    const pointer = state.pointer || state.mouse;
    const pointerVec = new THREE.Vector3(pointer.x, pointer.y, 0.5);
    pointerVec.unproject(state.camera);
    const dirToMouse = pointerVec.sub(state.camera.position).normalize();
    const distanceToPlane = (currentPos.current.z - state.camera.position.z) / (dirToMouse.z || 0.0001);
    const worldMousePos = state.camera.position.clone().add(dirToMouse.multiplyScalar(distanceToPlane));

    // Calculate distance to pointer
    const dist = worldMousePos.distanceTo(currentPos.current);
    
    // Repulsion force (force field)
    const radius = 5;
    if (dist < radius) {
      const dir = currentPos.current.clone().sub(worldMousePos).normalize();
      // Stronger force the closer the mouse is (quadratic falloff)
      const force = Math.pow((radius - dist) / radius, 2) * 25 * delta;
      velocity.current.add(dir.multiplyScalar(force));
    }

    // Spring back to initial position (soft spring for subtle effect)
    const springDir = initialPos.clone().sub(currentPos.current);
    velocity.current.add(springDir.multiplyScalar(1.8 * delta));
    
    // Damping to prevent infinite bouncing
    velocity.current.multiplyScalar(0.92);
    
    // Apply velocity
    currentPos.current.add(velocity.current);
    meshRef.current.position.copy(currentPos.current);

    // Add some base rotation
    meshRef.current.rotation.x += delta * 0.2;
    meshRef.current.rotation.y += delta * 0.3;
  });

  const isGradient = Array.isArray(color);

  return (
    <mesh ref={meshRef}>
      {type === 'box' && <boxGeometry args={[1, 1, 1]} />}
      {type === 'sphere' && <icosahedronGeometry args={[0.8, 0]} />}
      {type === 'torus' && <torusGeometry args={[0.6, 0.25, 16, 64]} />}
      {type === 'cone' && <coneGeometry args={[0.7, 1.5, 32]} />}
      {type === 'cylinder' && <cylinderGeometry args={[0.5, 0.5, 1.5, 32]} />}
      {type === 'icosahedron' && <icosahedronGeometry args={[0.8, 0]} />}
      <MeshDistortMaterial
        color={isGradient ? '#ffffff' : color}
        speed={2}
        distort={type === 'sphere' ? 0.3 : (type === 'torus' ? 0.1 : 0)}
        metalness={0.8}
        roughness={0.2}
      >
        {isGradient && (
          <GradientTexture
            stops={color.length === 2 ? [0, 1] : color.map((_, i) => i / (color.length - 1))} // Generate stops dynamically
            colors={color}
            size={1024}
          />
        )}
      </MeshDistortMaterial>
    </mesh>
  );
};

export const AntiGravityObjects = () => {
  const objects = useMemo(() => [
    { position: [-6, 4, -5], color: '#FF5E00', type: 'box' },
    { position: [7, -5, 2], color: '#FFD000', type: 'sphere' },
    { position: [-8, -6, 1], color: ['#FF5E00', '#FFD000'], type: 'torus' },
    { position: [8, 5, -8], color: ['#FFD000', '#FFA500', '#FF5E00'], type: 'cone' },
    { position: [-2, 8, -6], color: '#ffffff', type: 'cylinder' },
    { position: [2, -8, -10], color: '#FF5E00', type: 'icosahedron' },
  ], []);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#FF5E00" />
      {objects.map((obj, i) => (
        <Float key={i} speed={3} rotationIntensity={2} floatIntensity={1.5}>
          <ObjectMesh position={obj.position as [number, number, number]} color={obj.color} type={obj.type} />
        </Float>
      ))}
    </>
  );
};
