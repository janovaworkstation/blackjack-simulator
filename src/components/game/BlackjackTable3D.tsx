import React, { useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';
import Card3D from './Card3D';
import Chip3D from './Chip3D';

// Table Component - Smaller to fit the red border area
function Table() {
  return (
    <mesh position={[0, 2, 0]} receiveShadow>
      <boxGeometry args={[18, 0.2, 12]} />
      <meshStandardMaterial color="#1a472a" />
    </mesh>
  );
}

// Felt Surface Component - Much larger to fill the space
function Felt() {
  return (
    <mesh position={[0, 2.11, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[16, 10]} />
      <meshStandardMaterial 
        color="#2d5a2d"
        roughness={0.8}
        metalness={0.1}
      />
    </mesh>
  );
}

// Table Border Component - Gold/brown border around entire table
function TableBorder() {
  return (
    <>
      {/* Top border */}
      <mesh position={[0, 2.13, -5.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[17, 0.6]} />
        <meshBasicMaterial color="#B8860B" />
      </mesh>
      {/* Bottom border */}
      <mesh position={[0, 2.13, 5.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[17, 0.6]} />
        <meshBasicMaterial color="#B8860B" />
      </mesh>
      {/* Left border */}
      <mesh position={[-8.5, 2.13, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.6, 11]} />
        <meshBasicMaterial color="#B8860B" />
      </mesh>
      {/* Right border */}
      <mesh position={[8.5, 2.13, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.6, 11]} />
        <meshBasicMaterial color="#B8860B" />
      </mesh>
    </>
  );
}

// Betting Circles Component - Moved away from dark green border
function BettingCircles() {
  const positions = [
    [-6, 2.12, 3.5],
    [-3, 2.12, 3.5],
    [0, 2.12, 3.5],
    [3, 2.12, 3.5],
    [6, 2.12, 3.5],
  ];

  return (
    <>
      {positions.map((pos, index) => (
        <group key={index} position={pos as [number, number, number]}>
          {/* Outer circle */}
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.6, 0.8, 32]} />
            <meshBasicMaterial color="#FFD700" />
          </mesh>
          {/* Inner circle */}
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.6, 32]} />
            <meshBasicMaterial color="#1a472a" opacity={0.5} transparent />
          </mesh>
        </group>
      ))}
    </>
  );
}

// Table Rails Component - Dark green border around felt
function TableRails() {
  return (
    <>
      {/* Left rail */}
      <mesh position={[-8, 2.12, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.4, 10]} />
        <meshBasicMaterial color="#1a472a" />
      </mesh>
      {/* Right rail */}
      <mesh position={[8, 2.12, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.4, 10]} />
        <meshBasicMaterial color="#1a472a" />
      </mesh>
      {/* Top rail */}
      <mesh position={[0, 2.12, -5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[16, 0.4]} />
        <meshBasicMaterial color="#1a472a" />
      </mesh>
      {/* Bottom rail */}
      <mesh position={[0, 2.12, 5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[16, 0.4]} />
        <meshBasicMaterial color="#1a472a" />
      </mesh>
    </>
  );
}

// Lighting Setup
function Lighting() {
  return (
    <>
      {/* Strong ambient light for full visibility */}
      <ambientLight intensity={0.8} />
      
      {/* Main overhead light with much larger shadow camera */}
      <directionalLight
        position={[0, 40, 20]}
        intensity={2.0}
        castShadow
        shadow-mapSize={[4096, 4096]}
        shadow-camera-far={100}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
      />
      
      {/* Additional wide area lighting */}
      <pointLight position={[0, 20, 0]} intensity={1.0} />
      <pointLight position={[-15, 15, 0]} intensity={0.8} />
      <pointLight position={[15, 15, 0]} intensity={0.8} />
      <pointLight position={[0, 15, -15]} intensity={0.8} />
      <pointLight position={[0, 15, 15]} intensity={0.8} />
    </>
  );
}

// Camera Component with manual setup
function StaticCamera() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null!);
  
  React.useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.position.set(0, 10, 5);
      cameraRef.current.lookAt(0, 2, 0);
      cameraRef.current.updateMatrixWorld();
    }
  }, []);

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      fov={80}
      near={0.1}
      far={1000}
    />
  );
}

// Main 3D Scene Component
export function BlackjackTable3D({ children }: { children?: React.ReactNode }) {
  return (
    <div className="w-full h-full bg-gray-900">
      <Canvas shadows>
        <Suspense fallback={null}>
          {/* Static Camera setup - fixed position and angle */}
          <StaticCamera />
          
          {/* Lighting */}
          <Lighting />
          
          {/* Environment for reflections */}
          <Environment preset="city" />
          
          {/* Table components */}
          <Table />
          <Felt />
          <TableRails />
          <TableBorder />
          <BettingCircles />
          
          {/* Dynamic content from children */}
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
}

export default BlackjackTable3D;