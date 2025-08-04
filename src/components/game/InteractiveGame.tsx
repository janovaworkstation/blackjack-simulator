import React, { useEffect, Suspense, useState, useRef } from 'react';
import { BlackjackTable3D } from './BlackjackTable3D';
import GameUI from './GameUI';
import Card3D from './Card3D';
import Chip3D from './Chip3D';
import { useBlackjackGame } from '../../hooks/useBlackjackGame';
import { useSpring, animated } from '@react-spring/three';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Card {
  rank: string;
  suit: string;
  value: number;
}

// Animated Chip Component for win/loss effects
function AnimatedChip({ 
  position, 
  value, 
  isWinning, 
  showAnimation, 
  isLoss 
}: { 
  position: [number, number, number]; 
  value: number; 
  isWinning?: boolean; 
  showAnimation: boolean; 
  isLoss?: boolean; 
}) {
  const groupRef = useRef<THREE.Group>(null);
  
  const { opacity, scale } = useSpring({
    opacity: showAnimation 
      ? (isLoss ? 0 : 1)  // When animating: fade out for loss, fade in for win
      : (isWinning ? 0 : 1), // Initial state: hidden for winning chips, visible for losing chips
    scale: showAnimation 
      ? (isLoss ? 0.8 : 1.0)  // When animating: shrink for loss, normal size for win
      : (isWinning ? 0.8 : 1.0), // Initial state: small for winning chips, normal for losing chips
    config: { tension: 120, friction: 14, duration: 2000 } // Slower, more visible animation
  });

  // Update materials with current opacity value
  useFrame(() => {
    if (groupRef.current) {
      const currentOpacity = opacity.get();
      
      // Debug logging for winning chips
      if (isWinning && showAnimation) {
        console.log(`Winning chip opacity: ${currentOpacity}`);
      }
      
      groupRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach(mat => {
              mat.transparent = currentOpacity < 1.0;
              mat.opacity = Math.max(0, Math.min(1, currentOpacity)); // Clamp between 0 and 1
              mat.needsUpdate = true;
            });
          } else {
            child.material.transparent = currentOpacity < 1.0;
            child.material.opacity = Math.max(0, Math.min(1, currentOpacity)); // Clamp between 0 and 1
            child.material.needsUpdate = true;
          }
        }
      });
    }
  });

  // Don't show winning chips until animation starts
  if (isWinning && !showAnimation) return null;
  
  // For losing chips, hide completely when opacity is very low (let animation complete)
  if (isLoss && showAnimation && opacity.get() < 0.05) {
    return null;
  }

  return (
    <animated.group 
      ref={groupRef}
      position={position} 
      scale={scale}
    >
      <Chip3D 
        position={[0, 0, 0]}
        value={value} 
      />
    </animated.group>
  );
}

