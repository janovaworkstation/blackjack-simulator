# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

**Development:**
- `npm run dev` - Start development server (Vite) on http://localhost:5173
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality checks

**Package Management:**
- `npm install` - Install dependencies

## Architecture

### Core Components
- **BlackjackSimulator.jsx** - Main application orchestrator that manages state and coordinates between configuration, simulation, and results
- **BlackjackEngine.js** - Core simulation engine implementing card counting systems, basic strategy matrices, and game mechanics
- **useSimulation.js** - React hook managing simulation state, progress tracking, and asynchronous execution

### Data Flow
1. Configuration flows from ConfigurationPanel → BlackjackSimulator → useSimulation hook
2. Simulation runs in BlackjackEngine with progress callbacks to update UI
3. Results flow back through hook to ResultsPanel and ResultsChart components

### Key Implementation Details

**Card Counting Systems:**
- Implemented in `COUNTING_SYSTEMS` object with Hi-Lo, KO, and Hi-Opt I
- Running count tracked per card dealt, true count calculated based on remaining decks

**Basic Strategy:**
- Complete strategy matrices in `BASIC_STRATEGY`, `SOFT_STRATEGY`, and `PAIR_STRATEGY`
- Strategy decisions consider hand type, dealer up card, and available actions (double/split)

**Simulation Engine:**
- Multi-deck shoe with realistic shuffling and penetration
- Count-based betting with configurable min/max spreads
- Handles splits, doubles, surrenders with proper bet adjustments
- Progress tracking for long simulations with sessionResults for charting

### UI Structure
- Responsive grid layout with configuration panel (left) and results (right)
- Real-time progress updates during simulation using React state
- Recharts integration for bankroll progression and count visualization
- Tailwind CSS for styling with consistent component patterns

### Key Files
- `src/utils/BlackjackEngine.js` - All simulation logic and strategy implementation
- `src/hooks/useSimulation.js` - Simulation state management and async execution
- `src/components/BlackjackSimulator.jsx` - Main coordinator component
- `src/components/ConfigurationPanel.jsx` - Parameter controls for simulation setup
- `src/components/ResultsPanel.jsx` - Statistical results display
- `src/components/ResultsChart.jsx` - Bankroll/count visualization

### Technology Stack
- React 18 with hooks for state management
- Vite for development and build tooling
- Tailwind CSS for styling
- Recharts for data visualization
- ESLint for code quality