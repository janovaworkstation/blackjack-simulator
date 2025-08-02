### Place error log here and refer to it from the prompt.
<<<<<<< HEAD
=======
m test -- --coverage --watchAll=false

> blackjack-simulator@1.0.0 test
> jest --coverage --watchAll=false

PASS src/utils/__tests__/BlackjackEngine.test.ts
FAIL src/hooks/__tests__/useSimulation.test.ts
  ● Console

    console.log
      Starting simulation with config: {
        numberOfDecks: 6,
        deckPenetration: 75,
        playerBet: 25,
        dealerHitsOnSoft17: true,
        playerCanDouble: true,
        playerCanSplit: true,
        playerCanSurrender: false,
        numberOfSimulations: 100,
        enableHandTracking: false
      }

      at log (src/hooks/useSimulation.ts:23:17)

    console.log
      About to start simulation...

      at log (src/hooks/useSimulation.ts:31:17)

    console.log
      Simulation completed: {
        handsPlayed: 100,
        totalOutcomes: 100,
        wins: 45,
        losses: 50,
        pushes: 5,
        blackjacks: 8,
        playerBusts: 15,
        dealerBusts: 12,
        surrenders: 0,
        winPercentage: 45,
        lossPercentage: 50,
        pushPercentage: 5,
        totalWagered: 2500,
        totalWon: 2250,
        netResult: -250,
        expectedValue: -2.5,
        averageBetSize: 25,
        maxDrawdown: 500,
        handsPerHour: 100,
        countingSystem: 'Hi-Lo',
        sessionResults: [],
        handDetails: [],
        busts: 15,
        doubles: 20,
        splits: 8,
        hands15: 12,
        hands16: 18
      }

      at log (src/hooks/useSimulation.ts:33:17)

    console.log
      Setting results: {
        handsPlayed: 100,
        totalOutcomes: 100,
        wins: 45,
        losses: 50,
        pushes: 5,
        blackjacks: 8,
        playerBusts: 15,
        dealerBusts: 12,
        surrenders: 0,
        winPercentage: 45,
        lossPercentage: 50,
        pushPercentage: 5,
        totalWagered: 2500,
        totalWon: 2250,
        netResult: -250,
        expectedValue: -2.5,
        averageBetSize: 25,
        maxDrawdown: 500,
        handsPerHour: 100,
        countingSystem: 'Hi-Lo',
        sessionResults: [],
        handDetails: [],
        busts: 15,
        doubles: 20,
        splits: 8,
        hands15: 12,
        hands16: 18
      }

      at log (src/hooks/useSimulation.ts:37:19)

    console.log
      Hand details length: 0

      at log (src/hooks/useSimulation.ts:38:19)

    console.log
      Starting simulation with config: {
        numberOfDecks: 6,
        deckPenetration: 75,
        playerBet: 25,
        dealerHitsOnSoft17: true,
        playerCanDouble: true,
        playerCanSplit: true,
        playerCanSurrender: false,
        numberOfSimulations: 100,
        enableHandTracking: false
      }

      at log (src/hooks/useSimulation.ts:23:17)

    console.log
      About to start simulation...

      at log (src/hooks/useSimulation.ts:31:17)

    console.log
      Progress: 50 of 100

      at log (src/hooks/useSimulation.ts:27:19)

    console.log
      Progress: 100 of 100

      at log (src/hooks/useSimulation.ts:27:19)

    console.log
      Simulation completed: {
        handsPlayed: 100,
        totalOutcomes: 100,
        wins: 45,
        losses: 50,
        pushes: 5,
        blackjacks: 8,
        playerBusts: 15,
        dealerBusts: 12,
        surrenders: 0,
        winPercentage: 45,
        lossPercentage: 50,
        pushPercentage: 5,
        totalWagered: 2500,
        totalWon: 2250,
        netResult: -250,
        expectedValue: -2.5,
        averageBetSize: 25,
        maxDrawdown: 500,
        handsPerHour: 100,
        countingSystem: 'Hi-Lo',
        sessionResults: [],
        handDetails: [],
        busts: 15,
        doubles: 20,
        splits: 8,
        hands15: 12,
        hands16: 18
      }

      at log (src/hooks/useSimulation.ts:33:17)

    console.log
      Setting results: {
        handsPlayed: 100,
        totalOutcomes: 100,
        wins: 45,
        losses: 50,
        pushes: 5,
        blackjacks: 8,
        playerBusts: 15,
        dealerBusts: 12,
        surrenders: 0,
        winPercentage: 45,
        lossPercentage: 50,
        pushPercentage: 5,
        totalWagered: 2500,
        totalWon: 2250,
        netResult: -250,
        expectedValue: -2.5,
        averageBetSize: 25,
        maxDrawdown: 500,
        handsPerHour: 100,
        countingSystem: 'Hi-Lo',
        sessionResults: [],
        handDetails: [],
        busts: 15,
        doubles: 20,
        splits: 8,
        hands15: 12,
        hands16: 18
      }

      at log (src/hooks/useSimulation.ts:37:19)

    console.log
      Hand details length: 0

      at log (src/hooks/useSimulation.ts:38:19)

    console.log
      Starting simulation with config: {
        numberOfDecks: 6,
        deckPenetration: 75,
        playerBet: 25,
        dealerHitsOnSoft17: true,
        playerCanDouble: true,
        playerCanSplit: true,
        playerCanSurrender: false,
        numberOfSimulations: 100,
        enableHandTracking: false
      }

      at log (src/hooks/useSimulation.ts:23:17)

    console.log
      About to start simulation...

      at log (src/hooks/useSimulation.ts:31:17)

    console.log
      Progress: 25 of 100

      at log (src/hooks/useSimulation.ts:27:19)

    console.log
      Progress: 50 of 100

      at log (src/hooks/useSimulation.ts:27:19)

    console.log
      Progress: 75 of 100

      at log (src/hooks/useSimulation.ts:27:19)

    console.log
      Progress: 100 of 100

      at log (src/hooks/useSimulation.ts:27:19)

    console.log
      Simulation completed: {
        handsPlayed: 100,
        totalOutcomes: 100,
        wins: 45,
        losses: 50,
        pushes: 5,
        blackjacks: 8,
        playerBusts: 15,
        dealerBusts: 12,
        surrenders: 0,
        winPercentage: 45,
        lossPercentage: 50,
        pushPercentage: 5,
        totalWagered: 2500,
        totalWon: 2250,
        netResult: -250,
        expectedValue: -2.5,
        averageBetSize: 25,
        maxDrawdown: 500,
        handsPerHour: 100,
        countingSystem: 'Hi-Lo',
        sessionResults: [],
        handDetails: [],
        busts: 15,
        doubles: 20,
        splits: 8,
        hands15: 12,
        hands16: 18
      }

      at log (src/hooks/useSimulation.ts:33:17)

    console.log
      Setting results: {
        handsPlayed: 100,
        totalOutcomes: 100,
        wins: 45,
        losses: 50,
        pushes: 5,
        blackjacks: 8,
        playerBusts: 15,
        dealerBusts: 12,
        surrenders: 0,
        winPercentage: 45,
        lossPercentage: 50,
        pushPercentage: 5,
        totalWagered: 2500,
        totalWon: 2250,
        netResult: -250,
        expectedValue: -2.5,
        averageBetSize: 25,
        maxDrawdown: 500,
        handsPerHour: 100,
        countingSystem: 'Hi-Lo',
        sessionResults: [],
        handDetails: [],
        busts: 15,
        doubles: 20,
        splits: 8,
        hands15: 12,
        hands16: 18
      }

      at log (src/hooks/useSimulation.ts:37:19)

    console.log
      Hand details length: 0

      at log (src/hooks/useSimulation.ts:38:19)

    console.log
      Starting simulation with config: {
        numberOfDecks: 6,
        deckPenetration: 75,
        playerBet: 25,
        dealerHitsOnSoft17: true,
        playerCanDouble: true,
        playerCanSplit: true,
        playerCanSurrender: false,
        numberOfSimulations: 100,
        enableHandTracking: false
      }

      at log (src/hooks/useSimulation.ts:23:17)

    console.log
      About to start simulation...

      at log (src/hooks/useSimulation.ts:31:17)

    console.log
      Simulation completed: {
        handsPlayed: 100,
        totalOutcomes: 100,
        wins: 45,
        losses: 50,
        pushes: 5,
        blackjacks: 8,
        playerBusts: 15,
        dealerBusts: 12,
        surrenders: 0,
        winPercentage: 45,
        lossPercentage: 50,
        pushPercentage: 5,
        totalWagered: 2500,
        totalWon: 2250,
        netResult: -250,
        expectedValue: -2.5,
        averageBetSize: 25,
        maxDrawdown: 500,
        handsPerHour: 100,
        countingSystem: 'Hi-Lo',
        sessionResults: [],
        handDetails: [],
        busts: 15,
        doubles: 20,
        splits: 8,
        hands15: 12,
        hands16: 18
      }

      at log (src/hooks/useSimulation.ts:33:17)

    console.log
      Setting results: {
        handsPlayed: 100,
        totalOutcomes: 100,
        wins: 45,
        losses: 50,
        pushes: 5,
        blackjacks: 8,
        playerBusts: 15,
        dealerBusts: 12,
        surrenders: 0,
        winPercentage: 45,
        lossPercentage: 50,
        pushPercentage: 5,
        totalWagered: 2500,
        totalWon: 2250,
        netResult: -250,
        expectedValue: -2.5,
        averageBetSize: 25,
        maxDrawdown: 500,
        handsPerHour: 100,
        countingSystem: 'Hi-Lo',
        sessionResults: [],
        handDetails: [],
        busts: 15,
        doubles: 20,
        splits: 8,
        hands15: 12,
        hands16: 18
      }

      at log (src/hooks/useSimulation.ts:37:19)

    console.log
      Hand details length: 0

      at log (src/hooks/useSimulation.ts:38:19)

    console.log
      Starting simulation with config: {
        numberOfDecks: 6,
        deckPenetration: 75,
        playerBet: 25,
        dealerHitsOnSoft17: true,
        playerCanDouble: true,
        playerCanSplit: true,
        playerCanSurrender: false,
        numberOfSimulations: 100,
        enableHandTracking: false
      }

      at log (src/hooks/useSimulation.ts:23:17)

    console.log
      About to start simulation...

      at log (src/hooks/useSimulation.ts:31:17)

    console.log
      Starting simulation with config: {
        numberOfDecks: 6,
        deckPenetration: 75,
        playerBet: 25,
        dealerHitsOnSoft17: true,
        playerCanDouble: true,
        playerCanSplit: true,
        playerCanSurrender: false,
        numberOfSimulations: 100,
        enableHandTracking: false
      }

      at log (src/hooks/useSimulation.ts:23:17)

    console.log
      About to start simulation...

      at log (src/hooks/useSimulation.ts:31:17)

    console.log
      Simulation completed: {
        handsPlayed: 100,
        totalOutcomes: 100,
        wins: 45,
        losses: 50,
        pushes: 5,
        blackjacks: 8,
        playerBusts: 15,
        dealerBusts: 12,
        surrenders: 0,
        winPercentage: 45,
        lossPercentage: 50,
        pushPercentage: 5,
        totalWagered: 2500,
        totalWon: 2250,
        netResult: -250,
        expectedValue: -2.5,
        averageBetSize: 25,
        maxDrawdown: 500,
        handsPerHour: 100,
        countingSystem: 'Hi-Lo',
        sessionResults: [],
        handDetails: [],
        busts: 15,
        doubles: 20,
        splits: 8,
        hands15: 12,
        hands16: 18
      }

      at log (src/hooks/useSimulation.ts:33:17)

    console.log
      Setting results: {
        handsPlayed: 100,
        totalOutcomes: 100,
        wins: 45,
        losses: 50,
        pushes: 5,
        blackjacks: 8,
        playerBusts: 15,
        dealerBusts: 12,
        surrenders: 0,
        winPercentage: 45,
        lossPercentage: 50,
        pushPercentage: 5,
        totalWagered: 2500,
        totalWon: 2250,
        netResult: -250,
        expectedValue: -2.5,
        averageBetSize: 25,
        maxDrawdown: 500,
        handsPerHour: 100,
        countingSystem: 'Hi-Lo',
        sessionResults: [],
        handDetails: [],
        busts: 15,
        doubles: 20,
        splits: 8,
        hands15: 12,
        hands16: 18
      }

      at log (src/hooks/useSimulation.ts:37:19)

    console.log
      Hand details length: 0

      at log (src/hooks/useSimulation.ts:38:19)

    console.log
      Starting simulation with config: {
        numberOfDecks: 6,
        deckPenetration: 75,
        playerBet: 25,
        dealerHitsOnSoft17: true,
        playerCanDouble: true,
        playerCanSplit: true,
        playerCanSurrender: false,
        numberOfSimulations: 100,
        enableHandTracking: false
      }

      at log (src/hooks/useSimulation.ts:23:17)

    console.log
      About to start simulation...

      at log (src/hooks/useSimulation.ts:31:17)

    console.log
      Simulation completed: {
        handsPlayed: 100,
        totalOutcomes: 100,
        wins: 45,
        losses: 50,
        pushes: 5,
        blackjacks: 8,
        playerBusts: 15,
        dealerBusts: 12,
        surrenders: 0,
        winPercentage: 45,
        lossPercentage: 50,
        pushPercentage: 5,
        totalWagered: 2500,
        totalWon: 2250,
        netResult: -250,
        expectedValue: -2.5,
        averageBetSize: 25,
        maxDrawdown: 500,
        handsPerHour: 100,
        countingSystem: 'Hi-Lo',
        sessionResults: [],
        handDetails: [],
        busts: 15,
        doubles: 20,
        splits: 8,
        hands15: 12,
        hands16: 18
      }

      at log (src/hooks/useSimulation.ts:33:17)

    console.log
      Setting results: {
        handsPlayed: 100,
        totalOutcomes: 100,
        wins: 45,
        losses: 50,
        pushes: 5,
        blackjacks: 8,
        playerBusts: 15,
        dealerBusts: 12,
        surrenders: 0,
        winPercentage: 45,
        lossPercentage: 50,
        pushPercentage: 5,
        totalWagered: 2500,
        totalWon: 2250,
        netResult: -250,
        expectedValue: -2.5,
        averageBetSize: 25,
        maxDrawdown: 500,
        handsPerHour: 100,
        countingSystem: 'Hi-Lo',
        sessionResults: [],
        handDetails: [],
        busts: 15,
        doubles: 20,
        splits: 8,
        hands15: 12,
        hands16: 18
      }

      at log (src/hooks/useSimulation.ts:37:19)

    console.log
      Hand details length: 0

      at log (src/hooks/useSimulation.ts:38:19)

  ● useSimulation › updates progress during simulation

    expect(received).toEqual(expected) // deep equality

    Expected: {"current": 100, "total": 100}
    Received: null

      184 |
      185 |     // Progress should be updated to final state
    > 186 |     expect(result.current.progress).toEqual({
          |                                     ^
      187 |       current: 100,
      188 |       total: 100,
      189 |     });

      at Object.<anonymous> (src/hooks/__tests__/useSimulation.test.ts:186:37)