// Enhanced 3D table with dynamic cards and chips
function InteractiveTable({ 
  playerCards, 
  dealerCards, 
  currentBet, 
  shouldFlipDealerCard,
  dealerHoleCardFlipped,
  onDealerCardFlipped,
  chipStack,
  doubleChipStack,
  insuranceChipStack,
  splitChipStack,
  winningsChipStack,
  doubleWinningsChipStack,
  showWinningsAnimation,
  showDoubleWinningsAnimation,
  showLossAnimation,
  showInsuranceLossAnimation,
  showDoubleLossAnimation,
  showSplitLossAnimation,
  splitPlayerCards,
  gameState,
  shouldPeekDealerCard,
  onDealerPeekComplete
}: {
  playerCards: Card[];
  dealerCards: Card[];
  currentBet: number;
  shouldFlipDealerCard: boolean;
  dealerHoleCardFlipped: boolean;
  onDealerCardFlipped: () => void;
  chipStack: number[];
  doubleChipStack: number[];
  insuranceChipStack: number[];
  splitChipStack: number[];
  winningsChipStack: number[];
  doubleWinningsChipStack: number[];
  showWinningsAnimation: boolean;
  showDoubleWinningsAnimation: boolean;
  showLossAnimation: boolean;
  showInsuranceLossAnimation: boolean;
  showDoubleLossAnimation: boolean;
  showSplitLossAnimation: boolean;
  splitPlayerCards: Card[][];
  gameState: any;
  shouldPeekDealerCard: boolean;
  onDealerPeekComplete: () => void;
}) {
  return (
    <div className="w-full" style={{ height: 'calc(100vh - 73px)' }}>
      <BlackjackTable3D>
        <Suspense fallback={null}>
          {/* Player cards - handle both regular and split hands */}
          {!gameState.isSplit ? (
            // Regular hand
            playerCards.map((card, index) => {
              console.log(`Rendering player card ${index}:`, card);
              // Dynamic spacing based on number of cards - back to overlapping style
              const cardCount = playerCards.length;
              const baseSpacing = 1.0;
              const maxSpacing = 0.6;
              const minSpacing = 0.3;
              
              // Calculate spacing - tighter as more cards are added
              let spacing = baseSpacing;
              if (cardCount > 4) {
                spacing = Math.max(minSpacing, maxSpacing - (cardCount - 4) * 0.05);
              } else if (cardCount > 2) {
                spacing = maxSpacing;
              }
              
              // Center the cards
              const totalWidth = (cardCount - 1) * spacing;
              const startX = -totalWidth / 2;
              const xPos = startX + index * spacing;
              
              return (
                <Card3D
                  key={`player-${card.rank}-${card.suit}-${index}`}
                  position={[xPos, 2.3, 1]}
                  rank={card.rank}
                  suit={card.suit}
                  faceUp={true}
                />
              );
            })
          ) : (
            // Split hands
            splitPlayerCards.map((hand, handIndex) => 
              hand.map((card, cardIndex) => {
                console.log(`Rendering split hand ${handIndex} card ${cardIndex}:`, card);
                
                // Position split hands side by side
                const handOffset = handIndex === 0 ? -2 : 2; // Left and right positions
                const cardSpacing = 0.4;
                const xPos = handOffset + (cardIndex * cardSpacing);
                
                // Highlight active hand
                const isActiveHand = handIndex === gameState.activeHand;
                const yPos = isActiveHand ? 2.35 : 2.25; // Slightly raised for active hand
                
                return (
                  <Card3D
                    key={`split-${handIndex}-${card.rank}-${card.suit}-${cardIndex}`}
                    position={[xPos, yPos, 1]}
                    rank={card.rank}
                    suit={card.suit}
                    faceUp={true}
                  />
                );
              })
            )
          )}
          
          {/* Dealer cards */}
          {dealerCards.map((card, index) => {
            console.log(`Rendering dealer card ${index}:`, card);
            const isHoleCard = index === 1; // Second card is the hole card
            
            // Dynamic spacing based on number of cards - back to overlapping style
            const cardCount = dealerCards.length;
            const baseSpacing = 1.0;
            const maxSpacing = 0.6;
            const minSpacing = 0.3;
            
            // Calculate spacing - tighter as more cards are added
            let spacing = baseSpacing;
            if (cardCount > 4) {
              spacing = Math.max(minSpacing, maxSpacing - (cardCount - 4) * 0.05);
            } else if (cardCount > 2) {
              spacing = maxSpacing;
            }
            
            // Center the cards
            const totalWidth = (cardCount - 1) * spacing;
            const startX = -totalWidth / 2;
            const xPos = startX + index * spacing;
            
            return (
              <Card3D
                key={`dealer-${card.rank}-${card.suit}-${index}`}
                position={[xPos, 2.3, -2]}
                rank={card.rank}
                suit={card.suit}
                faceUp={index === 0 || (index === 1 && dealerHoleCardFlipped) || (index > 1)} // First card always face up, hole card after flip, subsequent cards always face up
                shouldFlip={isHoleCard && shouldFlipDealerCard}
                onFlipComplete={isHoleCard ? onDealerCardFlipped : undefined}
                shouldPeek={isHoleCard && shouldPeekDealerCard}
                onPeekComplete={isHoleCard ? onDealerPeekComplete : undefined}
              />
            );
          })}
        </Suspense>
        
        {/* Primary betting chips - positioned based on split status */}
        {chipStack.map((chipValue, index) => {
          let xPos = 0;
          if (doubleChipStack.length > 0) xPos = -0.4;
          if (gameState.isSplit) xPos = -1.2; // Move left when split
          
          return showLossAnimation ? (
            <AnimatedChip 
              key={`bet-chip-${index}`}
              position={[xPos, 2.14 + (index * 0.03), 3.5]}
              value={chipValue}
              isLoss={true}
              showAnimation={showLossAnimation}
            />
          ) : (
            <Chip3D 
              key={`bet-chip-${index}`}
              position={[xPos, 2.14 + (index * 0.03), 3.5]}
              value={chipValue}
            />
          );
        })}
        
        {/* Split bet chips - positioned to the left of primary bet */}
        {splitChipStack.map((chipValue, index) => 
          showSplitLossAnimation ? (
            <AnimatedChip 
              key={`split-chip-${index}`}
              position={[-2.4, 2.14 + (index * 0.03), 3.5]} // Outside the betting circle to the left
              value={chipValue}
              isLoss={true}
              showAnimation={showSplitLossAnimation}
            />
          ) : (
            <Chip3D 
              key={`split-chip-${index}`}
              position={[-2.4, 2.14 + (index * 0.03), 3.5]} // Outside the betting circle to the left
              value={chipValue} 
            />
          )
        )}
        
        {/* Double bet chips - second stack next to primary */}
        {doubleChipStack.map((chipValue, index) => 
          showDoubleLossAnimation ? (
            <AnimatedChip 
              key={`double-chip-${index}`}
              position={[0.4, 2.14 + (index * 0.03), 3.5]} // Stack chips vertically, offset right
              value={chipValue}
              isLoss={true}
              showAnimation={showDoubleLossAnimation}
            />
          ) : (
            <Chip3D 
              key={`double-chip-${index}`}
              position={[0.4, 2.14 + (index * 0.03), 3.5]} // Stack chips vertically, offset right
              value={chipValue} 
            />
          )
        )}
        
        {/* Insurance bet chips - positioned in front of main bet (closer to player) */}
        {insuranceChipStack.map((chipValue, index) => 
          showInsuranceLossAnimation ? (
            <AnimatedChip 
              key={`insurance-chip-${index}`}
              position={[0, 2.14 + (index * 0.03), 4.2]} // Stack chips vertically, positioned in front of main bet
              value={chipValue}
              isLoss={true}
              showAnimation={showInsuranceLossAnimation}
            />
          ) : (
            <Chip3D 
              key={`insurance-chip-${index}`}
              position={[0, 2.14 + (index * 0.03), 4.2]} // Stack chips vertically, positioned in front of main bet
              value={chipValue} 
            />
          )
        )}
        
        {/* Winnings chips - positioned to the right of main bet */}
        {winningsChipStack.map((chipValue, index) => (
          <AnimatedChip 
            key={`winnings-chip-${index}`}
            position={[0.8, 2.14 + (index * 0.03), 3.5]} // Stack chips vertically, offset to the right
            value={chipValue}
            isWinning={true}
            showAnimation={showWinningsAnimation}
          />
        ))}
        
        {/* Double bet winnings chips - positioned to the right of double bet */}
        {doubleWinningsChipStack.map((chipValue, index) => (
          <AnimatedChip 
            key={`double-winnings-chip-${index}`}
            position={[1.2, 2.14 + (index * 0.03), 3.5]} // Stack chips vertically, offset further right
            value={chipValue}
            isWinning={true}
            showAnimation={showDoubleWinningsAnimation}
          />
        ))}
      </BlackjackTable3D>
    </div>
  );
}

