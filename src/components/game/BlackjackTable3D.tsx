import React, { useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';
import Card3D from './Card3D';
import Chip3D from './Chip3D';

// Table Component
function Table() {
  const tableGeometry = new THREE.BoxGeometry(8, 0.2, 5);
  
  return (
    <mesh position={[0, 0, 0]} receiveShadow>
      <boxGeometry args={[8, 0.2, 5]} />
      <meshStandardMaterial color="#1a472a" />
    </mesh>
  );
}

// Felt Surface Component
function Felt() {
  return (
    <mesh position={[0, 0.11, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[7.5, 4.5]} />
      <meshStandardMaterial 
        color="#2d5a2d"
        roughness={0.8}
        metalness={0.1}
      />
    </mesh>
  );
}

// Betting Circles Component
function BettingCircles() {
  const positions = [
    [-2.5, 0.12, 1.5],
    [-1.25, 0.12, 1.5],
    [0, 0.12, 1.5],
    [1.25, 0.12, 1.5],
    [2.5, 0.12, 1.5],
  ];

  return (
    <>
      {positions.map((pos, index) => (
        <group key={index} position={pos as [number, number, number]}>
          {/* Outer circle */}
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.4, 0.45, 32]} />
            <meshBasicMaterial color="#FFD700" />
          </mesh>
          {/* Inner circle */}
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.4, 32]} />
            <meshBasicMaterial color="#1a472a" opacity={0.5} transparent />
          </mesh>
        </group>
      ))}
    </>
  );
}

// Table Rails Component
function TableRails() {
  const railGeometry = new THREE.BoxGeometry(0.2, 0.3, 5);
  
  return (
    <>
      {/* Left rail */}
      <mesh position={[-4, 0.15, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.2, 0.3, 5]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      {/* Right rail */}
      <mesh position={[4, 0.15, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.2, 0.3, 5]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      {/* Front rail */}
      <mesh position={[0, 0.15, 2.5]} castShadow receiveShadow>
        <boxGeometry args={[8.2, 0.3, 0.2]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      {/* Back rail */}
      <mesh position={[0, 0.15, -2.5]} castShadow receiveShadow>
        <boxGeometry args={[8.2, 0.3, 0.2]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
    </>
  );
}

// Lighting Setup
function Lighting() {
  return (
    <>
      {/* Ambient light for general illumination */}
      <ambientLight intensity={0.4} />
      
      {/* Main overhead light */}
      <directionalLight
        position={[0, 10, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      
      {/* Table spot lights */}
      <pointLight position={[-3, 5, 0]} intensity={0.5} />
      <pointLight position={[3, 5, 0]} intensity={0.5} />
    </>
  );
}

// Main 3D Scene Component
export function BlackjackTable3D() {
  return (
    <div className="w-full h-screen bg-gray-900">
      <Canvas shadows>
        <Suspense fallback={null}>
          {/* Camera setup */}
          <PerspectiveCamera
            makeDefault
            position={[0, 8, 10]}
            fov={50}
            near={0.1}
            far={1000}
          />
          
          {/* Controls */}
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={5}
            maxDistance={20}
            maxPolarAngle={Math.PI / 2.2}
          />
          
          {/* Lighting */}
          <Lighting />
          
          {/* Environment for reflections */}
          <Environment preset="city" />
          
          {/* Table components */}
          <Table />
          <Felt />
          <BettingCircles />
          <TableRails />
          
          {/* Sample cards for demonstration */}
          <Card3D position={[-1, 0.3, -1]} rank="A" suit="Spades" faceUp={true} />
          <Card3D position={[-0.3, 0.3, -1]} rank="K" suit="Hearts" faceUp={true} />
          <Card3D position={[0, 0.3, 1]} rank="10" suit="Diamonds" faceUp={false} />
          <Card3D position={[0.7, 0.3, 1]} rank="Q" suit="Clubs" faceUp={false} />
          
          {/* Sample betting chips */}
          <Chip3D position={[-2.5, 0.14, 1.5]} value={25} />
          <Chip3D position={[-2.5, 0.19, 1.5]} value={5} />
          <Chip3D position={[0, 0.14, 1.5]} value={100} />
          <Chip3D position={[2.5, 0.14, 1.5]} value={5} />
          
          {/* Fog for atmosphere */}
          <fog attach="fog" args={['#1a1a1a', 10, 50]} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default BlackjackTable3D;