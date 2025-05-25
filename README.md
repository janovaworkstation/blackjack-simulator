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

## Quick Start

### Prerequisites
- Node.js 16+ and npm/yarn
- Modern web browser

### Installation

1. **Clone or download this repository**
2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser to** `http://localhost:5173`

### Building for Production
```bash
npm run build
```

## Usage

### Basic Simulation
1. Configure your simulation parameters:
   - Number of hands (1,000 - 10,000,000)
   - Counting system (Hi-Lo, KO, Hi-Opt I)
   - Deck count and penetration
   - Betting limits and spreads

2. Set game rules:
   - Dealer hits soft 17
   - Double after split
   - Surrender options
   - Re-split aces

3. Click "Run Simulation" and analyze results

### Understanding Results

#### Key Metrics
- **Expected Value (EV)**: Percentage return on total money wagered
- **Win Rate**: Percentage of hands won (not including pushes)
- **Max Drawdown**: Largest loss from peak bankroll
- **Risk Rating**: Low/Medium/High based on volatility

#### Performance Chart
- **Blue Line**: Bankroll progression over time
- **Red Line**: True count variations during session

## Project Structure

```
blackjack-simulator/
├── src/
│   ├── components/
│   │   ├── BlackjackSimulator.jsx    # Main application component
│   │   ├── ConfigurationPanel.jsx    # Simulation parameter controls
│   │   ├── ResultsPanel.jsx          # Results display and analysis
│   │   ├── ResultsChart.jsx          # Performance visualization
│   │   └── UI.jsx                    # Reusable UI components
│   ├── hooks/
│   │   └── useSimulation.js          # Simulation state management
│   ├── utils/
│   │   └── BlackjackEngine.js        # Core simulation logic
│   ├── App.jsx                       # Root component
│   ├── main.jsx                      # Application entry point
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

**Built with**: React, Vite, Tailwind CSS, Recharts
**Inspired by**: CVData, CVCX, and the blackjack advantage play community