export function InteractiveGame() {
  const {
    gameState,
    onBet,
    onClearBet,
    onDeal,
    onHit,
    onStand,
    onDouble,
    onSplit,
    onTakeInsurance,
    onDeclineInsurance,
    playerCards,
    dealerCards,
    splitPlayerCards,
    startDealerPlay,
    waitingForHoleCardFlip,
    isDealing,
    chipStack,
    doubleChipStack,
    insuranceChipStack,
    splitChipStack,
    winningsChipStack,
    doubleWinningsChipStack,
    showWinningsAnimation,
    showDoubleWinningsAnimation,
    showLossAnimation,
    showInsuranceLossAnimation,
    showDoubleLossAnimation,
    showSplitLossAnimation,
    calculateHandValue,
    cardsRemaining,
    totalCardsInShoe,
    penetration,
    needsShuffle,
    runningCount,
    trueCount,
    setDealerCheckComplete
  } = useBlackjackGame();

  // State for dealer card flip animation
  const [shouldFlipDealerCard, setShouldFlipDealerCard] = useState(false);
  const [dealerHoleCardFlipped, setDealerHoleCardFlipped] = useState(false);
  const [shouldPeekDealerCard, setShouldPeekDealerCard] = useState(false);
  const [isDealerPeeking, setIsDealerPeeking] = useState(false);
  const [hasCheckedForBlackjack, setHasCheckedForBlackjack] = useState(false);

  // Log game state changes for debugging
  useEffect(() => {
    // Removed console logging to prevent infinite loop spam
  }, [gameState, playerCards, dealerCards, waitingForHoleCardFlip, dealerHoleCardFlipped, isDealing]);

  // Reset dealer card states on new game
  useEffect(() => {
    if (gameState.gameStatus === 'betting') {
      setDealerHoleCardFlipped(false);
      setShouldFlipDealerCard(false);
      setShouldPeekDealerCard(false);
      setIsDealerPeeking(false);
      setHasCheckedForBlackjack(false);
    }
  }, [gameState.gameStatus]);

  // Trigger dealer peek when showing 10-value card
  useEffect(() => {
    // Only check when game is playing and dealer has exactly 2 cards
    if (gameState.gameStatus === 'playing' && dealerCards.length === 2 && !shouldPeekDealerCard && !isDealerPeeking && !hasCheckedForBlackjack) {
      const dealerUpCard = dealerCards[0];
      if (dealerUpCard && (dealerUpCard.rank === '10' || dealerUpCard.rank === 'J' || dealerUpCard.rank === 'Q' || dealerUpCard.rank === 'K')) {
        console.log('Dealer showing 10-value card - triggering peek animation');
        setDealerCheckComplete(false); // Reset check state
        setShouldPeekDealerCard(true);
        setIsDealerPeeking(true);
        setHasCheckedForBlackjack(true); // Prevent re-triggering
      }
    }
  }, [gameState.gameStatus, dealerCards, shouldPeekDealerCard, isDealerPeeking, hasCheckedForBlackjack, setDealerCheckComplete]);

  // Check if dealer has blackjack when showing 10
  useEffect(() => {
    if (gameState.gameStatus === 'complete' && dealerCards.length === 2) {
      // Check if this is a dealer blackjack with 10 showing
      const dealerShowingTen = dealerCards[0] && (
        dealerCards[0].rank === '10' || 
        dealerCards[0].rank === 'J' || 
        dealerCards[0].rank === 'Q' || 
        dealerCards[0].rank === 'K'
      );
      
      if (dealerShowingTen && gameState.dealerValue === 21 && !dealerHoleCardFlipped) {
        console.log('Dealer has blackjack with 10 showing - immediately revealing hole card');
        setDealerHoleCardFlipped(true);
      }
    }
  }, [gameState.gameStatus, dealerCards, gameState.dealerValue, dealerHoleCardFlipped]);

  // Trigger dealer card flip when waiting for hole card flip
  useEffect(() => {
    if (waitingForHoleCardFlip && dealerCards.length > 1 && !dealerHoleCardFlipped) {
      console.log('Player stood - triggering dealer hole card flip');
      setShouldFlipDealerCard(true);
    }
  }, [waitingForHoleCardFlip, dealerCards.length, dealerHoleCardFlipped]);

  // Handle dealer card flip completion
  const handleDealerCardFlipped = () => {
    console.log('Dealer card flip animation completed - starting dealer play');
    setShouldFlipDealerCard(false);
    setDealerHoleCardFlipped(true);
    
    // Start dealer play after flip completes
    startDealerPlay();
  };

  // Handle dealer peek completion
  const handleDealerPeekComplete = () => {
    console.log('Dealer peek completed, checking for blackjack...');
    setShouldPeekDealerCard(false);
    
    // Check if dealer has blackjack after peek (need both cards)
    if (dealerCards.length >= 2) {
      const dealerValue = calculateHandValue(dealerCards);
      console.log('Dealer total with both cards:', dealerValue);
      
      if (dealerValue === 21) {
        console.log('Dealer has blackjack - ending game');
        // Dealer has blackjack - flip the hole card and end game
        setTimeout(() => {
          setDealerHoleCardFlipped(true);
        }, 500);
      } else {
        console.log('Dealer does not have blackjack - enabling player actions');
        // No blackjack - enable player actions after a brief delay
        setTimeout(() => {
          setDealerCheckComplete(true);
          console.log('Player actions enabled after dealer check');
        }, 500);
      }
    }
    
    // Reset the peeking state
    setTimeout(() => {
      console.log('Resetting isDealerPeeking to false');
      setIsDealerPeeking(false);
    }, 100);
  };

  return (
    <div className="relative w-full" style={{ height: 'calc(100vh - 73px)' }}>
      {/* 3D Table with dynamic cards and chips */}
      <InteractiveTable 
        playerCards={playerCards}
        dealerCards={dealerCards}
        currentBet={gameState.currentBet}
        shouldFlipDealerCard={shouldFlipDealerCard}
        dealerHoleCardFlipped={dealerHoleCardFlipped}
        onDealerCardFlipped={handleDealerCardFlipped}
        chipStack={chipStack}
        doubleChipStack={doubleChipStack}
        insuranceChipStack={insuranceChipStack}
        splitChipStack={splitChipStack}
        winningsChipStack={winningsChipStack}
        doubleWinningsChipStack={doubleWinningsChipStack}
        showWinningsAnimation={showWinningsAnimation}
        showDoubleWinningsAnimation={showDoubleWinningsAnimation}
        showLossAnimation={showLossAnimation}
        showInsuranceLossAnimation={showInsuranceLossAnimation}
        showDoubleLossAnimation={showDoubleLossAnimation}
        showSplitLossAnimation={showSplitLossAnimation}
        splitPlayerCards={splitPlayerCards}
        gameState={gameState}
        shouldPeekDealerCard={shouldPeekDealerCard}
        onDealerPeekComplete={handleDealerPeekComplete}
      />
      
      {/* Hand Value Displays */}
      {/* Player Hand Value - Below player cards */}
      {playerCards.length > 0 && gameState.handValue > 0 && (
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[35%] pointer-events-none">
          <div className="bg-black bg-opacity-75 text-white px-4 py-2 rounded-lg">
            <div className="text-2xl font-bold text-center">
              {gameState.handValue > 21 ? (
                <span className="text-red-500">BUST ({gameState.handValue})</span>
              ) : gameState.handValue === 21 && playerCards.length === 2 ? (
                <span className="text-yellow-400">BLACKJACK!</span>
              ) : (
                <span>{gameState.handValue}</span>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Dealer Hand Value - Below dealer cards */}
      {dealerCards.length > 0 && (gameState.dealerValue > 0 || isDealerPeeking) && (
        <div className="absolute left-1/2 transform -translate-x-1/2 top-[38%] pointer-events-none">
          <div className="bg-black bg-opacity-75 text-white px-4 py-2 rounded-lg">
            <div className="text-2xl font-bold text-center">
              {isDealerPeeking ? (
                <span className="text-yellow-300">CHECKING FOR BLACKJACK</span>
              ) : gameState.gameStatus === 'playing' && !dealerHoleCardFlipped ? (
                <span>{gameState.dealerValue}</span>
              ) : gameState.dealerValue > 21 ? (
                <span className="text-red-500">BUST ({gameState.dealerValue})</span>
              ) : gameState.dealerValue === 21 && dealerCards.length === 2 ? (
                <span className="text-yellow-400">BLACKJACK!</span>
              ) : (
                <span>{gameState.dealerValue}</span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Current bet amount display under betting circle */}
      {(chipStack.length > 0 || gameState.currentBet > 0) && (
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[30%] pointer-events-none">
          <div className="bg-black bg-opacity-75 text-white px-3 py-1 rounded">
            <div className="text-sm font-bold text-center">
              Bet: ${gameState.currentBet}
              {gameState.insuranceBet > 0 && (
                <div className="text-xs text-blue-300">Insurance: ${gameState.insuranceBet}</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Game UI Overlay */}
      <GameUI
        onHit={onHit}
        onStand={onStand}
        onDouble={onDouble}
        onSplit={onSplit}
        onDeal={onDeal}
        onBet={onBet}
        onClearBet={onClearBet}
        onTakeInsurance={onTakeInsurance}
        onDeclineInsurance={onDeclineInsurance}
        isDealing={isDealing}
        gameState={gameState}
        cardsRemaining={cardsRemaining}
        totalCardsInShoe={totalCardsInShoe}
        penetration={penetration}
        needsShuffle={needsShuffle}
        runningCount={runningCount}
        trueCount={trueCount}
      />
    </div>
  );
}

export default InteractiveGame;