FAIL src/components/__tests__/ResultsPanel.test.tsx
  ● ResultsPanel › displays loading state when simulation is running without progress

    TestingLibraryElementError: Unable to find an element with the role "progressbar"

    Here are the available roles:

      heading:

      Name "Running Simulation...":
      <h3
        class="card-title text-lg font-semibold text-gray-800"
      />

      --------------------------------------------------
      paragraph:

      Name "":
      <p
        class="text-gray-600"
      />

      --------------------------------------------------

    Ignored nodes: comments, script, style
    <body>
      <div>
        <div
          class="card bg-white shadow-md rounded-lg"
        >
          <div
            class="card-header border-b border-gray-200 px-6 py-4"
          >
            <h3
              class="card-title text-lg font-semibold text-gray-800"
            >
              Running Simulation...
            </h3>
          </div>
          <div
            class="card-content p-6"
          >
            <div
              class="text-center py-8"
            >
              <div
                class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"
              />
              <p
                class="text-gray-600"
              >
                Initializing simulation...
              </p>
            </div>
          </div>
        </div>
      </div>
    </body>

      49 |     expect(screen.getByText('Initializing simulation...')).toBeInTheDocument();
      50 |     expect(
    > 51 |       screen.getByRole('progressbar', { hidden: true }),
         |              ^
      52 |     ).toBeInTheDocument(); // spinner
      53 |   });
      54 |

      at Object.getElementError (node_modules/@testing-library/dom/dist/config.js:37:19)
      at node_modules/@testing-library/dom/dist/query-helpers.js:76:38
      at node_modules/@testing-library/dom/dist/query-helpers.js:52:17
      at node_modules/@testing-library/dom/dist/query-helpers.js:95:19
      at Object.<anonymous> (src/components/__tests__/ResultsPanel.test.tsx:51:14)

  ● ResultsPanel › displays progress when simulation is running with progress data

    TestingLibraryElementError: Unable to find an accessible element with the role "progressbar"

    Here are the accessible roles:

      heading:

      Name "Running Simulation...":
      <h3
        class="card-title text-lg font-semibold text-gray-800"
      />

      --------------------------------------------------
      paragraph:

      Name "":
      <p
        class="text-gray-600"
      />

      --------------------------------------------------

    Ignored nodes: comments, script, style
    <body>
      <div>
        <div
          class="card bg-white shadow-md rounded-lg"
        >
          <div
            class="card-header border-b border-gray-200 px-6 py-4"
          >
            <h3
              class="card-title text-lg font-semibold text-gray-800"
            >
              Running Simulation...
            </h3>
          </div>
          <div
            class="card-content p-6"
          >
            <div
              class="text-center py-8"
            >
              <div
                class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"
              />
              <p
                class="text-gray-600"
              >
                Processing 750 of 1,000 hands...
              </p>
              <div
                class="w-full bg-gray-200 rounded-full h-2 mt-4"
              >
                <div
                  class="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style="width: 75%;"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>

      64 |
      65 |     // Check progress bar
    > 66 |     const progressBar = screen.getByRole('progressbar');
         |                                ^
      67 |     expect(progressBar).toHaveStyle('width: 75%');
      68 |   });
      69 |

      at Object.getElementError (node_modules/@testing-library/dom/dist/config.js:37:19)
      at node_modules/@testing-library/dom/dist/query-helpers.js:76:38
      at node_modules/@testing-library/dom/dist/query-helpers.js:52:17
      at node_modules/@testing-library/dom/dist/query-helpers.js:95:19
      at Object.<anonymous> (src/components/__tests__/ResultsPanel.test.tsx:66:32)

  ● ResultsPanel › displays hand outcomes section correctly

    TestingLibraryElementError: Found multiple elements with the text: 45

    Here are the matching elements:

    Ignored nodes: comments, script, style
    <span
      class="text-yellow-600 ml-2"
    >
      45
    </span>

    Ignored nodes: comments, script, style
    <span
      class="text-gray-900 ml-2"
    >
      45
    </span>

    (If this is intentional, then use the `*AllBy*` variant of the query (like `queryAllByText`, `getAllByText`, or `findAllByText`)).

    Ignored nodes: comments, script, style
    <body>
      <div>
        <div
          class="card bg-white shadow-md rounded-lg"
        >
          <div
            class="card-header border-b border-gray-200 px-6 py-4"
          >
            <h3
              class="card-title text-lg font-semibold text-gray-800"
            >
              Simulation Results
            </h3>
          </div>
          <div
            class="card-content p-6"
          >
            <div
              class="space-y-6"
            >
              <div
                class="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                <div
                  class="bg-blue-50 p-4 rounded-lg"
                >
                  <div
                    class="text-sm text-gray-600"
                  >
                    Hands Played
                  </div>
                  <div
                    class="text-xl font-bold text-blue-600"
                  >
                    1,000
                  </div>
                </div>
                <div
                  class="bg-green-50 p-4 rounded-lg"
                >
                  <div
                    class="text-sm text-gray-600"
                  >
                    Win Rate
                  </div>
                  <div
                    class="text-xl font-bold text-green-600"
                  >
                    48.00
                    %
                  </div>
                </div>
                <div
                  class="bg-yellow-50 p-4 rounded-lg"
                >
                  <div
                    class="text-sm text-gray-600"
                  >
                    EV
                  </div>
                  <div
                    class="text-xl font-bold text-red-600"
                  >
                    -0.5000
                    %
                  </div>
                </div>
                <div
                  class="bg-indigo-50 p-4 rounded-lg"
                >
                  <div
                    class="text-sm text-gray-600"
                  >
                    Net Result
                  </div>
                  <div
                    class="text-xl font-bold text-red-600"
                  >
                    $
                    -500.00
                  </div>
                </div>
              </div>
              <div
                class="border-t pt-4"
              >
                <h4
                  class="font-semibold text-gray-900 mb-3"
                >
                  Detailed Statistics
                </h4>
                <div
                  class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm"
                >
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Total Wagered:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      $
                      25,000
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Total Won:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      $
                      24,500
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Avg. Bet Size:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      $
                      25.00
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Max Drawdown:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      $
                      1,200
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Hands per Hour:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      100
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Counting System:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      Hi-Lo
                    </span>
                  </div>
                </div>
              </div>
              <div
                class="border-t pt-4"
              >
                <h4
                  class="font-semibold text-gray-900 mb-3"
                >
                  Hand Outcomes
                </h4>
                <div
                  class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm"
                >
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Wins:
                    </span>
                    <span
                      class="text-green-600 ml-2"
                    >
                      480
                       (
                      48.00
                      %)
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Losses:
                    </span>
                    <span
                      class="text-red-600 ml-2"
                    >
                      500
                       (
                      50.00
                      %)
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Pushes:
                    </span>
                    <span
                      class="text-gray-600 ml-2"
                    >
                      20
                       (
                      2.00
                      %)
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Blackjacks:
                    </span>
                    <span
                      class="text-yellow-600 ml-2"
                    >
                      45
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Player Busts:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      180
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Dealer Busts:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      150
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Surrenders:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      0
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Total Busts:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      180
                    </span>
                  </div>
                </div>
              </div>
              <div
                class="border-t pt-4"
              >
                <h4
                  class="font-semibold text-gray-900 mb-3"
                >
                  Advanced Metrics
                </h4>
                <div
                  class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm"
                >
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Risk of Ruin (1000 units):
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      N/A
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Kelly Criterion Bet:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      N/A
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Standard Deviation:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      N/A
                    </span>
                  </div>
                </div>
                <p
                  class="text-xs text-gray-500 mt-2"
                >
                  Hard 15s: 
                  80
                   (
                  8.00
                  %) | Hard 16s: 
                  95
                   (
                  9.50
                  %)
                </p>
              </div>
              <div
                class="border-t pt-4"
              >
                <h4
                  class="font-semibold text-gray-900 mb-3"
                >
                  Player Actions
                </h4>
                <div
                  class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm"
                >
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Doubles:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      120
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Splits:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      45
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>

      172 |     // Check blackjacks
      173 |     expect(screen.getByText('Blackjacks:')).toBeInTheDocument();
    > 174 |     expect(screen.getByText('45')).toBeInTheDocument();
          |                   ^
      175 |   });
      176 |
      177 |   it('displays special hands section correctly', () => {

      at Object.getElementError (node_modules/@testing-library/dom/dist/config.js:37:19)
      at getElementError (node_modules/@testing-library/dom/dist/query-helpers.js:20:35)
      at getMultipleElementsFoundError (node_modules/@testing-library/dom/dist/query-helpers.js:23:10)
      at node_modules/@testing-library/dom/dist/query-helpers.js:55:13
      at node_modules/@testing-library/dom/dist/query-helpers.js:95:19
      at Object.<anonymous> (src/components/__tests__/ResultsPanel.test.tsx:174:19)

  ● ResultsPanel › displays special hands section correctly

    TestingLibraryElementError: Unable to find an element with the text: Special Hands. This could be because the text is broken up by multiple elements. In this case, you can provide a function for your text matcher to make your matcher more flexible.

    Ignored nodes: comments, script, style
    <body>
      <div>
        <div
          class="card bg-white shadow-md rounded-lg"
        >
          <div
            class="card-header border-b border-gray-200 px-6 py-4"
          >
            <h3
              class="card-title text-lg font-semibold text-gray-800"
            >
              Simulation Results
            </h3>
          </div>
          <div
            class="card-content p-6"
          >
            <div
              class="space-y-6"
            >
              <div
                class="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                <div
                  class="bg-blue-50 p-4 rounded-lg"
                >
                  <div
                    class="text-sm text-gray-600"
                  >
                    Hands Played
                  </div>
                  <div
                    class="text-xl font-bold text-blue-600"
                  >
                    1,000
                  </div>
                </div>
                <div
                  class="bg-green-50 p-4 rounded-lg"
                >
                  <div
                    class="text-sm text-gray-600"
                  >
                    Win Rate
                  </div>
                  <div
                    class="text-xl font-bold text-green-600"
                  >
                    48.00
                    %
                  </div>
                </div>
                <div
                  class="bg-yellow-50 p-4 rounded-lg"
                >
                  <div
                    class="text-sm text-gray-600"
                  >
                    EV
                  </div>
                  <div
                    class="text-xl font-bold text-red-600"
                  >
                    -0.5000
                    %
                  </div>
                </div>
                <div
                  class="bg-indigo-50 p-4 rounded-lg"
                >
                  <div
                    class="text-sm text-gray-600"
                  >
                    Net Result
                  </div>
                  <div
                    class="text-xl font-bold text-red-600"
                  >
                    $
                    -500.00
                  </div>
                </div>
              </div>
              <div
                class="border-t pt-4"
              >
                <h4
                  class="font-semibold text-gray-900 mb-3"
                >
                  Detailed Statistics
                </h4>
                <div
                  class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm"
                >
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Total Wagered:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      $
                      25,000
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Total Won:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      $
                      24,500
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Avg. Bet Size:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      $
                      25.00
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Max Drawdown:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      $
                      1,200
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Hands per Hour:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      100
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Counting System:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      Hi-Lo
                    </span>
                  </div>
                </div>
              </div>
              <div
                class="border-t pt-4"
              >
                <h4
                  class="font-semibold text-gray-900 mb-3"
                >
                  Hand Outcomes
                </h4>
                <div
                  class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm"
                >
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Wins:
                    </span>
                    <span
                      class="text-green-600 ml-2"
                    >
                      480
                       (
                      48.00
                      %)
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Losses:
                    </span>
                    <span
                      class="text-red-600 ml-2"
                    >
                      500
                       (
                      50.00
                      %)
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Pushes:
                    </span>
                    <span
                      class="text-gray-600 ml-2"
                    >
                      20
                       (
                      2.00
                      %)
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Blackjacks:
                    </span>
                    <span
                      class="text-yellow-600 ml-2"
                    >
                      45
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Player Busts:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      180
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Dealer Busts:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      150
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Surrenders:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      0
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Total Busts:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      180
                    </span>
                  </div>
                </div>
              </div>
              <div
                class="border-t pt-4"
              >
                <h4
                  class="font-semibold text-gray-900 mb-3"
                >
                  Advanced Metrics
                </h4>
                <div
                  class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm"
                >
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Risk of Ruin (1000 units):
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      N/A
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Kelly Criterion Bet:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      N/A
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Standard Deviation:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      N/A
                    </span>
                  </div>
                </div>
                <p
                  class="text-xs text-gray-500 mt-2"
                >
                  Hard 15s: 
                  80
                   (
                  8.00
                  %) | Hard 16s: 
                  95
                   (
                  9.50
                  %)
                </p>
              </div>
              <div
                class="border-t pt-4"
              >
                <h4
                  class="font-semibold text-gray-900 mb-3"
                >
                  Player Actions
                </h4>
                <div
                  class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm"
                >
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Doubles:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      120
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Splits:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      45
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>

      180 |     );
      181 |
    > 182 |     expect(screen.getByText('Special Hands')).toBeInTheDocument();
          |                   ^
      183 |
      184 |     expect(screen.getByText('Player Busts:')).toBeInTheDocument();
      185 |     expect(screen.getByText('180')).toBeInTheDocument();

      at Object.getElementError (node_modules/@testing-library/dom/dist/config.js:37:19)
      at node_modules/@testing-library/dom/dist/query-helpers.js:76:38
      at node_modules/@testing-library/dom/dist/query-helpers.js:52:17
      at node_modules/@testing-library/dom/dist/query-helpers.js:95:19
      at Object.<anonymous> (src/components/__tests__/ResultsPanel.test.tsx:182:19)

  ● ResultsPanel › handles undefined or invalid numbers gracefully

    TestingLibraryElementError: Found multiple elements with the text: 0

    Here are the matching elements:

    Ignored nodes: comments, script, style
    <div
      class="text-xl font-bold text-blue-600"
    >
      0
    </div>

    Ignored nodes: comments, script, style
    <span
      class="text-gray-900 ml-2"
    >
      0
    </span>

    (If this is intentional, then use the `*AllBy*` variant of the query (like `queryAllByText`, `getAllByText`, or `findAllByText`)).

    Ignored nodes: comments, script, style
    <body>
      <div>
        <div
          class="card bg-white shadow-md rounded-lg"
        >
          <div
            class="card-header border-b border-gray-200 px-6 py-4"
          >
            <h3
              class="card-title text-lg font-semibold text-gray-800"
            >
              Simulation Results
            </h3>
          </div>
          <div
            class="card-content p-6"
          >
            <div
              class="space-y-6"
            >
              <div
                class="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                <div
                  class="bg-blue-50 p-4 rounded-lg"
                >
                  <div
                    class="text-sm text-gray-600"
                  >
                    Hands Played
                  </div>
                  <div
                    class="text-xl font-bold text-blue-600"
                  >
                    0
                  </div>
                </div>
                <div
                  class="bg-green-50 p-4 rounded-lg"
                >
                  <div
                    class="text-sm text-gray-600"
                  >
                    Win Rate
                  </div>
                  <div
                    class="text-xl font-bold text-green-600"
                  >
                    0.00
                    %
                  </div>
                </div>
                <div
                  class="bg-yellow-50 p-4 rounded-lg"
                >
                  <div
                    class="text-sm text-gray-600"
                  >
                    EV
                  </div>
                  <div
                    class="text-xl font-bold text-green-600"
                  >
                    0.0000
                    %
                  </div>
                </div>
                <div
                  class="bg-indigo-50 p-4 rounded-lg"
                >
                  <div
                    class="text-sm text-gray-600"
                  >
                    Net Result
                  </div>
                  <div
                    class="text-xl font-bold text-green-600"
                  >
                    $
                    0.00
                  </div>
                </div>
              </div>
              <div
                class="border-t pt-4"
              >
                <h4
                  class="font-semibold text-gray-900 mb-3"
                >
                  Detailed Statistics
                </h4>
                <div
                  class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm"
                >
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Total Wagered:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      $
                      25,000
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Total Won:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      $
                      24,500
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Avg. Bet Size:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      $
                      25.00
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Max Drawdown:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      $
                      1,200
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Hands per Hour:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      100
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Counting System:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      Hi-Lo
                    </span>
                  </div>
                </div>
              </div>
              <div
                class="border-t pt-4"
              >
                <h4
                  class="font-semibold text-gray-900 mb-3"
                >
                  Hand Outcomes
                </h4>
                <div
                  class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm"
                >
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Wins:
                    </span>
                    <span
                      class="text-green-600 ml-2"
                    >
                      480
                       (
                      0.00
                      %)
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Losses:
                    </span>
                    <span
                      class="text-red-600 ml-2"
                    >
                      500
                       (
                      50.00
                      %)
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Pushes:
                    </span>
                    <span
                      class="text-gray-600 ml-2"
                    >
                      20
                       (
                      2.00
                      %)
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Blackjacks:
                    </span>
                    <span
                      class="text-yellow-600 ml-2"
                    >
                      45
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Player Busts:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      180
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Dealer Busts:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      150
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Surrenders:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      0
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Total Busts:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      180
                    </span>
                  </div>
                </div>
              </div>
              <div
                class="border-t pt-4"
              >
                <h4
                  class="font-semibold text-gray-900 mb-3"
                >
                  Advanced Metrics
                </h4>
                <div
                  class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm"
                >
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Risk of Ruin (1000 units):
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      N/A
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Kelly Criterion Bet:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      N/A
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Standard Deviation:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      N/A
                    </span>
                  </div>
                </div>
                <p
                  class="text-xs text-gray-500 mt-2"
                >
                  Hard 15s: 
                  80
                   (
                  Infinity
                  %) | Hard 16s: 
                  95
                   (
                  Infinity
                  %)
                </p>
              </div>
              <div
                class="border-t pt-4"
              >
                <h4
                  class="font-semibold text-gray-900 mb-3"
                >
                  Player Actions
                </h4>
                <div
                  class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm"
                >
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Doubles:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      120
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Splits:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      45
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>

      213 |
      214 |     // Should default to 0 for invalid numbers
    > 215 |     expect(screen.getByText('0')).toBeInTheDocument(); // hands played
          |                   ^
      216 |     expect(screen.getByText('0.00%')).toBeInTheDocument(); // win percentage
      217 |     expect(screen.getByText('0.0000%')).toBeInTheDocument(); // expected value
      218 |     expect(screen.getByText('$0.00')).toBeInTheDocument(); // net result

      at Object.getElementError (node_modules/@testing-library/dom/dist/config.js:37:19)
      at getElementError (node_modules/@testing-library/dom/dist/query-helpers.js:20:35)
      at getMultipleElementsFoundError (node_modules/@testing-library/dom/dist/query-helpers.js:23:10)
      at node_modules/@testing-library/dom/dist/query-helpers.js:55:13
      at node_modules/@testing-library/dom/dist/query-helpers.js:95:19
      at Object.<anonymous> (src/components/__tests__/ResultsPanel.test.tsx:215:19)

  ● ResultsPanel › handles zero values correctly

    TestingLibraryElementError: Found multiple elements with the text: 0 (0.00%)

    Here are the matching elements:

    Ignored nodes: comments, script, style
    <span
      class="text-green-600 ml-2"
    >
      0
       (
      0.00
      %)
    </span>

    Ignored nodes: comments, script, style
    <span
      class="text-red-600 ml-2"
    >
      0
       (
      0.00
      %)
    </span>

    Ignored nodes: comments, script, style
    <span
      class="text-gray-600 ml-2"
    >
      0
       (
      0.00
      %)
    </span>

    (If this is intentional, then use the `*AllBy*` variant of the query (like `queryAllByText`, `getAllByText`, or `findAllByText`)).

    Ignored nodes: comments, script, style
    <body>
      <div>
        <div
          class="card bg-white shadow-md rounded-lg"
        >
          <div
            class="card-header border-b border-gray-200 px-6 py-4"
          >
            <h3
              class="card-title text-lg font-semibold text-gray-800"
            >
              Simulation Results
            </h3>
          </div>
          <div
            class="card-content p-6"
          >
            <div
              class="space-y-6"
            >
              <div
                class="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                <div
                  class="bg-blue-50 p-4 rounded-lg"
                >
                  <div
                    class="text-sm text-gray-600"
                  >
                    Hands Played
                  </div>
                  <div
                    class="text-xl font-bold text-blue-600"
                  >
                    1,000
                  </div>
                </div>
                <div
                  class="bg-green-50 p-4 rounded-lg"
                >
                  <div
                    class="text-sm text-gray-600"
                  >
                    Win Rate
                  </div>
                  <div
                    class="text-xl font-bold text-green-600"
                  >
                    0.00
                    %
                  </div>
                </div>
                <div
                  class="bg-yellow-50 p-4 rounded-lg"
                >
                  <div
                    class="text-sm text-gray-600"
                  >
                    EV
                  </div>
                  <div
                    class="text-xl font-bold text-red-600"
                  >
                    -0.5000
                    %
                  </div>
                </div>
                <div
                  class="bg-indigo-50 p-4 rounded-lg"
                >
                  <div
                    class="text-sm text-gray-600"
                  >
                    Net Result
                  </div>
                  <div
                    class="text-xl font-bold text-red-600"
                  >
                    $
                    -500.00
                  </div>
                </div>
              </div>
              <div
                class="border-t pt-4"
              >
                <h4
                  class="font-semibold text-gray-900 mb-3"
                >
                  Detailed Statistics
                </h4>
                <div
                  class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm"
                >
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Total Wagered:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      $
                      25,000
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Total Won:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      $
                      24,500
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Avg. Bet Size:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      $
                      25.00
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Max Drawdown:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      $
                      1,200
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Hands per Hour:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      100
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Counting System:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      Hi-Lo
                    </span>
                  </div>
                </div>
              </div>
              <div
                class="border-t pt-4"
              >
                <h4
                  class="font-semibold text-gray-900 mb-3"
                >
                  Hand Outcomes
                </h4>
                <div
                  class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm"
                >
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Wins:
                    </span>
                    <span
                      class="text-green-600 ml-2"
                    >
                      0
                       (
                      0.00
                      %)
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Losses:
                    </span>
                    <span
                      class="text-red-600 ml-2"
                    >
                      0
                       (
                      0.00
                      %)
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Pushes:
                    </span>
                    <span
                      class="text-gray-600 ml-2"
                    >
                      0
                       (
                      0.00
                      %)
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Blackjacks:
                    </span>
                    <span
                      class="text-yellow-600 ml-2"
                    >
                      45
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Player Busts:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      180
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Dealer Busts:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      150
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Surrenders:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      0
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Total Busts:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      180
                    </span>
                  </div>
                </div>
              </div>
              <div
                class="border-t pt-4"
              >
                <h4
                  class="font-semibold text-gray-900 mb-3"
                >
                  Advanced Metrics
                </h4>
                <div
                  class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm"
                >
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Risk of Ruin (1000 units):
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      N/A
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Kelly Criterion Bet:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      N/A
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Standard Deviation:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      N/A
                    </span>
                  </div>
                </div>
                <p
                  class="text-xs text-gray-500 mt-2"
                >
                  Hard 15s: 
                  80
                   (
                  8.00
                  %) | Hard 16s: 
                  95
                   (
                  9.50
                  %)
                </p>
              </div>
              <div
                class="border-t pt-4"
              >
                <h4
                  class="font-semibold text-gray-900 mb-3"
                >
                  Player Actions
                </h4>
                <div
                  class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm"
                >
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Doubles:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      120
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Splits:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      45
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>

      291 |
      292 |     expect(screen.getByText('0.00%')).toBeInTheDocument();
    > 293 |     expect(screen.getByText('0 (0.00%)')).toBeInTheDocument();
          |                   ^
      294 |   });
      295 |
      296 |   it('applies correct color classes for outcome types', () => {

      at Object.getElementError (node_modules/@testing-library/dom/dist/config.js:37:19)
      at getElementError (node_modules/@testing-library/dom/dist/query-helpers.js:20:35)
      at getMultipleElementsFoundError (node_modules/@testing-library/dom/dist/query-helpers.js:23:10)
      at node_modules/@testing-library/dom/dist/query-helpers.js:55:13
      at node_modules/@testing-library/dom/dist/query-helpers.js:95:19
      at Object.<anonymous> (src/components/__tests__/ResultsPanel.test.tsx:293:19)

  ● ResultsPanel › applies correct color classes for outcome types

    TestingLibraryElementError: Found multiple elements with the text: 45

    Here are the matching elements:

    Ignored nodes: comments, script, style
    <span
      class="text-yellow-600 ml-2"
    >
      45
    </span>

    Ignored nodes: comments, script, style
    <span
      class="text-gray-900 ml-2"
    >
      45
    </span>

    (If this is intentional, then use the `*AllBy*` variant of the query (like `queryAllByText`, `getAllByText`, or `findAllByText`)).

    Ignored nodes: comments, script, style
    <body>
      <div>
        <div
          class="card bg-white shadow-md rounded-lg"
        >
          <div
            class="card-header border-b border-gray-200 px-6 py-4"
          >
            <h3
              class="card-title text-lg font-semibold text-gray-800"
            >
              Simulation Results
            </h3>
          </div>
          <div
            class="card-content p-6"
          >
            <div
              class="space-y-6"
            >
              <div
                class="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                <div
                  class="bg-blue-50 p-4 rounded-lg"
                >
                  <div
                    class="text-sm text-gray-600"
                  >
                    Hands Played
                  </div>
                  <div
                    class="text-xl font-bold text-blue-600"
                  >
                    1,000
                  </div>
                </div>
                <div
                  class="bg-green-50 p-4 rounded-lg"
                >
                  <div
                    class="text-sm text-gray-600"
                  >
                    Win Rate
                  </div>
                  <div
                    class="text-xl font-bold text-green-600"
                  >
                    48.00
                    %
                  </div>
                </div>
                <div
                  class="bg-yellow-50 p-4 rounded-lg"
                >
                  <div
                    class="text-sm text-gray-600"
                  >
                    EV
                  </div>
                  <div
                    class="text-xl font-bold text-red-600"
                  >
                    -0.5000
                    %
                  </div>
                </div>
                <div
                  class="bg-indigo-50 p-4 rounded-lg"
                >
                  <div
                    class="text-sm text-gray-600"
                  >
                    Net Result
                  </div>
                  <div
                    class="text-xl font-bold text-red-600"
                  >
                    $
                    -500.00
                  </div>
                </div>
              </div>
              <div
                class="border-t pt-4"
              >
                <h4
                  class="font-semibold text-gray-900 mb-3"
                >
                  Detailed Statistics
                </h4>
                <div
                  class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm"
                >
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Total Wagered:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      $
                      25,000
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Total Won:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      $
                      24,500
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Avg. Bet Size:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      $
                      25.00
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Max Drawdown:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      $
                      1,200
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Hands per Hour:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      100
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Counting System:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      Hi-Lo
                    </span>
                  </div>
                </div>
              </div>
              <div
                class="border-t pt-4"
              >
                <h4
                  class="font-semibold text-gray-900 mb-3"
                >
                  Hand Outcomes
                </h4>
                <div
                  class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm"
                >
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Wins:
                    </span>
                    <span
                      class="text-green-600 ml-2"
                    >
                      480
                       (
                      48.00
                      %)
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Losses:
                    </span>
                    <span
                      class="text-red-600 ml-2"
                    >
                      500
                       (
                      50.00
                      %)
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Pushes:
                    </span>
                    <span
                      class="text-gray-600 ml-2"
                    >
                      20
                       (
                      2.00
                      %)
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Blackjacks:
                    </span>
                    <span
                      class="text-yellow-600 ml-2"
                    >
                      45
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Player Busts:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      180
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Dealer Busts:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      150
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Surrenders:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      0
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Total Busts:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      180
                    </span>
                  </div>
                </div>
              </div>
              <div
                class="border-t pt-4"
              >
                <h4
                  class="font-semibold text-gray-900 mb-3"
                >
                  Advanced Metrics
                </h4>
                <div
                  class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm"
                >
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Risk of Ruin (1000 units):
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      N/A
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Kelly Criterion Bet:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      N/A
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Standard Deviation:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      N/A
                    </span>
                  </div>
                </div>
                <p
                  class="text-xs text-gray-500 mt-2"
                >
                  Hard 15s: 
                  80
                   (
                  8.00
                  %) | Hard 16s: 
                  95
                   (
                  9.50
                  %)
                </p>
              </div>
              <div
                class="border-t pt-4"
              >
                <h4
                  class="font-semibold text-gray-900 mb-3"
                >
                  Player Actions
                </h4>
                <div
                  class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm"
                >
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Doubles:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      120
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Splits:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      45
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>

      312 |
      313 |     // Blackjacks should be yellow
    > 314 |     const blackjacksText = screen.getByText('45');
          |                                   ^
      315 |     expect(blackjacksText.closest('span')).toHaveClass('text-yellow-600');
      316 |   });
      317 |

      at Object.getElementError (node_modules/@testing-library/dom/dist/config.js:37:19)
      at getElementError (node_modules/@testing-library/dom/dist/query-helpers.js:20:35)
      at getMultipleElementsFoundError (node_modules/@testing-library/dom/dist/query-helpers.js:23:10)
      at node_modules/@testing-library/dom/dist/query-helpers.js:55:13
      at node_modules/@testing-library/dom/dist/query-helpers.js:95:19
      at Object.<anonymous> (src/components/__tests__/ResultsPanel.test.tsx:314:35)

  ● ResultsPanel › calculates total outcomes correctly when missing

    TestingLibraryElementError: Unable to find an element with the text: 50.00%. This could be because the text is broken up by multiple elements. In this case, you can provide a function for your text matcher to make your matcher more flexible.

    Ignored nodes: comments, script, style
    <body>
      <div>
        <div
          class="card bg-white shadow-md rounded-lg"
        >
          <div
            class="card-header border-b border-gray-200 px-6 py-4"
          >
            <h3
              class="card-title text-lg font-semibold text-gray-800"
            >
              Simulation Results
            </h3>
          </div>
          <div
            class="card-content p-6"
          >
            <div
              class="space-y-6"
            >
              <div
                class="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                <div
                  class="bg-blue-50 p-4 rounded-lg"
                >
                  <div
                    class="text-sm text-gray-600"
                  >
                    Hands Played
                  </div>
                  <div
                    class="text-xl font-bold text-blue-600"
                  >
                    1,000
                  </div>
                </div>
                <div
                  class="bg-green-50 p-4 rounded-lg"
                >
                  <div
                    class="text-sm text-gray-600"
                  >
                    Win Rate
                  </div>
                  <div
                    class="text-xl font-bold text-green-600"
                  >
                    48.00
                    %
                  </div>
                </div>
                <div
                  class="bg-yellow-50 p-4 rounded-lg"
                >
                  <div
                    class="text-sm text-gray-600"
                  >
                    EV
                  </div>
                  <div
                    class="text-xl font-bold text-red-600"
                  >
                    -0.5000
                    %
                  </div>
                </div>
                <div
                  class="bg-indigo-50 p-4 rounded-lg"
                >
                  <div
                    class="text-sm text-gray-600"
                  >
                    Net Result
                  </div>
                  <div
                    class="text-xl font-bold text-red-600"
                  >
                    $
                    -500.00
                  </div>
                </div>
              </div>
              <div
                class="border-t pt-4"
              >
                <h4
                  class="font-semibold text-gray-900 mb-3"
                >
                  Detailed Statistics
                </h4>
                <div
                  class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm"
                >
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Total Wagered:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      $
                      25,000
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Total Won:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      $
                      24,500
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Avg. Bet Size:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      $
                      25.00
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Max Drawdown:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      $
                      1,200
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Hands per Hour:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      100
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Counting System:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      Hi-Lo
                    </span>
                  </div>
                </div>
              </div>
              <div
                class="border-t pt-4"
              >
                <h4
                  class="font-semibold text-gray-900 mb-3"
                >
                  Hand Outcomes
                </h4>
                <div
                  class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm"
                >
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Wins:
                    </span>
                    <span
                      class="text-green-600 ml-2"
                    >
                      480
                       (
                      48.00
                      %)
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Losses:
                    </span>
                    <span
                      class="text-red-600 ml-2"
                    >
                      500
                       (
                      50.00
                      %)
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Pushes:
                    </span>
                    <span
                      class="text-gray-600 ml-2"
                    >
                      20
                       (
                      2.00
                      %)
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Blackjacks:
                    </span>
                    <span
                      class="text-yellow-600 ml-2"
                    >
                      45
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Player Busts:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      180
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Dealer Busts:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      150
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Surrenders:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      0
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Total Busts:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      180
                    </span>
                  </div>
                </div>
              </div>
              <div
                class="border-t pt-4"
              >
                <h4
                  class="font-semibold text-gray-900 mb-3"
                >
                  Advanced Metrics
                </h4>
                <div
                  class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm"
                >
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Risk of Ruin (1000 units):
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      N/A
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Kelly Criterion Bet:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      N/A
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Standard Deviation:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      N/A
                    </span>
                  </div>
                </div>
                <p
                  class="text-xs text-gray-500 mt-2"
                >
                  Hard 15s: 
                  80
                   (
                  8.00
                  %) | Hard 16s: 
                  95
                   (
                  9.50
                  %)
                </p>
              </div>
              <div
                class="border-t pt-4"
              >
                <h4
                  class="font-semibold text-gray-900 mb-3"
                >
                  Player Actions
                </h4>
                <div
                  class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm"
                >
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Doubles:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      120
                    </span>
                  </div>
                  <div>
                    <span
                      class="font-medium text-gray-700"
                    >
                      Splits:
                    </span>
                    <span
                      class="text-gray-900 ml-2"
                    >
                      45
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>

      332 |     // Should still display percentages calculated from wins + losses + pushes
      333 |     expect(screen.getByText('48.00%')).toBeInTheDocument();
    > 334 |     expect(screen.getByText('50.00%')).toBeInTheDocument();
          |                   ^
      335 |     expect(screen.getByText('2.00%')).toBeInTheDocument();
      336 |   });
      337 | });

      at Object.getElementError (node_modules/@testing-library/dom/dist/config.js:37:19)
      at node_modules/@testing-library/dom/dist/query-helpers.js:76:38
      at node_modules/@testing-library/dom/dist/query-helpers.js:52:17
      at node_modules/@testing-library/dom/dist/query-helpers.js:95:19
      at Object.<anonymous> (src/components/__tests__/ResultsPanel.test.tsx:334:19)

