import React, { useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';

interface Chip3DProps {
  position: [number, number, number];
  value: number;
  color?: string;
}

export function Chip3D({ position, value, color }: Chip3DProps) {
  const chipRadius = 0.35;  // Much larger to fill betting circle
  const chipHeight = 0.08;
  
  // Valid chip denominations that we have textures for
  const validDenominations = [1, 5, 25, 100];
  
  // Find the best chip denomination to represent this value
  const getDisplayChip = (betValue: number): number => {
    // If it's an exact match, use it
    if (validDenominations.includes(betValue)) {
      return betValue;
    }
    
    // Otherwise, find the largest denomination that fits
    const suitable = validDenominations.filter(denom => denom <= betValue);
    return suitable.length > 0 ? Math.max(...suitable) : 1;
  };
  
  const displayValue = getDisplayChip(value);
  
  // Load chip texture
  const [chipTexture, setChipTexture] = useState<THREE.Texture | null>(null);
  const [textureLoading, setTextureLoading] = useState(true);
  
  useEffect(() => {
    setTextureLoading(true);
    const loader = new THREE.TextureLoader();
    
    const chipPath = `/chips/chip-${displayValue}.png`;
    console.log(`🎰 Loading chip texture: $${value} bet → $${displayValue} chip from ${chipPath}`);
    
    // Direct load since PNG files exist
    loader.load(
      chipPath,
      (texture) => {
        console.log(`✅ Successfully loaded PNG chip texture for $${displayValue}`);
        // Configure texture for proper display on cylinder
        texture.generateMipmaps = true;
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.flipY = true;  // Standard for Three.js textures
        
        setChipTexture(texture);
        setTextureLoading(false);
      },
      (progress) => {
        console.log(`📊 Loading progress for chip $${displayValue}:`, progress);
      },
      (error) => {
        console.error(`❌ Failed to load chip texture ${chipPath}:`, error);
        setChipTexture(null);
        setTextureLoading(false);
      }
    );
  }, [value, displayValue]);

  // Fallback chip colors for when texture fails to load
  const getChipColor = (chipValue: number) => {
    switch (chipValue) {
      case 1: return '#F8F8FF'; // White - $1
      case 5: return '#DC143C'; // Red - $5  
      case 25: return '#228B22'; // Green - $25
      case 100: return '#2F2F2F'; // Black - $100
      default: return color || '#FFD700'; // Gold - other
    }
  };

  const chipColor = getChipColor(displayValue);
  
  const textColor = useMemo(() => {
    return chipColor === '#F8F8FF' || chipColor === '#FFD700' ? '#000000' : '#FFFFFF';
  }, [chipColor]);

  return (
    <group position={position}>
      {/* Simple flat cylinder chip */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[chipRadius, chipRadius, chipHeight, 32]} />
        <meshStandardMaterial 
          color={chipColor}
          roughness={0.2}
          metalness={0.1}
          map={chipTexture && !textureLoading ? chipTexture : undefined}
        />
      </mesh>
      
      {/* Simple edge highlight - no extra geometry */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[chipRadius + 0.002, chipRadius + 0.002, chipHeight * 0.1, 32]} />
        <meshStandardMaterial 
          color={chipColor}
          roughness={0.1}
          metalness={0.2}
        />
      </mesh>
    </group>
  );
}

export default Chip3D;