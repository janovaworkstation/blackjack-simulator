### Place error log here and refer to it from the prompt.
Run npm test -- --watchAll=false

> blackjack-simulator@1.0.0 test
> jest --watchAll=false

PASS src/utils/__tests__/BlackjackEngine.test.ts
PASS src/components/__tests__/HandDetailsTable.test.tsx
PASS src/hooks/__tests__/useSimulation.test.ts
PASS src/components/__tests__/ResultsPanel.test.tsx
PASS src/components/__tests__/BettingTable.test.tsx
PASS src/components/__tests__/ConfigurationPanel.test.tsx
FAIL src/hooks/__tests__/useBlackjackGame.test.ts
  ● Console

    console.log
      onDeal called with gameStatus: betting currentBet: 25

      at Object.log [as onDeal] (src/hooks/useBlackjackGame.ts:572:13)

    console.log
      Created and shuffled 6-deck shoe with 312 cards

      at log (src/hooks/useBlackjackGame.ts:163:13)

    console.log
      Initialized new shoe, length: 312

      at Object.log [as onDeal] (src/hooks/useBlackjackGame.ts:580:17)

    console.log
      Creating new shoe due to: penetration reached

      at log (src/hooks/useBlackjackGame.ts:236:15)

    console.log
      Created and shuffled 6-deck shoe with 312 cards

      at log (src/hooks/useBlackjackGame.ts:163:13)

    console.log
      onDeal called with gameStatus: betting currentBet: 0

      at Object.log [as onDeal] (src/hooks/useBlackjackGame.ts:572:13)

    console.log
      onDeal called with gameStatus: betting currentBet: 25

      at Object.log [as onDeal] (src/hooks/useBlackjackGame.ts:572:13)

    console.log
      Created and shuffled 6-deck shoe with 312 cards

      at log (src/hooks/useBlackjackGame.ts:163:13)

    console.log
      Initialized new shoe, length: 312

      at Object.log [as onDeal] (src/hooks/useBlackjackGame.ts:580:17)

    console.log
      Creating new shoe due to: penetration reached

      at log (src/hooks/useBlackjackGame.ts:236:15)

    console.log
      Created and shuffled 6-deck shoe with 312 cards

      at log (src/hooks/useBlackjackGame.ts:163:13)

    console.log
      onDeal called with gameStatus: betting currentBet: 25

      at Object.log [as onDeal] (src/hooks/useBlackjackGame.ts:572:13)

    console.log
      Created and shuffled 6-deck shoe with 312 cards

      at log (src/hooks/useBlackjackGame.ts:163:13)

    console.log
      Initialized new shoe, length: 312

      at Object.log [as onDeal] (src/hooks/useBlackjackGame.ts:580:17)

    console.log
      Creating new shoe due to: penetration reached

      at log (src/hooks/useBlackjackGame.ts:236:15)

    console.log
      Created and shuffled 6-deck shoe with 312 cards

      at log (src/hooks/useBlackjackGame.ts:163:13)

    console.log
      onDeal called with gameStatus: betting currentBet: 25

      at Object.log [as onDeal] (src/hooks/useBlackjackGame.ts:572:13)

    console.log
      Created and shuffled 6-deck shoe with 312 cards

      at log (src/hooks/useBlackjackGame.ts:163:13)

    console.log
      Initialized new shoe, length: 312

      at Object.log [as onDeal] (src/hooks/useBlackjackGame.ts:580:17)

    console.log
      Creating new shoe due to: penetration reached

      at log (src/hooks/useBlackjackGame.ts:236:15)

    console.log
      Created and shuffled 6-deck shoe with 312 cards

      at log (src/hooks/useBlackjackGame.ts:163:13)

  ● useBlackjackGame Hook › should deal cards when onDeal is called

    expect(received).toBe(expected) // Object.is equality

    Expected: "playing"
    Received: "betting"

      64 |     });
      65 |     
    > 66 |     expect(result.current.gameState.gameStatus).toBe('playing');
         |                                                 ^
      67 |     expect(result.current.gameState.playerHand).toHaveLength(2);
      68 |     expect(result.current.gameState.dealerHand).toHaveLength(2);
      69 |     expect(result.current.gameState.handValue).toBeGreaterThan(0);

      at Object.<anonymous> (src/hooks/__tests__/useBlackjackGame.test.ts:66:49)

  ● useBlackjackGame Hook › should handle hit action

    expect(received).toBe(expected) // Object.is equality

    Expected: 1
    Received: 2

      100 |     });
      101 |     
    > 102 |     expect(result.current.gameState.playerHand.length).toBe(initialHandSize + 1);
          |                                                        ^
      103 |   });
      104 |
      105 |   it('should reset game correctly for new hand', () => {

      at Object.<anonymous> (src/hooks/__tests__/useBlackjackGame.test.ts:102:56)

  ● useBlackjackGame Hook › should reset game correctly for new hand

    expect(received).toBe(expected) // Object.is equality

    Expected: "complete"
    Received: "dealer-playing"

      120 |     });
      121 |     
    > 122 |     expect(result.current.gameState.gameStatus).toBe('complete');
          |                                                 ^
      123 |     
      124 |     // Start new hand
      125 |     act(() => {

      at Object.<anonymous> (src/hooks/__tests__/useBlackjackGame.test.ts:122:49)

  ● useBlackjackGame Hook › should handle component and card states

    expect(received).toBe(expected) // Object.is equality

    Expected: 2
    Received: 1

      147 |     });
      148 |     
    > 149 |     expect(result.current.playerCards.length).toBe(2);
          |                                               ^
      150 |     expect(result.current.dealerCards.length).toBe(2);
      151 |   });
      152 | });

      at Object.<anonymous> (src/hooks/__tests__/useBlackjackGame.test.ts:149:47)