FAIL src/components/__tests__/HandDetailsTable-simple.test.tsx
  ● HandDetailsTable - Unit Logic Tests › returns null for empty hand details

    TypeError: Cannot read properties of undefined (reading 'createElement')

      26 |   it('returns null for empty hand details', () => {
      27 |     // Test the component logic directly
    > 28 |     const component = React.createElement(HandDetailsTable, {
         |                             ^
      29 |       handDetails: [],
      30 |     });
      31 |     expect(component.props.handDetails).toEqual([]);

      at Object.<anonymous> (src/components/__tests__/HandDetailsTable-simple.test.tsx:28:29)

  ● HandDetailsTable - Unit Logic Tests › returns null for undefined hand details

    TypeError: Cannot read properties of undefined (reading 'createElement')

      33 |
      34 |   it('returns null for undefined hand details', () => {
    > 35 |     const component = React.createElement(HandDetailsTable, {
         |                             ^
      36 |       handDetails: undefined as unknown as HandDetails[],
      37 |     });
      38 |     expect(component.props.handDetails).toBeUndefined();

      at Object.<anonymous> (src/components/__tests__/HandDetailsTable-simple.test.tsx:35:29)

  ● HandDetailsTable - Unit Logic Tests › accepts valid hand details props

    TypeError: Cannot read properties of undefined (reading 'createElement')

      40 |
      41 |   it('accepts valid hand details props', () => {
    > 42 |     const component = React.createElement(HandDetailsTable, {
         |                             ^
      43 |       handDetails: mockHandDetails,
      44 |     });
      45 |     expect(component.props.handDetails).toEqual(mockHandDetails);

      at Object.<anonymous> (src/components/__tests__/HandDetailsTable-simple.test.tsx:42:29)

  ● HandDetailsTable - Unit Logic Tests › handles different hand data types correctly

    TypeError: Cannot read properties of undefined (reading 'createElement')

      83 |     ];
      84 |
    > 85 |     const component = React.createElement(HandDetailsTable, {
         |                             ^
      86 |       handDetails: testHands,
      87 |     });
      88 |     expect(component.props.handDetails.length).toBe(3);

      at Object.<anonymous> (src/components/__tests__/HandDetailsTable-simple.test.tsx:85:29)

  ● HandDetailsTable - Unit Logic Tests › handles edge cases in hand data

    TypeError: Cannot read properties of undefined (reading 'createElement')

      110 |     ];
      111 |
    > 112 |     const component = React.createElement(HandDetailsTable, {
          |                             ^
      113 |       handDetails: edgeCaseHands,
      114 |     });
      115 |     const hands = component.props.handDetails;

      at Object.<anonymous> (src/components/__tests__/HandDetailsTable-simple.test.tsx:112:29)

PASS src/components/__tests__/BettingTable.test.tsx
FAIL src/components/__tests__/HandDetailsTable.test.tsx
  ● HandDetailsTable › formats cards correctly

    TestingLibraryElementError: Found multiple elements with the text: /K, 7/

    Here are the matching elements:

    Ignored nodes: comments, script, style
    <td
      class="p-3"
    >
      P: 
      K, 7
      <br />
      D: 
      9
      , X
    </td>

    Ignored nodes: comments, script, style
    <td
      class="p-3"
    >
      P:
       
      K, 7, 8
      <br />
      D:
       
      9, A
    </td>

    (If this is intentional, then use the `*AllBy*` variant of the query (like `queryAllByText`, `getAllByText`, or `findAllByText`)).

    Ignored nodes: comments, script, style
    <body>
      <div>
        <div
          class="card bg-white shadow-md rounded-lg"
        >
          <div
            class="card-header border-b border-gray-200 px-6 py-4"
          >
            <div
              class="flex justify-between items-center"
            >
              <h3
                class="card-title text-lg font-semibold text-gray-800"
              >
                Hand-by-Hand Details (
                3
                 hands tracked)
              </h3>
              <button
                class="btn btn-primary px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
              >
                Download CSV
              </button>
            </div>
          </div>
          <div
            class="card-content p-0"
          >
            <div
              class="overflow-x-auto"
            >
              <table
                class="min-w-full text-sm"
              >
                <thead
                  class="bg-gray-50"
                >
                  <tr>
                    <th
                      class="p-3 text-left font-semibold text-gray-600"
                    >
                      Hand
                    </th>
                    <th
                      class="p-3 text-left font-semibold text-gray-600"
                    >
                      True Count
                    </th>
                    <th
                      class="p-3 text-left font-semibold text-gray-600"
                    >
                      Initial Wager
                    </th>
                    <th
                      class="p-3 text-left font-semibold text-gray-600"
                    >
                      Initial Cards
                    </th>
                    <th
                      class="p-3 text-left font-semibold text-gray-600"
                    >
                      Initial Action
                    </th>
                    <th
                      class="p-3 text-left font-semibold text-gray-600"
                    >
                      Total Wager
                    </th>
                    <th
                      class="p-3 text-left font-semibold text-gray-600"
                    >
                      Final Cards
                    </th>
                    <th
                      class="p-3 text-left font-semibold text-gray-600"
                    >
                      Outcome
                    </th>
                    <th
                      class="p-3 text-left font-semibold text-gray-600"
                    >
                      Bankroll
                    </th>
                  </tr>
                </thead>
                <tbody
                  class="divide-y divide-gray-200"
                >
                  <tr
                    class="hover:bg-gray-50"
                  >
                    <td
                      class="p-3"
                    >
                      1
                    </td>
                    <td
                      class="p-3"
                    >
                      0.0
                    </td>
                    <td
                      class="p-3"
                    >
                      $
                      25
                    </td>
                    <td
                      class="p-3"
                    >
                      P: 
                      K, 7
                      <br />
                      D: 
                      9
                      , X
                    </td>
                    <td
                      class="p-3"
                    >
                      Hit
                    </td>
                    <td
                      class="p-3"
                    >
                      $
                      25
                    </td>
                    <td
                      class="p-3"
                    >
                      P:
                       
                      K, 7, 8
                      <br />
                      D:
                       
                      9, A
                    </td>
                    <td
                      class="p-3 font-medium text-red-600"
                    >
                      Loss
                       
                      ($
                      25
                      )
                    </td>
                    <td
                      class="p-3"
                    >
                      $
                      -25.00
                    </td>
                  </tr>
                  <tr
                    class="hover:bg-gray-50"
                  >
                    <td
                      class="p-3"
                    >
                      2
                    </td>
                    <td
                      class="p-3"
                    >
                      -0.2
                    </td>
                    <td
                      class="p-3"
                    >
                      $
                      25
                    </td>
                    <td
                      class="p-3"
                    >
                      P: 
                      A, K
                       (BJ)
                      <br />
                      D: 
                      10
                      , X
                    </td>
                    <td
                      class="p-3"
                    >
                      Blackjack
>>>>>>> 93c0af90b2987a5778ae9966005a29d890632847
