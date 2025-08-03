import React from 'react';
import * as THREE from 'three';

interface Chip3DProps {
  position: [number, number, number];
  value: number;
  color?: string;
}

export function Chip3D({ position, value, color }: Chip3DProps) {
  // Chip colors based on value
  const getChipColor = (value: number) => {
    switch (value) {
      case 1: return '#FFFFFF'; // White - $1
      case 5: return '#FF0000'; // Red - $5  
      case 25: return '#00FF00'; // Green - $25
      case 100: return '#000000'; // Black - $100
      case 500: return '#800080'; // Purple - $500
      default: return color || '#FFFF00'; // Yellow - other
    }
  };

  const chipColor = getChipColor(value);
  const chipRadius = 0.15;
  const chipHeight = 0.05;

  return (
    <group position={position}>
      {/* Main chip body */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[chipRadius, chipRadius, chipHeight, 32]} />
        <meshStandardMaterial 
          color={chipColor}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>
      
      {/* Chip edge ring */}
      <mesh>
        <torusGeometry args={[chipRadius - 0.01, 0.01, 8, 32]} />
        <meshStandardMaterial 
          color="#333333"
          roughness={0.3}
        />
      </mesh>
      
      {/* Center dot for value indication */}
      <mesh position={[0, chipHeight/2 + 0.001, 0]} rotation={[-Math.PI/2, 0, 0]}>
        <circleGeometry args={[0.05, 16]} />
        <meshBasicMaterial 
          color={chipColor === '#FFFFFF' ? '#000000' : '#FFFFFF'}
        />
      </mesh>
      
      {/* Value rings */}
      {[1, 2, 3].map((ring, index) => (
        <mesh 
          key={index}
          position={[0, chipHeight/2 + 0.001, 0]} 
          rotation={[-Math.PI/2, 0, 0]}
        >
          <ringGeometry args={[0.06 + index * 0.02, 0.07 + index * 0.02, 16]} />
          <meshBasicMaterial 
            color={index < Math.log10(value) ? '#FFD700' : 'transparent'}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  );
}

export default Chip3D;