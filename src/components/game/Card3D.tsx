import { useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Card3DProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  rank: string;
  suit: string;
  faceUp?: boolean;
  shouldFlip?: boolean; // Triggers the flip animation
  onFlipComplete?: () => void; // Called when flip animation completes
  shouldPeek?: boolean; // Triggers dealer peek animation
  onPeekComplete?: () => void; // Called when peek animation completes
}

export function Card3D({ 
  position, 
  rotation = [0, 0, 0], 
  rank, 
  suit, 
  faceUp = true,
  shouldFlip = false,
  onFlipComplete,
  shouldPeek = false,
  onPeekComplete
}: Card3DProps) {
  
  // Add safety check
  if (!rank || !suit) {
    console.error('Card3D: Missing rank or suit!', { rank, suit });
    return null;
  }
  
  // Convert rank and suit to API format
  const getCardCode = (rank: string, suit: string) => {
    const rankMap: { [key: string]: string } = {
      'A': 'A',
      'K': 'K', 
      'Q': 'Q',
      'J': 'J',
      '10': '0',
      '9': '9',
      '8': '8', 
      '7': '7',
      '6': '6',
      '5': '5',
      '4': '4',
      '3': '3',
      '2': '2'
    };
    
    const suitMap: { [key: string]: string } = {
      'Hearts': 'H',
      'Diamonds': 'D', 
      'Clubs': 'C',
      'Spades': 'S'
    };
    
    const rankCode = rankMap[rank] || 'A';
    const suitCode = suitMap[suit] || 'S';
    
    const cardCode = `${rankCode}${suitCode}`;
    console.log(`Card3D: Converting ${rank} of ${suit} to ${cardCode}`);
    
    return cardCode;
  };

  // Get image path - we now have all cards
  const finalImagePath = faceUp 
    ? `/cards/${getCardCode(rank, suit)}.png`
    : '/cards/card-back.png';
  
  console.log(`Card3D: Final image path for ${rank} of ${suit}:`, finalImagePath);
  
  // Alternative texture loading approach to debug the issue
  const [customTexture, setCustomTexture] = useState<THREE.Texture | null>(null);
  
  useEffect(() => {
    console.log(`Card3D: Loading texture for ${rank} of ${suit} from:`, finalImagePath);
    
    const loader = new THREE.TextureLoader();
    loader.load(
      finalImagePath,
      (loadedTexture) => {
        console.log(`Card3D: Successfully loaded texture for ${rank} of ${suit}`);
        setCustomTexture(loadedTexture);
      },
      (progress) => {
        console.log(`Card3D: Loading progress for ${rank} of ${suit}:`, progress);
      },
      (error) => {
        console.error(`Card3D: Failed to load texture for ${rank} of ${suit}:`, error);
        
        // Create a fallback texture with the card utility
        import('../../utils/createCardImages').then(() => {
          const canvas = document.createElement('canvas');
          canvas.width = 250;
          canvas.height = 350;
          const ctx = canvas.getContext('2d');
          
          if (ctx) {
            if (faceUp) {
              // White card with rank/suit text
              ctx.fillStyle = '#FFFFFF';
              ctx.fillRect(0, 0, canvas.width, canvas.height);
              ctx.strokeStyle = '#000000';
              ctx.lineWidth = 3;
              ctx.strokeRect(3, 3, canvas.width - 6, canvas.height - 6);
              
              const isRed = suit === 'Hearts' || suit === 'Diamonds';
              ctx.fillStyle = isRed ? '#DC143C' : '#000000';
              ctx.font = 'bold 60px Arial';
              ctx.textAlign = 'center';
              ctx.fillText(rank, canvas.width / 2, 100);
              
              const symbols = { 'Hearts': '♥', 'Diamonds': '♦', 'Clubs': '♣', 'Spades': '♠' };
              ctx.fillText(symbols[suit as keyof typeof symbols] || '♠', canvas.width / 2, 200);
            } else {
              // Card back - dark green pattern
              ctx.fillStyle = '#1a472a';
              ctx.fillRect(0, 0, canvas.width, canvas.height);
              ctx.strokeStyle = '#FFFFFF';
              ctx.lineWidth = 3;
              ctx.strokeRect(3, 3, canvas.width - 6, canvas.height - 6);
              
              // Simple pattern
              ctx.fillStyle = '#2d5a2d';
              for (let x = 20; x < canvas.width - 20; x += 30) {
                for (let y = 20; y < canvas.height - 20; y += 30) {
                  ctx.fillRect(x, y, 15, 15);
                }
              }
            }
          }
          
          const fallbackTexture = new THREE.CanvasTexture(canvas);
          console.log(`Card3D: Created fallback texture for ${rank} of ${suit}`);
          setCustomTexture(fallbackTexture);
        });
      }
    );
  }, [rank, suit, faceUp, finalImagePath]);

  // Use either the custom texture or a default
  const texture = customTexture || new THREE.Texture();

  // Flip animation state
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipProgress, setFlipProgress] = useState(0);
  const [showingFace, setShowingFace] = useState(faceUp);
  
  // Peek animation state
  const [isPeeking, setIsPeeking] = useState(false);
  const [peekProgress, setPeekProgress] = useState(0);
  
  // Start flip animation when shouldFlip changes
  useEffect(() => {
    if (shouldFlip && !faceUp) {
      console.log(`Card3D: Starting flip animation for ${rank} of ${suit}`);
      setIsFlipping(true);
      setFlipProgress(0);
    }
  }, [shouldFlip, faceUp, rank, suit]);

  // Start peek animation when shouldPeek changes
  useEffect(() => {
    if (shouldPeek && !faceUp) {
      console.log(`Card3D: Starting peek animation for ${rank} of ${suit}`);
      setIsPeeking(true);
      setPeekProgress(0);
    }
  }, [shouldPeek, faceUp, rank, suit]);

  // Animation frame loop
  useFrame((state, delta) => {
    if (isFlipping) {
      const newProgress = Math.min(flipProgress + delta * 3, 1); // 3 = flip speed
      setFlipProgress(newProgress);
      
      // At halfway point, switch from back to face
      if (newProgress >= 0.5 && !showingFace) {
        setShowingFace(true);
      }
      
      // Animation complete
      if (newProgress >= 1) {
        setIsFlipping(false);
        setFlipProgress(0);
        onFlipComplete?.();
        console.log(`Card3D: Flip animation complete for ${rank} of ${suit}`);
      }
    }
    
    if (isPeeking) {
      const newProgress = Math.min(peekProgress + delta * 1.5, 1); // 1.5 = peek speed (slower for better visibility)
      setPeekProgress(newProgress);
      
      // Animation complete
      if (newProgress >= 1) {
        setIsPeeking(false);
        setPeekProgress(0);
        onPeekComplete?.();
        console.log(`Card3D: Peek animation complete for ${rank} of ${suit}`);
      }
    }
  });

  // Calculate current rotation for animations
  const currentRotation = [...rotation] as [number, number, number];
  if (isFlipping) {
    // Flip around X axis (like a real card flip)
    currentRotation[0] = rotation[0] + (flipProgress * Math.PI);
  } else if (isPeeking) {
    // Peek animation - slight lift of corner (Z rotation)
    const peekAngle = Math.sin(peekProgress * Math.PI * 2) * 0.3; // Oscillate up and down
    currentRotation[2] = rotation[2] + peekAngle;
    currentRotation[0] = rotation[0] + peekAngle * 0.2; // Slight X tilt too
  }

  // Determine which texture to show during animation
  const currentFaceUp = isFlipping ? showingFace : faceUp;
  
  // Load card back texture for face-down state
  const [backTexture, setBackTexture] = useState<THREE.Texture | null>(null);
  
  useEffect(() => {
    if (!currentFaceUp) {
      const loader = new THREE.TextureLoader();
      loader.load('/cards/card-back.png', (loadedTexture) => {
        setBackTexture(loadedTexture);
      });
    }
  }, [currentFaceUp]);

  // Select appropriate texture based on current state
  const displayTexture = currentFaceUp ? texture : (backTexture || texture);

  return (
    <group position={position} rotation={currentRotation}>
      {/* Card face with real playing card texture - no background box */}
      <mesh castShadow receiveShadow position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.6, 2.4]} />
        <meshBasicMaterial 
          map={displayTexture} 
          transparent={true}
          alphaTest={0.1}
          side={2}
        />
      </mesh>
    </group>
  );
}

export default Card3D;