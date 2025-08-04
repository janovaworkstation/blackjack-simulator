# Blackjack Strategy Simulator

A modern, web-based blackjack simulation tool that replicates and enhances the functionality of classic programs like CVData and CVCX. Built with React and featuring comprehensive card counting analysis, risk management tools, and advanced statistical reporting.

## Features

### Core Simulation Engine
- **Multiple Card Counting Systems**: Hi-Lo, Knock-Out (KO), Hi-Opt I
- **Complete Basic Strategy**: Mathematically optimal play for all situations
- **Realistic Game Rules**: Configurable deck count, penetration, dealer rules
- **Advanced Betting**: Count-based bet sizing with configurable spreads
- **Pair Splitting & Doubling**: Full implementation of all strategic plays

### Analysis & Reporting
- **Comprehensive Statistics**: Win rates, expected value, standard deviation
- **Risk Analysis**: Maximum drawdown, risk ratings, hourly expectations
- **Performance Visualization**: Real-time charts showing bankroll progression
- **Session Tracking**: Hand-by-hand analysis with count correlation

### Modern Interface
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Real-time Updates**: Live progress tracking during simulations
- **Interactive Configuration**: Easy-to-use parameter adjustment
- **Professional Styling**: Clean, modern UI with Tailwind CSS
- **3D Gaming Experience**: Immersive 3D blackjack table with realistic graphics
- **Monitoring & Alerts**: Comprehensive error tracking and uptime monitoring

## Quick Start

### Prerequisites
- Node.js 16+ and npm/yarn
- Modern web browser

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/janovaworkstation/blackjack-simulator.git
    cd blackjack-simulator
    ```

2.  **Install dependencies:**
    Using npm:
    ```bash
    npm install
    ```
    Or using yarn:
    ```bash
    yarn install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```

4.  **Open your browser to** `http://localhost:5173`

### Exploring the 3D Demo

The application now includes an immersive 3D blackjack table experience:

1. **Start the development server** (if not already running)
2. **Navigate to the application** in your browser
3. **Click the "3D Demo" button** in the top navigation
4. **Interact with the 3D scene**:
   - Mouse drag to rotate camera
   - Scroll to zoom in/out
   - View realistic casino table with cards and chips

**Features in 3D Demo:**
- Professional blackjack table with felt surface
- Realistic 3D playing cards (face up/down)
- Casino-style poker chips with value-based colors
- Dynamic lighting and shadows
- Interactive camera controls

### Building for Production
```bash
npm run build
```

## Testing

This project uses a comprehensive testing strategy to ensure code quality and application stability.

### Current Test Coverage
- **33 Unit Tests** with 95%+ code coverage of core simulation engine
- **24 3D Component Tests** covering all 3D rendering functionality
- **16 End-to-End Tests** covering all major user workflows
- **98% E2E Test Pass Rate** across Chrome, Firefox, and Safari

### Test Commands
- **Unit Testing**: `Jest` with comprehensive BlackjackEngine validation
  ```bash
  npm run test
  ```
- **Code Coverage**: Generate detailed coverage reports
  ```bash
  npm run test:coverage
  ```
- **End-to-End Testing**: `Playwright` for complete user workflow testing
  ```bash
  npm run test:e2e
  ```

### What's Tested
- **Core Game Logic**: Card counting systems, basic strategy, game mechanics
- **3D Rendering Components**: Card3D, Chip3D, BlackjackTable3D, and Game3DDemo
- **User Workflows**: Complete simulation runs, configuration changes, hand tracking
- **Error Handling**: Input validation, edge cases, error recovery
- **Mobile Support**: Responsive design and touch interactions

## Component Documentation

This project uses **Storybook** for component documentation and development. Storybook provides an isolated environment for developing and testing UI components.

### Running Storybook
```bash
npm run storybook
```

This will start the Storybook development server at `http://localhost:6006`.

### What's Documented
- **Core Components**: All major UI components with interactive examples
- **Component Props**: Complete documentation of component interfaces
- **Usage Examples**: Multiple scenarios showing how components work
- **Visual Testing**: See components in different states and configurations

### Storybook Features
- **Interactive Controls**: Modify component props in real-time
- **Multiple Stories**: Each component has stories for different use cases
- **MDX Documentation**: Rich documentation with examples and explanations
- **Responsive Testing**: Test components across different screen sizes

## Usage

This simulator allows you to run complex blackjack simulations to analyze strategies and understand the game's statistics.

### Configuring a Simulation

The **Configuration Panel** on the left side of the screen is where you set up your simulation.

1.  **Simulation Parameters**:
    *   **Number of Hands**: Set the total number of hands to simulate. Larger numbers provide more statistically significant results but take longer to process. A good starting point is 1,000,000 hands.
    *   **Counting System**: Choose the card counting system you want to test. The simulator currently supports:
        *   `Hi-Lo`: A balanced, level-1 system, popular for its simplicity and effectiveness.
        *   `KO (Knock-Out)`: An unbalanced system that simplifies true count calculation.
        *   `Hi-Opt I`: A balanced system that ignores Aces for the running count, often used with a side count of Aces.
    *   **Deck Count**: Select the number of 52-card decks in the shoe (typically 1 to 8).
    *   **Penetration**: Set the percentage of the shoe that is dealt before reshuffling (e.g., 75%).

2.  **Betting Strategy**:
    *   **Min/Max Bet**: Define the minimum and maximum bet amounts for a single hand.
    *   **Bet Spread**: Configure how your bet size changes in relation to the true count. For example, a 1-10 spread means your maximum bet is 10 times your minimum bet, typically scaled up as the count rises.