PASS src/components/game/__tests__/GameUI.test.tsx
FAIL src/components/game/__tests__/Card3D.test.tsx
  ● Console

    console.error
      Card3D: Missing rank or suit! { rank: undefined, suit: undefined }

      29 |   // Add safety check
      30 |   if (!rank || !suit) {
    > 31 |     console.error('Card3D: Missing rank or suit!', { rank, suit });
         |             ^
      32 |     return null;
      33 |   }
      34 |   

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at error (src/components/game/Card3D.tsx:31:13)
      at src/components/game/__tests__/Card3D.test.tsx:11:13
      at Object.<anonymous> (node_modules/expect/build/index.js:1824:9)
      at Object.throwingMatcher [as toThrow] (node_modules/expect/build/index.js:2235:93)
      at Object.<anonymous> (src/components/game/__tests__/Card3D.test.tsx:12:12)

    console.error
      Card3D: Missing rank or suit! { rank: undefined, suit: undefined }

      29 |   // Add safety check
      30 |   if (!rank || !suit) {
    > 31 |     console.error('Card3D: Missing rank or suit!', { rank, suit });
         |             ^
      32 |     return null;
      33 |   }
      34 |   

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at error (src/components/game/Card3D.tsx:31:13)
      at src/components/game/__tests__/Card3D.test.tsx:18:13
      at Object.<anonymous> (node_modules/expect/build/index.js:1824:9)
      at Object.throwingMatcher [as toThrow] (node_modules/expect/build/index.js:2235:93)
      at Object.<anonymous> (src/components/game/__tests__/Card3D.test.tsx:19:12)

    console.log
      Card3D: Converting K of Hearts to KH

      at log (src/components/game/Card3D.tsx:64:13)

    console.log
      Card3D: Final image path for K of Hearts: /cards/KH.png

      at log (src/components/game/Card3D.tsx:74:11)

    console.error
      Warning: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
      1. You might have mismatching versions of React and the renderer (such as React DOM)
      2. You might be breaking the Rules of Hooks
      3. You might have more than one copy of React in the same app
      See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.

      75 |   
      76 |   // Alternative texture loading approach to debug the issue
    > 77 |   const [customTexture, setCustomTexture] = useState<THREE.Texture | null>(null);
         |                                                     ^
      78 |   
      79 |   useEffect(() => {
      80 |     console.log(`Card3D: Loading texture for ${rank} of ${suit} from:`, finalImagePath);

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at printWarning (node_modules/react/cjs/react.development.js:209:30)
      at error (node_modules/react/cjs/react.development.js:183:7)
      at resolveDispatcher (node_modules/react/cjs/react.development.js:1592:7)
      at useState (node_modules/react/cjs/react.development.js:1621:20)
      at Card3D (src/components/game/Card3D.tsx:77:53)
      at src/components/game/__tests__/Card3D.test.tsx:24:13
      at Object.<anonymous> (node_modules/expect/build/index.js:1824:9)
      at Object.throwingMatcher [as toThrow] (node_modules/expect/build/index.js:2235:93)
      at Object.<anonymous> (src/components/game/__tests__/Card3D.test.tsx:30:12)

    console.error
      Card3D: Missing rank or suit! { rank: undefined, suit: undefined }

      29 |   // Add safety check
      30 |   if (!rank || !suit) {
    > 31 |     console.error('Card3D: Missing rank or suit!', { rank, suit });
         |             ^
      32 |     return null;
      33 |   }
      34 |   

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at error (src/components/game/Card3D.tsx:31:13)
      at src/components/game/__tests__/Card3D.test.tsx:35:13
      at Object.<anonymous> (node_modules/expect/build/index.js:1824:9)
      at Object.throwingMatcher [as toThrow] (node_modules/expect/build/index.js:2235:93)
      at Object.<anonymous> (src/components/game/__tests__/Card3D.test.tsx:39:12)

    console.error
      Card3D: Missing rank or suit! { rank: undefined, suit: 'Hearts' }

      29 |   // Add safety check
      30 |   if (!rank || !suit) {
    > 31 |     console.error('Card3D: Missing rank or suit!', { rank, suit });
         |             ^
      32 |     return null;
      33 |   }
      34 |   

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at error (src/components/game/Card3D.tsx:31:13)
      at src/components/game/__tests__/Card3D.test.tsx:46:15
      at Object.<anonymous> (node_modules/expect/build/index.js:1824:9)
      at Object.throwingMatcher [as toThrow] (node_modules/expect/build/index.js:2235:93)
      at src/components/game/__tests__/Card3D.test.tsx:51:14
          at Array.forEach (<anonymous>)
      at Object.<anonymous> (src/components/game/__tests__/Card3D.test.tsx:44:11)

    console.error
      Card3D: Missing rank or suit! { rank: undefined, suit: 'Diamonds' }

      29 |   // Add safety check
      30 |   if (!rank || !suit) {
    > 31 |     console.error('Card3D: Missing rank or suit!', { rank, suit });
         |             ^
      32 |     return null;
      33 |   }
      34 |   

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at error (src/components/game/Card3D.tsx:31:13)
      at src/components/game/__tests__/Card3D.test.tsx:46:15
      at Object.<anonymous> (node_modules/expect/build/index.js:1824:9)
      at Object.throwingMatcher [as toThrow] (node_modules/expect/build/index.js:2235:93)
      at src/components/game/__tests__/Card3D.test.tsx:51:14
          at Array.forEach (<anonymous>)
      at Object.<anonymous> (src/components/game/__tests__/Card3D.test.tsx:44:11)

    console.error
      Card3D: Missing rank or suit! { rank: undefined, suit: 'Clubs' }

      29 |   // Add safety check
      30 |   if (!rank || !suit) {
    > 31 |     console.error('Card3D: Missing rank or suit!', { rank, suit });
         |             ^
      32 |     return null;
      33 |   }
      34 |   

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at error (src/components/game/Card3D.tsx:31:13)
      at src/components/game/__tests__/Card3D.test.tsx:46:15
      at Object.<anonymous> (node_modules/expect/build/index.js:1824:9)
      at Object.throwingMatcher [as toThrow] (node_modules/expect/build/index.js:2235:93)
      at src/components/game/__tests__/Card3D.test.tsx:51:14
          at Array.forEach (<anonymous>)
      at Object.<anonymous> (src/components/game/__tests__/Card3D.test.tsx:44:11)

    console.error
      Card3D: Missing rank or suit! { rank: undefined, suit: 'Spades' }

      29 |   // Add safety check
      30 |   if (!rank || !suit) {
    > 31 |     console.error('Card3D: Missing rank or suit!', { rank, suit });
         |             ^
      32 |     return null;
      33 |   }
      34 |   

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at error (src/components/game/Card3D.tsx:31:13)
      at src/components/game/__tests__/Card3D.test.tsx:46:15
      at Object.<anonymous> (node_modules/expect/build/index.js:1824:9)
      at Object.throwingMatcher [as toThrow] (node_modules/expect/build/index.js:2235:93)
      at src/components/game/__tests__/Card3D.test.tsx:51:14
          at Array.forEach (<anonymous>)
      at Object.<anonymous> (src/components/game/__tests__/Card3D.test.tsx:44:11)

    console.error
      Card3D: Missing rank or suit! { rank: 'A', suit: undefined }

      29 |   // Add safety check
      30 |   if (!rank || !suit) {
    > 31 |     console.error('Card3D: Missing rank or suit!', { rank, suit });
         |             ^
      32 |     return null;
      33 |   }
      34 |   

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at error (src/components/game/Card3D.tsx:31:13)
      at src/components/game/__tests__/Card3D.test.tsx:59:15
      at Object.<anonymous> (node_modules/expect/build/index.js:1824:9)
      at Object.throwingMatcher [as toThrow] (node_modules/expect/build/index.js:2235:93)
      at src/components/game/__tests__/Card3D.test.tsx:64:14
          at Array.forEach (<anonymous>)
      at Object.<anonymous> (src/components/game/__tests__/Card3D.test.tsx:57:11)

    console.error
      Card3D: Missing rank or suit! { rank: '2', suit: undefined }

      29 |   // Add safety check
      30 |   if (!rank || !suit) {
    > 31 |     console.error('Card3D: Missing rank or suit!', { rank, suit });
         |             ^
      32 |     return null;
      33 |   }
      34 |   

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at error (src/components/game/Card3D.tsx:31:13)
      at src/components/game/__tests__/Card3D.test.tsx:59:15
      at Object.<anonymous> (node_modules/expect/build/index.js:1824:9)
      at Object.throwingMatcher [as toThrow] (node_modules/expect/build/index.js:2235:93)
      at src/components/game/__tests__/Card3D.test.tsx:64:14
          at Array.forEach (<anonymous>)
      at Object.<anonymous> (src/components/game/__tests__/Card3D.test.tsx:57:11)

    console.error
      Card3D: Missing rank or suit! { rank: '3', suit: undefined }

      29 |   // Add safety check
      30 |   if (!rank || !suit) {
    > 31 |     console.error('Card3D: Missing rank or suit!', { rank, suit });
         |             ^
      32 |     return null;
      33 |   }
      34 |   

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at error (src/components/game/Card3D.tsx:31:13)
      at src/components/game/__tests__/Card3D.test.tsx:59:15
      at Object.<anonymous> (node_modules/expect/build/index.js:1824:9)
      at Object.throwingMatcher [as toThrow] (node_modules/expect/build/index.js:2235:93)
      at src/components/game/__tests__/Card3D.test.tsx:64:14
          at Array.forEach (<anonymous>)
      at Object.<anonymous> (src/components/game/__tests__/Card3D.test.tsx:57:11)

    console.error
      Card3D: Missing rank or suit! { rank: '4', suit: undefined }

      29 |   // Add safety check
      30 |   if (!rank || !suit) {
    > 31 |     console.error('Card3D: Missing rank or suit!', { rank, suit });
         |             ^
      32 |     return null;
      33 |   }
      34 |   

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at error (src/components/game/Card3D.tsx:31:13)
      at src/components/game/__tests__/Card3D.test.tsx:59:15
      at Object.<anonymous> (node_modules/expect/build/index.js:1824:9)
      at Object.throwingMatcher [as toThrow] (node_modules/expect/build/index.js:2235:93)
      at src/components/game/__tests__/Card3D.test.tsx:64:14
          at Array.forEach (<anonymous>)
      at Object.<anonymous> (src/components/game/__tests__/Card3D.test.tsx:57:11)

    console.error
      Card3D: Missing rank or suit! { rank: '5', suit: undefined }

      29 |   // Add safety check
      30 |   if (!rank || !suit) {
    > 31 |     console.error('Card3D: Missing rank or suit!', { rank, suit });
         |             ^
      32 |     return null;
      33 |   }
      34 |   

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at error (src/components/game/Card3D.tsx:31:13)
      at src/components/game/__tests__/Card3D.test.tsx:59:15
      at Object.<anonymous> (node_modules/expect/build/index.js:1824:9)
      at Object.throwingMatcher [as toThrow] (node_modules/expect/build/index.js:2235:93)
      at src/components/game/__tests__/Card3D.test.tsx:64:14
          at Array.forEach (<anonymous>)
      at Object.<anonymous> (src/components/game/__tests__/Card3D.test.tsx:57:11)

    console.error
      Card3D: Missing rank or suit! { rank: '6', suit: undefined }

      29 |   // Add safety check
      30 |   if (!rank || !suit) {
    > 31 |     console.error('Card3D: Missing rank or suit!', { rank, suit });
         |             ^
      32 |     return null;
      33 |   }
      34 |   

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at error (src/components/game/Card3D.tsx:31:13)
      at src/components/game/__tests__/Card3D.test.tsx:59:15
      at Object.<anonymous> (node_modules/expect/build/index.js:1824:9)
      at Object.throwingMatcher [as toThrow] (node_modules/expect/build/index.js:2235:93)
      at src/components/game/__tests__/Card3D.test.tsx:64:14
          at Array.forEach (<anonymous>)
      at Object.<anonymous> (src/components/game/__tests__/Card3D.test.tsx:57:11)

    console.error
      Card3D: Missing rank or suit! { rank: '7', suit: undefined }

      29 |   // Add safety check
      30 |   if (!rank || !suit) {
    > 31 |     console.error('Card3D: Missing rank or suit!', { rank, suit });
         |             ^
      32 |     return null;
      33 |   }
      34 |   

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at error (src/components/game/Card3D.tsx:31:13)
      at src/components/game/__tests__/Card3D.test.tsx:59:15
      at Object.<anonymous> (node_modules/expect/build/index.js:1824:9)
      at Object.throwingMatcher [as toThrow] (node_modules/expect/build/index.js:2235:93)
      at src/components/game/__tests__/Card3D.test.tsx:64:14
          at Array.forEach (<anonymous>)
      at Object.<anonymous> (src/components/game/__tests__/Card3D.test.tsx:57:11)

    console.error
      Card3D: Missing rank or suit! { rank: '8', suit: undefined }

      29 |   // Add safety check
      30 |   if (!rank || !suit) {
    > 31 |     console.error('Card3D: Missing rank or suit!', { rank, suit });
         |             ^
      32 |     return null;
      33 |   }
      34 |   

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at error (src/components/game/Card3D.tsx:31:13)
      at src/components/game/__tests__/Card3D.test.tsx:59:15
      at Object.<anonymous> (node_modules/expect/build/index.js:1824:9)
      at Object.throwingMatcher [as toThrow] (node_modules/expect/build/index.js:2235:93)
      at src/components/game/__tests__/Card3D.test.tsx:64:14
          at Array.forEach (<anonymous>)
      at Object.<anonymous> (src/components/game/__tests__/Card3D.test.tsx:57:11)

    console.error
      Card3D: Missing rank or suit! { rank: '9', suit: undefined }

      29 |   // Add safety check
      30 |   if (!rank || !suit) {
    > 31 |     console.error('Card3D: Missing rank or suit!', { rank, suit });
         |             ^
      32 |     return null;
      33 |   }
      34 |   

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at error (src/components/game/Card3D.tsx:31:13)
      at src/components/game/__tests__/Card3D.test.tsx:59:15
      at Object.<anonymous> (node_modules/expect/build/index.js:1824:9)
      at Object.throwingMatcher [as toThrow] (node_modules/expect/build/index.js:2235:93)
      at src/components/game/__tests__/Card3D.test.tsx:64:14
          at Array.forEach (<anonymous>)
      at Object.<anonymous> (src/components/game/__tests__/Card3D.test.tsx:57:11)

    console.error
      Card3D: Missing rank or suit! { rank: '10', suit: undefined }

      29 |   // Add safety check
      30 |   if (!rank || !suit) {
    > 31 |     console.error('Card3D: Missing rank or suit!', { rank, suit });
         |             ^
      32 |     return null;
      33 |   }
      34 |   

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at error (src/components/game/Card3D.tsx:31:13)
      at src/components/game/__tests__/Card3D.test.tsx:59:15
      at Object.<anonymous> (node_modules/expect/build/index.js:1824:9)
      at Object.throwingMatcher [as toThrow] (node_modules/expect/build/index.js:2235:93)
      at src/components/game/__tests__/Card3D.test.tsx:64:14
          at Array.forEach (<anonymous>)
      at Object.<anonymous> (src/components/game/__tests__/Card3D.test.tsx:57:11)

    console.error
      Card3D: Missing rank or suit! { rank: 'J', suit: undefined }

      29 |   // Add safety check
      30 |   if (!rank || !suit) {
    > 31 |     console.error('Card3D: Missing rank or suit!', { rank, suit });
         |             ^
      32 |     return null;
      33 |   }
      34 |   

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at error (src/components/game/Card3D.tsx:31:13)
      at src/components/game/__tests__/Card3D.test.tsx:59:15
      at Object.<anonymous> (node_modules/expect/build/index.js:1824:9)
      at Object.throwingMatcher [as toThrow] (node_modules/expect/build/index.js:2235:93)
      at src/components/game/__tests__/Card3D.test.tsx:64:14
          at Array.forEach (<anonymous>)
      at Object.<anonymous> (src/components/game/__tests__/Card3D.test.tsx:57:11)

    console.error
      Card3D: Missing rank or suit! { rank: 'Q', suit: undefined }

      29 |   // Add safety check
      30 |   if (!rank || !suit) {
    > 31 |     console.error('Card3D: Missing rank or suit!', { rank, suit });
         |             ^
      32 |     return null;
      33 |   }
      34 |   

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at error (src/components/game/Card3D.tsx:31:13)
      at src/components/game/__tests__/Card3D.test.tsx:59:15
      at Object.<anonymous> (node_modules/expect/build/index.js:1824:9)
      at Object.throwingMatcher [as toThrow] (node_modules/expect/build/index.js:2235:93)
      at src/components/game/__tests__/Card3D.test.tsx:64:14
          at Array.forEach (<anonymous>)
      at Object.<anonymous> (src/components/game/__tests__/Card3D.test.tsx:57:11)

    console.error
      Card3D: Missing rank or suit! { rank: 'K', suit: undefined }

      29 |   // Add safety check
      30 |   if (!rank || !suit) {
    > 31 |     console.error('Card3D: Missing rank or suit!', { rank, suit });
         |             ^
      32 |     return null;
      33 |   }
      34 |   

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at error (src/components/game/Card3D.tsx:31:13)
      at src/components/game/__tests__/Card3D.test.tsx:59:15
      at Object.<anonymous> (node_modules/expect/build/index.js:1824:9)
      at Object.throwingMatcher [as toThrow] (node_modules/expect/build/index.js:2235:93)
      at src/components/game/__tests__/Card3D.test.tsx:64:14
          at Array.forEach (<anonymous>)
      at Object.<anonymous> (src/components/game/__tests__/Card3D.test.tsx:57:11)

    console.error
      Card3D: Missing rank or suit! { rank: undefined, suit: undefined }

      29 |   // Add safety check
      30 |   if (!rank || !suit) {
    > 31 |     console.error('Card3D: Missing rank or suit!', { rank, suit });
         |             ^
      32 |     return null;
      33 |   }
      34 |   

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at error (src/components/game/Card3D.tsx:31:13)
      at src/components/game/__tests__/Card3D.test.tsx:70:13
      at Object.<anonymous> (node_modules/expect/build/index.js:1824:9)
      at Object.throwingMatcher [as toThrow] (node_modules/expect/build/index.js:2235:93)
      at Object.<anonymous> (src/components/game/__tests__/Card3D.test.tsx:71:12)

  ● Card3D Component › should accept rank and suit props

    expect(received).not.toThrow()

    Error name:    "TypeError"
    Error message: "Cannot read properties of null (reading 'useState')"

          75 |   
          76 |   // Alternative texture loading approach to debug the issue
        > 77 |   const [customTexture, setCustomTexture] = useState<THREE.Texture | null>(null);
             |                                                     ^
          78 |   
          79 |   useEffect(() => {
          80 |     console.log(`Card3D: Loading texture for ${rank} of ${suit} from:`, finalImagePath);

      at useState (node_modules/react/cjs/react.development.js:1622:21)
      at Card3D (src/components/game/Card3D.tsx:77:53)
      at src/components/game/__tests__/Card3D.test.tsx:24:13
      at Object.<anonymous> (node_modules/expect/build/index.js:1824:9)
      at Object.throwingMatcher [as toThrow] (node_modules/expect/build/index.js:2235:93)
      at Object.<anonymous> (src/components/game/__tests__/Card3D.test.tsx:30:12)
      at Object.<anonymous> (src/components/game/__tests__/Card3D.test.tsx:30:12)

FAIL src/components/game/__tests__/Chip3D.test.tsx
  ● Console

    console.error
      Warning: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
      1. You might have mismatching versions of React and the renderer (such as React DOM)
      2. You might be breaking the Rules of Hooks
      3. You might have more than one copy of React in the same app
      See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.

      30 |   
      31 |   // Load chip texture
    > 32 |   const [chipTexture, setChipTexture] = useState<THREE.Texture | null>(null);
         |                                                 ^
      33 |   const [textureLoading, setTextureLoading] = useState(true);
      34 |   
      35 |   useEffect(() => {

      at printWarning (node_modules/react/cjs/react.development.js:209:30)
      at error (node_modules/react/cjs/react.development.js:183:7)
      at resolveDispatcher (node_modules/react/cjs/react.development.js:1592:7)
      at useState (node_modules/react/cjs/react.development.js:1621:20)
      at Chip3D (src/components/game/Chip3D.tsx:32:49)
      at src/components/game/__tests__/Chip3D.test.tsx:11:13
      at Object.<anonymous> (node_modules/expect/build/index.js:1824:9)
      at Object.throwingMatcher [as toThrow] (node_modules/expect/build/index.js:2235:93)
      at Object.<anonymous> (src/components/game/__tests__/Chip3D.test.tsx:12:12)

    console.error
      Warning: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
      1. You might have mismatching versions of React and the renderer (such as React DOM)
      2. You might be breaking the Rules of Hooks
      3. You might have more than one copy of React in the same app
      See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.

      30 |   
      31 |   // Load chip texture
    > 32 |   const [chipTexture, setChipTexture] = useState<THREE.Texture | null>(null);
         |                                                 ^
      33 |   const [textureLoading, setTextureLoading] = useState(true);
      34 |   
      35 |   useEffect(() => {

      at printWarning (node_modules/react/cjs/react.development.js:209:30)
      at error (node_modules/react/cjs/react.development.js:183:7)
      at resolveDispatcher (node_modules/react/cjs/react.development.js:1592:7)
      at useState (node_modules/react/cjs/react.development.js:1621:20)
      at Chip3D (src/components/game/Chip3D.tsx:32:49)
      at src/components/game/__tests__/Chip3D.test.tsx:19:15
      at Object.<anonymous> (node_modules/expect/build/index.js:1824:9)
      at Object.throwingMatcher [as toThrow] (node_modules/expect/build/index.js:2235:93)
      at src/components/game/__tests__/Chip3D.test.tsx:20:14
          at Array.forEach (<anonymous>)
      at Object.<anonymous> (src/components/game/__tests__/Chip3D.test.tsx:17:12)

    console.error
      Warning: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
      1. You might have mismatching versions of React and the renderer (such as React DOM)
      2. You might be breaking the Rules of Hooks
      3. You might have more than one copy of React in the same app
      See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.

      30 |   
      31 |   // Load chip texture
    > 32 |   const [chipTexture, setChipTexture] = useState<THREE.Texture | null>(null);
         |                                                 ^
      33 |   const [textureLoading, setTextureLoading] = useState(true);
      34 |   
      35 |   useEffect(() => {

      at printWarning (node_modules/react/cjs/react.development.js:209:30)
      at error (node_modules/react/cjs/react.development.js:183:7)
      at resolveDispatcher (node_modules/react/cjs/react.development.js:1592:7)
      at useState (node_modules/react/cjs/react.development.js:1621:20)
      at Chip3D (src/components/game/Chip3D.tsx:32:49)
      at src/components/game/__tests__/Chip3D.test.tsx:26:13
      at Object.<anonymous> (node_modules/expect/build/index.js:1824:9)
      at Object.throwingMatcher [as toThrow] (node_modules/expect/build/index.js:2235:93)
      at Object.<anonymous> (src/components/game/__tests__/Chip3D.test.tsx:31:12)

    console.error
      Warning: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
      1. You might have mismatching versions of React and the renderer (such as React DOM)
      2. You might be breaking the Rules of Hooks
      3. You might have more than one copy of React in the same app
      See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.

      30 |   
      31 |   // Load chip texture
    > 32 |   const [chipTexture, setChipTexture] = useState<THREE.Texture | null>(null);
         |                                                 ^
      33 |   const [textureLoading, setTextureLoading] = useState(true);
      34 |   
      35 |   useEffect(() => {

      at printWarning (node_modules/react/cjs/react.development.js:209:30)
      at error (node_modules/react/cjs/react.development.js:183:7)
      at resolveDispatcher (node_modules/react/cjs/react.development.js:1592:7)
      at useState (node_modules/react/cjs/react.development.js:1621:20)
      at Chip3D (src/components/game/Chip3D.tsx:32:49)
      at src/components/game/__tests__/Chip3D.test.tsx:38:15
      at Object.<anonymous> (node_modules/expect/build/index.js:1824:9)
      at Object.throwingMatcher [as toThrow] (node_modules/expect/build/index.js:2235:93)
      at src/components/game/__tests__/Chip3D.test.tsx:39:14
          at Array.forEach (<anonymous>)
      at Object.<anonymous> (src/components/game/__tests__/Chip3D.test.tsx:36:20)

    console.error
      Warning: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
      1. You might have mismatching versions of React and the renderer (such as React DOM)
      2. You might be breaking the Rules of Hooks
      3. You might have more than one copy of React in the same app
      See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.

      30 |   
      31 |   // Load chip texture
    > 32 |   const [chipTexture, setChipTexture] = useState<THREE.Texture | null>(null);
         |                                                 ^
      33 |   const [textureLoading, setTextureLoading] = useState(true);
      34 |   
      35 |   useEffect(() => {

      at printWarning (node_modules/react/cjs/react.development.js:209:30)
      at error (node_modules/react/cjs/react.development.js:183:7)
      at resolveDispatcher (node_modules/react/cjs/react.development.js:1592:7)
      at useState (node_modules/react/cjs/react.development.js:1621:20)
      at Chip3D (src/components/game/Chip3D.tsx:32:49)
      at src/components/game/__tests__/Chip3D.test.tsx:45:13
      at Object.<anonymous> (node_modules/expect/build/index.js:1824:9)
      at Object.throwingMatcher [as toThrow] (node_modules/expect/build/index.js:2235:93)
      at Object.<anonymous> (src/components/game/__tests__/Chip3D.test.tsx:50:12)

    console.error
      Warning: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
      1. You might have mismatching versions of React and the renderer (such as React DOM)
      2. You might be breaking the Rules of Hooks
      3. You might have more than one copy of React in the same app
      See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.

      30 |   
      31 |   // Load chip texture
    > 32 |   const [chipTexture, setChipTexture] = useState<THREE.Texture | null>(null);
         |                                                 ^
      33 |   const [textureLoading, setTextureLoading] = useState(true);
      34 |   
      35 |   useEffect(() => {

      at printWarning (node_modules/react/cjs/react.development.js:209:30)
      at error (node_modules/react/cjs/react.development.js:183:7)
      at resolveDispatcher (node_modules/react/cjs/react.development.js:1592:7)
      at useState (node_modules/react/cjs/react.development.js:1621:20)
      at Chip3D (src/components/game/Chip3D.tsx:32:49)
      at src/components/game/__tests__/Chip3D.test.tsx:55:13
      at Object.<anonymous> (node_modules/expect/build/index.js:1824:9)
      at Object.throwingMatcher [as toThrow] (node_modules/expect/build/index.js:2235:93)
      at Object.<anonymous> (src/components/game/__tests__/Chip3D.test.tsx:56:12)

    console.error
      Warning: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
      1. You might have mismatching versions of React and the renderer (such as React DOM)
      2. You might be breaking the Rules of Hooks
      3. You might have more than one copy of React in the same app
      See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.

      30 |   
      31 |   // Load chip texture
    > 32 |   const [chipTexture, setChipTexture] = useState<THREE.Texture | null>(null);
         |                                                 ^
      33 |   const [textureLoading, setTextureLoading] = useState(true);
      34 |   
      35 |   useEffect(() => {

      at printWarning (node_modules/react/cjs/react.development.js:209:30)
      at error (node_modules/react/cjs/react.development.js:183:7)
      at resolveDispatcher (node_modules/react/cjs/react.development.js:1592:7)
      at useState (node_modules/react/cjs/react.development.js:1621:20)
      at Chip3D (src/components/game/Chip3D.tsx:32:49)
      at src/components/game/__tests__/Chip3D.test.tsx:61:13
      at Object.<anonymous> (node_modules/expect/build/index.js:1824:9)
      at Object.throwingMatcher [as toThrow] (node_modules/expect/build/index.js:2235:93)
      at Object.<anonymous> (src/components/game/__tests__/Chip3D.test.tsx:62:12)

  ● Chip3D Component › should accept position and value props

    expect(received).not.toThrow()

    Error name:    "TypeError"
    Error message: "Cannot read properties of null (reading 'useState')"

          30 |   
          31 |   // Load chip texture
        > 32 |   const [chipTexture, setChipTexture] = useState<THREE.Texture | null>(null);
             |                                                 ^
          33 |   const [textureLoading, setTextureLoading] = useState(true);
          34 |   
          35 |   useEffect(() => {

      at useState (node_modules/react/cjs/react.development.js:1622:21)
      at Chip3D (src/components/game/Chip3D.tsx:32:49)
      at src/components/game/__tests__/Chip3D.test.tsx:11:13
      at Object.<anonymous> (node_modules/expect/build/index.js:1824:9)
      at Object.throwingMatcher [as toThrow] (node_modules/expect/build/index.js:2235:93)
      at Object.<anonymous> (src/components/game/__tests__/Chip3D.test.tsx:12:12)
      at Object.<anonymous> (src/components/game/__tests__/Chip3D.test.tsx:12:12)

  ● Chip3D Component › should handle different chip values

    expect(received).not.toThrow()

    Error name:    "TypeError"
    Error message: "Cannot read properties of null (reading 'useState')"

          30 |   
          31 |   // Load chip texture
        > 32 |   const [chipTexture, setChipTexture] = useState<THREE.Texture | null>(null);
             |                                                 ^
          33 |   const [textureLoading, setTextureLoading] = useState(true);
          34 |   
          35 |   useEffect(() => {

      at useState (node_modules/react/cjs/react.development.js:1622:21)
      at Chip3D (src/components/game/Chip3D.tsx:32:49)
      at src/components/game/__tests__/Chip3D.test.tsx:19:15
      at Object.<anonymous> (node_modules/expect/build/index.js:1824:9)
      at Object.throwingMatcher [as toThrow] (node_modules/expect/build/index.js:2235:93)
      at src/components/game/__tests__/Chip3D.test.tsx:20:14
                at Array.forEach (<anonymous>)
      at Object.<anonymous> (src/components/game/__tests__/Chip3D.test.tsx:17:12)
      at src/components/game/__tests__/Chip3D.test.tsx:20:14
          at Array.forEach (<anonymous>)
      at Object.<anonymous> (src/components/game/__tests__/Chip3D.test.tsx:17:12)

  ● Chip3D Component › should accept custom color prop

    expect(received).not.toThrow()

    Error name:    "TypeError"
    Error message: "Cannot read properties of null (reading 'useState')"

          30 |   
          31 |   // Load chip texture
        > 32 |   const [chipTexture, setChipTexture] = useState<THREE.Texture | null>(null);
             |                                                 ^
          33 |   const [textureLoading, setTextureLoading] = useState(true);
          34 |   
          35 |   useEffect(() => {

      at useState (node_modules/react/cjs/react.development.js:1622:21)
      at Chip3D (src/components/game/Chip3D.tsx:32:49)
      at src/components/game/__tests__/Chip3D.test.tsx:26:13
      at Object.<anonymous> (node_modules/expect/build/index.js:1824:9)
      at Object.throwingMatcher [as toThrow] (node_modules/expect/build/index.js:2235:93)
      at Object.<anonymous> (src/components/game/__tests__/Chip3D.test.tsx:31:12)
      at Object.<anonymous> (src/components/game/__tests__/Chip3D.test.tsx:31:12)

  ● Chip3D Component › should handle standard casino chip values

    expect(received).not.toThrow()

    Error name:    "TypeError"
    Error message: "Cannot read properties of null (reading 'useState')"

          30 |   
          31 |   // Load chip texture
        > 32 |   const [chipTexture, setChipTexture] = useState<THREE.Texture | null>(null);
             |                                                 ^
          33 |   const [textureLoading, setTextureLoading] = useState(true);
          34 |   
          35 |   useEffect(() => {

      at useState (node_modules/react/cjs/react.development.js:1622:21)
      at Chip3D (src/components/game/Chip3D.tsx:32:49)
      at src/components/game/__tests__/Chip3D.test.tsx:38:15
      at Object.<anonymous> (node_modules/expect/build/index.js:1824:9)
      at Object.throwingMatcher [as toThrow] (node_modules/expect/build/index.js:2235:93)
      at src/components/game/__tests__/Chip3D.test.tsx:39:14
                at Array.forEach (<anonymous>)
      at Object.<anonymous> (src/components/game/__tests__/Chip3D.test.tsx:36:20)
      at src/components/game/__tests__/Chip3D.test.tsx:39:14
          at Array.forEach (<anonymous>)
      at Object.<anonymous> (src/components/game/__tests__/Chip3D.test.tsx:36:20)

  ● Chip3D Component › should handle non-standard chip values

    expect(received).not.toThrow()

    Error name:    "TypeError"
    Error message: "Cannot read properties of null (reading 'useState')"

          30 |   
          31 |   // Load chip texture
        > 32 |   const [chipTexture, setChipTexture] = useState<THREE.Texture | null>(null);
             |                                                 ^
          33 |   const [textureLoading, setTextureLoading] = useState(true);
          34 |   
          35 |   useEffect(() => {

      at useState (node_modules/react/cjs/react.development.js:1622:21)
      at Chip3D (src/components/game/Chip3D.tsx:32:49)
      at src/components/game/__tests__/Chip3D.test.tsx:45:13
      at Object.<anonymous> (node_modules/expect/build/index.js:1824:9)
      at Object.throwingMatcher [as toThrow] (node_modules/expect/build/index.js:2235:93)
      at Object.<anonymous> (src/components/game/__tests__/Chip3D.test.tsx:50:12)
      at Object.<anonymous> (src/components/game/__tests__/Chip3D.test.tsx:50:12)

  ● Chip3D Component › should render without color prop

    expect(received).not.toThrow()

    Error name:    "TypeError"
    Error message: "Cannot read properties of null (reading 'useState')"

          30 |   
          31 |   // Load chip texture
        > 32 |   const [chipTexture, setChipTexture] = useState<THREE.Texture | null>(null);
             |                                                 ^
          33 |   const [textureLoading, setTextureLoading] = useState(true);
          34 |   
          35 |   useEffect(() => {

      at useState (node_modules/react/cjs/react.development.js:1622:21)
      at Chip3D (src/components/game/Chip3D.tsx:32:49)
      at src/components/game/__tests__/Chip3D.test.tsx:55:13
      at Object.<anonymous> (node_modules/expect/build/index.js:1824:9)
      at Object.throwingMatcher [as toThrow] (node_modules/expect/build/index.js:2235:93)
      at Object.<anonymous> (src/components/game/__tests__/Chip3D.test.tsx:56:12)
      at Object.<anonymous> (src/components/game/__tests__/Chip3D.test.tsx:56:12)

  ● Chip3D Component › should handle edge cases

    expect(received).not.toThrow()

    Error name:    "TypeError"
    Error message: "Cannot read properties of null (reading 'useState')"

          30 |   
          31 |   // Load chip texture
        > 32 |   const [chipTexture, setChipTexture] = useState<THREE.Texture | null>(null);
             |                                                 ^
          33 |   const [textureLoading, setTextureLoading] = useState(true);
          34 |   
          35 |   useEffect(() => {

      at useState (node_modules/react/cjs/react.development.js:1622:21)
      at Chip3D (src/components/game/Chip3D.tsx:32:49)
      at src/components/game/__tests__/Chip3D.test.tsx:61:13
      at Object.<anonymous> (node_modules/expect/build/index.js:1824:9)
      at Object.throwingMatcher [as toThrow] (node_modules/expect/build/index.js:2235:93)
      at Object.<anonymous> (src/components/game/__tests__/Chip3D.test.tsx:62:12)
      at Object.<anonymous> (src/components/game/__tests__/Chip3D.test.tsx:62:12)

FAIL src/__tests__/App.integration.test.tsx
  ● Console

    console.error
      Warning: React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
      
      Check the render method of `App`.
          at App (/home/runner/work/blackjack-simulator/blackjack-simulator/src/App.tsx:7:35)

      51 |
      52 |       {/* Content */}
    > 53 |       {view === 'simulator' && <BlackjackSimulator />}
         |                                ^
      54 |       {view === '3d-demo' && <Game3DDemo />}
      55 |       {view === 'interactive' && <InteractiveGamePage />}
      56 |     </div>

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at printWarning (node_modules/react/cjs/react-jsx-runtime.development.js:87:30)
      at error (node_modules/react/cjs/react-jsx-runtime.development.js:61:7)
      at jsxWithValidation (node_modules/react/cjs/react-jsx-runtime.development.js:1245:7)
      at jsxWithValidationDynamic (node_modules/react/cjs/react-jsx-runtime.development.js:1320:12)
      at App (src/App.tsx:53:32)
      at renderWithHooks (node_modules/react-dom/cjs/react-dom.development.js:15486:18)
      at mountIndeterminateComponent (node_modules/react-dom/cjs/react-dom.development.js:20103:13)
      at beginWork (node_modules/react-dom/cjs/react-dom.development.js:21626:16)
      at beginWork$1 (node_modules/react-dom/cjs/react-dom.development.js:27465:14)
      at performUnitOfWork (node_modules/react-dom/cjs/react-dom.development.js:26599:12)
      at workLoopSync (node_modules/react-dom/cjs/react-dom.development.js:26505:5)
      at renderRootSync (node_modules/react-dom/cjs/react-dom.development.js:26473:7)
      at performConcurrentWorkOnRoot (node_modules/react-dom/cjs/react-dom.development.js:25777:74)
      at flushActQueue (node_modules/react/cjs/react.development.js:2667:24)
      at act (node_modules/react/cjs/react.development.js:2582:11)
      at node_modules/@testing-library/react/dist/act-compat.js:47:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:190:26)
      at render (node_modules/@testing-library/react/dist/pure.js:292:10)
      at Object.<anonymous> (src/__tests__/App.integration.test.tsx:20:11)

    console.error
      Error: Uncaught [Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
      
      Check the render method of `App`.]
          at reportException (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/helpers/runtime-script-errors.js:66:24)
          at innerInvokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:353:9)
          at invokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:286:3)
          at HTMLUnknownElementImpl._dispatch (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:233:9)
          at HTMLUnknownElementImpl.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:104:17)
          at HTMLUnknownElement.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/generated/EventTarget.js:241:34)
          at Object.invokeGuardedCallbackDev (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4213:16)
          at invokeGuardedCallback (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4277:31)
          at beginWork$1 (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:27490:7)
          at performUnitOfWork (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26599:12)
          at workLoopSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26505:5)
          at renderRootSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26473:7)
          at performConcurrentWorkOnRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:25777:74)
          at flushActQueue (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2667:24)
          at act (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2582:11)
          at /home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/act-compat.js:47:25
          at renderRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:190:26)
          at render (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:292:10)
          at Object.<anonymous> (/home/runner/work/blackjack-simulator/blackjack-simulator/src/__tests__/App.integration.test.tsx:20:11)
          at Promise.finally.completed (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1559:28)
          at new Promise (<anonymous>)
          at callAsyncCircusFn (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1499:10)
          at _callCircusTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1009:40)
          at processTicksAndRejections (node:internal/process/task_queues:95:5)
          at _runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:949:3)
          at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:839:13)
          at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:829:11)
          at run (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:757:3)
          at runAndTransformResultsToJestFormat (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1920:21)
          at jestAdapter (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/runner.js:101:19)
          at runTestInternal (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:275:16)
          at runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:343:7)
          at Object.worker (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:497:12) {
        detail: Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
        
        Check the render method of `App`.
            at createFiberFromTypeAndProps (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:28478:17)
            at createFiberFromElement (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:28504:15)
            at createChild (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:13345:28)
            at reconcileChildrenArray (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:13640:25)
            at reconcileChildFibers (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:14057:16)
            at reconcileChildren (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:19186:28)
            at updateHostComponent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:19953:3)
            at beginWork (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:21657:14)
            at HTMLUnknownElement.callCallback (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4164:14)
            at HTMLUnknownElement.callTheUserObjectsOperation (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/generated/EventListener.js:26:30)
            at innerInvokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:350:25)
            at invokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:286:3)
            at HTMLUnknownElementImpl._dispatch (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:233:9)
            at HTMLUnknownElementImpl.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:104:17)
            at HTMLUnknownElement.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/generated/EventTarget.js:241:34)
            at Object.invokeGuardedCallbackDev (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4213:16)
            at invokeGuardedCallback (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4277:31)
            at beginWork$1 (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:27490:7)
            at performUnitOfWork (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26599:12)
            at workLoopSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26505:5)
            at renderRootSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26473:7)
            at performConcurrentWorkOnRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:25777:74)
            at flushActQueue (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2667:24)
            at act (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2582:11)
            at /home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/act-compat.js:47:25
            at renderRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:190:26)
            at render (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:292:10)
            at Object.<anonymous> (/home/runner/work/blackjack-simulator/blackjack-simulator/src/__tests__/App.integration.test.tsx:20:11)
            at Promise.finally.completed (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1559:28)
            at new Promise (<anonymous>)
            at callAsyncCircusFn (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1499:10)
            at _callCircusTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1009:40)
            at processTicksAndRejections (node:internal/process/task_queues:95:5)
            at _runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:949:3)
            at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:839:13)
            at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:829:11)
            at run (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:757:3)
            at runAndTransformResultsToJestFormat (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1920:21)
            at jestAdapter (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/runner.js:101:19)
            at runTestInternal (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:275:16)
            at runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:343:7)
            at Object.worker (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:497:12),
        type: 'unhandled exception'
      }

      18 | describe('App Integration Tests', () => {
      19 |   it('renders without crashing', () => {
    > 20 |     render(<App />);
         |           ^
      21 |     expect(screen.getByTestId('blackjack-simulator')).toBeInTheDocument();
      22 |   });
      23 |

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at VirtualConsole.<anonymous> (node_modules/@jest/environment-jsdom-abstract/build/index.js:78:23)
      at reportException (node_modules/jsdom/lib/jsdom/living/helpers/runtime-script-errors.js:70:28)
      at innerInvokeEventListeners (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:353:9)
      at invokeEventListeners (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:286:3)
      at HTMLUnknownElementImpl._dispatch (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:233:9)
      at HTMLUnknownElementImpl.dispatchEvent (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:104:17)
      at HTMLUnknownElement.dispatchEvent (node_modules/jsdom/lib/jsdom/living/generated/EventTarget.js:241:34)
      at Object.invokeGuardedCallbackDev (node_modules/react-dom/cjs/react-dom.development.js:4213:16)
      at invokeGuardedCallback (node_modules/react-dom/cjs/react-dom.development.js:4277:31)
      at beginWork$1 (node_modules/react-dom/cjs/react-dom.development.js:27490:7)
      at performUnitOfWork (node_modules/react-dom/cjs/react-dom.development.js:26599:12)
      at workLoopSync (node_modules/react-dom/cjs/react-dom.development.js:26505:5)
      at renderRootSync (node_modules/react-dom/cjs/react-dom.development.js:26473:7)
      at performConcurrentWorkOnRoot (node_modules/react-dom/cjs/react-dom.development.js:25777:74)
      at flushActQueue (node_modules/react/cjs/react.development.js:2667:24)
      at act (node_modules/react/cjs/react.development.js:2582:11)
      at node_modules/@testing-library/react/dist/act-compat.js:47:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:190:26)
      at render (node_modules/@testing-library/react/dist/pure.js:292:10)
      at Object.<anonymous> (src/__tests__/App.integration.test.tsx:20:11)

    console.error
      Warning: React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
      
      Check the render method of `App`.
          at App (/home/runner/work/blackjack-simulator/blackjack-simulator/src/App.tsx:7:35)

      51 |
      52 |       {/* Content */}
    > 53 |       {view === 'simulator' && <BlackjackSimulator />}
         |                                ^
      54 |       {view === '3d-demo' && <Game3DDemo />}
      55 |       {view === 'interactive' && <InteractiveGamePage />}
      56 |     </div>

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at printWarning (node_modules/react/cjs/react-jsx-runtime.development.js:87:30)
      at error (node_modules/react/cjs/react-jsx-runtime.development.js:61:7)
      at jsxWithValidation (node_modules/react/cjs/react-jsx-runtime.development.js:1245:7)
      at jsxWithValidationDynamic (node_modules/react/cjs/react-jsx-runtime.development.js:1320:12)
      at App (src/App.tsx:53:32)
      at renderWithHooks (node_modules/react-dom/cjs/react-dom.development.js:15486:18)
      at mountIndeterminateComponent (node_modules/react-dom/cjs/react-dom.development.js:20103:13)
      at beginWork (node_modules/react-dom/cjs/react-dom.development.js:21626:16)
      at beginWork$1 (node_modules/react-dom/cjs/react-dom.development.js:27465:14)
      at performUnitOfWork (node_modules/react-dom/cjs/react-dom.development.js:26599:12)
      at workLoopSync (node_modules/react-dom/cjs/react-dom.development.js:26505:5)
      at renderRootSync (node_modules/react-dom/cjs/react-dom.development.js:26473:7)
      at recoverFromConcurrentError (node_modules/react-dom/cjs/react-dom.development.js:25889:20)
      at performConcurrentWorkOnRoot (node_modules/react-dom/cjs/react-dom.development.js:25789:22)
      at flushActQueue (node_modules/react/cjs/react.development.js:2667:24)
      at act (node_modules/react/cjs/react.development.js:2582:11)
      at node_modules/@testing-library/react/dist/act-compat.js:47:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:190:26)
      at render (node_modules/@testing-library/react/dist/pure.js:292:10)
      at Object.<anonymous> (src/__tests__/App.integration.test.tsx:20:11)

    console.error
      Error: Uncaught [Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
      
      Check the render method of `App`.]
          at reportException (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/helpers/runtime-script-errors.js:66:24)
          at innerInvokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:353:9)
          at invokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:286:3)
          at HTMLUnknownElementImpl._dispatch (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:233:9)
          at HTMLUnknownElementImpl.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:104:17)
          at HTMLUnknownElement.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/generated/EventTarget.js:241:34)
          at Object.invokeGuardedCallbackDev (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4213:16)
          at invokeGuardedCallback (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4277:31)
          at beginWork$1 (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:27490:7)
          at performUnitOfWork (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26599:12)
          at workLoopSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26505:5)
          at renderRootSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26473:7)
          at recoverFromConcurrentError (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:25889:20)
          at performConcurrentWorkOnRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:25789:22)
          at flushActQueue (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2667:24)
          at act (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2582:11)
          at /home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/act-compat.js:47:25
          at renderRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:190:26)
          at render (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:292:10)
          at Object.<anonymous> (/home/runner/work/blackjack-simulator/blackjack-simulator/src/__tests__/App.integration.test.tsx:20:11)
          at Promise.finally.completed (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1559:28)
          at new Promise (<anonymous>)
          at callAsyncCircusFn (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1499:10)
          at _callCircusTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1009:40)
          at processTicksAndRejections (node:internal/process/task_queues:95:5)
          at _runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:949:3)
          at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:839:13)
          at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:829:11)
          at run (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:757:3)
          at runAndTransformResultsToJestFormat (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1920:21)
          at jestAdapter (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/runner.js:101:19)
          at runTestInternal (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:275:16)
          at runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:343:7)
          at Object.worker (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:497:12) {
        detail: Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
        
        Check the render method of `App`.
            at createFiberFromTypeAndProps (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:28478:17)
            at createFiberFromElement (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:28504:15)
            at createChild (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:13345:28)
            at reconcileChildrenArray (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:13640:25)
            at reconcileChildFibers (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:14057:16)
            at reconcileChildren (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:19186:28)
            at updateHostComponent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:19953:3)
            at beginWork (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:21657:14)
            at HTMLUnknownElement.callCallback (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4164:14)
            at HTMLUnknownElement.callTheUserObjectsOperation (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/generated/EventListener.js:26:30)
            at innerInvokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:350:25)
            at invokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:286:3)
            at HTMLUnknownElementImpl._dispatch (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:233:9)
            at HTMLUnknownElementImpl.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:104:17)
            at HTMLUnknownElement.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/generated/EventTarget.js:241:34)
            at Object.invokeGuardedCallbackDev (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4213:16)
            at invokeGuardedCallback (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4277:31)
            at beginWork$1 (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:27490:7)
            at performUnitOfWork (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26599:12)
            at workLoopSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26505:5)
            at renderRootSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26473:7)
            at recoverFromConcurrentError (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:25889:20)
            at performConcurrentWorkOnRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:25789:22)
            at flushActQueue (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2667:24)
            at act (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2582:11)
            at /home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/act-compat.js:47:25
            at renderRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:190:26)
            at render (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:292:10)
            at Object.<anonymous> (/home/runner/work/blackjack-simulator/blackjack-simulator/src/__tests__/App.integration.test.tsx:20:11)
            at Promise.finally.completed (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1559:28)
            at new Promise (<anonymous>)
            at callAsyncCircusFn (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1499:10)
            at _callCircusTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1009:40)
            at processTicksAndRejections (node:internal/process/task_queues:95:5)
            at _runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:949:3)
            at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:839:13)
            at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:829:11)
            at run (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:757:3)
            at runAndTransformResultsToJestFormat (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1920:21)
            at jestAdapter (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/runner.js:101:19)
            at runTestInternal (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:275:16)
            at runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:343:7)
            at Object.worker (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:497:12),
        type: 'unhandled exception'
      }

      18 | describe('App Integration Tests', () => {
      19 |   it('renders without crashing', () => {
    > 20 |     render(<App />);
         |           ^
      21 |     expect(screen.getByTestId('blackjack-simulator')).toBeInTheDocument();
      22 |   });
      23 |

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at VirtualConsole.<anonymous> (node_modules/@jest/environment-jsdom-abstract/build/index.js:78:23)
      at reportException (node_modules/jsdom/lib/jsdom/living/helpers/runtime-script-errors.js:70:28)
      at innerInvokeEventListeners (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:353:9)
      at invokeEventListeners (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:286:3)
      at HTMLUnknownElementImpl._dispatch (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:233:9)
      at HTMLUnknownElementImpl.dispatchEvent (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:104:17)
      at HTMLUnknownElement.dispatchEvent (node_modules/jsdom/lib/jsdom/living/generated/EventTarget.js:241:34)
      at Object.invokeGuardedCallbackDev (node_modules/react-dom/cjs/react-dom.development.js:4213:16)
      at invokeGuardedCallback (node_modules/react-dom/cjs/react-dom.development.js:4277:31)
      at beginWork$1 (node_modules/react-dom/cjs/react-dom.development.js:27490:7)
      at performUnitOfWork (node_modules/react-dom/cjs/react-dom.development.js:26599:12)
      at workLoopSync (node_modules/react-dom/cjs/react-dom.development.js:26505:5)
      at renderRootSync (node_modules/react-dom/cjs/react-dom.development.js:26473:7)
      at recoverFromConcurrentError (node_modules/react-dom/cjs/react-dom.development.js:25889:20)
      at performConcurrentWorkOnRoot (node_modules/react-dom/cjs/react-dom.development.js:25789:22)
      at flushActQueue (node_modules/react/cjs/react.development.js:2667:24)
      at act (node_modules/react/cjs/react.development.js:2582:11)
      at node_modules/@testing-library/react/dist/act-compat.js:47:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:190:26)
      at render (node_modules/@testing-library/react/dist/pure.js:292:10)
      at Object.<anonymous> (src/__tests__/App.integration.test.tsx:20:11)

    console.error
      The above error occurred in the <div> component:
      
          at div
          at App (/home/runner/work/blackjack-simulator/blackjack-simulator/src/App.tsx:7:35)
      
      Consider adding an error boundary to your tree to customize error handling behavior.
      Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.

      18 | describe('App Integration Tests', () => {
      19 |   it('renders without crashing', () => {
    > 20 |     render(<App />);
         |           ^
      21 |     expect(screen.getByTestId('blackjack-simulator')).toBeInTheDocument();
      22 |   });
      23 |

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at logCapturedError (node_modules/react-dom/cjs/react-dom.development.js:18704:23)
      at update.callback (node_modules/react-dom/cjs/react-dom.development.js:18737:5)
      at callCallback (node_modules/react-dom/cjs/react-dom.development.js:15036:12)
      at commitUpdateQueue (node_modules/react-dom/cjs/react-dom.development.js:15057:9)
      at commitLayoutEffectOnFiber (node_modules/react-dom/cjs/react-dom.development.js:23430:13)
      at commitLayoutMountEffects_complete (node_modules/react-dom/cjs/react-dom.development.js:24727:9)
      at commitLayoutEffects_begin (node_modules/react-dom/cjs/react-dom.development.js:24713:7)
      at commitLayoutEffects (node_modules/react-dom/cjs/react-dom.development.js:24651:3)
      at commitRootImpl (node_modules/react-dom/cjs/react-dom.development.js:26862:5)
      at commitRoot (node_modules/react-dom/cjs/react-dom.development.js:26721:5)
      at finishConcurrentRender (node_modules/react-dom/cjs/react-dom.development.js:25931:9)
      at performConcurrentWorkOnRoot (node_modules/react-dom/cjs/react-dom.development.js:25848:7)
      at flushActQueue (node_modules/react/cjs/react.development.js:2667:24)
      at act (node_modules/react/cjs/react.development.js:2582:11)
      at node_modules/@testing-library/react/dist/act-compat.js:47:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:190:26)
      at render (node_modules/@testing-library/react/dist/pure.js:292:10)
      at Object.<anonymous> (src/__tests__/App.integration.test.tsx:20:11)

    console.error
      Warning: React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
      
      Check the render method of `App`.
          at App (/home/runner/work/blackjack-simulator/blackjack-simulator/src/App.tsx:7:35)

      51 |
      52 |       {/* Content */}
    > 53 |       {view === 'simulator' && <BlackjackSimulator />}
         |                                ^
      54 |       {view === '3d-demo' && <Game3DDemo />}
      55 |       {view === 'interactive' && <InteractiveGamePage />}
      56 |     </div>

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at printWarning (node_modules/react/cjs/react-jsx-runtime.development.js:87:30)
      at error (node_modules/react/cjs/react-jsx-runtime.development.js:61:7)
      at jsxWithValidation (node_modules/react/cjs/react-jsx-runtime.development.js:1245:7)
      at jsxWithValidationDynamic (node_modules/react/cjs/react-jsx-runtime.development.js:1320:12)
      at App (src/App.tsx:53:32)
      at renderWithHooks (node_modules/react-dom/cjs/react-dom.development.js:15486:18)
      at mountIndeterminateComponent (node_modules/react-dom/cjs/react-dom.development.js:20103:13)
      at beginWork (node_modules/react-dom/cjs/react-dom.development.js:21626:16)
      at beginWork$1 (node_modules/react-dom/cjs/react-dom.development.js:27465:14)
      at performUnitOfWork (node_modules/react-dom/cjs/react-dom.development.js:26599:12)
      at workLoopSync (node_modules/react-dom/cjs/react-dom.development.js:26505:5)
      at renderRootSync (node_modules/react-dom/cjs/react-dom.development.js:26473:7)
      at performConcurrentWorkOnRoot (node_modules/react-dom/cjs/react-dom.development.js:25777:74)
      at flushActQueue (node_modules/react/cjs/react.development.js:2667:24)
      at act (node_modules/react/cjs/react.development.js:2582:11)
      at node_modules/@testing-library/react/dist/act-compat.js:47:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:190:26)
      at render (node_modules/@testing-library/react/dist/pure.js:292:10)
      at Object.<anonymous> (src/__tests__/App.integration.test.tsx:25:11)

    console.error
      Error: Uncaught [Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
      
      Check the render method of `App`.]
          at reportException (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/helpers/runtime-script-errors.js:66:24)
          at innerInvokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:353:9)
          at invokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:286:3)
          at HTMLUnknownElementImpl._dispatch (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:233:9)
          at HTMLUnknownElementImpl.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:104:17)
          at HTMLUnknownElement.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/generated/EventTarget.js:241:34)
          at Object.invokeGuardedCallbackDev (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4213:16)
          at invokeGuardedCallback (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4277:31)
          at beginWork$1 (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:27490:7)
          at performUnitOfWork (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26599:12)
          at workLoopSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26505:5)
          at renderRootSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26473:7)
          at performConcurrentWorkOnRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:25777:74)
          at flushActQueue (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2667:24)
          at act (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2582:11)
          at /home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/act-compat.js:47:25
          at renderRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:190:26)
          at render (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:292:10)
          at Object.<anonymous> (/home/runner/work/blackjack-simulator/blackjack-simulator/src/__tests__/App.integration.test.tsx:25:11)
          at Promise.finally.completed (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1559:28)
          at new Promise (<anonymous>)
          at callAsyncCircusFn (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1499:10)
          at _callCircusTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1009:40)
          at processTicksAndRejections (node:internal/process/task_queues:95:5)
          at _runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:949:3)
          at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:839:13)
          at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:829:11)
          at run (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:757:3)
          at runAndTransformResultsToJestFormat (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1920:21)
          at jestAdapter (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/runner.js:101:19)
          at runTestInternal (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:275:16)
          at runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:343:7)
          at Object.worker (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:497:12) {
        detail: Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
        
        Check the render method of `App`.
            at createFiberFromTypeAndProps (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:28478:17)
            at createFiberFromElement (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:28504:15)
            at createChild (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:13345:28)
            at reconcileChildrenArray (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:13640:25)
            at reconcileChildFibers (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:14057:16)
            at reconcileChildren (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:19186:28)
            at updateHostComponent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:19953:3)
            at beginWork (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:21657:14)
            at HTMLUnknownElement.callCallback (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4164:14)
            at HTMLUnknownElement.callTheUserObjectsOperation (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/generated/EventListener.js:26:30)
            at innerInvokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:350:25)
            at invokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:286:3)
            at HTMLUnknownElementImpl._dispatch (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:233:9)
            at HTMLUnknownElementImpl.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:104:17)
            at HTMLUnknownElement.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/generated/EventTarget.js:241:34)
            at Object.invokeGuardedCallbackDev (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4213:16)
            at invokeGuardedCallback (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4277:31)
            at beginWork$1 (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:27490:7)
            at performUnitOfWork (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26599:12)
            at workLoopSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26505:5)
            at renderRootSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26473:7)
            at performConcurrentWorkOnRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:25777:74)
            at flushActQueue (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2667:24)
            at act (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2582:11)
            at /home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/act-compat.js:47:25
            at renderRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:190:26)
            at render (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:292:10)
            at Object.<anonymous> (/home/runner/work/blackjack-simulator/blackjack-simulator/src/__tests__/App.integration.test.tsx:25:11)
            at Promise.finally.completed (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1559:28)
            at new Promise (<anonymous>)
            at callAsyncCircusFn (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1499:10)
            at _callCircusTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1009:40)
            at processTicksAndRejections (node:internal/process/task_queues:95:5)
            at _runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:949:3)
            at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:839:13)
            at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:829:11)
            at run (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:757:3)
            at runAndTransformResultsToJestFormat (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1920:21)
            at jestAdapter (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/runner.js:101:19)
            at runTestInternal (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:275:16)
            at runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:343:7)
            at Object.worker (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:497:12),
        type: 'unhandled exception'
      }

      23 |
      24 |   it('renders navigation header', () => {
    > 25 |     render(<App />);
         |           ^
      26 |     expect(screen.getByText('Blackjack Strategy Simulator')).toBeInTheDocument();
      27 |   });
      28 |

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at VirtualConsole.<anonymous> (node_modules/@jest/environment-jsdom-abstract/build/index.js:78:23)
      at reportException (node_modules/jsdom/lib/jsdom/living/helpers/runtime-script-errors.js:70:28)
      at innerInvokeEventListeners (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:353:9)
      at invokeEventListeners (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:286:3)
      at HTMLUnknownElementImpl._dispatch (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:233:9)
      at HTMLUnknownElementImpl.dispatchEvent (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:104:17)
      at HTMLUnknownElement.dispatchEvent (node_modules/jsdom/lib/jsdom/living/generated/EventTarget.js:241:34)
      at Object.invokeGuardedCallbackDev (node_modules/react-dom/cjs/react-dom.development.js:4213:16)
      at invokeGuardedCallback (node_modules/react-dom/cjs/react-dom.development.js:4277:31)
      at beginWork$1 (node_modules/react-dom/cjs/react-dom.development.js:27490:7)
      at performUnitOfWork (node_modules/react-dom/cjs/react-dom.development.js:26599:12)
      at workLoopSync (node_modules/react-dom/cjs/react-dom.development.js:26505:5)
      at renderRootSync (node_modules/react-dom/cjs/react-dom.development.js:26473:7)
      at performConcurrentWorkOnRoot (node_modules/react-dom/cjs/react-dom.development.js:25777:74)
      at flushActQueue (node_modules/react/cjs/react.development.js:2667:24)
      at act (node_modules/react/cjs/react.development.js:2582:11)
      at node_modules/@testing-library/react/dist/act-compat.js:47:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:190:26)
      at render (node_modules/@testing-library/react/dist/pure.js:292:10)
      at Object.<anonymous> (src/__tests__/App.integration.test.tsx:25:11)

    console.error
      Warning: React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
      
      Check the render method of `App`.
          at App (/home/runner/work/blackjack-simulator/blackjack-simulator/src/App.tsx:7:35)

      51 |
      52 |       {/* Content */}
    > 53 |       {view === 'simulator' && <BlackjackSimulator />}
         |                                ^
      54 |       {view === '3d-demo' && <Game3DDemo />}
      55 |       {view === 'interactive' && <InteractiveGamePage />}
      56 |     </div>

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at printWarning (node_modules/react/cjs/react-jsx-runtime.development.js:87:30)
      at error (node_modules/react/cjs/react-jsx-runtime.development.js:61:7)
      at jsxWithValidation (node_modules/react/cjs/react-jsx-runtime.development.js:1245:7)
      at jsxWithValidationDynamic (node_modules/react/cjs/react-jsx-runtime.development.js:1320:12)
      at App (src/App.tsx:53:32)
      at renderWithHooks (node_modules/react-dom/cjs/react-dom.development.js:15486:18)
      at mountIndeterminateComponent (node_modules/react-dom/cjs/react-dom.development.js:20103:13)
      at beginWork (node_modules/react-dom/cjs/react-dom.development.js:21626:16)
      at beginWork$1 (node_modules/react-dom/cjs/react-dom.development.js:27465:14)
      at performUnitOfWork (node_modules/react-dom/cjs/react-dom.development.js:26599:12)
      at workLoopSync (node_modules/react-dom/cjs/react-dom.development.js:26505:5)
      at renderRootSync (node_modules/react-dom/cjs/react-dom.development.js:26473:7)
      at recoverFromConcurrentError (node_modules/react-dom/cjs/react-dom.development.js:25889:20)
      at performConcurrentWorkOnRoot (node_modules/react-dom/cjs/react-dom.development.js:25789:22)
      at flushActQueue (node_modules/react/cjs/react.development.js:2667:24)
      at act (node_modules/react/cjs/react.development.js:2582:11)
      at node_modules/@testing-library/react/dist/act-compat.js:47:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:190:26)
      at render (node_modules/@testing-library/react/dist/pure.js:292:10)
      at Object.<anonymous> (src/__tests__/App.integration.test.tsx:25:11)

    console.error
      Error: Uncaught [Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
      
      Check the render method of `App`.]
          at reportException (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/helpers/runtime-script-errors.js:66:24)
          at innerInvokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:353:9)
          at invokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:286:3)
          at HTMLUnknownElementImpl._dispatch (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:233:9)
          at HTMLUnknownElementImpl.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:104:17)
          at HTMLUnknownElement.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/generated/EventTarget.js:241:34)
          at Object.invokeGuardedCallbackDev (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4213:16)
          at invokeGuardedCallback (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4277:31)
          at beginWork$1 (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:27490:7)
          at performUnitOfWork (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26599:12)
          at workLoopSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26505:5)
          at renderRootSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26473:7)
          at recoverFromConcurrentError (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:25889:20)
          at performConcurrentWorkOnRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:25789:22)
          at flushActQueue (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2667:24)
          at act (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2582:11)
          at /home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/act-compat.js:47:25
          at renderRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:190:26)
          at render (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:292:10)
          at Object.<anonymous> (/home/runner/work/blackjack-simulator/blackjack-simulator/src/__tests__/App.integration.test.tsx:25:11)
          at Promise.finally.completed (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1559:28)
          at new Promise (<anonymous>)
          at callAsyncCircusFn (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1499:10)
          at _callCircusTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1009:40)
          at processTicksAndRejections (node:internal/process/task_queues:95:5)
          at _runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:949:3)
          at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:839:13)
          at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:829:11)
          at run (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:757:3)
          at runAndTransformResultsToJestFormat (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1920:21)
          at jestAdapter (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/runner.js:101:19)
          at runTestInternal (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:275:16)
          at runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:343:7)
          at Object.worker (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:497:12) {
        detail: Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
        
        Check the render method of `App`.
            at createFiberFromTypeAndProps (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:28478:17)
            at createFiberFromElement (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:28504:15)
            at createChild (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:13345:28)
            at reconcileChildrenArray (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:13640:25)
            at reconcileChildFibers (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:14057:16)
            at reconcileChildren (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:19186:28)
            at updateHostComponent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:19953:3)
            at beginWork (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:21657:14)
            at HTMLUnknownElement.callCallback (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4164:14)
            at HTMLUnknownElement.callTheUserObjectsOperation (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/generated/EventListener.js:26:30)
            at innerInvokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:350:25)
            at invokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:286:3)
            at HTMLUnknownElementImpl._dispatch (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:233:9)
            at HTMLUnknownElementImpl.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:104:17)
            at HTMLUnknownElement.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/generated/EventTarget.js:241:34)
            at Object.invokeGuardedCallbackDev (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4213:16)
            at invokeGuardedCallback (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4277:31)
            at beginWork$1 (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:27490:7)
            at performUnitOfWork (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26599:12)
            at workLoopSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26505:5)
            at renderRootSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26473:7)
            at recoverFromConcurrentError (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:25889:20)
            at performConcurrentWorkOnRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:25789:22)
            at flushActQueue (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2667:24)
            at act (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2582:11)
            at /home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/act-compat.js:47:25
            at renderRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:190:26)
            at render (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:292:10)
            at Object.<anonymous> (/home/runner/work/blackjack-simulator/blackjack-simulator/src/__tests__/App.integration.test.tsx:25:11)
            at Promise.finally.completed (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1559:28)
            at new Promise (<anonymous>)
            at callAsyncCircusFn (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1499:10)
            at _callCircusTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1009:40)
            at processTicksAndRejections (node:internal/process/task_queues:95:5)
            at _runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:949:3)
            at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:839:13)
            at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:829:11)
            at run (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:757:3)
            at runAndTransformResultsToJestFormat (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1920:21)
            at jestAdapter (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/runner.js:101:19)
            at runTestInternal (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:275:16)
            at runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:343:7)
            at Object.worker (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:497:12),
        type: 'unhandled exception'
      }

      23 |
      24 |   it('renders navigation header', () => {
    > 25 |     render(<App />);
         |           ^
      26 |     expect(screen.getByText('Blackjack Strategy Simulator')).toBeInTheDocument();
      27 |   });
      28 |

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at VirtualConsole.<anonymous> (node_modules/@jest/environment-jsdom-abstract/build/index.js:78:23)
      at reportException (node_modules/jsdom/lib/jsdom/living/helpers/runtime-script-errors.js:70:28)
      at innerInvokeEventListeners (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:353:9)
      at invokeEventListeners (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:286:3)
      at HTMLUnknownElementImpl._dispatch (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:233:9)
      at HTMLUnknownElementImpl.dispatchEvent (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:104:17)
      at HTMLUnknownElement.dispatchEvent (node_modules/jsdom/lib/jsdom/living/generated/EventTarget.js:241:34)
      at Object.invokeGuardedCallbackDev (node_modules/react-dom/cjs/react-dom.development.js:4213:16)
      at invokeGuardedCallback (node_modules/react-dom/cjs/react-dom.development.js:4277:31)
      at beginWork$1 (node_modules/react-dom/cjs/react-dom.development.js:27490:7)
      at performUnitOfWork (node_modules/react-dom/cjs/react-dom.development.js:26599:12)
      at workLoopSync (node_modules/react-dom/cjs/react-dom.development.js:26505:5)
      at renderRootSync (node_modules/react-dom/cjs/react-dom.development.js:26473:7)
      at recoverFromConcurrentError (node_modules/react-dom/cjs/react-dom.development.js:25889:20)
      at performConcurrentWorkOnRoot (node_modules/react-dom/cjs/react-dom.development.js:25789:22)
      at flushActQueue (node_modules/react/cjs/react.development.js:2667:24)
      at act (node_modules/react/cjs/react.development.js:2582:11)
      at node_modules/@testing-library/react/dist/act-compat.js:47:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:190:26)
      at render (node_modules/@testing-library/react/dist/pure.js:292:10)
      at Object.<anonymous> (src/__tests__/App.integration.test.tsx:25:11)

    console.error
      The above error occurred in the <div> component:
      
          at div
          at App (/home/runner/work/blackjack-simulator/blackjack-simulator/src/App.tsx:7:35)
      
      Consider adding an error boundary to your tree to customize error handling behavior.
      Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.

      23 |
      24 |   it('renders navigation header', () => {
    > 25 |     render(<App />);
         |           ^
      26 |     expect(screen.getByText('Blackjack Strategy Simulator')).toBeInTheDocument();
      27 |   });
      28 |

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at logCapturedError (node_modules/react-dom/cjs/react-dom.development.js:18704:23)
      at update.callback (node_modules/react-dom/cjs/react-dom.development.js:18737:5)
      at callCallback (node_modules/react-dom/cjs/react-dom.development.js:15036:12)
      at commitUpdateQueue (node_modules/react-dom/cjs/react-dom.development.js:15057:9)
      at commitLayoutEffectOnFiber (node_modules/react-dom/cjs/react-dom.development.js:23430:13)
      at commitLayoutMountEffects_complete (node_modules/react-dom/cjs/react-dom.development.js:24727:9)
      at commitLayoutEffects_begin (node_modules/react-dom/cjs/react-dom.development.js:24713:7)
      at commitLayoutEffects (node_modules/react-dom/cjs/react-dom.development.js:24651:3)
      at commitRootImpl (node_modules/react-dom/cjs/react-dom.development.js:26862:5)
      at commitRoot (node_modules/react-dom/cjs/react-dom.development.js:26721:5)
      at finishConcurrentRender (node_modules/react-dom/cjs/react-dom.development.js:25931:9)
      at performConcurrentWorkOnRoot (node_modules/react-dom/cjs/react-dom.development.js:25848:7)
      at flushActQueue (node_modules/react/cjs/react.development.js:2667:24)
      at act (node_modules/react/cjs/react.development.js:2582:11)
      at node_modules/@testing-library/react/dist/act-compat.js:47:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:190:26)
      at render (node_modules/@testing-library/react/dist/pure.js:292:10)
      at Object.<anonymous> (src/__tests__/App.integration.test.tsx:25:11)

    console.error
      Warning: React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
      
      Check the render method of `App`.
          at App (/home/runner/work/blackjack-simulator/blackjack-simulator/src/App.tsx:7:35)

      51 |
      52 |       {/* Content */}
    > 53 |       {view === 'simulator' && <BlackjackSimulator />}
         |                                ^
      54 |       {view === '3d-demo' && <Game3DDemo />}
      55 |       {view === 'interactive' && <InteractiveGamePage />}
      56 |     </div>

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at printWarning (node_modules/react/cjs/react-jsx-runtime.development.js:87:30)
      at error (node_modules/react/cjs/react-jsx-runtime.development.js:61:7)
      at jsxWithValidation (node_modules/react/cjs/react-jsx-runtime.development.js:1245:7)
      at jsxWithValidationDynamic (node_modules/react/cjs/react-jsx-runtime.development.js:1320:12)
      at App (src/App.tsx:53:32)
      at renderWithHooks (node_modules/react-dom/cjs/react-dom.development.js:15486:18)
      at mountIndeterminateComponent (node_modules/react-dom/cjs/react-dom.development.js:20103:13)
      at beginWork (node_modules/react-dom/cjs/react-dom.development.js:21626:16)
      at beginWork$1 (node_modules/react-dom/cjs/react-dom.development.js:27465:14)
      at performUnitOfWork (node_modules/react-dom/cjs/react-dom.development.js:26599:12)
      at workLoopSync (node_modules/react-dom/cjs/react-dom.development.js:26505:5)
      at renderRootSync (node_modules/react-dom/cjs/react-dom.development.js:26473:7)
      at performConcurrentWorkOnRoot (node_modules/react-dom/cjs/react-dom.development.js:25777:74)
      at flushActQueue (node_modules/react/cjs/react.development.js:2667:24)
      at act (node_modules/react/cjs/react.development.js:2582:11)
      at node_modules/@testing-library/react/dist/act-compat.js:47:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:190:26)
      at render (node_modules/@testing-library/react/dist/pure.js:292:10)
      at Object.<anonymous> (src/__tests__/App.integration.test.tsx:30:11)

    console.error
      Error: Uncaught [Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
      
      Check the render method of `App`.]
          at reportException (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/helpers/runtime-script-errors.js:66:24)
          at innerInvokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:353:9)
          at invokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:286:3)
          at HTMLUnknownElementImpl._dispatch (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:233:9)
          at HTMLUnknownElementImpl.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:104:17)
          at HTMLUnknownElement.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/generated/EventTarget.js:241:34)
          at Object.invokeGuardedCallbackDev (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4213:16)
          at invokeGuardedCallback (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4277:31)
          at beginWork$1 (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:27490:7)
          at performUnitOfWork (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26599:12)
          at workLoopSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26505:5)
          at renderRootSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26473:7)
          at performConcurrentWorkOnRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:25777:74)
          at flushActQueue (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2667:24)
          at act (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2582:11)
          at /home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/act-compat.js:47:25
          at renderRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:190:26)
          at render (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:292:10)
          at Object.<anonymous> (/home/runner/work/blackjack-simulator/blackjack-simulator/src/__tests__/App.integration.test.tsx:30:11)
          at Promise.finally.completed (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1559:28)
          at new Promise (<anonymous>)
          at callAsyncCircusFn (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1499:10)
          at _callCircusTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1009:40)
          at processTicksAndRejections (node:internal/process/task_queues:95:5)
          at _runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:949:3)
          at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:839:13)
          at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:829:11)
          at run (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:757:3)
          at runAndTransformResultsToJestFormat (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1920:21)
          at jestAdapter (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/runner.js:101:19)
          at runTestInternal (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:275:16)
          at runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:343:7)
          at Object.worker (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:497:12) {
        detail: Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
        
        Check the render method of `App`.
            at createFiberFromTypeAndProps (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:28478:17)
            at createFiberFromElement (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:28504:15)
            at createChild (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:13345:28)
            at reconcileChildrenArray (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:13640:25)
            at reconcileChildFibers (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:14057:16)
            at reconcileChildren (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:19186:28)
            at updateHostComponent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:19953:3)
            at beginWork (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:21657:14)
            at HTMLUnknownElement.callCallback (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4164:14)
            at HTMLUnknownElement.callTheUserObjectsOperation (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/generated/EventListener.js:26:30)
            at innerInvokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:350:25)
            at invokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:286:3)
            at HTMLUnknownElementImpl._dispatch (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:233:9)
            at HTMLUnknownElementImpl.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:104:17)
            at HTMLUnknownElement.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/generated/EventTarget.js:241:34)
            at Object.invokeGuardedCallbackDev (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4213:16)
            at invokeGuardedCallback (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4277:31)
            at beginWork$1 (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:27490:7)
            at performUnitOfWork (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26599:12)
            at workLoopSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26505:5)
            at renderRootSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26473:7)
            at performConcurrentWorkOnRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:25777:74)
            at flushActQueue (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2667:24)
            at act (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2582:11)
            at /home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/act-compat.js:47:25
            at renderRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:190:26)
            at render (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:292:10)
            at Object.<anonymous> (/home/runner/work/blackjack-simulator/blackjack-simulator/src/__tests__/App.integration.test.tsx:30:11)
            at Promise.finally.completed (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1559:28)
            at new Promise (<anonymous>)
            at callAsyncCircusFn (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1499:10)
            at _callCircusTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1009:40)
            at processTicksAndRejections (node:internal/process/task_queues:95:5)
            at _runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:949:3)
            at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:839:13)
            at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:829:11)
            at run (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:757:3)
            at runAndTransformResultsToJestFormat (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1920:21)
            at jestAdapter (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/runner.js:101:19)
            at runTestInternal (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:275:16)
            at runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:343:7)
            at Object.worker (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:497:12),
        type: 'unhandled exception'
      }

      28 |
      29 |   it('renders navigation buttons', () => {
    > 30 |     render(<App />);
         |           ^
      31 |     expect(screen.getByText('Simulator')).toBeInTheDocument();
      32 |     expect(screen.getByText('3D Demo')).toBeInTheDocument();
      33 |   });

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at VirtualConsole.<anonymous> (node_modules/@jest/environment-jsdom-abstract/build/index.js:78:23)
      at reportException (node_modules/jsdom/lib/jsdom/living/helpers/runtime-script-errors.js:70:28)
      at innerInvokeEventListeners (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:353:9)
      at invokeEventListeners (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:286:3)
      at HTMLUnknownElementImpl._dispatch (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:233:9)
      at HTMLUnknownElementImpl.dispatchEvent (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:104:17)
      at HTMLUnknownElement.dispatchEvent (node_modules/jsdom/lib/jsdom/living/generated/EventTarget.js:241:34)
      at Object.invokeGuardedCallbackDev (node_modules/react-dom/cjs/react-dom.development.js:4213:16)
      at invokeGuardedCallback (node_modules/react-dom/cjs/react-dom.development.js:4277:31)
      at beginWork$1 (node_modules/react-dom/cjs/react-dom.development.js:27490:7)
      at performUnitOfWork (node_modules/react-dom/cjs/react-dom.development.js:26599:12)
      at workLoopSync (node_modules/react-dom/cjs/react-dom.development.js:26505:5)
      at renderRootSync (node_modules/react-dom/cjs/react-dom.development.js:26473:7)
      at performConcurrentWorkOnRoot (node_modules/react-dom/cjs/react-dom.development.js:25777:74)
      at flushActQueue (node_modules/react/cjs/react.development.js:2667:24)
      at act (node_modules/react/cjs/react.development.js:2582:11)
      at node_modules/@testing-library/react/dist/act-compat.js:47:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:190:26)
      at render (node_modules/@testing-library/react/dist/pure.js:292:10)
      at Object.<anonymous> (src/__tests__/App.integration.test.tsx:30:11)

    console.error
      Warning: React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
      
      Check the render method of `App`.
          at App (/home/runner/work/blackjack-simulator/blackjack-simulator/src/App.tsx:7:35)

      51 |
      52 |       {/* Content */}
    > 53 |       {view === 'simulator' && <BlackjackSimulator />}
         |                                ^
      54 |       {view === '3d-demo' && <Game3DDemo />}
      55 |       {view === 'interactive' && <InteractiveGamePage />}
      56 |     </div>

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at printWarning (node_modules/react/cjs/react-jsx-runtime.development.js:87:30)
      at error (node_modules/react/cjs/react-jsx-runtime.development.js:61:7)
      at jsxWithValidation (node_modules/react/cjs/react-jsx-runtime.development.js:1245:7)
      at jsxWithValidationDynamic (node_modules/react/cjs/react-jsx-runtime.development.js:1320:12)
      at App (src/App.tsx:53:32)
      at renderWithHooks (node_modules/react-dom/cjs/react-dom.development.js:15486:18)
      at mountIndeterminateComponent (node_modules/react-dom/cjs/react-dom.development.js:20103:13)
      at beginWork (node_modules/react-dom/cjs/react-dom.development.js:21626:16)
      at beginWork$1 (node_modules/react-dom/cjs/react-dom.development.js:27465:14)
      at performUnitOfWork (node_modules/react-dom/cjs/react-dom.development.js:26599:12)
      at workLoopSync (node_modules/react-dom/cjs/react-dom.development.js:26505:5)
      at renderRootSync (node_modules/react-dom/cjs/react-dom.development.js:26473:7)
      at recoverFromConcurrentError (node_modules/react-dom/cjs/react-dom.development.js:25889:20)
      at performConcurrentWorkOnRoot (node_modules/react-dom/cjs/react-dom.development.js:25789:22)
      at flushActQueue (node_modules/react/cjs/react.development.js:2667:24)
      at act (node_modules/react/cjs/react.development.js:2582:11)
      at node_modules/@testing-library/react/dist/act-compat.js:47:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:190:26)
      at render (node_modules/@testing-library/react/dist/pure.js:292:10)
      at Object.<anonymous> (src/__tests__/App.integration.test.tsx:30:11)

    console.error
      Error: Uncaught [Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
      
      Check the render method of `App`.]
          at reportException (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/helpers/runtime-script-errors.js:66:24)
          at innerInvokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:353:9)
          at invokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:286:3)
          at HTMLUnknownElementImpl._dispatch (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:233:9)
          at HTMLUnknownElementImpl.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:104:17)
          at HTMLUnknownElement.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/generated/EventTarget.js:241:34)
          at Object.invokeGuardedCallbackDev (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4213:16)
          at invokeGuardedCallback (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4277:31)
          at beginWork$1 (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:27490:7)
          at performUnitOfWork (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26599:12)
          at workLoopSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26505:5)
          at renderRootSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26473:7)
          at recoverFromConcurrentError (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:25889:20)
          at performConcurrentWorkOnRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:25789:22)
          at flushActQueue (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2667:24)
          at act (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2582:11)
          at /home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/act-compat.js:47:25
          at renderRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:190:26)
          at render (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:292:10)
          at Object.<anonymous> (/home/runner/work/blackjack-simulator/blackjack-simulator/src/__tests__/App.integration.test.tsx:30:11)
          at Promise.finally.completed (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1559:28)
          at new Promise (<anonymous>)
          at callAsyncCircusFn (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1499:10)
          at _callCircusTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1009:40)
          at processTicksAndRejections (node:internal/process/task_queues:95:5)
          at _runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:949:3)
          at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:839:13)
          at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:829:11)
          at run (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:757:3)
          at runAndTransformResultsToJestFormat (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1920:21)
          at jestAdapter (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/runner.js:101:19)
          at runTestInternal (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:275:16)
          at runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:343:7)
          at Object.worker (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:497:12) {
        detail: Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
        
        Check the render method of `App`.
            at createFiberFromTypeAndProps (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:28478:17)
            at createFiberFromElement (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:28504:15)
            at createChild (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:13345:28)
            at reconcileChildrenArray (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:13640:25)
            at reconcileChildFibers (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:14057:16)
            at reconcileChildren (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:19186:28)
            at updateHostComponent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:19953:3)
            at beginWork (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:21657:14)
            at HTMLUnknownElement.callCallback (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4164:14)
            at HTMLUnknownElement.callTheUserObjectsOperation (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/generated/EventListener.js:26:30)
            at innerInvokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:350:25)
            at invokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:286:3)
            at HTMLUnknownElementImpl._dispatch (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:233:9)
            at HTMLUnknownElementImpl.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:104:17)
            at HTMLUnknownElement.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/generated/EventTarget.js:241:34)
            at Object.invokeGuardedCallbackDev (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4213:16)
            at invokeGuardedCallback (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4277:31)
            at beginWork$1 (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:27490:7)
            at performUnitOfWork (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26599:12)
            at workLoopSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26505:5)
            at renderRootSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26473:7)
            at recoverFromConcurrentError (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:25889:20)
            at performConcurrentWorkOnRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:25789:22)
            at flushActQueue (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2667:24)
            at act (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2582:11)
            at /home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/act-compat.js:47:25
            at renderRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:190:26)
            at render (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:292:10)
            at Object.<anonymous> (/home/runner/work/blackjack-simulator/blackjack-simulator/src/__tests__/App.integration.test.tsx:30:11)
            at Promise.finally.completed (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1559:28)
            at new Promise (<anonymous>)
            at callAsyncCircusFn (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1499:10)
            at _callCircusTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1009:40)
            at processTicksAndRejections (node:internal/process/task_queues:95:5)
            at _runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:949:3)
            at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:839:13)
            at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:829:11)
            at run (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:757:3)
            at runAndTransformResultsToJestFormat (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1920:21)
            at jestAdapter (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/runner.js:101:19)
            at runTestInternal (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:275:16)
            at runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:343:7)
            at Object.worker (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:497:12),
        type: 'unhandled exception'
      }

      28 |
      29 |   it('renders navigation buttons', () => {
    > 30 |     render(<App />);
         |           ^
      31 |     expect(screen.getByText('Simulator')).toBeInTheDocument();
      32 |     expect(screen.getByText('3D Demo')).toBeInTheDocument();
      33 |   });

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at VirtualConsole.<anonymous> (node_modules/@jest/environment-jsdom-abstract/build/index.js:78:23)
      at reportException (node_modules/jsdom/lib/jsdom/living/helpers/runtime-script-errors.js:70:28)
      at innerInvokeEventListeners (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:353:9)
      at invokeEventListeners (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:286:3)
      at HTMLUnknownElementImpl._dispatch (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:233:9)
      at HTMLUnknownElementImpl.dispatchEvent (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:104:17)
      at HTMLUnknownElement.dispatchEvent (node_modules/jsdom/lib/jsdom/living/generated/EventTarget.js:241:34)
      at Object.invokeGuardedCallbackDev (node_modules/react-dom/cjs/react-dom.development.js:4213:16)
      at invokeGuardedCallback (node_modules/react-dom/cjs/react-dom.development.js:4277:31)
      at beginWork$1 (node_modules/react-dom/cjs/react-dom.development.js:27490:7)
      at performUnitOfWork (node_modules/react-dom/cjs/react-dom.development.js:26599:12)
      at workLoopSync (node_modules/react-dom/cjs/react-dom.development.js:26505:5)
      at renderRootSync (node_modules/react-dom/cjs/react-dom.development.js:26473:7)
      at recoverFromConcurrentError (node_modules/react-dom/cjs/react-dom.development.js:25889:20)
      at performConcurrentWorkOnRoot (node_modules/react-dom/cjs/react-dom.development.js:25789:22)
      at flushActQueue (node_modules/react/cjs/react.development.js:2667:24)
      at act (node_modules/react/cjs/react.development.js:2582:11)
      at node_modules/@testing-library/react/dist/act-compat.js:47:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:190:26)
      at render (node_modules/@testing-library/react/dist/pure.js:292:10)
      at Object.<anonymous> (src/__tests__/App.integration.test.tsx:30:11)

    console.error
      The above error occurred in the <div> component:
      
          at div
          at App (/home/runner/work/blackjack-simulator/blackjack-simulator/src/App.tsx:7:35)
      
      Consider adding an error boundary to your tree to customize error handling behavior.
      Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.

      28 |
      29 |   it('renders navigation buttons', () => {
    > 30 |     render(<App />);
         |           ^
      31 |     expect(screen.getByText('Simulator')).toBeInTheDocument();
      32 |     expect(screen.getByText('3D Demo')).toBeInTheDocument();
      33 |   });

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at logCapturedError (node_modules/react-dom/cjs/react-dom.development.js:18704:23)
      at update.callback (node_modules/react-dom/cjs/react-dom.development.js:18737:5)
      at callCallback (node_modules/react-dom/cjs/react-dom.development.js:15036:12)
      at commitUpdateQueue (node_modules/react-dom/cjs/react-dom.development.js:15057:9)
      at commitLayoutEffectOnFiber (node_modules/react-dom/cjs/react-dom.development.js:23430:13)
      at commitLayoutMountEffects_complete (node_modules/react-dom/cjs/react-dom.development.js:24727:9)
      at commitLayoutEffects_begin (node_modules/react-dom/cjs/react-dom.development.js:24713:7)
      at commitLayoutEffects (node_modules/react-dom/cjs/react-dom.development.js:24651:3)
      at commitRootImpl (node_modules/react-dom/cjs/react-dom.development.js:26862:5)
      at commitRoot (node_modules/react-dom/cjs/react-dom.development.js:26721:5)
      at finishConcurrentRender (node_modules/react-dom/cjs/react-dom.development.js:25931:9)
      at performConcurrentWorkOnRoot (node_modules/react-dom/cjs/react-dom.development.js:25848:7)
      at flushActQueue (node_modules/react/cjs/react.development.js:2667:24)
      at act (node_modules/react/cjs/react.development.js:2582:11)
      at node_modules/@testing-library/react/dist/act-compat.js:47:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:190:26)
      at render (node_modules/@testing-library/react/dist/pure.js:292:10)
      at Object.<anonymous> (src/__tests__/App.integration.test.tsx:30:11)

    console.error
      Warning: React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
      
      Check the render method of `App`.
          at App (/home/runner/work/blackjack-simulator/blackjack-simulator/src/App.tsx:7:35)

      51 |
      52 |       {/* Content */}
    > 53 |       {view === 'simulator' && <BlackjackSimulator />}
         |                                ^
      54 |       {view === '3d-demo' && <Game3DDemo />}
      55 |       {view === 'interactive' && <InteractiveGamePage />}
      56 |     </div>

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at printWarning (node_modules/react/cjs/react-jsx-runtime.development.js:87:30)
      at error (node_modules/react/cjs/react-jsx-runtime.development.js:61:7)
      at jsxWithValidation (node_modules/react/cjs/react-jsx-runtime.development.js:1245:7)
      at jsxWithValidationDynamic (node_modules/react/cjs/react-jsx-runtime.development.js:1320:12)
      at App (src/App.tsx:53:32)
      at renderWithHooks (node_modules/react-dom/cjs/react-dom.development.js:15486:18)
      at mountIndeterminateComponent (node_modules/react-dom/cjs/react-dom.development.js:20103:13)
      at beginWork (node_modules/react-dom/cjs/react-dom.development.js:21626:16)
      at beginWork$1 (node_modules/react-dom/cjs/react-dom.development.js:27465:14)
      at performUnitOfWork (node_modules/react-dom/cjs/react-dom.development.js:26599:12)
      at workLoopSync (node_modules/react-dom/cjs/react-dom.development.js:26505:5)
      at renderRootSync (node_modules/react-dom/cjs/react-dom.development.js:26473:7)
      at performConcurrentWorkOnRoot (node_modules/react-dom/cjs/react-dom.development.js:25777:74)
      at flushActQueue (node_modules/react/cjs/react.development.js:2667:24)
      at act (node_modules/react/cjs/react.development.js:2582:11)
      at node_modules/@testing-library/react/dist/act-compat.js:47:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:190:26)
      at render (node_modules/@testing-library/react/dist/pure.js:292:10)
      at Object.<anonymous> (src/__tests__/App.integration.test.tsx:36:11)

    console.error
      Error: Uncaught [Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
      
      Check the render method of `App`.]
          at reportException (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/helpers/runtime-script-errors.js:66:24)
          at innerInvokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:353:9)
          at invokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:286:3)
          at HTMLUnknownElementImpl._dispatch (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:233:9)
          at HTMLUnknownElementImpl.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:104:17)
          at HTMLUnknownElement.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/generated/EventTarget.js:241:34)
          at Object.invokeGuardedCallbackDev (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4213:16)
          at invokeGuardedCallback (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4277:31)
          at beginWork$1 (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:27490:7)
          at performUnitOfWork (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26599:12)
          at workLoopSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26505:5)
          at renderRootSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26473:7)
          at performConcurrentWorkOnRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:25777:74)
          at flushActQueue (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2667:24)
          at act (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2582:11)
          at /home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/act-compat.js:47:25
          at renderRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:190:26)
          at render (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:292:10)
          at Object.<anonymous> (/home/runner/work/blackjack-simulator/blackjack-simulator/src/__tests__/App.integration.test.tsx:36:11)
          at Promise.finally.completed (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1559:28)
          at new Promise (<anonymous>)
          at callAsyncCircusFn (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1499:10)
          at _callCircusTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1009:40)
          at processTicksAndRejections (node:internal/process/task_queues:95:5)
          at _runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:949:3)
          at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:839:13)
          at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:829:11)
          at run (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:757:3)
          at runAndTransformResultsToJestFormat (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1920:21)
          at jestAdapter (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/runner.js:101:19)
          at runTestInternal (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:275:16)
          at runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:343:7)
          at Object.worker (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:497:12) {
        detail: Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
        
        Check the render method of `App`.
            at createFiberFromTypeAndProps (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:28478:17)
            at createFiberFromElement (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:28504:15)
            at createChild (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:13345:28)
            at reconcileChildrenArray (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:13640:25)
            at reconcileChildFibers (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:14057:16)
            at reconcileChildren (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:19186:28)
            at updateHostComponent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:19953:3)
            at beginWork (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:21657:14)
            at HTMLUnknownElement.callCallback (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4164:14)
            at HTMLUnknownElement.callTheUserObjectsOperation (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/generated/EventListener.js:26:30)
            at innerInvokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:350:25)
            at invokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:286:3)
            at HTMLUnknownElementImpl._dispatch (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:233:9)
            at HTMLUnknownElementImpl.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:104:17)
            at HTMLUnknownElement.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/generated/EventTarget.js:241:34)
            at Object.invokeGuardedCallbackDev (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4213:16)
            at invokeGuardedCallback (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4277:31)
            at beginWork$1 (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:27490:7)
            at performUnitOfWork (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26599:12)
            at workLoopSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26505:5)
            at renderRootSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26473:7)
            at performConcurrentWorkOnRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:25777:74)
            at flushActQueue (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2667:24)
            at act (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2582:11)
            at /home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/act-compat.js:47:25
            at renderRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:190:26)
            at render (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:292:10)
            at Object.<anonymous> (/home/runner/work/blackjack-simulator/blackjack-simulator/src/__tests__/App.integration.test.tsx:36:11)
            at Promise.finally.completed (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1559:28)
            at new Promise (<anonymous>)
            at callAsyncCircusFn (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1499:10)
            at _callCircusTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1009:40)
            at processTicksAndRejections (node:internal/process/task_queues:95:5)
            at _runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:949:3)
            at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:839:13)
            at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:829:11)
            at run (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:757:3)
            at runAndTransformResultsToJestFormat (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1920:21)
            at jestAdapter (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/runner.js:101:19)
            at runTestInternal (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:275:16)
            at runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:343:7)
            at Object.worker (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:497:12),
        type: 'unhandled exception'
      }

      34 |
      35 |   it('starts with simulator view by default', () => {
    > 36 |     render(<App />);
         |           ^
      37 |     expect(screen.getByTestId('blackjack-simulator-mock')).toBeInTheDocument();
      38 |     expect(screen.queryByTestId('game-3d-demo-mock')).not.toBeInTheDocument();
      39 |   });

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at VirtualConsole.<anonymous> (node_modules/@jest/environment-jsdom-abstract/build/index.js:78:23)
      at reportException (node_modules/jsdom/lib/jsdom/living/helpers/runtime-script-errors.js:70:28)
      at innerInvokeEventListeners (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:353:9)
      at invokeEventListeners (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:286:3)
      at HTMLUnknownElementImpl._dispatch (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:233:9)
      at HTMLUnknownElementImpl.dispatchEvent (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:104:17)
      at HTMLUnknownElement.dispatchEvent (node_modules/jsdom/lib/jsdom/living/generated/EventTarget.js:241:34)
      at Object.invokeGuardedCallbackDev (node_modules/react-dom/cjs/react-dom.development.js:4213:16)
      at invokeGuardedCallback (node_modules/react-dom/cjs/react-dom.development.js:4277:31)
      at beginWork$1 (node_modules/react-dom/cjs/react-dom.development.js:27490:7)
      at performUnitOfWork (node_modules/react-dom/cjs/react-dom.development.js:26599:12)
      at workLoopSync (node_modules/react-dom/cjs/react-dom.development.js:26505:5)
      at renderRootSync (node_modules/react-dom/cjs/react-dom.development.js:26473:7)
      at performConcurrentWorkOnRoot (node_modules/react-dom/cjs/react-dom.development.js:25777:74)
      at flushActQueue (node_modules/react/cjs/react.development.js:2667:24)
      at act (node_modules/react/cjs/react.development.js:2582:11)
      at node_modules/@testing-library/react/dist/act-compat.js:47:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:190:26)
      at render (node_modules/@testing-library/react/dist/pure.js:292:10)
      at Object.<anonymous> (src/__tests__/App.integration.test.tsx:36:11)

    console.error
      Warning: React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
      
      Check the render method of `App`.
          at App (/home/runner/work/blackjack-simulator/blackjack-simulator/src/App.tsx:7:35)

      51 |
      52 |       {/* Content */}
    > 53 |       {view === 'simulator' && <BlackjackSimulator />}
         |                                ^
      54 |       {view === '3d-demo' && <Game3DDemo />}
      55 |       {view === 'interactive' && <InteractiveGamePage />}
      56 |     </div>

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at printWarning (node_modules/react/cjs/react-jsx-runtime.development.js:87:30)
      at error (node_modules/react/cjs/react-jsx-runtime.development.js:61:7)
      at jsxWithValidation (node_modules/react/cjs/react-jsx-runtime.development.js:1245:7)
      at jsxWithValidationDynamic (node_modules/react/cjs/react-jsx-runtime.development.js:1320:12)
      at App (src/App.tsx:53:32)
      at renderWithHooks (node_modules/react-dom/cjs/react-dom.development.js:15486:18)
      at mountIndeterminateComponent (node_modules/react-dom/cjs/react-dom.development.js:20103:13)
      at beginWork (node_modules/react-dom/cjs/react-dom.development.js:21626:16)
      at beginWork$1 (node_modules/react-dom/cjs/react-dom.development.js:27465:14)
      at performUnitOfWork (node_modules/react-dom/cjs/react-dom.development.js:26599:12)
      at workLoopSync (node_modules/react-dom/cjs/react-dom.development.js:26505:5)
      at renderRootSync (node_modules/react-dom/cjs/react-dom.development.js:26473:7)
      at recoverFromConcurrentError (node_modules/react-dom/cjs/react-dom.development.js:25889:20)
      at performConcurrentWorkOnRoot (node_modules/react-dom/cjs/react-dom.development.js:25789:22)
      at flushActQueue (node_modules/react/cjs/react.development.js:2667:24)
      at act (node_modules/react/cjs/react.development.js:2582:11)
      at node_modules/@testing-library/react/dist/act-compat.js:47:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:190:26)
      at render (node_modules/@testing-library/react/dist/pure.js:292:10)
      at Object.<anonymous> (src/__tests__/App.integration.test.tsx:36:11)

    console.error
      Error: Uncaught [Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
      
      Check the render method of `App`.]
          at reportException (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/helpers/runtime-script-errors.js:66:24)
          at innerInvokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:353:9)
          at invokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:286:3)
          at HTMLUnknownElementImpl._dispatch (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:233:9)
          at HTMLUnknownElementImpl.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:104:17)
          at HTMLUnknownElement.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/generated/EventTarget.js:241:34)
          at Object.invokeGuardedCallbackDev (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4213:16)
          at invokeGuardedCallback (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4277:31)
          at beginWork$1 (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:27490:7)
          at performUnitOfWork (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26599:12)
          at workLoopSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26505:5)
          at renderRootSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26473:7)
          at recoverFromConcurrentError (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:25889:20)
          at performConcurrentWorkOnRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:25789:22)
          at flushActQueue (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2667:24)
          at act (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2582:11)
          at /home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/act-compat.js:47:25
          at renderRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:190:26)
          at render (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:292:10)
          at Object.<anonymous> (/home/runner/work/blackjack-simulator/blackjack-simulator/src/__tests__/App.integration.test.tsx:36:11)
          at Promise.finally.completed (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1559:28)
          at new Promise (<anonymous>)
          at callAsyncCircusFn (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1499:10)
          at _callCircusTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1009:40)
          at processTicksAndRejections (node:internal/process/task_queues:95:5)
          at _runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:949:3)
          at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:839:13)
          at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:829:11)
          at run (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:757:3)
          at runAndTransformResultsToJestFormat (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1920:21)
          at jestAdapter (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/runner.js:101:19)
          at runTestInternal (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:275:16)
          at runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:343:7)
          at Object.worker (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:497:12) {
        detail: Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
        
        Check the render method of `App`.
            at createFiberFromTypeAndProps (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:28478:17)
            at createFiberFromElement (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:28504:15)
            at createChild (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:13345:28)
            at reconcileChildrenArray (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:13640:25)
            at reconcileChildFibers (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:14057:16)
            at reconcileChildren (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:19186:28)
            at updateHostComponent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:19953:3)
            at beginWork (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:21657:14)
            at HTMLUnknownElement.callCallback (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4164:14)
            at HTMLUnknownElement.callTheUserObjectsOperation (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/generated/EventListener.js:26:30)
            at innerInvokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:350:25)
            at invokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:286:3)
            at HTMLUnknownElementImpl._dispatch (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:233:9)
            at HTMLUnknownElementImpl.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:104:17)
            at HTMLUnknownElement.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/generated/EventTarget.js:241:34)
            at Object.invokeGuardedCallbackDev (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4213:16)
            at invokeGuardedCallback (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4277:31)
            at beginWork$1 (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:27490:7)
            at performUnitOfWork (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26599:12)
            at workLoopSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26505:5)
            at renderRootSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26473:7)
            at recoverFromConcurrentError (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:25889:20)
            at performConcurrentWorkOnRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:25789:22)
            at flushActQueue (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2667:24)
            at act (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2582:11)
            at /home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/act-compat.js:47:25
            at renderRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:190:26)
            at render (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:292:10)
            at Object.<anonymous> (/home/runner/work/blackjack-simulator/blackjack-simulator/src/__tests__/App.integration.test.tsx:36:11)
            at Promise.finally.completed (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1559:28)
            at new Promise (<anonymous>)
            at callAsyncCircusFn (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1499:10)
            at _callCircusTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1009:40)
            at processTicksAndRejections (node:internal/process/task_queues:95:5)
            at _runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:949:3)
            at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:839:13)
            at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:829:11)
            at run (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:757:3)
            at runAndTransformResultsToJestFormat (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1920:21)
            at jestAdapter (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/runner.js:101:19)
            at runTestInternal (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:275:16)
            at runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:343:7)
            at Object.worker (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:497:12),
        type: 'unhandled exception'
      }

      34 |
      35 |   it('starts with simulator view by default', () => {
    > 36 |     render(<App />);
         |           ^
      37 |     expect(screen.getByTestId('blackjack-simulator-mock')).toBeInTheDocument();
      38 |     expect(screen.queryByTestId('game-3d-demo-mock')).not.toBeInTheDocument();
      39 |   });

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at VirtualConsole.<anonymous> (node_modules/@jest/environment-jsdom-abstract/build/index.js:78:23)
      at reportException (node_modules/jsdom/lib/jsdom/living/helpers/runtime-script-errors.js:70:28)
      at innerInvokeEventListeners (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:353:9)
      at invokeEventListeners (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:286:3)
      at HTMLUnknownElementImpl._dispatch (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:233:9)
      at HTMLUnknownElementImpl.dispatchEvent (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:104:17)
      at HTMLUnknownElement.dispatchEvent (node_modules/jsdom/lib/jsdom/living/generated/EventTarget.js:241:34)
      at Object.invokeGuardedCallbackDev (node_modules/react-dom/cjs/react-dom.development.js:4213:16)
      at invokeGuardedCallback (node_modules/react-dom/cjs/react-dom.development.js:4277:31)
      at beginWork$1 (node_modules/react-dom/cjs/react-dom.development.js:27490:7)
      at performUnitOfWork (node_modules/react-dom/cjs/react-dom.development.js:26599:12)
      at workLoopSync (node_modules/react-dom/cjs/react-dom.development.js:26505:5)
      at renderRootSync (node_modules/react-dom/cjs/react-dom.development.js:26473:7)
      at recoverFromConcurrentError (node_modules/react-dom/cjs/react-dom.development.js:25889:20)
      at performConcurrentWorkOnRoot (node_modules/react-dom/cjs/react-dom.development.js:25789:22)
      at flushActQueue (node_modules/react/cjs/react.development.js:2667:24)
      at act (node_modules/react/cjs/react.development.js:2582:11)
      at node_modules/@testing-library/react/dist/act-compat.js:47:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:190:26)
      at render (node_modules/@testing-library/react/dist/pure.js:292:10)
      at Object.<anonymous> (src/__tests__/App.integration.test.tsx:36:11)

    console.error
      The above error occurred in the <div> component:
      
          at div
          at App (/home/runner/work/blackjack-simulator/blackjack-simulator/src/App.tsx:7:35)
      
      Consider adding an error boundary to your tree to customize error handling behavior.
      Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.

      34 |
      35 |   it('starts with simulator view by default', () => {
    > 36 |     render(<App />);
         |           ^
      37 |     expect(screen.getByTestId('blackjack-simulator-mock')).toBeInTheDocument();
      38 |     expect(screen.queryByTestId('game-3d-demo-mock')).not.toBeInTheDocument();
      39 |   });

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at logCapturedError (node_modules/react-dom/cjs/react-dom.development.js:18704:23)
      at update.callback (node_modules/react-dom/cjs/react-dom.development.js:18737:5)
      at callCallback (node_modules/react-dom/cjs/react-dom.development.js:15036:12)
      at commitUpdateQueue (node_modules/react-dom/cjs/react-dom.development.js:15057:9)
      at commitLayoutEffectOnFiber (node_modules/react-dom/cjs/react-dom.development.js:23430:13)
      at commitLayoutMountEffects_complete (node_modules/react-dom/cjs/react-dom.development.js:24727:9)
      at commitLayoutEffects_begin (node_modules/react-dom/cjs/react-dom.development.js:24713:7)
      at commitLayoutEffects (node_modules/react-dom/cjs/react-dom.development.js:24651:3)
      at commitRootImpl (node_modules/react-dom/cjs/react-dom.development.js:26862:5)
      at commitRoot (node_modules/react-dom/cjs/react-dom.development.js:26721:5)
      at finishConcurrentRender (node_modules/react-dom/cjs/react-dom.development.js:25931:9)
      at performConcurrentWorkOnRoot (node_modules/react-dom/cjs/react-dom.development.js:25848:7)
      at flushActQueue (node_modules/react/cjs/react.development.js:2667:24)
      at act (node_modules/react/cjs/react.development.js:2582:11)
      at node_modules/@testing-library/react/dist/act-compat.js:47:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:190:26)
      at render (node_modules/@testing-library/react/dist/pure.js:292:10)
      at Object.<anonymous> (src/__tests__/App.integration.test.tsx:36:11)

    console.error
      Warning: React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
      
      Check the render method of `App`.
          at App (/home/runner/work/blackjack-simulator/blackjack-simulator/src/App.tsx:7:35)

      51 |
      52 |       {/* Content */}
    > 53 |       {view === 'simulator' && <BlackjackSimulator />}
         |                                ^
      54 |       {view === '3d-demo' && <Game3DDemo />}
      55 |       {view === 'interactive' && <InteractiveGamePage />}
      56 |     </div>

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at printWarning (node_modules/react/cjs/react-jsx-runtime.development.js:87:30)
      at error (node_modules/react/cjs/react-jsx-runtime.development.js:61:7)
      at jsxWithValidation (node_modules/react/cjs/react-jsx-runtime.development.js:1245:7)
      at jsxWithValidationDynamic (node_modules/react/cjs/react-jsx-runtime.development.js:1320:12)
      at App (src/App.tsx:53:32)
      at renderWithHooks (node_modules/react-dom/cjs/react-dom.development.js:15486:18)
      at mountIndeterminateComponent (node_modules/react-dom/cjs/react-dom.development.js:20103:13)
      at beginWork (node_modules/react-dom/cjs/react-dom.development.js:21626:16)
      at beginWork$1 (node_modules/react-dom/cjs/react-dom.development.js:27465:14)
      at performUnitOfWork (node_modules/react-dom/cjs/react-dom.development.js:26599:12)
      at workLoopSync (node_modules/react-dom/cjs/react-dom.development.js:26505:5)
      at renderRootSync (node_modules/react-dom/cjs/react-dom.development.js:26473:7)
      at performConcurrentWorkOnRoot (node_modules/react-dom/cjs/react-dom.development.js:25777:74)
      at flushActQueue (node_modules/react/cjs/react.development.js:2667:24)
      at act (node_modules/react/cjs/react.development.js:2582:11)
      at node_modules/@testing-library/react/dist/act-compat.js:47:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:190:26)
      at render (node_modules/@testing-library/react/dist/pure.js:292:10)
      at Object.<anonymous> (src/__tests__/App.integration.test.tsx:42:11)

    console.error
      Error: Uncaught [Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
      
      Check the render method of `App`.]
          at reportException (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/helpers/runtime-script-errors.js:66:24)
          at innerInvokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:353:9)
          at invokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:286:3)
          at HTMLUnknownElementImpl._dispatch (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:233:9)
          at HTMLUnknownElementImpl.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:104:17)
          at HTMLUnknownElement.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/generated/EventTarget.js:241:34)
          at Object.invokeGuardedCallbackDev (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4213:16)
          at invokeGuardedCallback (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4277:31)
          at beginWork$1 (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:27490:7)
          at performUnitOfWork (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26599:12)
          at workLoopSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26505:5)
          at renderRootSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26473:7)
          at performConcurrentWorkOnRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:25777:74)
          at flushActQueue (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2667:24)
          at act (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2582:11)
          at /home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/act-compat.js:47:25
          at renderRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:190:26)
          at render (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:292:10)
          at Object.<anonymous> (/home/runner/work/blackjack-simulator/blackjack-simulator/src/__tests__/App.integration.test.tsx:42:11)
          at Promise.finally.completed (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1559:28)
          at new Promise (<anonymous>)
          at callAsyncCircusFn (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1499:10)
          at _callCircusTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1009:40)
          at processTicksAndRejections (node:internal/process/task_queues:95:5)
          at _runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:949:3)
          at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:839:13)
          at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:829:11)
          at run (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:757:3)
          at runAndTransformResultsToJestFormat (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1920:21)
          at jestAdapter (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/runner.js:101:19)
          at runTestInternal (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:275:16)
          at runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:343:7)
          at Object.worker (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:497:12) {
        detail: Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
        
        Check the render method of `App`.
            at createFiberFromTypeAndProps (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:28478:17)
            at createFiberFromElement (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:28504:15)
            at createChild (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:13345:28)
            at reconcileChildrenArray (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:13640:25)
            at reconcileChildFibers (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:14057:16)
            at reconcileChildren (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:19186:28)
            at updateHostComponent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:19953:3)
            at beginWork (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:21657:14)
            at HTMLUnknownElement.callCallback (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4164:14)
            at HTMLUnknownElement.callTheUserObjectsOperation (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/generated/EventListener.js:26:30)
            at innerInvokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:350:25)
            at invokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:286:3)
            at HTMLUnknownElementImpl._dispatch (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:233:9)
            at HTMLUnknownElementImpl.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:104:17)
            at HTMLUnknownElement.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/generated/EventTarget.js:241:34)
            at Object.invokeGuardedCallbackDev (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4213:16)
            at invokeGuardedCallback (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4277:31)
            at beginWork$1 (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:27490:7)
            at performUnitOfWork (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26599:12)
            at workLoopSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26505:5)
            at renderRootSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26473:7)
            at performConcurrentWorkOnRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:25777:74)
            at flushActQueue (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2667:24)
            at act (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2582:11)
            at /home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/act-compat.js:47:25
            at renderRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:190:26)
            at render (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:292:10)
            at Object.<anonymous> (/home/runner/work/blackjack-simulator/blackjack-simulator/src/__tests__/App.integration.test.tsx:42:11)
            at Promise.finally.completed (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1559:28)
            at new Promise (<anonymous>)
            at callAsyncCircusFn (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1499:10)
            at _callCircusTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1009:40)
            at processTicksAndRejections (node:internal/process/task_queues:95:5)
            at _runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:949:3)
            at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:839:13)
            at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:829:11)
            at run (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:757:3)
            at runAndTransformResultsToJestFormat (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1920:21)
            at jestAdapter (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/runner.js:101:19)
            at runTestInternal (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:275:16)
            at runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:343:7)
            at Object.worker (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:497:12),
        type: 'unhandled exception'
      }

      40 |
      41 |   it('switches to 3D demo when button is clicked', () => {
    > 42 |     render(<App />);
         |           ^
      43 |     
      44 |     const threeDButton = screen.getByText('3D Demo');
      45 |     fireEvent.click(threeDButton);

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at VirtualConsole.<anonymous> (node_modules/@jest/environment-jsdom-abstract/build/index.js:78:23)
      at reportException (node_modules/jsdom/lib/jsdom/living/helpers/runtime-script-errors.js:70:28)
      at innerInvokeEventListeners (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:353:9)
      at invokeEventListeners (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:286:3)
      at HTMLUnknownElementImpl._dispatch (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:233:9)
      at HTMLUnknownElementImpl.dispatchEvent (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:104:17)
      at HTMLUnknownElement.dispatchEvent (node_modules/jsdom/lib/jsdom/living/generated/EventTarget.js:241:34)
      at Object.invokeGuardedCallbackDev (node_modules/react-dom/cjs/react-dom.development.js:4213:16)
      at invokeGuardedCallback (node_modules/react-dom/cjs/react-dom.development.js:4277:31)
      at beginWork$1 (node_modules/react-dom/cjs/react-dom.development.js:27490:7)
      at performUnitOfWork (node_modules/react-dom/cjs/react-dom.development.js:26599:12)
      at workLoopSync (node_modules/react-dom/cjs/react-dom.development.js:26505:5)
      at renderRootSync (node_modules/react-dom/cjs/react-dom.development.js:26473:7)
      at performConcurrentWorkOnRoot (node_modules/react-dom/cjs/react-dom.development.js:25777:74)
      at flushActQueue (node_modules/react/cjs/react.development.js:2667:24)
      at act (node_modules/react/cjs/react.development.js:2582:11)
      at node_modules/@testing-library/react/dist/act-compat.js:47:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:190:26)
      at render (node_modules/@testing-library/react/dist/pure.js:292:10)
      at Object.<anonymous> (src/__tests__/App.integration.test.tsx:42:11)

    console.error
      Warning: React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
      
      Check the render method of `App`.
          at App (/home/runner/work/blackjack-simulator/blackjack-simulator/src/App.tsx:7:35)

      51 |
      52 |       {/* Content */}
    > 53 |       {view === 'simulator' && <BlackjackSimulator />}
         |                                ^
      54 |       {view === '3d-demo' && <Game3DDemo />}
      55 |       {view === 'interactive' && <InteractiveGamePage />}
      56 |     </div>

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at printWarning (node_modules/react/cjs/react-jsx-runtime.development.js:87:30)
      at error (node_modules/react/cjs/react-jsx-runtime.development.js:61:7)
      at jsxWithValidation (node_modules/react/cjs/react-jsx-runtime.development.js:1245:7)
      at jsxWithValidationDynamic (node_modules/react/cjs/react-jsx-runtime.development.js:1320:12)
      at App (src/App.tsx:53:32)
      at renderWithHooks (node_modules/react-dom/cjs/react-dom.development.js:15486:18)
      at mountIndeterminateComponent (node_modules/react-dom/cjs/react-dom.development.js:20103:13)
      at beginWork (node_modules/react-dom/cjs/react-dom.development.js:21626:16)
      at beginWork$1 (node_modules/react-dom/cjs/react-dom.development.js:27465:14)
      at performUnitOfWork (node_modules/react-dom/cjs/react-dom.development.js:26599:12)
      at workLoopSync (node_modules/react-dom/cjs/react-dom.development.js:26505:5)
      at renderRootSync (node_modules/react-dom/cjs/react-dom.development.js:26473:7)
      at recoverFromConcurrentError (node_modules/react-dom/cjs/react-dom.development.js:25889:20)
      at performConcurrentWorkOnRoot (node_modules/react-dom/cjs/react-dom.development.js:25789:22)
      at flushActQueue (node_modules/react/cjs/react.development.js:2667:24)
      at act (node_modules/react/cjs/react.development.js:2582:11)
      at node_modules/@testing-library/react/dist/act-compat.js:47:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:190:26)
      at render (node_modules/@testing-library/react/dist/pure.js:292:10)
      at Object.<anonymous> (src/__tests__/App.integration.test.tsx:42:11)

    console.error
      Error: Uncaught [Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
      
      Check the render method of `App`.]
          at reportException (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/helpers/runtime-script-errors.js:66:24)
          at innerInvokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:353:9)
          at invokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:286:3)
          at HTMLUnknownElementImpl._dispatch (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:233:9)
          at HTMLUnknownElementImpl.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:104:17)
          at HTMLUnknownElement.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/generated/EventTarget.js:241:34)
          at Object.invokeGuardedCallbackDev (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4213:16)
          at invokeGuardedCallback (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4277:31)
          at beginWork$1 (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:27490:7)
          at performUnitOfWork (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26599:12)
          at workLoopSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26505:5)
          at renderRootSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26473:7)
          at recoverFromConcurrentError (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:25889:20)
          at performConcurrentWorkOnRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:25789:22)
          at flushActQueue (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2667:24)
          at act (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2582:11)
          at /home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/act-compat.js:47:25
          at renderRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:190:26)
          at render (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:292:10)
          at Object.<anonymous> (/home/runner/work/blackjack-simulator/blackjack-simulator/src/__tests__/App.integration.test.tsx:42:11)
          at Promise.finally.completed (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1559:28)
          at new Promise (<anonymous>)
          at callAsyncCircusFn (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1499:10)
          at _callCircusTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1009:40)
          at processTicksAndRejections (node:internal/process/task_queues:95:5)
          at _runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:949:3)
          at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:839:13)
          at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:829:11)
          at run (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:757:3)
          at runAndTransformResultsToJestFormat (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1920:21)
          at jestAdapter (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/runner.js:101:19)
          at runTestInternal (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:275:16)
          at runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:343:7)
          at Object.worker (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:497:12) {
        detail: Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
        
        Check the render method of `App`.
            at createFiberFromTypeAndProps (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:28478:17)
            at createFiberFromElement (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:28504:15)
            at createChild (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:13345:28)
            at reconcileChildrenArray (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:13640:25)
            at reconcileChildFibers (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:14057:16)
            at reconcileChildren (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:19186:28)
            at updateHostComponent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:19953:3)
            at beginWork (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:21657:14)
            at HTMLUnknownElement.callCallback (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4164:14)
            at HTMLUnknownElement.callTheUserObjectsOperation (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/generated/EventListener.js:26:30)
            at innerInvokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:350:25)
            at invokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:286:3)
            at HTMLUnknownElementImpl._dispatch (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:233:9)
            at HTMLUnknownElementImpl.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:104:17)
            at HTMLUnknownElement.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/generated/EventTarget.js:241:34)
            at Object.invokeGuardedCallbackDev (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4213:16)
            at invokeGuardedCallback (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4277:31)
            at beginWork$1 (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:27490:7)
            at performUnitOfWork (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26599:12)
            at workLoopSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26505:5)
            at renderRootSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26473:7)
            at recoverFromConcurrentError (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:25889:20)
            at performConcurrentWorkOnRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:25789:22)
            at flushActQueue (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2667:24)
            at act (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2582:11)
            at /home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/act-compat.js:47:25
            at renderRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:190:26)
            at render (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:292:10)
            at Object.<anonymous> (/home/runner/work/blackjack-simulator/blackjack-simulator/src/__tests__/App.integration.test.tsx:42:11)
            at Promise.finally.completed (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1559:28)
            at new Promise (<anonymous>)
            at callAsyncCircusFn (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1499:10)
            at _callCircusTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1009:40)
            at processTicksAndRejections (node:internal/process/task_queues:95:5)
            at _runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:949:3)
            at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:839:13)
            at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:829:11)
            at run (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:757:3)
            at runAndTransformResultsToJestFormat (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1920:21)
            at jestAdapter (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/runner.js:101:19)
            at runTestInternal (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:275:16)
            at runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:343:7)
            at Object.worker (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:497:12),
        type: 'unhandled exception'
      }

      40 |
      41 |   it('switches to 3D demo when button is clicked', () => {
    > 42 |     render(<App />);
         |           ^
      43 |     
      44 |     const threeDButton = screen.getByText('3D Demo');
      45 |     fireEvent.click(threeDButton);

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at VirtualConsole.<anonymous> (node_modules/@jest/environment-jsdom-abstract/build/index.js:78:23)
      at reportException (node_modules/jsdom/lib/jsdom/living/helpers/runtime-script-errors.js:70:28)
      at innerInvokeEventListeners (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:353:9)
      at invokeEventListeners (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:286:3)
      at HTMLUnknownElementImpl._dispatch (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:233:9)
      at HTMLUnknownElementImpl.dispatchEvent (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:104:17)
      at HTMLUnknownElement.dispatchEvent (node_modules/jsdom/lib/jsdom/living/generated/EventTarget.js:241:34)
      at Object.invokeGuardedCallbackDev (node_modules/react-dom/cjs/react-dom.development.js:4213:16)
      at invokeGuardedCallback (node_modules/react-dom/cjs/react-dom.development.js:4277:31)
      at beginWork$1 (node_modules/react-dom/cjs/react-dom.development.js:27490:7)
      at performUnitOfWork (node_modules/react-dom/cjs/react-dom.development.js:26599:12)
      at workLoopSync (node_modules/react-dom/cjs/react-dom.development.js:26505:5)
      at renderRootSync (node_modules/react-dom/cjs/react-dom.development.js:26473:7)
      at recoverFromConcurrentError (node_modules/react-dom/cjs/react-dom.development.js:25889:20)
      at performConcurrentWorkOnRoot (node_modules/react-dom/cjs/react-dom.development.js:25789:22)
      at flushActQueue (node_modules/react/cjs/react.development.js:2667:24)
      at act (node_modules/react/cjs/react.development.js:2582:11)
      at node_modules/@testing-library/react/dist/act-compat.js:47:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:190:26)
      at render (node_modules/@testing-library/react/dist/pure.js:292:10)
      at Object.<anonymous> (src/__tests__/App.integration.test.tsx:42:11)

    console.error
      The above error occurred in the <div> component:
      
          at div
          at App (/home/runner/work/blackjack-simulator/blackjack-simulator/src/App.tsx:7:35)
      
      Consider adding an error boundary to your tree to customize error handling behavior.
      Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.

      40 |
      41 |   it('switches to 3D demo when button is clicked', () => {
    > 42 |     render(<App />);
         |           ^
      43 |     
      44 |     const threeDButton = screen.getByText('3D Demo');
      45 |     fireEvent.click(threeDButton);

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at logCapturedError (node_modules/react-dom/cjs/react-dom.development.js:18704:23)
      at update.callback (node_modules/react-dom/cjs/react-dom.development.js:18737:5)
      at callCallback (node_modules/react-dom/cjs/react-dom.development.js:15036:12)
      at commitUpdateQueue (node_modules/react-dom/cjs/react-dom.development.js:15057:9)
      at commitLayoutEffectOnFiber (node_modules/react-dom/cjs/react-dom.development.js:23430:13)
      at commitLayoutMountEffects_complete (node_modules/react-dom/cjs/react-dom.development.js:24727:9)
      at commitLayoutEffects_begin (node_modules/react-dom/cjs/react-dom.development.js:24713:7)
      at commitLayoutEffects (node_modules/react-dom/cjs/react-dom.development.js:24651:3)
      at commitRootImpl (node_modules/react-dom/cjs/react-dom.development.js:26862:5)
      at commitRoot (node_modules/react-dom/cjs/react-dom.development.js:26721:5)
      at finishConcurrentRender (node_modules/react-dom/cjs/react-dom.development.js:25931:9)
      at performConcurrentWorkOnRoot (node_modules/react-dom/cjs/react-dom.development.js:25848:7)
      at flushActQueue (node_modules/react/cjs/react.development.js:2667:24)
      at act (node_modules/react/cjs/react.development.js:2582:11)
      at node_modules/@testing-library/react/dist/act-compat.js:47:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:190:26)
      at render (node_modules/@testing-library/react/dist/pure.js:292:10)
      at Object.<anonymous> (src/__tests__/App.integration.test.tsx:42:11)

    console.error
      Warning: React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
      
      Check the render method of `App`.
          at App (/home/runner/work/blackjack-simulator/blackjack-simulator/src/App.tsx:7:35)

      51 |
      52 |       {/* Content */}
    > 53 |       {view === 'simulator' && <BlackjackSimulator />}
         |                                ^
      54 |       {view === '3d-demo' && <Game3DDemo />}
      55 |       {view === 'interactive' && <InteractiveGamePage />}
      56 |     </div>

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at printWarning (node_modules/react/cjs/react-jsx-runtime.development.js:87:30)
      at error (node_modules/react/cjs/react-jsx-runtime.development.js:61:7)
      at jsxWithValidation (node_modules/react/cjs/react-jsx-runtime.development.js:1245:7)
      at jsxWithValidationDynamic (node_modules/react/cjs/react-jsx-runtime.development.js:1320:12)
      at App (src/App.tsx:53:32)
      at renderWithHooks (node_modules/react-dom/cjs/react-dom.development.js:15486:18)
      at mountIndeterminateComponent (node_modules/react-dom/cjs/react-dom.development.js:20103:13)
      at beginWork (node_modules/react-dom/cjs/react-dom.development.js:21626:16)
      at beginWork$1 (node_modules/react-dom/cjs/react-dom.development.js:27465:14)
      at performUnitOfWork (node_modules/react-dom/cjs/react-dom.development.js:26599:12)
      at workLoopSync (node_modules/react-dom/cjs/react-dom.development.js:26505:5)
      at renderRootSync (node_modules/react-dom/cjs/react-dom.development.js:26473:7)
      at performConcurrentWorkOnRoot (node_modules/react-dom/cjs/react-dom.development.js:25777:74)
      at flushActQueue (node_modules/react/cjs/react.development.js:2667:24)
      at act (node_modules/react/cjs/react.development.js:2582:11)
      at node_modules/@testing-library/react/dist/act-compat.js:47:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:190:26)
      at render (node_modules/@testing-library/react/dist/pure.js:292:10)
      at Object.<anonymous> (src/__tests__/App.integration.test.tsx:52:11)

    console.error
      Error: Uncaught [Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
      
      Check the render method of `App`.]
          at reportException (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/helpers/runtime-script-errors.js:66:24)
          at innerInvokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:353:9)
          at invokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:286:3)
          at HTMLUnknownElementImpl._dispatch (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:233:9)
          at HTMLUnknownElementImpl.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:104:17)
          at HTMLUnknownElement.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/generated/EventTarget.js:241:34)
          at Object.invokeGuardedCallbackDev (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4213:16)
          at invokeGuardedCallback (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4277:31)
          at beginWork$1 (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:27490:7)
          at performUnitOfWork (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26599:12)
          at workLoopSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26505:5)
          at renderRootSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26473:7)
          at performConcurrentWorkOnRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:25777:74)
          at flushActQueue (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2667:24)
          at act (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2582:11)
          at /home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/act-compat.js:47:25
          at renderRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:190:26)
          at render (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:292:10)
          at Object.<anonymous> (/home/runner/work/blackjack-simulator/blackjack-simulator/src/__tests__/App.integration.test.tsx:52:11)
          at Promise.finally.completed (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1559:28)
          at new Promise (<anonymous>)
          at callAsyncCircusFn (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1499:10)
          at _callCircusTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1009:40)
          at processTicksAndRejections (node:internal/process/task_queues:95:5)
          at _runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:949:3)
          at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:839:13)
          at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:829:11)
          at run (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:757:3)
          at runAndTransformResultsToJestFormat (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1920:21)
          at jestAdapter (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/runner.js:101:19)
          at runTestInternal (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:275:16)
          at runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:343:7)
          at Object.worker (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:497:12) {
        detail: Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
        
        Check the render method of `App`.
            at createFiberFromTypeAndProps (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:28478:17)
            at createFiberFromElement (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:28504:15)
            at createChild (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:13345:28)
            at reconcileChildrenArray (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:13640:25)
            at reconcileChildFibers (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:14057:16)
            at reconcileChildren (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:19186:28)
            at updateHostComponent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:19953:3)
            at beginWork (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:21657:14)
            at HTMLUnknownElement.callCallback (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4164:14)
            at HTMLUnknownElement.callTheUserObjectsOperation (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/generated/EventListener.js:26:30)
            at innerInvokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:350:25)
            at invokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:286:3)
            at HTMLUnknownElementImpl._dispatch (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:233:9)
            at HTMLUnknownElementImpl.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:104:17)
            at HTMLUnknownElement.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/generated/EventTarget.js:241:34)
            at Object.invokeGuardedCallbackDev (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4213:16)
            at invokeGuardedCallback (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4277:31)
            at beginWork$1 (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:27490:7)
            at performUnitOfWork (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26599:12)
            at workLoopSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26505:5)
            at renderRootSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26473:7)
            at performConcurrentWorkOnRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:25777:74)
            at flushActQueue (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2667:24)
            at act (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2582:11)
            at /home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/act-compat.js:47:25
            at renderRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:190:26)
            at render (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:292:10)
            at Object.<anonymous> (/home/runner/work/blackjack-simulator/blackjack-simulator/src/__tests__/App.integration.test.tsx:52:11)
            at Promise.finally.completed (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1559:28)
            at new Promise (<anonymous>)
            at callAsyncCircusFn (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1499:10)
            at _callCircusTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1009:40)
            at processTicksAndRejections (node:internal/process/task_queues:95:5)
            at _runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:949:3)
            at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:839:13)
            at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:829:11)
            at run (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:757:3)
            at runAndTransformResultsToJestFormat (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1920:21)
            at jestAdapter (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/runner.js:101:19)
            at runTestInternal (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:275:16)
            at runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:343:7)
            at Object.worker (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:497:12),
        type: 'unhandled exception'
      }

      50 |
      51 |   it('switches back to simulator when button is clicked', () => {
    > 52 |     render(<App />);
         |           ^
      53 |     
      54 |     // Switch to 3D Demo first
      55 |     const threeDButton = screen.getByText('3D Demo');

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at VirtualConsole.<anonymous> (node_modules/@jest/environment-jsdom-abstract/build/index.js:78:23)
      at reportException (node_modules/jsdom/lib/jsdom/living/helpers/runtime-script-errors.js:70:28)
      at innerInvokeEventListeners (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:353:9)
      at invokeEventListeners (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:286:3)
      at HTMLUnknownElementImpl._dispatch (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:233:9)
      at HTMLUnknownElementImpl.dispatchEvent (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:104:17)
      at HTMLUnknownElement.dispatchEvent (node_modules/jsdom/lib/jsdom/living/generated/EventTarget.js:241:34)
      at Object.invokeGuardedCallbackDev (node_modules/react-dom/cjs/react-dom.development.js:4213:16)
      at invokeGuardedCallback (node_modules/react-dom/cjs/react-dom.development.js:4277:31)
      at beginWork$1 (node_modules/react-dom/cjs/react-dom.development.js:27490:7)
      at performUnitOfWork (node_modules/react-dom/cjs/react-dom.development.js:26599:12)
      at workLoopSync (node_modules/react-dom/cjs/react-dom.development.js:26505:5)
      at renderRootSync (node_modules/react-dom/cjs/react-dom.development.js:26473:7)
      at performConcurrentWorkOnRoot (node_modules/react-dom/cjs/react-dom.development.js:25777:74)
      at flushActQueue (node_modules/react/cjs/react.development.js:2667:24)
      at act (node_modules/react/cjs/react.development.js:2582:11)
      at node_modules/@testing-library/react/dist/act-compat.js:47:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:190:26)
      at render (node_modules/@testing-library/react/dist/pure.js:292:10)
      at Object.<anonymous> (src/__tests__/App.integration.test.tsx:52:11)

    console.error
      Warning: React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
      
      Check the render method of `App`.
          at App (/home/runner/work/blackjack-simulator/blackjack-simulator/src/App.tsx:7:35)

      51 |
      52 |       {/* Content */}
    > 53 |       {view === 'simulator' && <BlackjackSimulator />}
         |                                ^
      54 |       {view === '3d-demo' && <Game3DDemo />}
      55 |       {view === 'interactive' && <InteractiveGamePage />}
      56 |     </div>

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at printWarning (node_modules/react/cjs/react-jsx-runtime.development.js:87:30)
      at error (node_modules/react/cjs/react-jsx-runtime.development.js:61:7)
      at jsxWithValidation (node_modules/react/cjs/react-jsx-runtime.development.js:1245:7)
      at jsxWithValidationDynamic (node_modules/react/cjs/react-jsx-runtime.development.js:1320:12)
      at App (src/App.tsx:53:32)
      at renderWithHooks (node_modules/react-dom/cjs/react-dom.development.js:15486:18)
      at mountIndeterminateComponent (node_modules/react-dom/cjs/react-dom.development.js:20103:13)
      at beginWork (node_modules/react-dom/cjs/react-dom.development.js:21626:16)
      at beginWork$1 (node_modules/react-dom/cjs/react-dom.development.js:27465:14)
      at performUnitOfWork (node_modules/react-dom/cjs/react-dom.development.js:26599:12)
      at workLoopSync (node_modules/react-dom/cjs/react-dom.development.js:26505:5)
      at renderRootSync (node_modules/react-dom/cjs/react-dom.development.js:26473:7)
      at recoverFromConcurrentError (node_modules/react-dom/cjs/react-dom.development.js:25889:20)
      at performConcurrentWorkOnRoot (node_modules/react-dom/cjs/react-dom.development.js:25789:22)
      at flushActQueue (node_modules/react/cjs/react.development.js:2667:24)
      at act (node_modules/react/cjs/react.development.js:2582:11)
      at node_modules/@testing-library/react/dist/act-compat.js:47:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:190:26)
      at render (node_modules/@testing-library/react/dist/pure.js:292:10)
      at Object.<anonymous> (src/__tests__/App.integration.test.tsx:52:11)

    console.error
      Error: Uncaught [Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
      
      Check the render method of `App`.]
          at reportException (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/helpers/runtime-script-errors.js:66:24)
          at innerInvokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:353:9)
          at invokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:286:3)
          at HTMLUnknownElementImpl._dispatch (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:233:9)
          at HTMLUnknownElementImpl.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:104:17)
          at HTMLUnknownElement.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/generated/EventTarget.js:241:34)
          at Object.invokeGuardedCallbackDev (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4213:16)
          at invokeGuardedCallback (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4277:31)
          at beginWork$1 (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:27490:7)
          at performUnitOfWork (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26599:12)
          at workLoopSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26505:5)
          at renderRootSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26473:7)
          at recoverFromConcurrentError (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:25889:20)
          at performConcurrentWorkOnRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:25789:22)
          at flushActQueue (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2667:24)
          at act (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2582:11)
          at /home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/act-compat.js:47:25
          at renderRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:190:26)
          at render (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:292:10)
          at Object.<anonymous> (/home/runner/work/blackjack-simulator/blackjack-simulator/src/__tests__/App.integration.test.tsx:52:11)
          at Promise.finally.completed (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1559:28)
          at new Promise (<anonymous>)
          at callAsyncCircusFn (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1499:10)
          at _callCircusTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1009:40)
          at processTicksAndRejections (node:internal/process/task_queues:95:5)
          at _runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:949:3)
          at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:839:13)
          at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:829:11)
          at run (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:757:3)
          at runAndTransformResultsToJestFormat (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1920:21)
          at jestAdapter (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/runner.js:101:19)
          at runTestInternal (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:275:16)
          at runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:343:7)
          at Object.worker (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:497:12) {
        detail: Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
        
        Check the render method of `App`.
            at createFiberFromTypeAndProps (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:28478:17)
            at createFiberFromElement (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:28504:15)
            at createChild (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:13345:28)
            at reconcileChildrenArray (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:13640:25)
            at reconcileChildFibers (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:14057:16)
            at reconcileChildren (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:19186:28)
            at updateHostComponent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:19953:3)
            at beginWork (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:21657:14)
            at HTMLUnknownElement.callCallback (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4164:14)
            at HTMLUnknownElement.callTheUserObjectsOperation (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/generated/EventListener.js:26:30)
            at innerInvokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:350:25)
            at invokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:286:3)
            at HTMLUnknownElementImpl._dispatch (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:233:9)
            at HTMLUnknownElementImpl.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:104:17)
            at HTMLUnknownElement.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/generated/EventTarget.js:241:34)
            at Object.invokeGuardedCallbackDev (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4213:16)
            at invokeGuardedCallback (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4277:31)
            at beginWork$1 (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:27490:7)
            at performUnitOfWork (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26599:12)
            at workLoopSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26505:5)
            at renderRootSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26473:7)
            at recoverFromConcurrentError (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:25889:20)
            at performConcurrentWorkOnRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:25789:22)
            at flushActQueue (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2667:24)
            at act (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2582:11)
            at /home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/act-compat.js:47:25
            at renderRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:190:26)
            at render (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:292:10)
            at Object.<anonymous> (/home/runner/work/blackjack-simulator/blackjack-simulator/src/__tests__/App.integration.test.tsx:52:11)
            at Promise.finally.completed (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1559:28)
            at new Promise (<anonymous>)
            at callAsyncCircusFn (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1499:10)
            at _callCircusTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1009:40)
            at processTicksAndRejections (node:internal/process/task_queues:95:5)
            at _runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:949:3)
            at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:839:13)
            at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:829:11)
            at run (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:757:3)
            at runAndTransformResultsToJestFormat (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1920:21)
            at jestAdapter (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/runner.js:101:19)
            at runTestInternal (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:275:16)
            at runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:343:7)
            at Object.worker (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:497:12),
        type: 'unhandled exception'
      }

      50 |
      51 |   it('switches back to simulator when button is clicked', () => {
    > 52 |     render(<App />);
         |           ^
      53 |     
      54 |     // Switch to 3D Demo first
      55 |     const threeDButton = screen.getByText('3D Demo');

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at VirtualConsole.<anonymous> (node_modules/@jest/environment-jsdom-abstract/build/index.js:78:23)
      at reportException (node_modules/jsdom/lib/jsdom/living/helpers/runtime-script-errors.js:70:28)
      at innerInvokeEventListeners (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:353:9)
      at invokeEventListeners (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:286:3)
      at HTMLUnknownElementImpl._dispatch (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:233:9)
      at HTMLUnknownElementImpl.dispatchEvent (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:104:17)
      at HTMLUnknownElement.dispatchEvent (node_modules/jsdom/lib/jsdom/living/generated/EventTarget.js:241:34)
      at Object.invokeGuardedCallbackDev (node_modules/react-dom/cjs/react-dom.development.js:4213:16)
      at invokeGuardedCallback (node_modules/react-dom/cjs/react-dom.development.js:4277:31)
      at beginWork$1 (node_modules/react-dom/cjs/react-dom.development.js:27490:7)
      at performUnitOfWork (node_modules/react-dom/cjs/react-dom.development.js:26599:12)
      at workLoopSync (node_modules/react-dom/cjs/react-dom.development.js:26505:5)
      at renderRootSync (node_modules/react-dom/cjs/react-dom.development.js:26473:7)
      at recoverFromConcurrentError (node_modules/react-dom/cjs/react-dom.development.js:25889:20)
      at performConcurrentWorkOnRoot (node_modules/react-dom/cjs/react-dom.development.js:25789:22)
      at flushActQueue (node_modules/react/cjs/react.development.js:2667:24)
      at act (node_modules/react/cjs/react.development.js:2582:11)
      at node_modules/@testing-library/react/dist/act-compat.js:47:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:190:26)
      at render (node_modules/@testing-library/react/dist/pure.js:292:10)
      at Object.<anonymous> (src/__tests__/App.integration.test.tsx:52:11)

    console.error
      The above error occurred in the <div> component:
      
          at div
          at App (/home/runner/work/blackjack-simulator/blackjack-simulator/src/App.tsx:7:35)
      
      Consider adding an error boundary to your tree to customize error handling behavior.
      Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.

      50 |
      51 |   it('switches back to simulator when button is clicked', () => {
    > 52 |     render(<App />);
         |           ^
      53 |     
      54 |     // Switch to 3D Demo first
      55 |     const threeDButton = screen.getByText('3D Demo');

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at logCapturedError (node_modules/react-dom/cjs/react-dom.development.js:18704:23)
      at update.callback (node_modules/react-dom/cjs/react-dom.development.js:18737:5)
      at callCallback (node_modules/react-dom/cjs/react-dom.development.js:15036:12)
      at commitUpdateQueue (node_modules/react-dom/cjs/react-dom.development.js:15057:9)
      at commitLayoutEffectOnFiber (node_modules/react-dom/cjs/react-dom.development.js:23430:13)
      at commitLayoutMountEffects_complete (node_modules/react-dom/cjs/react-dom.development.js:24727:9)
      at commitLayoutEffects_begin (node_modules/react-dom/cjs/react-dom.development.js:24713:7)
      at commitLayoutEffects (node_modules/react-dom/cjs/react-dom.development.js:24651:3)
      at commitRootImpl (node_modules/react-dom/cjs/react-dom.development.js:26862:5)
      at commitRoot (node_modules/react-dom/cjs/react-dom.development.js:26721:5)
      at finishConcurrentRender (node_modules/react-dom/cjs/react-dom.development.js:25931:9)
      at performConcurrentWorkOnRoot (node_modules/react-dom/cjs/react-dom.development.js:25848:7)
      at flushActQueue (node_modules/react/cjs/react.development.js:2667:24)
      at act (node_modules/react/cjs/react.development.js:2582:11)
      at node_modules/@testing-library/react/dist/act-compat.js:47:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:190:26)
      at render (node_modules/@testing-library/react/dist/pure.js:292:10)
      at Object.<anonymous> (src/__tests__/App.integration.test.tsx:52:11)

    console.error
      Warning: React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
      
      Check the render method of `App`.
          at App (/home/runner/work/blackjack-simulator/blackjack-simulator/src/App.tsx:7:35)

      51 |
      52 |       {/* Content */}
    > 53 |       {view === 'simulator' && <BlackjackSimulator />}
         |                                ^
      54 |       {view === '3d-demo' && <Game3DDemo />}
      55 |       {view === 'interactive' && <InteractiveGamePage />}
      56 |     </div>

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at printWarning (node_modules/react/cjs/react-jsx-runtime.development.js:87:30)
      at error (node_modules/react/cjs/react-jsx-runtime.development.js:61:7)
      at jsxWithValidation (node_modules/react/cjs/react-jsx-runtime.development.js:1245:7)
      at jsxWithValidationDynamic (node_modules/react/cjs/react-jsx-runtime.development.js:1320:12)
      at App (src/App.tsx:53:32)
      at renderWithHooks (node_modules/react-dom/cjs/react-dom.development.js:15486:18)
      at mountIndeterminateComponent (node_modules/react-dom/cjs/react-dom.development.js:20103:13)
      at beginWork (node_modules/react-dom/cjs/react-dom.development.js:21626:16)
      at beginWork$1 (node_modules/react-dom/cjs/react-dom.development.js:27465:14)
      at performUnitOfWork (node_modules/react-dom/cjs/react-dom.development.js:26599:12)
      at workLoopSync (node_modules/react-dom/cjs/react-dom.development.js:26505:5)
      at renderRootSync (node_modules/react-dom/cjs/react-dom.development.js:26473:7)
      at performConcurrentWorkOnRoot (node_modules/react-dom/cjs/react-dom.development.js:25777:74)
      at flushActQueue (node_modules/react/cjs/react.development.js:2667:24)
      at act (node_modules/react/cjs/react.development.js:2582:11)
      at node_modules/@testing-library/react/dist/act-compat.js:47:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:190:26)
      at render (node_modules/@testing-library/react/dist/pure.js:292:10)
      at Object.<anonymous> (src/__tests__/App.integration.test.tsx:68:11)

    console.error
      Error: Uncaught [Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
      
      Check the render method of `App`.]
          at reportException (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/helpers/runtime-script-errors.js:66:24)
          at innerInvokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:353:9)
          at invokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:286:3)
          at HTMLUnknownElementImpl._dispatch (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:233:9)
          at HTMLUnknownElementImpl.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:104:17)
          at HTMLUnknownElement.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/generated/EventTarget.js:241:34)
          at Object.invokeGuardedCallbackDev (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4213:16)
          at invokeGuardedCallback (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4277:31)
          at beginWork$1 (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:27490:7)
          at performUnitOfWork (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26599:12)
          at workLoopSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26505:5)
          at renderRootSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26473:7)
          at performConcurrentWorkOnRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:25777:74)
          at flushActQueue (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2667:24)
          at act (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2582:11)
          at /home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/act-compat.js:47:25
          at renderRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:190:26)
          at render (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:292:10)
          at Object.<anonymous> (/home/runner/work/blackjack-simulator/blackjack-simulator/src/__tests__/App.integration.test.tsx:68:11)
          at Promise.finally.completed (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1559:28)
          at new Promise (<anonymous>)
          at callAsyncCircusFn (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1499:10)
          at _callCircusTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1009:40)
          at processTicksAndRejections (node:internal/process/task_queues:95:5)
          at _runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:949:3)
          at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:839:13)
          at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:829:11)
          at run (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:757:3)
          at runAndTransformResultsToJestFormat (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1920:21)
          at jestAdapter (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/runner.js:101:19)
          at runTestInternal (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:275:16)
          at runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:343:7)
          at Object.worker (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:497:12) {
        detail: Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
        
        Check the render method of `App`.
            at createFiberFromTypeAndProps (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:28478:17)
            at createFiberFromElement (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:28504:15)
            at createChild (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:13345:28)
            at reconcileChildrenArray (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:13640:25)
            at reconcileChildFibers (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:14057:16)
            at reconcileChildren (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:19186:28)
            at updateHostComponent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:19953:3)
            at beginWork (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:21657:14)
            at HTMLUnknownElement.callCallback (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4164:14)
            at HTMLUnknownElement.callTheUserObjectsOperation (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/generated/EventListener.js:26:30)
            at innerInvokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:350:25)
            at invokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:286:3)
            at HTMLUnknownElementImpl._dispatch (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:233:9)
            at HTMLUnknownElementImpl.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:104:17)
            at HTMLUnknownElement.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/generated/EventTarget.js:241:34)
            at Object.invokeGuardedCallbackDev (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4213:16)
            at invokeGuardedCallback (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4277:31)
            at beginWork$1 (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:27490:7)
            at performUnitOfWork (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26599:12)
            at workLoopSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26505:5)
            at renderRootSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26473:7)
            at performConcurrentWorkOnRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:25777:74)
            at flushActQueue (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2667:24)
            at act (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2582:11)
            at /home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/act-compat.js:47:25
            at renderRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:190:26)
            at render (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:292:10)
            at Object.<anonymous> (/home/runner/work/blackjack-simulator/blackjack-simulator/src/__tests__/App.integration.test.tsx:68:11)
            at Promise.finally.completed (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1559:28)
            at new Promise (<anonymous>)
            at callAsyncCircusFn (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1499:10)
            at _callCircusTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1009:40)
            at processTicksAndRejections (node:internal/process/task_queues:95:5)
            at _runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:949:3)
            at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:839:13)
            at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:829:11)
            at run (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:757:3)
            at runAndTransformResultsToJestFormat (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1920:21)
            at jestAdapter (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/runner.js:101:19)
            at runTestInternal (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:275:16)
            at runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:343:7)
            at Object.worker (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:497:12),
        type: 'unhandled exception'
      }

      66 |
      67 |   it('highlights active navigation button correctly', () => {
    > 68 |     render(<App />);
         |           ^
      69 |     
      70 |     const simulatorButton = screen.getByText('Simulator');
      71 |     const threeDButton = screen.getByText('3D Demo');

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at VirtualConsole.<anonymous> (node_modules/@jest/environment-jsdom-abstract/build/index.js:78:23)
      at reportException (node_modules/jsdom/lib/jsdom/living/helpers/runtime-script-errors.js:70:28)
      at innerInvokeEventListeners (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:353:9)
      at invokeEventListeners (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:286:3)
      at HTMLUnknownElementImpl._dispatch (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:233:9)
      at HTMLUnknownElementImpl.dispatchEvent (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:104:17)
      at HTMLUnknownElement.dispatchEvent (node_modules/jsdom/lib/jsdom/living/generated/EventTarget.js:241:34)
      at Object.invokeGuardedCallbackDev (node_modules/react-dom/cjs/react-dom.development.js:4213:16)
      at invokeGuardedCallback (node_modules/react-dom/cjs/react-dom.development.js:4277:31)
      at beginWork$1 (node_modules/react-dom/cjs/react-dom.development.js:27490:7)
      at performUnitOfWork (node_modules/react-dom/cjs/react-dom.development.js:26599:12)
      at workLoopSync (node_modules/react-dom/cjs/react-dom.development.js:26505:5)
      at renderRootSync (node_modules/react-dom/cjs/react-dom.development.js:26473:7)
      at performConcurrentWorkOnRoot (node_modules/react-dom/cjs/react-dom.development.js:25777:74)
      at flushActQueue (node_modules/react/cjs/react.development.js:2667:24)
      at act (node_modules/react/cjs/react.development.js:2582:11)
      at node_modules/@testing-library/react/dist/act-compat.js:47:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:190:26)
      at render (node_modules/@testing-library/react/dist/pure.js:292:10)
      at Object.<anonymous> (src/__tests__/App.integration.test.tsx:68:11)

    console.error
      Warning: React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
      
      Check the render method of `App`.
          at App (/home/runner/work/blackjack-simulator/blackjack-simulator/src/App.tsx:7:35)

      51 |
      52 |       {/* Content */}
    > 53 |       {view === 'simulator' && <BlackjackSimulator />}
         |                                ^
      54 |       {view === '3d-demo' && <Game3DDemo />}
      55 |       {view === 'interactive' && <InteractiveGamePage />}
      56 |     </div>

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at printWarning (node_modules/react/cjs/react-jsx-runtime.development.js:87:30)
      at error (node_modules/react/cjs/react-jsx-runtime.development.js:61:7)
      at jsxWithValidation (node_modules/react/cjs/react-jsx-runtime.development.js:1245:7)
      at jsxWithValidationDynamic (node_modules/react/cjs/react-jsx-runtime.development.js:1320:12)
      at App (src/App.tsx:53:32)
      at renderWithHooks (node_modules/react-dom/cjs/react-dom.development.js:15486:18)
      at mountIndeterminateComponent (node_modules/react-dom/cjs/react-dom.development.js:20103:13)
      at beginWork (node_modules/react-dom/cjs/react-dom.development.js:21626:16)
      at beginWork$1 (node_modules/react-dom/cjs/react-dom.development.js:27465:14)
      at performUnitOfWork (node_modules/react-dom/cjs/react-dom.development.js:26599:12)
      at workLoopSync (node_modules/react-dom/cjs/react-dom.development.js:26505:5)
      at renderRootSync (node_modules/react-dom/cjs/react-dom.development.js:26473:7)
      at recoverFromConcurrentError (node_modules/react-dom/cjs/react-dom.development.js:25889:20)
      at performConcurrentWorkOnRoot (node_modules/react-dom/cjs/react-dom.development.js:25789:22)
      at flushActQueue (node_modules/react/cjs/react.development.js:2667:24)
      at act (node_modules/react/cjs/react.development.js:2582:11)
      at node_modules/@testing-library/react/dist/act-compat.js:47:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:190:26)
      at render (node_modules/@testing-library/react/dist/pure.js:292:10)
      at Object.<anonymous> (src/__tests__/App.integration.test.tsx:68:11)

    console.error
      Error: Uncaught [Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
      
      Check the render method of `App`.]
          at reportException (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/helpers/runtime-script-errors.js:66:24)
          at innerInvokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:353:9)
          at invokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:286:3)
          at HTMLUnknownElementImpl._dispatch (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:233:9)
          at HTMLUnknownElementImpl.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:104:17)
          at HTMLUnknownElement.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/generated/EventTarget.js:241:34)
          at Object.invokeGuardedCallbackDev (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4213:16)
          at invokeGuardedCallback (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4277:31)
          at beginWork$1 (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:27490:7)
          at performUnitOfWork (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26599:12)
          at workLoopSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26505:5)
          at renderRootSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26473:7)
          at recoverFromConcurrentError (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:25889:20)
          at performConcurrentWorkOnRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:25789:22)
          at flushActQueue (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2667:24)
          at act (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2582:11)
          at /home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/act-compat.js:47:25
          at renderRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:190:26)
          at render (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:292:10)
          at Object.<anonymous> (/home/runner/work/blackjack-simulator/blackjack-simulator/src/__tests__/App.integration.test.tsx:68:11)
          at Promise.finally.completed (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1559:28)
          at new Promise (<anonymous>)
          at callAsyncCircusFn (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1499:10)
          at _callCircusTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1009:40)
          at processTicksAndRejections (node:internal/process/task_queues:95:5)
          at _runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:949:3)
          at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:839:13)
          at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:829:11)
          at run (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:757:3)
          at runAndTransformResultsToJestFormat (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1920:21)
          at jestAdapter (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/runner.js:101:19)
          at runTestInternal (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:275:16)
          at runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:343:7)
          at Object.worker (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:497:12) {
        detail: Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
        
        Check the render method of `App`.
            at createFiberFromTypeAndProps (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:28478:17)
            at createFiberFromElement (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:28504:15)
            at createChild (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:13345:28)
            at reconcileChildrenArray (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:13640:25)
            at reconcileChildFibers (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:14057:16)
            at reconcileChildren (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:19186:28)
            at updateHostComponent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:19953:3)
            at beginWork (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:21657:14)
            at HTMLUnknownElement.callCallback (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4164:14)
            at HTMLUnknownElement.callTheUserObjectsOperation (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/generated/EventListener.js:26:30)
            at innerInvokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:350:25)
            at invokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:286:3)
            at HTMLUnknownElementImpl._dispatch (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:233:9)
            at HTMLUnknownElementImpl.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:104:17)
            at HTMLUnknownElement.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/generated/EventTarget.js:241:34)
            at Object.invokeGuardedCallbackDev (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4213:16)
            at invokeGuardedCallback (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4277:31)
            at beginWork$1 (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:27490:7)
            at performUnitOfWork (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26599:12)
            at workLoopSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26505:5)
            at renderRootSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26473:7)
            at recoverFromConcurrentError (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:25889:20)
            at performConcurrentWorkOnRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:25789:22)
            at flushActQueue (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2667:24)
            at act (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2582:11)
            at /home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/act-compat.js:47:25
            at renderRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:190:26)
            at render (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:292:10)
            at Object.<anonymous> (/home/runner/work/blackjack-simulator/blackjack-simulator/src/__tests__/App.integration.test.tsx:68:11)
            at Promise.finally.completed (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1559:28)
            at new Promise (<anonymous>)
            at callAsyncCircusFn (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1499:10)
            at _callCircusTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1009:40)
            at processTicksAndRejections (node:internal/process/task_queues:95:5)
            at _runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:949:3)
            at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:839:13)
            at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:829:11)
            at run (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:757:3)
            at runAndTransformResultsToJestFormat (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1920:21)
            at jestAdapter (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/runner.js:101:19)
            at runTestInternal (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:275:16)
            at runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:343:7)
            at Object.worker (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:497:12),
        type: 'unhandled exception'
      }

      66 |
      67 |   it('highlights active navigation button correctly', () => {
    > 68 |     render(<App />);
         |           ^
      69 |     
      70 |     const simulatorButton = screen.getByText('Simulator');
      71 |     const threeDButton = screen.getByText('3D Demo');

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at VirtualConsole.<anonymous> (node_modules/@jest/environment-jsdom-abstract/build/index.js:78:23)
      at reportException (node_modules/jsdom/lib/jsdom/living/helpers/runtime-script-errors.js:70:28)
      at innerInvokeEventListeners (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:353:9)
      at invokeEventListeners (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:286:3)
      at HTMLUnknownElementImpl._dispatch (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:233:9)
      at HTMLUnknownElementImpl.dispatchEvent (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:104:17)
      at HTMLUnknownElement.dispatchEvent (node_modules/jsdom/lib/jsdom/living/generated/EventTarget.js:241:34)
      at Object.invokeGuardedCallbackDev (node_modules/react-dom/cjs/react-dom.development.js:4213:16)
      at invokeGuardedCallback (node_modules/react-dom/cjs/react-dom.development.js:4277:31)
      at beginWork$1 (node_modules/react-dom/cjs/react-dom.development.js:27490:7)
      at performUnitOfWork (node_modules/react-dom/cjs/react-dom.development.js:26599:12)
      at workLoopSync (node_modules/react-dom/cjs/react-dom.development.js:26505:5)
      at renderRootSync (node_modules/react-dom/cjs/react-dom.development.js:26473:7)
      at recoverFromConcurrentError (node_modules/react-dom/cjs/react-dom.development.js:25889:20)
      at performConcurrentWorkOnRoot (node_modules/react-dom/cjs/react-dom.development.js:25789:22)
      at flushActQueue (node_modules/react/cjs/react.development.js:2667:24)
      at act (node_modules/react/cjs/react.development.js:2582:11)
      at node_modules/@testing-library/react/dist/act-compat.js:47:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:190:26)
      at render (node_modules/@testing-library/react/dist/pure.js:292:10)
      at Object.<anonymous> (src/__tests__/App.integration.test.tsx:68:11)

    console.error
      The above error occurred in the <div> component:
      
          at div
          at App (/home/runner/work/blackjack-simulator/blackjack-simulator/src/App.tsx:7:35)
      
      Consider adding an error boundary to your tree to customize error handling behavior.
      Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.

      66 |
      67 |   it('highlights active navigation button correctly', () => {
    > 68 |     render(<App />);
         |           ^
      69 |     
      70 |     const simulatorButton = screen.getByText('Simulator');
      71 |     const threeDButton = screen.getByText('3D Demo');

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at logCapturedError (node_modules/react-dom/cjs/react-dom.development.js:18704:23)
      at update.callback (node_modules/react-dom/cjs/react-dom.development.js:18737:5)
      at callCallback (node_modules/react-dom/cjs/react-dom.development.js:15036:12)
      at commitUpdateQueue (node_modules/react-dom/cjs/react-dom.development.js:15057:9)
      at commitLayoutEffectOnFiber (node_modules/react-dom/cjs/react-dom.development.js:23430:13)
      at commitLayoutMountEffects_complete (node_modules/react-dom/cjs/react-dom.development.js:24727:9)
      at commitLayoutEffects_begin (node_modules/react-dom/cjs/react-dom.development.js:24713:7)
      at commitLayoutEffects (node_modules/react-dom/cjs/react-dom.development.js:24651:3)
      at commitRootImpl (node_modules/react-dom/cjs/react-dom.development.js:26862:5)
      at commitRoot (node_modules/react-dom/cjs/react-dom.development.js:26721:5)
      at finishConcurrentRender (node_modules/react-dom/cjs/react-dom.development.js:25931:9)
      at performConcurrentWorkOnRoot (node_modules/react-dom/cjs/react-dom.development.js:25848:7)
      at flushActQueue (node_modules/react/cjs/react.development.js:2667:24)
      at act (node_modules/react/cjs/react.development.js:2582:11)
      at node_modules/@testing-library/react/dist/act-compat.js:47:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:190:26)
      at render (node_modules/@testing-library/react/dist/pure.js:292:10)
      at Object.<anonymous> (src/__tests__/App.integration.test.tsx:68:11)

    console.error
      Warning: React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
      
      Check the render method of `App`.
          at App (/home/runner/work/blackjack-simulator/blackjack-simulator/src/App.tsx:7:35)

      51 |
      52 |       {/* Content */}
    > 53 |       {view === 'simulator' && <BlackjackSimulator />}
         |                                ^
      54 |       {view === '3d-demo' && <Game3DDemo />}
      55 |       {view === 'interactive' && <InteractiveGamePage />}
      56 |     </div>

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at printWarning (node_modules/react/cjs/react-jsx-runtime.development.js:87:30)
      at error (node_modules/react/cjs/react-jsx-runtime.development.js:61:7)
      at jsxWithValidation (node_modules/react/cjs/react-jsx-runtime.development.js:1245:7)
      at jsxWithValidationDynamic (node_modules/react/cjs/react-jsx-runtime.development.js:1320:12)
      at App (src/App.tsx:53:32)
      at renderWithHooks (node_modules/react-dom/cjs/react-dom.development.js:15486:18)
      at mountIndeterminateComponent (node_modules/react-dom/cjs/react-dom.development.js:20103:13)
      at beginWork (node_modules/react-dom/cjs/react-dom.development.js:21626:16)
      at beginWork$1 (node_modules/react-dom/cjs/react-dom.development.js:27465:14)
      at performUnitOfWork (node_modules/react-dom/cjs/react-dom.development.js:26599:12)
      at workLoopSync (node_modules/react-dom/cjs/react-dom.development.js:26505:5)
      at renderRootSync (node_modules/react-dom/cjs/react-dom.development.js:26473:7)
      at performConcurrentWorkOnRoot (node_modules/react-dom/cjs/react-dom.development.js:25777:74)
      at flushActQueue (node_modules/react/cjs/react.development.js:2667:24)
      at act (node_modules/react/cjs/react.development.js:2582:11)
      at node_modules/@testing-library/react/dist/act-compat.js:47:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:190:26)
      at render (node_modules/@testing-library/react/dist/pure.js:292:10)
      at Object.<anonymous> (src/__tests__/App.integration.test.tsx:86:11)

    console.error
      Error: Uncaught [Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
      
      Check the render method of `App`.]
          at reportException (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/helpers/runtime-script-errors.js:66:24)
          at innerInvokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:353:9)
          at invokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:286:3)
          at HTMLUnknownElementImpl._dispatch (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:233:9)
          at HTMLUnknownElementImpl.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:104:17)
          at HTMLUnknownElement.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/generated/EventTarget.js:241:34)
          at Object.invokeGuardedCallbackDev (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4213:16)
          at invokeGuardedCallback (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4277:31)
          at beginWork$1 (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:27490:7)
          at performUnitOfWork (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26599:12)
          at workLoopSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26505:5)
          at renderRootSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26473:7)
          at performConcurrentWorkOnRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:25777:74)
          at flushActQueue (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2667:24)
          at act (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2582:11)
          at /home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/act-compat.js:47:25
          at renderRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:190:26)
          at render (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:292:10)
          at Object.<anonymous> (/home/runner/work/blackjack-simulator/blackjack-simulator/src/__tests__/App.integration.test.tsx:86:11)
          at Promise.finally.completed (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1559:28)
          at new Promise (<anonymous>)
          at callAsyncCircusFn (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1499:10)
          at _callCircusTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1009:40)
          at processTicksAndRejections (node:internal/process/task_queues:95:5)
          at _runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:949:3)
          at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:839:13)
          at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:829:11)
          at run (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:757:3)
          at runAndTransformResultsToJestFormat (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1920:21)
          at jestAdapter (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/runner.js:101:19)
          at runTestInternal (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:275:16)
          at runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:343:7)
          at Object.worker (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:497:12) {
        detail: Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
        
        Check the render method of `App`.
            at createFiberFromTypeAndProps (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:28478:17)
            at createFiberFromElement (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:28504:15)
            at createChild (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:13345:28)
            at reconcileChildrenArray (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:13640:25)
            at reconcileChildFibers (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:14057:16)
            at reconcileChildren (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:19186:28)
            at updateHostComponent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:19953:3)
            at beginWork (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:21657:14)
            at HTMLUnknownElement.callCallback (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4164:14)
            at HTMLUnknownElement.callTheUserObjectsOperation (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/generated/EventListener.js:26:30)
            at innerInvokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:350:25)
            at invokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:286:3)
            at HTMLUnknownElementImpl._dispatch (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:233:9)
            at HTMLUnknownElementImpl.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:104:17)
            at HTMLUnknownElement.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/generated/EventTarget.js:241:34)
            at Object.invokeGuardedCallbackDev (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4213:16)
            at invokeGuardedCallback (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4277:31)
            at beginWork$1 (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:27490:7)
            at performUnitOfWork (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26599:12)
            at workLoopSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26505:5)
            at renderRootSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26473:7)
            at performConcurrentWorkOnRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:25777:74)
            at flushActQueue (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2667:24)
            at act (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2582:11)
            at /home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/act-compat.js:47:25
            at renderRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:190:26)
            at render (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:292:10)
            at Object.<anonymous> (/home/runner/work/blackjack-simulator/blackjack-simulator/src/__tests__/App.integration.test.tsx:86:11)
            at Promise.finally.completed (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1559:28)
            at new Promise (<anonymous>)
            at callAsyncCircusFn (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1499:10)
            at _callCircusTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1009:40)
            at processTicksAndRejections (node:internal/process/task_queues:95:5)
            at _runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:949:3)
            at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:839:13)
            at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:829:11)
            at run (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:757:3)
            at runAndTransformResultsToJestFormat (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1920:21)
            at jestAdapter (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/runner.js:101:19)
            at runTestInternal (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:275:16)
            at runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:343:7)
            at Object.worker (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:497:12),
        type: 'unhandled exception'
      }

      84 |
      85 |   it('maintains proper layout structure', () => {
    > 86 |     render(<App />);
         |           ^
      87 |     
      88 |     // Check main container
      89 |     const mainContainer = screen.getByTestId('blackjack-simulator');

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at VirtualConsole.<anonymous> (node_modules/@jest/environment-jsdom-abstract/build/index.js:78:23)
      at reportException (node_modules/jsdom/lib/jsdom/living/helpers/runtime-script-errors.js:70:28)
      at innerInvokeEventListeners (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:353:9)
      at invokeEventListeners (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:286:3)
      at HTMLUnknownElementImpl._dispatch (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:233:9)
      at HTMLUnknownElementImpl.dispatchEvent (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:104:17)
      at HTMLUnknownElement.dispatchEvent (node_modules/jsdom/lib/jsdom/living/generated/EventTarget.js:241:34)
      at Object.invokeGuardedCallbackDev (node_modules/react-dom/cjs/react-dom.development.js:4213:16)
      at invokeGuardedCallback (node_modules/react-dom/cjs/react-dom.development.js:4277:31)
      at beginWork$1 (node_modules/react-dom/cjs/react-dom.development.js:27490:7)
      at performUnitOfWork (node_modules/react-dom/cjs/react-dom.development.js:26599:12)
      at workLoopSync (node_modules/react-dom/cjs/react-dom.development.js:26505:5)
      at renderRootSync (node_modules/react-dom/cjs/react-dom.development.js:26473:7)
      at performConcurrentWorkOnRoot (node_modules/react-dom/cjs/react-dom.development.js:25777:74)
      at flushActQueue (node_modules/react/cjs/react.development.js:2667:24)
      at act (node_modules/react/cjs/react.development.js:2582:11)
      at node_modules/@testing-library/react/dist/act-compat.js:47:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:190:26)
      at render (node_modules/@testing-library/react/dist/pure.js:292:10)
      at Object.<anonymous> (src/__tests__/App.integration.test.tsx:86:11)

    console.error
      Warning: React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
      
      Check the render method of `App`.
          at App (/home/runner/work/blackjack-simulator/blackjack-simulator/src/App.tsx:7:35)

      51 |
      52 |       {/* Content */}
    > 53 |       {view === 'simulator' && <BlackjackSimulator />}
         |                                ^
      54 |       {view === '3d-demo' && <Game3DDemo />}
      55 |       {view === 'interactive' && <InteractiveGamePage />}
      56 |     </div>

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at printWarning (node_modules/react/cjs/react-jsx-runtime.development.js:87:30)
      at error (node_modules/react/cjs/react-jsx-runtime.development.js:61:7)
      at jsxWithValidation (node_modules/react/cjs/react-jsx-runtime.development.js:1245:7)
      at jsxWithValidationDynamic (node_modules/react/cjs/react-jsx-runtime.development.js:1320:12)
      at App (src/App.tsx:53:32)
      at renderWithHooks (node_modules/react-dom/cjs/react-dom.development.js:15486:18)
      at mountIndeterminateComponent (node_modules/react-dom/cjs/react-dom.development.js:20103:13)
      at beginWork (node_modules/react-dom/cjs/react-dom.development.js:21626:16)
      at beginWork$1 (node_modules/react-dom/cjs/react-dom.development.js:27465:14)
      at performUnitOfWork (node_modules/react-dom/cjs/react-dom.development.js:26599:12)
      at workLoopSync (node_modules/react-dom/cjs/react-dom.development.js:26505:5)
      at renderRootSync (node_modules/react-dom/cjs/react-dom.development.js:26473:7)
      at recoverFromConcurrentError (node_modules/react-dom/cjs/react-dom.development.js:25889:20)
      at performConcurrentWorkOnRoot (node_modules/react-dom/cjs/react-dom.development.js:25789:22)
      at flushActQueue (node_modules/react/cjs/react.development.js:2667:24)
      at act (node_modules/react/cjs/react.development.js:2582:11)
      at node_modules/@testing-library/react/dist/act-compat.js:47:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:190:26)
      at render (node_modules/@testing-library/react/dist/pure.js:292:10)
      at Object.<anonymous> (src/__tests__/App.integration.test.tsx:86:11)

    console.error
      Error: Uncaught [Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
      
      Check the render method of `App`.]
          at reportException (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/helpers/runtime-script-errors.js:66:24)
          at innerInvokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:353:9)
          at invokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:286:3)
          at HTMLUnknownElementImpl._dispatch (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:233:9)
          at HTMLUnknownElementImpl.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:104:17)
          at HTMLUnknownElement.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/generated/EventTarget.js:241:34)
          at Object.invokeGuardedCallbackDev (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4213:16)
          at invokeGuardedCallback (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4277:31)
          at beginWork$1 (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:27490:7)
          at performUnitOfWork (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26599:12)
          at workLoopSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26505:5)
          at renderRootSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26473:7)
          at recoverFromConcurrentError (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:25889:20)
          at performConcurrentWorkOnRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:25789:22)
          at flushActQueue (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2667:24)
          at act (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2582:11)
          at /home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/act-compat.js:47:25
          at renderRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:190:26)
          at render (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:292:10)
          at Object.<anonymous> (/home/runner/work/blackjack-simulator/blackjack-simulator/src/__tests__/App.integration.test.tsx:86:11)
          at Promise.finally.completed (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1559:28)
          at new Promise (<anonymous>)
          at callAsyncCircusFn (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1499:10)
          at _callCircusTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1009:40)
          at processTicksAndRejections (node:internal/process/task_queues:95:5)
          at _runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:949:3)
          at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:839:13)
          at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:829:11)
          at run (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:757:3)
          at runAndTransformResultsToJestFormat (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1920:21)
          at jestAdapter (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/runner.js:101:19)
          at runTestInternal (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:275:16)
          at runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:343:7)
          at Object.worker (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:497:12) {
        detail: Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
        
        Check the render method of `App`.
            at createFiberFromTypeAndProps (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:28478:17)
            at createFiberFromElement (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:28504:15)
            at createChild (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:13345:28)
            at reconcileChildrenArray (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:13640:25)
            at reconcileChildFibers (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:14057:16)
            at reconcileChildren (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:19186:28)
            at updateHostComponent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:19953:3)
            at beginWork (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:21657:14)
            at HTMLUnknownElement.callCallback (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4164:14)
            at HTMLUnknownElement.callTheUserObjectsOperation (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/generated/EventListener.js:26:30)
            at innerInvokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:350:25)
            at invokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:286:3)
            at HTMLUnknownElementImpl._dispatch (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:233:9)
            at HTMLUnknownElementImpl.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:104:17)
            at HTMLUnknownElement.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/generated/EventTarget.js:241:34)
            at Object.invokeGuardedCallbackDev (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4213:16)
            at invokeGuardedCallback (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4277:31)
            at beginWork$1 (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:27490:7)
            at performUnitOfWork (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26599:12)
            at workLoopSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26505:5)
            at renderRootSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26473:7)
            at recoverFromConcurrentError (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:25889:20)
            at performConcurrentWorkOnRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:25789:22)
            at flushActQueue (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2667:24)
            at act (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2582:11)
            at /home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/act-compat.js:47:25
            at renderRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:190:26)
            at render (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:292:10)
            at Object.<anonymous> (/home/runner/work/blackjack-simulator/blackjack-simulator/src/__tests__/App.integration.test.tsx:86:11)
            at Promise.finally.completed (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1559:28)
            at new Promise (<anonymous>)
            at callAsyncCircusFn (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1499:10)
            at _callCircusTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1009:40)
            at processTicksAndRejections (node:internal/process/task_queues:95:5)
            at _runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:949:3)
            at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:839:13)
            at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:829:11)
            at run (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:757:3)
            at runAndTransformResultsToJestFormat (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1920:21)
            at jestAdapter (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/runner.js:101:19)
            at runTestInternal (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:275:16)
            at runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:343:7)
            at Object.worker (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:497:12),
        type: 'unhandled exception'
      }

      84 |
      85 |   it('maintains proper layout structure', () => {
    > 86 |     render(<App />);
         |           ^
      87 |     
      88 |     // Check main container
      89 |     const mainContainer = screen.getByTestId('blackjack-simulator');

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at VirtualConsole.<anonymous> (node_modules/@jest/environment-jsdom-abstract/build/index.js:78:23)
      at reportException (node_modules/jsdom/lib/jsdom/living/helpers/runtime-script-errors.js:70:28)
      at innerInvokeEventListeners (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:353:9)
      at invokeEventListeners (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:286:3)
      at HTMLUnknownElementImpl._dispatch (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:233:9)
      at HTMLUnknownElementImpl.dispatchEvent (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:104:17)
      at HTMLUnknownElement.dispatchEvent (node_modules/jsdom/lib/jsdom/living/generated/EventTarget.js:241:34)
      at Object.invokeGuardedCallbackDev (node_modules/react-dom/cjs/react-dom.development.js:4213:16)
      at invokeGuardedCallback (node_modules/react-dom/cjs/react-dom.development.js:4277:31)
      at beginWork$1 (node_modules/react-dom/cjs/react-dom.development.js:27490:7)
      at performUnitOfWork (node_modules/react-dom/cjs/react-dom.development.js:26599:12)
      at workLoopSync (node_modules/react-dom/cjs/react-dom.development.js:26505:5)
      at renderRootSync (node_modules/react-dom/cjs/react-dom.development.js:26473:7)
      at recoverFromConcurrentError (node_modules/react-dom/cjs/react-dom.development.js:25889:20)
      at performConcurrentWorkOnRoot (node_modules/react-dom/cjs/react-dom.development.js:25789:22)
      at flushActQueue (node_modules/react/cjs/react.development.js:2667:24)
      at act (node_modules/react/cjs/react.development.js:2582:11)
      at node_modules/@testing-library/react/dist/act-compat.js:47:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:190:26)
      at render (node_modules/@testing-library/react/dist/pure.js:292:10)
      at Object.<anonymous> (src/__tests__/App.integration.test.tsx:86:11)

    console.error
      The above error occurred in the <div> component:
      
          at div
          at App (/home/runner/work/blackjack-simulator/blackjack-simulator/src/App.tsx:7:35)
      
      Consider adding an error boundary to your tree to customize error handling behavior.
      Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.

      84 |
      85 |   it('maintains proper layout structure', () => {
    > 86 |     render(<App />);
         |           ^
      87 |     
      88 |     // Check main container
      89 |     const mainContainer = screen.getByTestId('blackjack-simulator');

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at logCapturedError (node_modules/react-dom/cjs/react-dom.development.js:18704:23)
      at update.callback (node_modules/react-dom/cjs/react-dom.development.js:18737:5)
      at callCallback (node_modules/react-dom/cjs/react-dom.development.js:15036:12)
      at commitUpdateQueue (node_modules/react-dom/cjs/react-dom.development.js:15057:9)
      at commitLayoutEffectOnFiber (node_modules/react-dom/cjs/react-dom.development.js:23430:13)
      at commitLayoutMountEffects_complete (node_modules/react-dom/cjs/react-dom.development.js:24727:9)
      at commitLayoutEffects_begin (node_modules/react-dom/cjs/react-dom.development.js:24713:7)
      at commitLayoutEffects (node_modules/react-dom/cjs/react-dom.development.js:24651:3)
      at commitRootImpl (node_modules/react-dom/cjs/react-dom.development.js:26862:5)
      at commitRoot (node_modules/react-dom/cjs/react-dom.development.js:26721:5)
      at finishConcurrentRender (node_modules/react-dom/cjs/react-dom.development.js:25931:9)
      at performConcurrentWorkOnRoot (node_modules/react-dom/cjs/react-dom.development.js:25848:7)
      at flushActQueue (node_modules/react/cjs/react.development.js:2667:24)
      at act (node_modules/react/cjs/react.development.js:2582:11)
      at node_modules/@testing-library/react/dist/act-compat.js:47:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:190:26)
      at render (node_modules/@testing-library/react/dist/pure.js:292:10)
      at Object.<anonymous> (src/__tests__/App.integration.test.tsx:86:11)

    console.error
      Warning: React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
      
      Check the render method of `App`.
          at App (/home/runner/work/blackjack-simulator/blackjack-simulator/src/App.tsx:7:35)

      51 |
      52 |       {/* Content */}
    > 53 |       {view === 'simulator' && <BlackjackSimulator />}
         |                                ^
      54 |       {view === '3d-demo' && <Game3DDemo />}
      55 |       {view === 'interactive' && <InteractiveGamePage />}
      56 |     </div>

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at printWarning (node_modules/react/cjs/react-jsx-runtime.development.js:87:30)
      at error (node_modules/react/cjs/react-jsx-runtime.development.js:61:7)
      at jsxWithValidation (node_modules/react/cjs/react-jsx-runtime.development.js:1245:7)
      at jsxWithValidationDynamic (node_modules/react/cjs/react-jsx-runtime.development.js:1320:12)
      at App (src/App.tsx:53:32)
      at renderWithHooks (node_modules/react-dom/cjs/react-dom.development.js:15486:18)
      at mountIndeterminateComponent (node_modules/react-dom/cjs/react-dom.development.js:20103:13)
      at beginWork (node_modules/react-dom/cjs/react-dom.development.js:21626:16)
      at beginWork$1 (node_modules/react-dom/cjs/react-dom.development.js:27465:14)
      at performUnitOfWork (node_modules/react-dom/cjs/react-dom.development.js:26599:12)
      at workLoopSync (node_modules/react-dom/cjs/react-dom.development.js:26505:5)
      at renderRootSync (node_modules/react-dom/cjs/react-dom.development.js:26473:7)
      at performConcurrentWorkOnRoot (node_modules/react-dom/cjs/react-dom.development.js:25777:74)
      at flushActQueue (node_modules/react/cjs/react.development.js:2667:24)
      at act (node_modules/react/cjs/react.development.js:2582:11)
      at node_modules/@testing-library/react/dist/act-compat.js:47:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:190:26)
      at render (node_modules/@testing-library/react/dist/pure.js:292:10)
      at Object.<anonymous> (src/__tests__/App.integration.test.tsx:98:11)

    console.error
      Error: Uncaught [Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
      
      Check the render method of `App`.]
          at reportException (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/helpers/runtime-script-errors.js:66:24)
          at innerInvokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:353:9)
          at invokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:286:3)
          at HTMLUnknownElementImpl._dispatch (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:233:9)
          at HTMLUnknownElementImpl.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:104:17)
          at HTMLUnknownElement.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/generated/EventTarget.js:241:34)
          at Object.invokeGuardedCallbackDev (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4213:16)
          at invokeGuardedCallback (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4277:31)
          at beginWork$1 (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:27490:7)
          at performUnitOfWork (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26599:12)
          at workLoopSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26505:5)
          at renderRootSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26473:7)
          at performConcurrentWorkOnRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:25777:74)
          at flushActQueue (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2667:24)
          at act (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2582:11)
          at /home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/act-compat.js:47:25
          at renderRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:190:26)
          at render (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:292:10)
          at Object.<anonymous> (/home/runner/work/blackjack-simulator/blackjack-simulator/src/__tests__/App.integration.test.tsx:98:11)
          at Promise.finally.completed (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1559:28)
          at new Promise (<anonymous>)
          at callAsyncCircusFn (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1499:10)
          at _callCircusTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1009:40)
          at processTicksAndRejections (node:internal/process/task_queues:95:5)
          at _runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:949:3)
          at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:839:13)
          at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:829:11)
          at run (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:757:3)
          at runAndTransformResultsToJestFormat (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1920:21)
          at jestAdapter (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/runner.js:101:19)
          at runTestInternal (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:275:16)
          at runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:343:7)
          at Object.worker (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:497:12) {
        detail: Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
        
        Check the render method of `App`.
            at createFiberFromTypeAndProps (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:28478:17)
            at createFiberFromElement (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:28504:15)
            at createChild (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:13345:28)
            at reconcileChildrenArray (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:13640:25)
            at reconcileChildFibers (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:14057:16)
            at reconcileChildren (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:19186:28)
            at updateHostComponent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:19953:3)
            at beginWork (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:21657:14)
            at HTMLUnknownElement.callCallback (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4164:14)
            at HTMLUnknownElement.callTheUserObjectsOperation (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/generated/EventListener.js:26:30)
            at innerInvokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:350:25)
            at invokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:286:3)
            at HTMLUnknownElementImpl._dispatch (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:233:9)
            at HTMLUnknownElementImpl.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:104:17)
            at HTMLUnknownElement.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/generated/EventTarget.js:241:34)
            at Object.invokeGuardedCallbackDev (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4213:16)
            at invokeGuardedCallback (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4277:31)
            at beginWork$1 (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:27490:7)
            at performUnitOfWork (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26599:12)
            at workLoopSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26505:5)
            at renderRootSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26473:7)
            at performConcurrentWorkOnRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:25777:74)
            at flushActQueue (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2667:24)
            at act (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2582:11)
            at /home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/act-compat.js:47:25
            at renderRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:190:26)
            at render (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:292:10)
            at Object.<anonymous> (/home/runner/work/blackjack-simulator/blackjack-simulator/src/__tests__/App.integration.test.tsx:98:11)
            at Promise.finally.completed (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1559:28)
            at new Promise (<anonymous>)
            at callAsyncCircusFn (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1499:10)
            at _callCircusTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1009:40)
            at processTicksAndRejections (node:internal/process/task_queues:95:5)
            at _runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:949:3)
            at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:839:13)
            at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:829:11)
            at run (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:757:3)
            at runAndTransformResultsToJestFormat (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1920:21)
            at jestAdapter (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/runner.js:101:19)
            at runTestInternal (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:275:16)
            at runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:343:7)
            at Object.worker (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:497:12),
        type: 'unhandled exception'
      }

       96 |
       97 |   it('handles rapid navigation switching', () => {
    >  98 |     render(<App />);
          |           ^
       99 |     
      100 |     const simulatorButton = screen.getByText('Simulator');
      101 |     const threeDButton = screen.getByText('3D Demo');

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at VirtualConsole.<anonymous> (node_modules/@jest/environment-jsdom-abstract/build/index.js:78:23)
      at reportException (node_modules/jsdom/lib/jsdom/living/helpers/runtime-script-errors.js:70:28)
      at innerInvokeEventListeners (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:353:9)
      at invokeEventListeners (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:286:3)
      at HTMLUnknownElementImpl._dispatch (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:233:9)
      at HTMLUnknownElementImpl.dispatchEvent (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:104:17)
      at HTMLUnknownElement.dispatchEvent (node_modules/jsdom/lib/jsdom/living/generated/EventTarget.js:241:34)
      at Object.invokeGuardedCallbackDev (node_modules/react-dom/cjs/react-dom.development.js:4213:16)
      at invokeGuardedCallback (node_modules/react-dom/cjs/react-dom.development.js:4277:31)
      at beginWork$1 (node_modules/react-dom/cjs/react-dom.development.js:27490:7)
      at performUnitOfWork (node_modules/react-dom/cjs/react-dom.development.js:26599:12)
      at workLoopSync (node_modules/react-dom/cjs/react-dom.development.js:26505:5)
      at renderRootSync (node_modules/react-dom/cjs/react-dom.development.js:26473:7)
      at performConcurrentWorkOnRoot (node_modules/react-dom/cjs/react-dom.development.js:25777:74)
      at flushActQueue (node_modules/react/cjs/react.development.js:2667:24)
      at act (node_modules/react/cjs/react.development.js:2582:11)
      at node_modules/@testing-library/react/dist/act-compat.js:47:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:190:26)
      at render (node_modules/@testing-library/react/dist/pure.js:292:10)
      at Object.<anonymous> (src/__tests__/App.integration.test.tsx:98:11)

    console.error
      Warning: React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
      
      Check the render method of `App`.
          at App (/home/runner/work/blackjack-simulator/blackjack-simulator/src/App.tsx:7:35)

      51 |
      52 |       {/* Content */}
    > 53 |       {view === 'simulator' && <BlackjackSimulator />}
         |                                ^
      54 |       {view === '3d-demo' && <Game3DDemo />}
      55 |       {view === 'interactive' && <InteractiveGamePage />}
      56 |     </div>

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at printWarning (node_modules/react/cjs/react-jsx-runtime.development.js:87:30)
      at error (node_modules/react/cjs/react-jsx-runtime.development.js:61:7)
      at jsxWithValidation (node_modules/react/cjs/react-jsx-runtime.development.js:1245:7)
      at jsxWithValidationDynamic (node_modules/react/cjs/react-jsx-runtime.development.js:1320:12)
      at App (src/App.tsx:53:32)
      at renderWithHooks (node_modules/react-dom/cjs/react-dom.development.js:15486:18)
      at mountIndeterminateComponent (node_modules/react-dom/cjs/react-dom.development.js:20103:13)
      at beginWork (node_modules/react-dom/cjs/react-dom.development.js:21626:16)
      at beginWork$1 (node_modules/react-dom/cjs/react-dom.development.js:27465:14)
      at performUnitOfWork (node_modules/react-dom/cjs/react-dom.development.js:26599:12)
      at workLoopSync (node_modules/react-dom/cjs/react-dom.development.js:26505:5)
      at renderRootSync (node_modules/react-dom/cjs/react-dom.development.js:26473:7)
      at recoverFromConcurrentError (node_modules/react-dom/cjs/react-dom.development.js:25889:20)
      at performConcurrentWorkOnRoot (node_modules/react-dom/cjs/react-dom.development.js:25789:22)
      at flushActQueue (node_modules/react/cjs/react.development.js:2667:24)
      at act (node_modules/react/cjs/react.development.js:2582:11)
      at node_modules/@testing-library/react/dist/act-compat.js:47:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:190:26)
      at render (node_modules/@testing-library/react/dist/pure.js:292:10)
      at Object.<anonymous> (src/__tests__/App.integration.test.tsx:98:11)

    console.error
      Error: Uncaught [Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
      
      Check the render method of `App`.]
          at reportException (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/helpers/runtime-script-errors.js:66:24)
          at innerInvokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:353:9)
          at invokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:286:3)
          at HTMLUnknownElementImpl._dispatch (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:233:9)
          at HTMLUnknownElementImpl.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:104:17)
          at HTMLUnknownElement.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/generated/EventTarget.js:241:34)
          at Object.invokeGuardedCallbackDev (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4213:16)
          at invokeGuardedCallback (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4277:31)
          at beginWork$1 (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:27490:7)
          at performUnitOfWork (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26599:12)
          at workLoopSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26505:5)
          at renderRootSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26473:7)
          at recoverFromConcurrentError (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:25889:20)
          at performConcurrentWorkOnRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:25789:22)
          at flushActQueue (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2667:24)
          at act (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2582:11)
          at /home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/act-compat.js:47:25
          at renderRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:190:26)
          at render (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:292:10)
          at Object.<anonymous> (/home/runner/work/blackjack-simulator/blackjack-simulator/src/__tests__/App.integration.test.tsx:98:11)
          at Promise.finally.completed (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1559:28)
          at new Promise (<anonymous>)
          at callAsyncCircusFn (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1499:10)
          at _callCircusTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1009:40)
          at processTicksAndRejections (node:internal/process/task_queues:95:5)
          at _runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:949:3)
          at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:839:13)
          at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:829:11)
          at run (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:757:3)
          at runAndTransformResultsToJestFormat (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1920:21)
          at jestAdapter (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/runner.js:101:19)
          at runTestInternal (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:275:16)
          at runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:343:7)
          at Object.worker (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:497:12) {
        detail: Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
        
        Check the render method of `App`.
            at createFiberFromTypeAndProps (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:28478:17)
            at createFiberFromElement (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:28504:15)
            at createChild (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:13345:28)
            at reconcileChildrenArray (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:13640:25)
            at reconcileChildFibers (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:14057:16)
            at reconcileChildren (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:19186:28)
            at updateHostComponent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:19953:3)
            at beginWork (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:21657:14)
            at HTMLUnknownElement.callCallback (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4164:14)
            at HTMLUnknownElement.callTheUserObjectsOperation (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/generated/EventListener.js:26:30)
            at innerInvokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:350:25)
            at invokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:286:3)
            at HTMLUnknownElementImpl._dispatch (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:233:9)
            at HTMLUnknownElementImpl.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:104:17)
            at HTMLUnknownElement.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/generated/EventTarget.js:241:34)
            at Object.invokeGuardedCallbackDev (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4213:16)
            at invokeGuardedCallback (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4277:31)
            at beginWork$1 (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:27490:7)
            at performUnitOfWork (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26599:12)
            at workLoopSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26505:5)
            at renderRootSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26473:7)
            at recoverFromConcurrentError (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:25889:20)
            at performConcurrentWorkOnRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:25789:22)
            at flushActQueue (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2667:24)
            at act (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2582:11)
            at /home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/act-compat.js:47:25
            at renderRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:190:26)
            at render (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:292:10)
            at Object.<anonymous> (/home/runner/work/blackjack-simulator/blackjack-simulator/src/__tests__/App.integration.test.tsx:98:11)
            at Promise.finally.completed (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1559:28)
            at new Promise (<anonymous>)
            at callAsyncCircusFn (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1499:10)
            at _callCircusTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1009:40)
            at processTicksAndRejections (node:internal/process/task_queues:95:5)
            at _runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:949:3)
            at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:839:13)
            at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:829:11)
            at run (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:757:3)
            at runAndTransformResultsToJestFormat (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1920:21)
            at jestAdapter (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/runner.js:101:19)
            at runTestInternal (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:275:16)
            at runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:343:7)
            at Object.worker (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:497:12),
        type: 'unhandled exception'
      }

       96 |
       97 |   it('handles rapid navigation switching', () => {
    >  98 |     render(<App />);
          |           ^
       99 |     
      100 |     const simulatorButton = screen.getByText('Simulator');
      101 |     const threeDButton = screen.getByText('3D Demo');

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at VirtualConsole.<anonymous> (node_modules/@jest/environment-jsdom-abstract/build/index.js:78:23)
      at reportException (node_modules/jsdom/lib/jsdom/living/helpers/runtime-script-errors.js:70:28)
      at innerInvokeEventListeners (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:353:9)
      at invokeEventListeners (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:286:3)
      at HTMLUnknownElementImpl._dispatch (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:233:9)
      at HTMLUnknownElementImpl.dispatchEvent (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:104:17)
      at HTMLUnknownElement.dispatchEvent (node_modules/jsdom/lib/jsdom/living/generated/EventTarget.js:241:34)
      at Object.invokeGuardedCallbackDev (node_modules/react-dom/cjs/react-dom.development.js:4213:16)
      at invokeGuardedCallback (node_modules/react-dom/cjs/react-dom.development.js:4277:31)
      at beginWork$1 (node_modules/react-dom/cjs/react-dom.development.js:27490:7)
      at performUnitOfWork (node_modules/react-dom/cjs/react-dom.development.js:26599:12)
      at workLoopSync (node_modules/react-dom/cjs/react-dom.development.js:26505:5)
      at renderRootSync (node_modules/react-dom/cjs/react-dom.development.js:26473:7)
      at recoverFromConcurrentError (node_modules/react-dom/cjs/react-dom.development.js:25889:20)
      at performConcurrentWorkOnRoot (node_modules/react-dom/cjs/react-dom.development.js:25789:22)
      at flushActQueue (node_modules/react/cjs/react.development.js:2667:24)
      at act (node_modules/react/cjs/react.development.js:2582:11)
      at node_modules/@testing-library/react/dist/act-compat.js:47:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:190:26)
      at render (node_modules/@testing-library/react/dist/pure.js:292:10)
      at Object.<anonymous> (src/__tests__/App.integration.test.tsx:98:11)

    console.error
      The above error occurred in the <div> component:
      
          at div
          at App (/home/runner/work/blackjack-simulator/blackjack-simulator/src/App.tsx:7:35)
      
      Consider adding an error boundary to your tree to customize error handling behavior.
      Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.

       96 |
       97 |   it('handles rapid navigation switching', () => {
    >  98 |     render(<App />);
          |           ^
       99 |     
      100 |     const simulatorButton = screen.getByText('Simulator');
      101 |     const threeDButton = screen.getByText('3D Demo');

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at logCapturedError (node_modules/react-dom/cjs/react-dom.development.js:18704:23)
      at update.callback (node_modules/react-dom/cjs/react-dom.development.js:18737:5)
      at callCallback (node_modules/react-dom/cjs/react-dom.development.js:15036:12)
      at commitUpdateQueue (node_modules/react-dom/cjs/react-dom.development.js:15057:9)
      at commitLayoutEffectOnFiber (node_modules/react-dom/cjs/react-dom.development.js:23430:13)
      at commitLayoutMountEffects_complete (node_modules/react-dom/cjs/react-dom.development.js:24727:9)
      at commitLayoutEffects_begin (node_modules/react-dom/cjs/react-dom.development.js:24713:7)
      at commitLayoutEffects (node_modules/react-dom/cjs/react-dom.development.js:24651:3)
      at commitRootImpl (node_modules/react-dom/cjs/react-dom.development.js:26862:5)
      at commitRoot (node_modules/react-dom/cjs/react-dom.development.js:26721:5)
      at finishConcurrentRender (node_modules/react-dom/cjs/react-dom.development.js:25931:9)
      at performConcurrentWorkOnRoot (node_modules/react-dom/cjs/react-dom.development.js:25848:7)
      at flushActQueue (node_modules/react/cjs/react.development.js:2667:24)
      at act (node_modules/react/cjs/react.development.js:2582:11)
      at node_modules/@testing-library/react/dist/act-compat.js:47:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:190:26)
      at render (node_modules/@testing-library/react/dist/pure.js:292:10)
      at Object.<anonymous> (src/__tests__/App.integration.test.tsx:98:11)

    console.error
      Warning: React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
      
      Check the render method of `App`.
          at App (/home/runner/work/blackjack-simulator/blackjack-simulator/src/App.tsx:7:35)

      51 |
      52 |       {/* Content */}
    > 53 |       {view === 'simulator' && <BlackjackSimulator />}
         |                                ^
      54 |       {view === '3d-demo' && <Game3DDemo />}
      55 |       {view === 'interactive' && <InteractiveGamePage />}
      56 |     </div>

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at printWarning (node_modules/react/cjs/react-jsx-runtime.development.js:87:30)
      at error (node_modules/react/cjs/react-jsx-runtime.development.js:61:7)
      at jsxWithValidation (node_modules/react/cjs/react-jsx-runtime.development.js:1245:7)
      at jsxWithValidationDynamic (node_modules/react/cjs/react-jsx-runtime.development.js:1320:12)
      at App (src/App.tsx:53:32)
      at renderWithHooks (node_modules/react-dom/cjs/react-dom.development.js:15486:18)
      at mountIndeterminateComponent (node_modules/react-dom/cjs/react-dom.development.js:20103:13)
      at beginWork (node_modules/react-dom/cjs/react-dom.development.js:21626:16)
      at beginWork$1 (node_modules/react-dom/cjs/react-dom.development.js:27465:14)
      at performUnitOfWork (node_modules/react-dom/cjs/react-dom.development.js:26599:12)
      at workLoopSync (node_modules/react-dom/cjs/react-dom.development.js:26505:5)
      at renderRootSync (node_modules/react-dom/cjs/react-dom.development.js:26473:7)
      at performConcurrentWorkOnRoot (node_modules/react-dom/cjs/react-dom.development.js:25777:74)
      at flushActQueue (node_modules/react/cjs/react.development.js:2667:24)
      at act (node_modules/react/cjs/react.development.js:2582:11)
      at node_modules/@testing-library/react/dist/act-compat.js:47:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:190:26)
      at render (node_modules/@testing-library/react/dist/pure.js:292:10)
      at Object.<anonymous> (src/__tests__/App.integration.test.tsx:115:11)

    console.error
      Error: Uncaught [Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
      
      Check the render method of `App`.]
          at reportException (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/helpers/runtime-script-errors.js:66:24)
          at innerInvokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:353:9)
          at invokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:286:3)
          at HTMLUnknownElementImpl._dispatch (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:233:9)
          at HTMLUnknownElementImpl.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:104:17)
          at HTMLUnknownElement.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/generated/EventTarget.js:241:34)
          at Object.invokeGuardedCallbackDev (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4213:16)
          at invokeGuardedCallback (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4277:31)
          at beginWork$1 (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:27490:7)
          at performUnitOfWork (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26599:12)
          at workLoopSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26505:5)
          at renderRootSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26473:7)
          at performConcurrentWorkOnRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:25777:74)
          at flushActQueue (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2667:24)
          at act (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2582:11)
          at /home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/act-compat.js:47:25
          at renderRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:190:26)
          at render (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:292:10)
          at Object.<anonymous> (/home/runner/work/blackjack-simulator/blackjack-simulator/src/__tests__/App.integration.test.tsx:115:11)
          at Promise.finally.completed (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1559:28)
          at new Promise (<anonymous>)
          at callAsyncCircusFn (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1499:10)
          at _callCircusTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1009:40)
          at processTicksAndRejections (node:internal/process/task_queues:95:5)
          at _runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:949:3)
          at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:839:13)
          at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:829:11)
          at run (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:757:3)
          at runAndTransformResultsToJestFormat (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1920:21)
          at jestAdapter (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/runner.js:101:19)
          at runTestInternal (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:275:16)
          at runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:343:7)
          at Object.worker (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:497:12) {
        detail: Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
        
        Check the render method of `App`.
            at createFiberFromTypeAndProps (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:28478:17)
            at createFiberFromElement (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:28504:15)
            at createChild (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:13345:28)
            at reconcileChildrenArray (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:13640:25)
            at reconcileChildFibers (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:14057:16)
            at reconcileChildren (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:19186:28)
            at updateHostComponent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:19953:3)
            at beginWork (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:21657:14)
            at HTMLUnknownElement.callCallback (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4164:14)
            at HTMLUnknownElement.callTheUserObjectsOperation (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/generated/EventListener.js:26:30)
            at innerInvokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:350:25)
            at invokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:286:3)
            at HTMLUnknownElementImpl._dispatch (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:233:9)
            at HTMLUnknownElementImpl.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:104:17)
            at HTMLUnknownElement.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/generated/EventTarget.js:241:34)
            at Object.invokeGuardedCallbackDev (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4213:16)
            at invokeGuardedCallback (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4277:31)
            at beginWork$1 (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:27490:7)
            at performUnitOfWork (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26599:12)
            at workLoopSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26505:5)
            at renderRootSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26473:7)
            at performConcurrentWorkOnRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:25777:74)
            at flushActQueue (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2667:24)
            at act (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2582:11)
            at /home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/act-compat.js:47:25
            at renderRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:190:26)
            at render (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:292:10)
            at Object.<anonymous> (/home/runner/work/blackjack-simulator/blackjack-simulator/src/__tests__/App.integration.test.tsx:115:11)
            at Promise.finally.completed (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1559:28)
            at new Promise (<anonymous>)
            at callAsyncCircusFn (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1499:10)
            at _callCircusTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1009:40)
            at processTicksAndRejections (node:internal/process/task_queues:95:5)
            at _runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:949:3)
            at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:839:13)
            at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:829:11)
            at run (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:757:3)
            at runAndTransformResultsToJestFormat (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1920:21)
            at jestAdapter (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/runner.js:101:19)
            at runTestInternal (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:275:16)
            at runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:343:7)
            at Object.worker (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:497:12),
        type: 'unhandled exception'
      }

      113 |
      114 |   it('maintains testid for backward compatibility', () => {
    > 115 |     render(<App />);
          |           ^
      116 |     expect(screen.getByTestId('blackjack-simulator')).toBeInTheDocument();
      117 |   });
      118 | });

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at VirtualConsole.<anonymous> (node_modules/@jest/environment-jsdom-abstract/build/index.js:78:23)
      at reportException (node_modules/jsdom/lib/jsdom/living/helpers/runtime-script-errors.js:70:28)
      at innerInvokeEventListeners (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:353:9)
      at invokeEventListeners (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:286:3)
      at HTMLUnknownElementImpl._dispatch (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:233:9)
      at HTMLUnknownElementImpl.dispatchEvent (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:104:17)
      at HTMLUnknownElement.dispatchEvent (node_modules/jsdom/lib/jsdom/living/generated/EventTarget.js:241:34)
      at Object.invokeGuardedCallbackDev (node_modules/react-dom/cjs/react-dom.development.js:4213:16)
      at invokeGuardedCallback (node_modules/react-dom/cjs/react-dom.development.js:4277:31)
      at beginWork$1 (node_modules/react-dom/cjs/react-dom.development.js:27490:7)
      at performUnitOfWork (node_modules/react-dom/cjs/react-dom.development.js:26599:12)
      at workLoopSync (node_modules/react-dom/cjs/react-dom.development.js:26505:5)
      at renderRootSync (node_modules/react-dom/cjs/react-dom.development.js:26473:7)
      at performConcurrentWorkOnRoot (node_modules/react-dom/cjs/react-dom.development.js:25777:74)
      at flushActQueue (node_modules/react/cjs/react.development.js:2667:24)
      at act (node_modules/react/cjs/react.development.js:2582:11)
      at node_modules/@testing-library/react/dist/act-compat.js:47:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:190:26)
      at render (node_modules/@testing-library/react/dist/pure.js:292:10)
      at Object.<anonymous> (src/__tests__/App.integration.test.tsx:115:11)

    console.error
      Warning: React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
      
      Check the render method of `App`.
          at App (/home/runner/work/blackjack-simulator/blackjack-simulator/src/App.tsx:7:35)

      51 |
      52 |       {/* Content */}
    > 53 |       {view === 'simulator' && <BlackjackSimulator />}
         |                                ^
      54 |       {view === '3d-demo' && <Game3DDemo />}
      55 |       {view === 'interactive' && <InteractiveGamePage />}
      56 |     </div>

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at printWarning (node_modules/react/cjs/react-jsx-runtime.development.js:87:30)
      at error (node_modules/react/cjs/react-jsx-runtime.development.js:61:7)
      at jsxWithValidation (node_modules/react/cjs/react-jsx-runtime.development.js:1245:7)
      at jsxWithValidationDynamic (node_modules/react/cjs/react-jsx-runtime.development.js:1320:12)
      at App (src/App.tsx:53:32)
      at renderWithHooks (node_modules/react-dom/cjs/react-dom.development.js:15486:18)
      at mountIndeterminateComponent (node_modules/react-dom/cjs/react-dom.development.js:20103:13)
      at beginWork (node_modules/react-dom/cjs/react-dom.development.js:21626:16)
      at beginWork$1 (node_modules/react-dom/cjs/react-dom.development.js:27465:14)
      at performUnitOfWork (node_modules/react-dom/cjs/react-dom.development.js:26599:12)
      at workLoopSync (node_modules/react-dom/cjs/react-dom.development.js:26505:5)
      at renderRootSync (node_modules/react-dom/cjs/react-dom.development.js:26473:7)
      at recoverFromConcurrentError (node_modules/react-dom/cjs/react-dom.development.js:25889:20)
      at performConcurrentWorkOnRoot (node_modules/react-dom/cjs/react-dom.development.js:25789:22)
      at flushActQueue (node_modules/react/cjs/react.development.js:2667:24)
      at act (node_modules/react/cjs/react.development.js:2582:11)
      at node_modules/@testing-library/react/dist/act-compat.js:47:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:190:26)
      at render (node_modules/@testing-library/react/dist/pure.js:292:10)
      at Object.<anonymous> (src/__tests__/App.integration.test.tsx:115:11)

    console.error
      Error: Uncaught [Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
      
      Check the render method of `App`.]
          at reportException (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/helpers/runtime-script-errors.js:66:24)
          at innerInvokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:353:9)
          at invokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:286:3)
          at HTMLUnknownElementImpl._dispatch (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:233:9)
          at HTMLUnknownElementImpl.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:104:17)
          at HTMLUnknownElement.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/generated/EventTarget.js:241:34)
          at Object.invokeGuardedCallbackDev (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4213:16)
          at invokeGuardedCallback (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4277:31)
          at beginWork$1 (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:27490:7)
          at performUnitOfWork (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26599:12)
          at workLoopSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26505:5)
          at renderRootSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26473:7)
          at recoverFromConcurrentError (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:25889:20)
          at performConcurrentWorkOnRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:25789:22)
          at flushActQueue (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2667:24)
          at act (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2582:11)
          at /home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/act-compat.js:47:25
          at renderRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:190:26)
          at render (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:292:10)
          at Object.<anonymous> (/home/runner/work/blackjack-simulator/blackjack-simulator/src/__tests__/App.integration.test.tsx:115:11)
          at Promise.finally.completed (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1559:28)
          at new Promise (<anonymous>)
          at callAsyncCircusFn (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1499:10)
          at _callCircusTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1009:40)
          at processTicksAndRejections (node:internal/process/task_queues:95:5)
          at _runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:949:3)
          at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:839:13)
          at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:829:11)
          at run (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:757:3)
          at runAndTransformResultsToJestFormat (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1920:21)
          at jestAdapter (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/runner.js:101:19)
          at runTestInternal (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:275:16)
          at runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:343:7)
          at Object.worker (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:497:12) {
        detail: Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
        
        Check the render method of `App`.
            at createFiberFromTypeAndProps (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:28478:17)
            at createFiberFromElement (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:28504:15)
            at createChild (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:13345:28)
            at reconcileChildrenArray (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:13640:25)
            at reconcileChildFibers (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:14057:16)
            at reconcileChildren (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:19186:28)
            at updateHostComponent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:19953:3)
            at beginWork (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:21657:14)
            at HTMLUnknownElement.callCallback (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4164:14)
            at HTMLUnknownElement.callTheUserObjectsOperation (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/generated/EventListener.js:26:30)
            at innerInvokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:350:25)
            at invokeEventListeners (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:286:3)
            at HTMLUnknownElementImpl._dispatch (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:233:9)
            at HTMLUnknownElementImpl.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:104:17)
            at HTMLUnknownElement.dispatchEvent (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jsdom/lib/jsdom/living/generated/EventTarget.js:241:34)
            at Object.invokeGuardedCallbackDev (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4213:16)
            at invokeGuardedCallback (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:4277:31)
            at beginWork$1 (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:27490:7)
            at performUnitOfWork (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26599:12)
            at workLoopSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26505:5)
            at renderRootSync (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:26473:7)
            at recoverFromConcurrentError (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:25889:20)
            at performConcurrentWorkOnRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react-dom/cjs/react-dom.development.js:25789:22)
            at flushActQueue (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2667:24)
            at act (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/react/cjs/react.development.js:2582:11)
            at /home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/act-compat.js:47:25
            at renderRoot (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:190:26)
            at render (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/@testing-library/react/dist/pure.js:292:10)
            at Object.<anonymous> (/home/runner/work/blackjack-simulator/blackjack-simulator/src/__tests__/App.integration.test.tsx:115:11)
            at Promise.finally.completed (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1559:28)
            at new Promise (<anonymous>)
            at callAsyncCircusFn (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1499:10)
            at _callCircusTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1009:40)
            at processTicksAndRejections (node:internal/process/task_queues:95:5)
            at _runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:949:3)
            at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:839:13)
            at _runTestsForDescribeBlock (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:829:11)
            at run (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:757:3)
            at runAndTransformResultsToJestFormat (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/jestAdapterInit.js:1920:21)
            at jestAdapter (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-circus/build/runner.js:101:19)
            at runTestInternal (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:275:16)
            at runTest (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:343:7)
            at Object.worker (/home/runner/work/blackjack-simulator/blackjack-simulator/node_modules/jest-runner/build/testWorker.js:497:12),
        type: 'unhandled exception'
      }

      113 |
      114 |   it('maintains testid for backward compatibility', () => {
    > 115 |     render(<App />);
          |           ^
      116 |     expect(screen.getByTestId('blackjack-simulator')).toBeInTheDocument();
      117 |   });
      118 | });

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at VirtualConsole.<anonymous> (node_modules/@jest/environment-jsdom-abstract/build/index.js:78:23)
      at reportException (node_modules/jsdom/lib/jsdom/living/helpers/runtime-script-errors.js:70:28)
      at innerInvokeEventListeners (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:353:9)
      at invokeEventListeners (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:286:3)
      at HTMLUnknownElementImpl._dispatch (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:233:9)
      at HTMLUnknownElementImpl.dispatchEvent (node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:104:17)
      at HTMLUnknownElement.dispatchEvent (node_modules/jsdom/lib/jsdom/living/generated/EventTarget.js:241:34)
      at Object.invokeGuardedCallbackDev (node_modules/react-dom/cjs/react-dom.development.js:4213:16)
      at invokeGuardedCallback (node_modules/react-dom/cjs/react-dom.development.js:4277:31)
      at beginWork$1 (node_modules/react-dom/cjs/react-dom.development.js:27490:7)
      at performUnitOfWork (node_modules/react-dom/cjs/react-dom.development.js:26599:12)
      at workLoopSync (node_modules/react-dom/cjs/react-dom.development.js:26505:5)
      at renderRootSync (node_modules/react-dom/cjs/react-dom.development.js:26473:7)
      at recoverFromConcurrentError (node_modules/react-dom/cjs/react-dom.development.js:25889:20)
      at performConcurrentWorkOnRoot (node_modules/react-dom/cjs/react-dom.development.js:25789:22)
      at flushActQueue (node_modules/react/cjs/react.development.js:2667:24)
      at act (node_modules/react/cjs/react.development.js:2582:11)
      at node_modules/@testing-library/react/dist/act-compat.js:47:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:190:26)
      at render (node_modules/@testing-library/react/dist/pure.js:292:10)
      at Object.<anonymous> (src/__tests__/App.integration.test.tsx:115:11)

    console.error
      The above error occurred in the <div> component:
      
          at div
          at App (/home/runner/work/blackjack-simulator/blackjack-simulator/src/App.tsx:7:35)
      
      Consider adding an error boundary to your tree to customize error handling behavior.
      Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.

      113 |
      114 |   it('maintains testid for backward compatibility', () => {
    > 115 |     render(<App />);
          |           ^
      116 |     expect(screen.getByTestId('blackjack-simulator')).toBeInTheDocument();
      117 |   });
      118 | });

      at console.error (node_modules/its-fine/src/index.tsx:86:16)
      at logCapturedError (node_modules/react-dom/cjs/react-dom.development.js:18704:23)
      at update.callback (node_modules/react-dom/cjs/react-dom.development.js:18737:5)
      at callCallback (node_modules/react-dom/cjs/react-dom.development.js:15036:12)
      at commitUpdateQueue (node_modules/react-dom/cjs/react-dom.development.js:15057:9)
      at commitLayoutEffectOnFiber (node_modules/react-dom/cjs/react-dom.development.js:23430:13)
      at commitLayoutMountEffects_complete (node_modules/react-dom/cjs/react-dom.development.js:24727:9)
      at commitLayoutEffects_begin (node_modules/react-dom/cjs/react-dom.development.js:24713:7)
      at commitLayoutEffects (node_modules/react-dom/cjs/react-dom.development.js:24651:3)
      at commitRootImpl (node_modules/react-dom/cjs/react-dom.development.js:26862:5)
      at commitRoot (node_modules/react-dom/cjs/react-dom.development.js:26721:5)
      at finishConcurrentRender (node_modules/react-dom/cjs/react-dom.development.js:25931:9)
      at performConcurrentWorkOnRoot (node_modules/react-dom/cjs/react-dom.development.js:25848:7)
      at flushActQueue (node_modules/react/cjs/react.development.js:2667:24)
      at act (node_modules/react/cjs/react.development.js:2582:11)
      at node_modules/@testing-library/react/dist/act-compat.js:47:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:190:26)
      at render (node_modules/@testing-library/react/dist/pure.js:292:10)
      at Object.<anonymous> (src/__tests__/App.integration.test.tsx:115:11)

  ● App Integration Tests › renders without crashing

    Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.

    Check the render method of `App`.

      18 | describe('App Integration Tests', () => {
      19 |   it('renders without crashing', () => {
    > 20 |     render(<App />);
         |           ^
      21 |     expect(screen.getByTestId('blackjack-simulator')).toBeInTheDocument();
      22 |   });
      23 |

      at createFiberFromTypeAndProps (node_modules/react-dom/cjs/react-dom.development.js:28478:17)
      at createFiberFromElement (node_modules/react-dom/cjs/react-dom.development.js:28504:15)
      at createChild (node_modules/react-dom/cjs/react-dom.development.js:13345:28)
      at reconcileChildrenArray (node_modules/react-dom/cjs/react-dom.development.js:13640:25)
      at reconcileChildFibers (node_modules/react-dom/cjs/react-dom.development.js:14057:16)
      at reconcileChildren (node_modules/react-dom/cjs/react-dom.development.js:19186:28)
      at updateHostComponent (node_modules/react-dom/cjs/react-dom.development.js:19953:3)
      at beginWork (node_modules/react-dom/cjs/react-dom.development.js:21657:14)
      at beginWork$1 (node_modules/react-dom/cjs/react-dom.development.js:27465:14)
      at performUnitOfWork (node_modules/react-dom/cjs/react-dom.development.js:26599:12)
      at workLoopSync (node_modules/react-dom/cjs/react-dom.development.js:26505:5)
      at renderRootSync (node_modules/react-dom/cjs/react-dom.development.js:26473:7)
      at recoverFromConcurrentError (node_modules/react-dom/cjs/react-dom.development.js:25889:20)
      at performConcurrentWorkOnRoot (node_modules/react-dom/cjs/react-dom.development.js:25789:22)
      at flushActQueue (node_modules/react/cjs/react.development.js:2667:24)
      at act (node_modules/react/cjs/react.development.js:2582:11)
      at node_modules/@testing-library/react/dist/act-compat.js:47:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:190:26)
      at render (node_modules/@testing-library/react/dist/pure.js:292:10)
      at Object.<anonymous> (src/__tests__/App.integration.test.tsx:20:11)

  ● App Integration Tests › renders navigation header

    Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.

    Check the render method of `App`.

      23 |
      24 |   it('renders navigation header', () => {
    > 25 |     render(<App />);
         |           ^
      26 |     expect(screen.getByText('Blackjack Strategy Simulator')).toBeInTheDocument();
      27 |   });
      28 |

      at createFiberFromTypeAndProps (node_modules/react-dom/cjs/react-dom.development.js:28478:17)
      at createFiberFromElement (node_modules/react-dom/cjs/react-dom.development.js:28504:15)
      at createChild (node_modules/react-dom/cjs/react-dom.development.js:13345:28)
      at reconcileChildrenArray (node_modules/react-dom/cjs/react-dom.development.js:13640:25)
      at reconcileChildFibers (node_modules/react-dom/cjs/react-dom.development.js:14057:16)
      at reconcileChildren (node_modules/react-dom/cjs/react-dom.development.js:19186:28)
      at updateHostComponent (node_modules/react-dom/cjs/react-dom.development.js:19953:3)
      at beginWork (node_modules/react-dom/cjs/react-dom.development.js:21657:14)
      at beginWork$1 (node_modules/react-dom/cjs/react-dom.development.js:27465:14)
      at performUnitOfWork (node_modules/react-dom/cjs/react-dom.development.js:26599:12)
      at workLoopSync (node_modules/react-dom/cjs/react-dom.development.js:26505:5)
      at renderRootSync (node_modules/react-dom/cjs/react-dom.development.js:26473:7)
      at recoverFromConcurrentError (node_modules/react-dom/cjs/react-dom.development.js:25889:20)
      at performConcurrentWorkOnRoot (node_modules/react-dom/cjs/react-dom.development.js:25789:22)
      at flushActQueue (node_modules/react/cjs/react.development.js:2667:24)
      at act (node_modules/react/cjs/react.development.js:2582:11)
      at node_modules/@testing-library/react/dist/act-compat.js:47:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:190:26)
      at render (node_modules/@testing-library/react/dist/pure.js:292:10)
      at Object.<anonymous> (src/__tests__/App.integration.test.tsx:25:11)

  ● App Integration Tests › renders navigation buttons

    Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.

    Check the render method of `App`.

      28 |
      29 |   it('renders navigation buttons', () => {
    > 30 |     render(<App />);
         |           ^
      31 |     expect(screen.getByText('Simulator')).toBeInTheDocument();
      32 |     expect(screen.getByText('3D Demo')).toBeInTheDocument();
      33 |   });

      at createFiberFromTypeAndProps (node_modules/react-dom/cjs/react-dom.development.js:28478:17)
      at createFiberFromElement (node_modules/react-dom/cjs/react-dom.development.js:28504:15)
      at createChild (node_modules/react-dom/cjs/react-dom.development.js:13345:28)
      at reconcileChildrenArray (node_modules/react-dom/cjs/react-dom.development.js:13640:25)
      at reconcileChildFibers (node_modules/react-dom/cjs/react-dom.development.js:14057:16)
      at reconcileChildren (node_modules/react-dom/cjs/react-dom.development.js:19186:28)
      at updateHostComponent (node_modules/react-dom/cjs/react-dom.development.js:19953:3)
      at beginWork (node_modules/react-dom/cjs/react-dom.development.js:21657:14)
      at beginWork$1 (node_modules/react-dom/cjs/react-dom.development.js:27465:14)
      at performUnitOfWork (node_modules/react-dom/cjs/react-dom.development.js:26599:12)
      at workLoopSync (node_modules/react-dom/cjs/react-dom.development.js:26505:5)
      at renderRootSync (node_modules/react-dom/cjs/react-dom.development.js:26473:7)
      at recoverFromConcurrentError (node_modules/react-dom/cjs/react-dom.development.js:25889:20)
      at performConcurrentWorkOnRoot (node_modules/react-dom/cjs/react-dom.development.js:25789:22)
      at flushActQueue (node_modules/react/cjs/react.development.js:2667:24)
      at act (node_modules/react/cjs/react.development.js:2582:11)
      at node_modules/@testing-library/react/dist/act-compat.js:47:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:190:26)
      at render (node_modules/@testing-library/react/dist/pure.js:292:10)
      at Object.<anonymous> (src/__tests__/App.integration.test.tsx:30:11)

  ● App Integration Tests › starts with simulator view by default

    Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.

    Check the render method of `App`.

      34 |
      35 |   it('starts with simulator view by default', () => {
    > 36 |     render(<App />);
         |           ^
      37 |     expect(screen.getByTestId('blackjack-simulator-mock')).toBeInTheDocument();
      38 |     expect(screen.queryByTestId('game-3d-demo-mock')).not.toBeInTheDocument();
      39 |   });

      at createFiberFromTypeAndProps (node_modules/react-dom/cjs/react-dom.development.js:28478:17)
      at createFiberFromElement (node_modules/react-dom/cjs/react-dom.development.js:28504:15)
      at createChild (node_modules/react-dom/cjs/react-dom.development.js:13345:28)
      at reconcileChildrenArray (node_modules/react-dom/cjs/react-dom.development.js:13640:25)
      at reconcileChildFibers (node_modules/react-dom/cjs/react-dom.development.js:14057:16)
      at reconcileChildren (node_modules/react-dom/cjs/react-dom.development.js:19186:28)
      at updateHostComponent (node_modules/react-dom/cjs/react-dom.development.js:19953:3)
      at beginWork (node_modules/react-dom/cjs/react-dom.development.js:21657:14)
      at beginWork$1 (node_modules/react-dom/cjs/react-dom.development.js:27465:14)
      at performUnitOfWork (node_modules/react-dom/cjs/react-dom.development.js:26599:12)
      at workLoopSync (node_modules/react-dom/cjs/react-dom.development.js:26505:5)
      at renderRootSync (node_modules/react-dom/cjs/react-dom.development.js:26473:7)
      at recoverFromConcurrentError (node_modules/react-dom/cjs/react-dom.development.js:25889:20)
      at performConcurrentWorkOnRoot (node_modules/react-dom/cjs/react-dom.development.js:25789:22)
      at flushActQueue (node_modules/react/cjs/react.development.js:2667:24)
      at act (node_modules/react/cjs/react.development.js:2582:11)
      at node_modules/@testing-library/react/dist/act-compat.js:47:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:190:26)
      at render (node_modules/@testing-library/react/dist/pure.js:292:10)
      at Object.<anonymous> (src/__tests__/App.integration.test.tsx:36:11)

  ● App Integration Tests › switches to 3D demo when button is clicked

    Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.

    Check the render method of `App`.

      40 |
      41 |   it('switches to 3D demo when button is clicked', () => {
    > 42 |     render(<App />);
         |           ^
      43 |     
      44 |     const threeDButton = screen.getByText('3D Demo');
      45 |     fireEvent.click(threeDButton);

      at createFiberFromTypeAndProps (node_modules/react-dom/cjs/react-dom.development.js:28478:17)
      at createFiberFromElement (node_modules/react-dom/cjs/react-dom.development.js:28504:15)
      at createChild (node_modules/react-dom/cjs/react-dom.development.js:13345:28)
      at reconcileChildrenArray (node_modules/react-dom/cjs/react-dom.development.js:13640:25)
      at reconcileChildFibers (node_modules/react-dom/cjs/react-dom.development.js:14057:16)
      at reconcileChildren (node_modules/react-dom/cjs/react-dom.development.js:19186:28)
      at updateHostComponent (node_modules/react-dom/cjs/react-dom.development.js:19953:3)
      at beginWork (node_modules/react-dom/cjs/react-dom.development.js:21657:14)
      at beginWork$1 (node_modules/react-dom/cjs/react-dom.development.js:27465:14)
      at performUnitOfWork (node_modules/react-dom/cjs/react-dom.development.js:26599:12)
      at workLoopSync (node_modules/react-dom/cjs/react-dom.development.js:26505:5)
      at renderRootSync (node_modules/react-dom/cjs/react-dom.development.js:26473:7)
      at recoverFromConcurrentError (node_modules/react-dom/cjs/react-dom.development.js:25889:20)
      at performConcurrentWorkOnRoot (node_modules/react-dom/cjs/react-dom.development.js:25789:22)
      at flushActQueue (node_modules/react/cjs/react.development.js:2667:24)
      at act (node_modules/react/cjs/react.development.js:2582:11)
      at node_modules/@testing-library/react/dist/act-compat.js:47:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:190:26)
      at render (node_modules/@testing-library/react/dist/pure.js:292:10)
      at Object.<anonymous> (src/__tests__/App.integration.test.tsx:42:11)

  ● App Integration Tests › switches back to simulator when button is clicked

    Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.

    Check the render method of `App`.

      50 |
      51 |   it('switches back to simulator when button is clicked', () => {
    > 52 |     render(<App />);
         |           ^
      53 |     
      54 |     // Switch to 3D Demo first
      55 |     const threeDButton = screen.getByText('3D Demo');

      at createFiberFromTypeAndProps (node_modules/react-dom/cjs/react-dom.development.js:28478:17)
      at createFiberFromElement (node_modules/react-dom/cjs/react-dom.development.js:28504:15)
      at createChild (node_modules/react-dom/cjs/react-dom.development.js:13345:28)
      at reconcileChildrenArray (node_modules/react-dom/cjs/react-dom.development.js:13640:25)
      at reconcileChildFibers (node_modules/react-dom/cjs/react-dom.development.js:14057:16)
      at reconcileChildren (node_modules/react-dom/cjs/react-dom.development.js:19186:28)
      at updateHostComponent (node_modules/react-dom/cjs/react-dom.development.js:19953:3)
      at beginWork (node_modules/react-dom/cjs/react-dom.development.js:21657:14)
      at beginWork$1 (node_modules/react-dom/cjs/react-dom.development.js:27465:14)
      at performUnitOfWork (node_modules/react-dom/cjs/react-dom.development.js:26599:12)
      at workLoopSync (node_modules/react-dom/cjs/react-dom.development.js:26505:5)
      at renderRootSync (node_modules/react-dom/cjs/react-dom.development.js:26473:7)
      at recoverFromConcurrentError (node_modules/react-dom/cjs/react-dom.development.js:25889:20)
      at performConcurrentWorkOnRoot (node_modules/react-dom/cjs/react-dom.development.js:25789:22)
      at flushActQueue (node_modules/react/cjs/react.development.js:2667:24)
      at act (node_modules/react/cjs/react.development.js:2582:11)
      at node_modules/@testing-library/react/dist/act-compat.js:47:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:190:26)
      at render (node_modules/@testing-library/react/dist/pure.js:292:10)
      at Object.<anonymous> (src/__tests__/App.integration.test.tsx:52:11)

  ● App Integration Tests › highlights active navigation button correctly

    Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.

    Check the render method of `App`.

      66 |
      67 |   it('highlights active navigation button correctly', () => {
    > 68 |     render(<App />);
         |           ^
      69 |     
      70 |     const simulatorButton = screen.getByText('Simulator');
      71 |     const threeDButton = screen.getByText('3D Demo');

      at createFiberFromTypeAndProps (node_modules/react-dom/cjs/react-dom.development.js:28478:17)
      at createFiberFromElement (node_modules/react-dom/cjs/react-dom.development.js:28504:15)
      at createChild (node_modules/react-dom/cjs/react-dom.development.js:13345:28)
      at reconcileChildrenArray (node_modules/react-dom/cjs/react-dom.development.js:13640:25)
      at reconcileChildFibers (node_modules/react-dom/cjs/react-dom.development.js:14057:16)
      at reconcileChildren (node_modules/react-dom/cjs/react-dom.development.js:19186:28)
      at updateHostComponent (node_modules/react-dom/cjs/react-dom.development.js:19953:3)
      at beginWork (node_modules/react-dom/cjs/react-dom.development.js:21657:14)
      at beginWork$1 (node_modules/react-dom/cjs/react-dom.development.js:27465:14)
      at performUnitOfWork (node_modules/react-dom/cjs/react-dom.development.js:26599:12)
      at workLoopSync (node_modules/react-dom/cjs/react-dom.development.js:26505:5)
      at renderRootSync (node_modules/react-dom/cjs/react-dom.development.js:26473:7)
      at recoverFromConcurrentError (node_modules/react-dom/cjs/react-dom.development.js:25889:20)
      at performConcurrentWorkOnRoot (node_modules/react-dom/cjs/react-dom.development.js:25789:22)
      at flushActQueue (node_modules/react/cjs/react.development.js:2667:24)
      at act (node_modules/react/cjs/react.development.js:2582:11)
      at node_modules/@testing-library/react/dist/act-compat.js:47:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:190:26)
      at render (node_modules/@testing-library/react/dist/pure.js:292:10)
      at Object.<anonymous> (src/__tests__/App.integration.test.tsx:68:11)

  ● App Integration Tests › maintains proper layout structure

    Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.

    Check the render method of `App`.

      84 |
      85 |   it('maintains proper layout structure', () => {
    > 86 |     render(<App />);
         |           ^
      87 |     
      88 |     // Check main container
      89 |     const mainContainer = screen.getByTestId('blackjack-simulator');

      at createFiberFromTypeAndProps (node_modules/react-dom/cjs/react-dom.development.js:28478:17)
      at createFiberFromElement (node_modules/react-dom/cjs/react-dom.development.js:28504:15)
      at createChild (node_modules/react-dom/cjs/react-dom.development.js:13345:28)
      at reconcileChildrenArray (node_modules/react-dom/cjs/react-dom.development.js:13640:25)
      at reconcileChildFibers (node_modules/react-dom/cjs/react-dom.development.js:14057:16)
      at reconcileChildren (node_modules/react-dom/cjs/react-dom.development.js:19186:28)
      at updateHostComponent (node_modules/react-dom/cjs/react-dom.development.js:19953:3)
      at beginWork (node_modules/react-dom/cjs/react-dom.development.js:21657:14)
      at beginWork$1 (node_modules/react-dom/cjs/react-dom.development.js:27465:14)
      at performUnitOfWork (node_modules/react-dom/cjs/react-dom.development.js:26599:12)
      at workLoopSync (node_modules/react-dom/cjs/react-dom.development.js:26505:5)
      at renderRootSync (node_modules/react-dom/cjs/react-dom.development.js:26473:7)
      at recoverFromConcurrentError (node_modules/react-dom/cjs/react-dom.development.js:25889:20)
      at performConcurrentWorkOnRoot (node_modules/react-dom/cjs/react-dom.development.js:25789:22)
      at flushActQueue (node_modules/react/cjs/react.development.js:2667:24)
      at act (node_modules/react/cjs/react.development.js:2582:11)
      at node_modules/@testing-library/react/dist/act-compat.js:47:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:190:26)
      at render (node_modules/@testing-library/react/dist/pure.js:292:10)
      at Object.<anonymous> (src/__tests__/App.integration.test.tsx:86:11)

  ● App Integration Tests › handles rapid navigation switching

    Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.

    Check the render method of `App`.

       96 |
       97 |   it('handles rapid navigation switching', () => {
    >  98 |     render(<App />);
          |           ^
       99 |     
      100 |     const simulatorButton = screen.getByText('Simulator');
      101 |     const threeDButton = screen.getByText('3D Demo');

      at createFiberFromTypeAndProps (node_modules/react-dom/cjs/react-dom.development.js:28478:17)
      at createFiberFromElement (node_modules/react-dom/cjs/react-dom.development.js:28504:15)
      at createChild (node_modules/react-dom/cjs/react-dom.development.js:13345:28)
      at reconcileChildrenArray (node_modules/react-dom/cjs/react-dom.development.js:13640:25)
      at reconcileChildFibers (node_modules/react-dom/cjs/react-dom.development.js:14057:16)
      at reconcileChildren (node_modules/react-dom/cjs/react-dom.development.js:19186:28)
      at updateHostComponent (node_modules/react-dom/cjs/react-dom.development.js:19953:3)
      at beginWork (node_modules/react-dom/cjs/react-dom.development.js:21657:14)
      at beginWork$1 (node_modules/react-dom/cjs/react-dom.development.js:27465:14)
      at performUnitOfWork (node_modules/react-dom/cjs/react-dom.development.js:26599:12)
      at workLoopSync (node_modules/react-dom/cjs/react-dom.development.js:26505:5)
      at renderRootSync (node_modules/react-dom/cjs/react-dom.development.js:26473:7)
      at recoverFromConcurrentError (node_modules/react-dom/cjs/react-dom.development.js:25889:20)
      at performConcurrentWorkOnRoot (node_modules/react-dom/cjs/react-dom.development.js:25789:22)
      at flushActQueue (node_modules/react/cjs/react.development.js:2667:24)
      at act (node_modules/react/cjs/react.development.js:2582:11)
      at node_modules/@testing-library/react/dist/act-compat.js:47:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:190:26)
      at render (node_modules/@testing-library/react/dist/pure.js:292:10)
      at Object.<anonymous> (src/__tests__/App.integration.test.tsx:98:11)

  ● App Integration Tests › maintains testid for backward compatibility

    Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.

    Check the render method of `App`.

      113 |
      114 |   it('maintains testid for backward compatibility', () => {
    > 115 |     render(<App />);
          |           ^
      116 |     expect(screen.getByTestId('blackjack-simulator')).toBeInTheDocument();
      117 |   });
      118 | });

      at createFiberFromTypeAndProps (node_modules/react-dom/cjs/react-dom.development.js:28478:17)
      at createFiberFromElement (node_modules/react-dom/cjs/react-dom.development.js:28504:15)
      at createChild (node_modules/react-dom/cjs/react-dom.development.js:13345:28)
      at reconcileChildrenArray (node_modules/react-dom/cjs/react-dom.development.js:13640:25)
      at reconcileChildFibers (node_modules/react-dom/cjs/react-dom.development.js:14057:16)
      at reconcileChildren (node_modules/react-dom/cjs/react-dom.development.js:19186:28)
      at updateHostComponent (node_modules/react-dom/cjs/react-dom.development.js:19953:3)
      at beginWork (node_modules/react-dom/cjs/react-dom.development.js:21657:14)
      at beginWork$1 (node_modules/react-dom/cjs/react-dom.development.js:27465:14)
      at performUnitOfWork (node_modules/react-dom/cjs/react-dom.development.js:26599:12)
      at workLoopSync (node_modules/react-dom/cjs/react-dom.development.js:26505:5)
      at renderRootSync (node_modules/react-dom/cjs/react-dom.development.js:26473:7)
      at recoverFromConcurrentError (node_modules/react-dom/cjs/react-dom.development.js:25889:20)
      at performConcurrentWorkOnRoot (node_modules/react-dom/cjs/react-dom.development.js:25789:22)
      at flushActQueue (node_modules/react/cjs/react.development.js:2667:24)
      at act (node_modules/react/cjs/react.development.js:2582:11)
      at node_modules/@testing-library/react/dist/act-compat.js:47:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:190:26)
      at render (node_modules/@testing-library/react/dist/pure.js:292:10)
      at Object.<anonymous> (src/__tests__/App.integration.test.tsx:115:11)

PASS src/pages/__tests__/InteractiveGamePage.test.tsx
PASS src/components/game/__tests__/BlackjackTable3D.test.tsx
PASS src/pages/__tests__/Game3DDemo.test.tsx
PASS src/__tests__/App.test.tsx
---------------------------------|---------|----------|---------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
File                             | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s                                                                                                                                                                                             
---------------------------------|---------|----------|---------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
All files                        |   38.95 |    29.83 |   36.66 |   38.71 |                                                                                                                                                                                                               
 src                             |      70 |    58.33 |      25 |      70 |                                                                                                                                                                                                               
  App.tsx                        |      70 |    58.33 |      25 |      70 | 18-38                                                                                                                                                                                                         
 src/components                  |   78.36 |    65.76 |      60 |   77.92 |                                                                                                                                                                                                               
  BettingTable.tsx               |    91.3 |       75 |      80 |    90.9 | 104-118                                                                                                                                                                                                       
  BlackjackSimulator.tsx         |   71.42 |       30 |      25 |      75 | 47-60,64                                                                                                                                                                                                      
  ConfigurationPanel.tsx         |      45 |      100 |   26.66 |   47.36 | 68-124,162-238                                                                                                                                                                                                
  HandDetailsTable.tsx           |      96 |       75 |   86.66 |   97.77 | 217                                                                                                                                                                                                           
  ResultsChart.tsx               |       0 |        0 |       0 |       0 | 1-97                                                                                                                                                                                                          
  ResultsPanel.tsx               |     100 |    92.59 |     100 |     100 | 103-104                                                                                                                                                                                                       
  UI.tsx                         |   96.29 |    85.71 |   88.88 |   94.73 | 187                                                                                                                                                                                                           
 src/components/game             |   17.01 |    17.71 |   12.69 |   17.07 |                                                                                                                                                                                                               
  BlackjackTable3D.tsx           |   28.57 |        0 |      10 |   28.57 | 10-160                                                                                                                                                                                                        
  Card3D.tsx                     |   16.96 |    18.96 |   15.38 |   17.43 | 79-239                                                                                                                                                                                                        
  Chip3D.tsx                     |    32.6 |    21.05 |   33.33 |   31.11 | 33-86                                                                                                                                                                                                         
  GameUI.tsx                     |   33.33 |    63.46 |      40 |   33.33 | 124-248                                                                                                                                                                                                       
  InteractiveGame.tsx            |    7.97 |        0 |       0 |    8.14 | 31-340,391-500                                                                                                                                                                                                
 src/hooks                       |   32.87 |     16.5 |   26.73 |   32.84 |                                                                                                                                                                                                               
  useBlackjackGame.ts            |   30.07 |    15.73 |   23.71 |   29.98 | 96-101,119,181-182,190-191,199-220,225-229,248-249,281-284,295-363,373-418,443-538,558-559,566,600-667,675-723,753,756-757,765-805,814-901,906-978,983-1083,1092-1113,1133-1152,1160-1211,1220-1248,1255-1279 
  useSimulation.ts               |    92.3 |       75 |     100 |      92 | 35-36                                                                                                                                                                                                         
 src/pages                       |     100 |      100 |     100 |     100 |                                                                                                                                                                                                               
  Game3DDemo.tsx                 |     100 |      100 |     100 |     100 |                                                                                                                                                                                                               
  InteractiveGamePage.tsx        |     100 |      100 |     100 |     100 |                                                                                                                                                                                                               
 src/stories                     |       0 |        0 |       0 |       0 |                                                                                                                                                                                                               
  BettingTable.stories.tsx       |       0 |      100 |       0 |       0 | 2-33                                                                                                                                                                                                          
  BlackjackSimulator.stories.tsx |       0 |      100 |     100 |       0 | 2-16                                                                                                                                                                                                          
  ConfigurationPanel.stories.tsx |       0 |      100 |       0 |       0 | 2-47                                                                                                                                                                                                          
  HandDetailsTable.stories.tsx   |       0 |        0 |       0 |       0 | 2-36                                                                                                                                                                                                          
  ResultsPanel.stories.tsx       |       0 |      100 |     100 |       0 | 2-73                                                                                                                                                                                                          
  UI.stories.tsx                 |       0 |      100 |       0 |       0 | 2-69                                                                                                                                                                                                          
 src/utils                       |   48.93 |    45.95 |      60 |   49.29 |                                                                                                                                                                                                               
  BlackjackEngine.ts             |   95.11 |    85.84 |   97.29 |   96.04 | 271,346-347,442-445,569-570,575                                                                                                                                                                               
  createCardImages.ts            |       0 |        0 |       0 |       0 | 2-125                                                                                                                                                                                                         
  createChipImages.ts            |       0 |        0 |       0 |       0 | 2-167                                                                                                                                                                                                         
  monitoring.ts                  |       0 |        0 |       0 |       0 | 4-299                                                                                                                                                                                                         
---------------------------------|---------|----------|---------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Test Suites: 4 failed, 11 passed, 15 total
Tests:       22 failed, 117 passed, 139 total
Snapshots:   0 total
Time:        9.008 s
Ran all test suites.
Error: Process completed with exit code 1.