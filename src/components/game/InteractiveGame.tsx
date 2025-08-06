import React, { useEffect, Suspense, useState, useRef } from 'react';
import { BlackjackTable3D } from './BlackjackTable3D';
import GameUI from './GameUI';
import Card3D from './Card3D';
import Chip3D from './Chip3D';
import TestingPanel from './TestingPanel';
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
  doubledHandIndex,
  insuranceChipStack,
  splitChipStack,
  additionalSplitChipStacks,
  winningsChipStack,
  doubleWinningsChipStack,
  splitWinningsChipStack,
  showWinningsAnimation,
  showDoubleWinningsAnimation,
  showSplitWinningsAnimation,
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
  doubledHandIndex: number;
  insuranceChipStack: number[];
  splitChipStack: number[];
  additionalSplitChipStacks: number[][];
  winningsChipStack: number[];
  doubleWinningsChipStack: number[];
  splitWinningsChipStack: number[][];
  showWinningsAnimation: boolean;
  showDoubleWinningsAnimation: boolean;
  showSplitWinningsAnimation: boolean[];
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
          {console.log('Rendering player cards:', {
            isSplit: gameState.isSplit,
            playerCards: playerCards,
            splitPlayerCards: splitPlayerCards,
            gameStatus: gameState.gameStatus
          })}
          {!gameState.isSplit ? (
            // Regular hand
            playerCards.map((card, index) => {
              console.log(`Rendering regular player card ${index}:`, card);
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
                
                // Position split hands side by side (support up to 4 hands)
                const totalHands = splitPlayerCards.length;
                const handPositions = totalHands === 2 ? [-2, 2] : 
                                    totalHands === 3 ? [-3, 0, 3] : 
                                    [-3.5, -1, 1, 3.5]; // Up to 4 hands
                const handOffset = handPositions[handIndex] || 0;
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
        
        {/* Primary betting chips - positioned under first hand */}
        {chipStack.map((chipValue, index) => {
          let xPos = 0;
          if (doubleChipStack.length > 0) xPos = -0.4;
          if (gameState.isSplit) {
            // Use EXACT same positioning as cards
            const totalHands = splitPlayerCards.length;
            const handPositions = totalHands === 2 ? [-2, 2] : 
                                totalHands === 3 ? [-3, 0, 3] : 
                                [-3.5, -1, 1, 3.5]; // Up to 4 hands
            xPos = handPositions[0]; // Position under hand 0 (first hand)
          }
          
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
        
        {/* Split bet chips - positioned under LAST hand when split */}
        {gameState.isSplit && splitPlayerCards.length >= 2 && splitChipStack.map((chipValue, index) => {
          // Use EXACT same positioning as cards
          const totalHands = splitPlayerCards.length;
          const handPositions = totalHands === 2 ? [-2, 2] : 
                              totalHands === 3 ? [-3, 0, 3] : 
                              [-3.5, -1, 1, 3.5]; // Up to 4 hands
          const lastHandIndex = totalHands - 1;
          const xPos = handPositions[lastHandIndex]; // Position under LAST hand (rightmost)
          
          return showSplitLossAnimation ? (
            <AnimatedChip 
              key={`split-chip-${index}`}
              position={[xPos, 2.14 + (index * 0.03), 3.5]}
              value={chipValue}
              isLoss={true}
              showAnimation={showSplitLossAnimation}
            />
          ) : (
            <Chip3D 
              key={`split-chip-${index}`}
              position={[xPos, 2.14 + (index * 0.03), 3.5]}
              value={chipValue} 
            />
          );
        })}
        
        {/* Additional split bet chips - positioned under hands 2+ */}
        {gameState.isSplit && additionalSplitChipStacks.map((chipStack, stackIndex) => {
          // Use EXACT same positioning as cards
          const totalHands = splitPlayerCards.length;
          const handPositions = totalHands === 2 ? [-2, 2] : 
                              totalHands === 3 ? [-3, 0, 3] : 
                              [-3.5, -1, 1, 3.5]; // Up to 4 hands
          
          // Additional chip stacks fill the middle hands (between first and last)
          // For 3 hands: stackIndex 0 maps to middle hand (index 1)
          // For 4 hands: stackIndex 0 maps to hand 1, stackIndex 1 maps to hand 2
          const handIndex = stackIndex + 1; // Middle hands start at index 1
          const xPos = handPositions[handIndex];
          
          console.log(`Rendering additional chip stack ${stackIndex} for hand ${handIndex} at position ${xPos}`);
          
          return chipStack.map((chipValue, chipIndex) => (
            <Chip3D 
              key={`additional-split-${stackIndex}-chip-${chipIndex}`}
              position={[xPos, 2.14 + (chipIndex * 0.03), 3.5]}
              value={chipValue} 
            />
          ));
        })}
        
        {/* Double bet chips - positioned based on which hand was doubled */}
        {doubleChipStack.map((chipValue, index) => {
          // Calculate position based on doubled hand index
          let xPos = 0.4; // Default position for regular hands
          if (gameState.isSplit && doubledHandIndex >= 0) {
            // For split hands: position next to the doubled hand's bet
            xPos = doubledHandIndex === 0 ? -1.6 : 2.4; // Next to left (-2) or right (+2) hand
          }
          
          return showDoubleLossAnimation ? (
            <AnimatedChip 
              key={`double-chip-${index}`}
              position={[xPos, 2.14 + (index * 0.03), 3.5]}
              value={chipValue}
              isLoss={true}
              showAnimation={showDoubleLossAnimation}
            />
          ) : (
            <Chip3D 
              key={`double-chip-${index}`}
              position={[xPos, 2.14 + (index * 0.03), 3.5]}
              value={chipValue} 
            />
          );
        })}
        
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
        
        {/* Split hand winnings chips - positioned next to each split hand's bet */}
        {gameState.isSplit && splitWinningsChipStack.map((handChips, handIndex) => 
          handChips.map((chipValue, chipIndex) => {
            // Position winnings next to each hand's bet: left hand at -2, right hand at +2
            const xPos = handIndex === 0 ? -1.2 : 2.8; // Left of left bet, right of right bet
            return (
              <AnimatedChip 
                key={`split-winnings-${handIndex}-chip-${chipIndex}`}
                position={[xPos, 2.14 + (chipIndex * 0.03), 3.5]}
                value={chipValue}
                isWinning={true}
                showAnimation={showSplitWinningsAnimation[handIndex]}
              />
            );
          })
        )}
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
    onSurrender,
    onTakeInsurance,
    onDeclineInsurance,
    onTakeEvenMoney,
    onDeclineEvenMoney,
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
    additionalSplitChipStacks,
    doubledHandIndex,
    winningsChipStack,
    doubleWinningsChipStack,
    splitWinningsChipStack,
    showWinningsAnimation,
    showDoubleWinningsAnimation,
    showSplitWinningsAnimation,
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
    setDealerCheckComplete,
    handleDealerBlackjack,
    isTestingMode,
    toggleTestingMode,
    applyTestCards,
    clearTestCards,
    applyTestCardsAndDeal
  } = useBlackjackGame();

  // State for dealer card flip animation
  const [shouldFlipDealerCard, setShouldFlipDealerCard] = useState(false);
  const [dealerHoleCardFlipped, setDealerHoleCardFlipped] = useState(false);
  const [shouldPeekDealerCard, setShouldPeekDealerCard] = useState(false);
  const [isDealerPeeking, setIsDealerPeeking] = useState(false);
  const [hasCheckedForBlackjack, setHasCheckedForBlackjack] = useState(false);
  const [showNoBlackjackMessage, setShowNoBlackjackMessage] = useState(false);

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
      setShowNoBlackjackMessage(false);
    }
  }, [gameState.gameStatus]);

  // Trigger dealer peek when showing 10-value card or Ace (after insurance declined)
  useEffect(() => {
    // Only check when game is playing and dealer has exactly 2 cards
    if (gameState.gameStatus === 'playing' && dealerCards.length === 2 && !shouldPeekDealerCard && !isDealerPeeking && !hasCheckedForBlackjack) {
      const dealerUpCard = dealerCards[0];
      if (dealerUpCard && (
        // 10-value cards (immediate peek)
        dealerUpCard.rank === '10' || dealerUpCard.rank === 'J' || dealerUpCard.rank === 'Q' || dealerUpCard.rank === 'K' ||
        // Ace (only peek after insurance is declined, not automatically)
        (dealerUpCard.rank === 'A' && gameState.insuranceBet === 0 && gameState.gameStatus === 'playing')
      )) {
        console.log('Dealer showing peek-worthy card - triggering peek animation');
        setDealerCheckComplete(false); // Reset check state
        setShouldPeekDealerCard(true);
        setIsDealerPeeking(true);
        setHasCheckedForBlackjack(true); // Prevent re-triggering
      }
    }
  }, [gameState.gameStatus, gameState.insuranceBet, dealerCards, shouldPeekDealerCard, isDealerPeeking, hasCheckedForBlackjack, setDealerCheckComplete]);

  // Check if dealer has blackjack when showing 10 or Ace
  useEffect(() => {
    if (gameState.gameStatus === 'complete' && dealerCards.length === 2) {
      // Check if this is a dealer blackjack with 10 or Ace showing
      const dealerShowingBlackjackCard = dealerCards[0] && (
        dealerCards[0].rank === '10' || 
        dealerCards[0].rank === 'J' || 
        dealerCards[0].rank === 'Q' || 
        dealerCards[0].rank === 'K' ||
        dealerCards[0].rank === 'A'
      );
      
      if (dealerShowingBlackjackCard && gameState.dealerValue === 21 && !dealerHoleCardFlipped) {
        console.log('Dealer has blackjack - immediately revealing hole card');
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
    
    // Check if dealer has blackjack after peek using the hook function
    const hasBlackjack = handleDealerBlackjack();
    
    if (hasBlackjack) {
      console.log('Dealer has blackjack - game ended by hook');
      // Flip the hole card to show the blackjack
      setTimeout(() => {
        setDealerHoleCardFlipped(true);
      }, 500);
    } else {
      console.log('Dealer does not have blackjack - showing message');
      // Show "no blackjack" message first
      setShowNoBlackjackMessage(true);
      
      // After showing the message, enable player actions
      setTimeout(() => {
        setShowNoBlackjackMessage(false);
        setDealerCheckComplete(true);
        console.log('Player actions enabled after dealer check');
      }, 2000); // Show message for 2 seconds
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
        doubledHandIndex={doubledHandIndex}
        insuranceChipStack={insuranceChipStack}
        splitChipStack={splitChipStack}
        additionalSplitChipStacks={additionalSplitChipStacks}
        winningsChipStack={winningsChipStack}
        doubleWinningsChipStack={doubleWinningsChipStack}
        splitWinningsChipStack={splitWinningsChipStack}
        showWinningsAnimation={showWinningsAnimation}
        showDoubleWinningsAnimation={showDoubleWinningsAnimation}
        showSplitWinningsAnimation={showSplitWinningsAnimation}
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
      {dealerCards.length > 0 && (gameState.dealerValue > 0 || isDealerPeeking || showNoBlackjackMessage) && (
        <div className="absolute left-1/2 transform -translate-x-1/2 top-[38%] pointer-events-none">
          <div className="bg-black bg-opacity-75 text-white px-4 py-2 rounded-lg">
            <div className="text-2xl font-bold text-center">
              {isDealerPeeking ? (
                <span className="text-yellow-300">CHECKING FOR BLACKJACK</span>
              ) : showNoBlackjackMessage ? (
                <span className="text-green-400">DEALER DOES NOT HAVE BLACKJACK</span>
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
      {(chipStack.length > 0 || gameState.currentBet > 0) && !gameState.isSplit && (
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

      {/* Split hand bet displays - show numbered bets for each hand */}
      {gameState.isSplit && gameState.currentBet > 0 && splitPlayerCards.map((hand, handIndex) => {
        // Use EXACT same positioning as cards and chips
        const totalHands = splitPlayerCards.length;
        const handPositions = totalHands === 2 ? [-2, 2] : 
                            totalHands === 3 ? [-3, 0, 3] : 
                            [-3.5, -1, 1, 3.5]; // Up to 4 hands
        const xPos = handPositions[handIndex];
        
        // Calculate bet amount for this hand
        const baseBetPerHand = gameState.currentBet / totalHands;
        const isDoubled = doubledHandIndex === handIndex;
        const betAmount = isDoubled ? baseBetPerHand * 2 : baseBetPerHand;
        
        // Convert 3D table position to screen position
        // Increase scale factor significantly to spread labels out
        const screenOffsetX = xPos * 80; // Increased scale factor for proper spacing
        
        return (
          <div 
            key={`hand-${handIndex}-bet-label`}
            className="absolute left-1/2 bottom-[30%] pointer-events-none"
            style={{ transform: `translate(${screenOffsetX}px, 0)` }}
          >
            <div className="bg-black bg-opacity-75 text-white px-3 py-1 rounded">
              <div className="text-sm font-bold text-center">
                Hand {totalHands - handIndex}: ${Math.round(betAmount)}
              </div>
            </div>
          </div>
        );
      })}

      {/* Game UI Overlay */}
      <GameUI
        onHit={onHit}
        onStand={onStand}
        onDouble={onDouble}
        onSplit={onSplit}
        onSurrender={onSurrender}
        onDeal={onDeal}
        onBet={onBet}
        onClearBet={onClearBet}
        onTakeInsurance={onTakeInsurance}
        onDeclineInsurance={onDeclineInsurance}
        onTakeEvenMoney={onTakeEvenMoney}
        onDeclineEvenMoney={onDeclineEvenMoney}
        isDealing={isDealing}
        gameState={gameState}
        cardsRemaining={cardsRemaining}
        totalCardsInShoe={totalCardsInShoe}
        penetration={penetration}
        needsShuffle={needsShuffle}
        runningCount={runningCount}
        trueCount={trueCount}
        isTestingMode={isTestingMode}
        onToggleTestingMode={toggleTestingMode}
      />
      <TestingPanel
        isTestingMode={isTestingMode}
        onToggleTestingMode={toggleTestingMode}
        onApplyTestCards={applyTestCards}
        onClearTestCards={clearTestCards}
        onApplyTestCardsAndDeal={applyTestCardsAndDeal}
        bankroll={gameState.bankroll}
      />
    </div>
  );
}

export default InteractiveGame;