3.  **Game Rules**:
    *   **Dealer Hits Soft 17 (H17/S17)**: Choose whether the dealer hits or stands on a soft 17 (an Ace and a 6). H17 slightly increases the house edge.
    *   **Double After Split (DAS)**: Allow or disallow doubling down after splitting a pair. DAS is a player-favorable rule.
    *   **Surrender**: Enable or disable the option to surrender a hand (giving up half your bet).
    *   **Re-split Aces**: Allow or disallow splitting aces more than once.

Once all parameters are set, click the **"Run Simulation"** button to start. You can monitor the progress in real-time.

### Analyzing the Results

After the simulation completes, the **Results Panel** will display detailed statistics and charts.

#### Key Metrics
*   **Total Hands**: The total number of hands played in the simulation.
*   **Win Rate**: The percentage of hands won by the player (this does not include pushes).
*   **Expected Value (EV)**: Your expected profit or loss, expressed as a percentage of the total money wagered. A positive EV indicates a long-term profitable strategy.
*   **Max Drawdown**: The largest single drop in your bankroll from a peak to a subsequent low. This is a key indicator of financial risk.
*   **Risk Rating**: A qualitative assessment (Low, Medium, High) of the strategy's volatility, based on standard deviation and drawdown.

#### Performance Chart
The chart visualizes the simulation's progress over time:
*   **Bankroll Line**: Shows the fluctuation of your bankroll over the course of the simulated hands.
*   **True Count Line**: Illustrates how the true count varied throughout the simulation, helping you correlate your bankroll changes with the state of the deck.

## Project Structure

```
blackjack-simulator/
├── .storybook/
│   ├── main.ts                       # Storybook configuration
│   └── preview.ts                    # Global Storybook settings
├── src/
│   ├── components/
│   │   ├── BlackjackSimulator.tsx    # Main application component
│   │   ├── ConfigurationPanel.tsx    # Simulation parameter controls
│   │   ├── ResultsPanel.tsx          # Results display and analysis
│   │   ├── ResultsChart.tsx          # Performance visualization
│   │   └── UI.tsx                    # Reusable UI components
│   ├── hooks/
│   │   └── useSimulation.ts          # Simulation state management
│   ├── stories/
│   │   ├── BlackjackSimulator.stories.tsx  # Component stories
│   │   ├── BlackjackSimulator.mdx           # Component documentation
│   │   └── [other component stories]        # Additional component docs
│   ├── utils/
│   │   └── BlackjackEngine.ts        # Core simulation logic
│   ├── App.tsx                       # Root component
│   ├── main.tsx                      # Application entry point
│   └── index.css                     # Global styles
├── public/                           # Static assets
├── package.json                      # Dependencies and scripts
├── vite.config.js                    # Vite configuration
├── tailwind.config.js               # Tailwind CSS configuration
└── README.md                        # This file
```

## Technical Details

### Simulation Engine
The core simulation engine (`BlackjackEngine.js`) implements:

- **Card Deck Management**: Realistic multi-deck shoes with proper shuffling
- **Card Counting**: Multiple systems with running/true count calculations
- **Basic Strategy**: Complete decision matrices for all hand types
- **Betting Strategy**: Count-based betting with configurable spreads
- **Game Flow**: Accurate simulation of casino blackjack rules

### Performance
- Capable of simulating millions of hands efficiently
- Real-time progress updates during long simulations
- Optimized for modern browsers with efficient algorithms

## Comparison to CVData/CVCX

### Advantages over Legacy Tools
- **Cross-Platform**: Runs on any device with a web browser
- **Modern Interface**: Intuitive, responsive design
- **Real-time Visualization**: Live charts and progress tracking
- **Easy Sharing**: Web-based results can be easily shared
- **No Installation**: Runs directly in browser

### Feature Parity
- ✅ Multiple counting systems
- ✅ Basic strategy simulation
- ✅ Betting strategy analysis
- ✅ Risk analysis and statistics
- ✅ Configurable game rules
- 🔄 Risk of Ruin calculations (coming soon)
- 🔄 Strategy deviations (coming soon)
- 🔄 Bankroll sizing recommendations (coming soon)

## Roadmap

### Phase 2 Features
- **Risk of Ruin Calculator**: Implement Kelly Criterion and bankroll sizing
- **Strategy Deviations**: Add Illustrious 18 and Fab 4 variations
- **Additional Counting Systems**: Red 7, Omega II, Zen Count
- **Side Bet Analysis**: Perfect Pairs, 21+3, Lucky Ladies

### Phase 3 Features
- **Tournament Simulation**: Multi-round tournament analysis
- **Team Play Tools**: Coordination and bankroll management
- **Advanced Visualization**: Heat maps, distribution charts
- **Export/Import**: Save and share simulation configurations

### Phase 4 Features
- **Machine Learning**: Optimize strategies using ML techniques
- **Real-time Integration**: Connect with live casino data
- **Mobile App**: Native iOS/Android applications
- **Cloud Sync**: Cross-device synchronization

## Contributing

This project is designed to be modular and extensible. Key areas for contribution:

1. **New Counting Systems**: Add additional card counting methods
2. **Game Variations**: Implement Spanish 21, Pontoon, other variants
3. **Advanced Analytics**: Add more sophisticated statistical analysis
4. **UI/UX Improvements**: Enhance the user interface and experience

## License

This project is for educational and research purposes. Please use responsibly and in accordance with local laws and casino policies.

## Disclaimer

This simulator is designed for educational purposes and strategy development. It assumes perfect play and ideal conditions that may not reflect real-world casino environments. Always gamble responsibly and within your means.

---

**Built with**: React, Vite, Tailwind CSS, Recharts, Storybook, Bugsnag/SmartBear Insight Hub, UptimeRobot
**Inspired by**: CVData, CVCX, and the blackjack advantage play community
