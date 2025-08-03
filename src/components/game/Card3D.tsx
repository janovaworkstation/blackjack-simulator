import React from 'react';
import * as THREE from 'three';

interface Card3DProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  rank?: string;
  suit?: string;
  faceUp?: boolean;
}

export function Card3D({ 
  position, 
  rotation = [0, 0, 0], 
  rank = 'A', 
  suit = 'Hearts', 
  faceUp = true 
}: Card3DProps) {
  const cardWidth = 0.6;
  const cardHeight = 0.9;
  const cardDepth = 0.02;

  // Card colors based on suit
  const getSuitColor = (suit: string) => {
    return suit === 'Hearts' || suit === 'Diamonds' ? '#DC143C' : '#000000';
  };

  return (
    <group position={position} rotation={rotation}>
      {/* Card base */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[cardWidth, cardDepth, cardHeight]} />
        <meshStandardMaterial 
          color={faceUp ? '#FFFFFF' : '#1a472a'} 
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>
      
      {/* Card border */}
      <mesh position={[0, cardDepth / 2 + 0.001, 0]}>
        <planeGeometry args={[cardWidth - 0.02, cardHeight - 0.02]} />
        <meshBasicMaterial 
          color={faceUp ? '#F8F8F8' : '#2d5a2d'} 
          transparent 
          opacity={0.9}
        />
      </mesh>
      
      {/* Card content (when face up) */}
      {faceUp && (
        <>
          {/* Rank text placeholder */}
          <mesh position={[-cardWidth/3, cardDepth / 2 + 0.002, cardHeight/3]}>
            <planeGeometry args={[0.15, 0.2]} />
            <meshBasicMaterial color={getSuitColor(suit)} />
          </mesh>
          
          {/* Suit symbol placeholder */}
          <mesh position={[-cardWidth/3, cardDepth / 2 + 0.002, cardHeight/3 - 0.15]}>
            <planeGeometry args={[0.1, 0.1]} />
            <meshBasicMaterial color={getSuitColor(suit)} />
          </mesh>
          
          {/* Center suit symbol */}
          <mesh position={[0, cardDepth / 2 + 0.002, 0]}>
            <planeGeometry args={[0.2, 0.2]} />
            <meshBasicMaterial color={getSuitColor(suit)} />
          </mesh>
        </>
      )}
    </group>
  );
}

export default Card3D;