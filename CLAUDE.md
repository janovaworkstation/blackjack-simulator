# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) for working on the Blackjack Strategy Simulator. It outlines the project's architecture, development commands, and key implementation plans, aligning with the project's formal documentation (`PRD.md`, `PLANNING.md`, `TASKS.md`).

**Project Status:** Planning Phase (as of August 2025)

## Commands

**Development:**
- `npm run dev` - Start development server (Vite) on http://localhost:5173
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality checks

**Package Management:**
- `npm install` - Install dependencies

## Architecture Overview

The project follows a modern, web-first architecture, starting with a client-side Single Page Application (SPA) for the MVP and designed for future expansion into a full-stack service with microservices, as detailed in `PLANNING.md`.

### Phase 1 (MVP) Core Components
- **`BlackjackSimulator.jsx`** - The main application component that will orchestrate the UI, managing state and coordinating between the configuration panel, the simulation engine, and the results display.
- **`BlackjackEngine.js`** - The core simulation engine. This will implement game mechanics, card management, and strategy execution.
- **`useSimulation.js`** - A React hook to manage the simulation's state, handle its asynchronous execution, and track its progress.

### Data Flow
1. Configuration settings will flow from `ConfigurationPanel` → `BlackjackSimulator` → `useSimulation` hook.
2. The simulation will run within the `BlackjackEngine`, with progress callbacks updating the UI.
3. Results will flow from the engine back through the `useSimulation` hook to be displayed in the `ResultsPanel` and `ResultsChart` components.

### Key Implementation Plan

**Card Counting Systems:**
- To be implemented in a `COUNTING_SYSTEMS` object in `BlackjackEngine.js`.
- Initial systems for the MVP will include Hi-Lo and KO (Knock-Out), as per `TASKS.md`.
- The design will be extensible to support additional systems in the future.

**Basic Strategy:**
- Strategy logic will be implemented using decision matrices (e.g., `BASIC_STRATEGY`, `SOFT_STRATEGY`, `PAIR_STRATEGY`).
- The engine will make decisions based on the player's hand, the dealer's up-card, and game rules.

**Simulation Engine:**
- Will feature a multi-deck shoe with configurable penetration and realistic shuffling.
- Will support count-based betting spreads.
- Will handle all standard player actions: split, double, and surrender.

### UI Structure
- The UI will be built with a responsive grid layout using Tailwind CSS.
- The main view will consist of a configuration panel on one side and a results/charting area on the other.
- Recharts will be used for data visualization (e.g., bankroll progression).

### Key Files
- `src/utils/BlackjackEngine.js` - All simulation logic and strategy implementation.
- `src/hooks/useSimulation.js` - Simulation state management and async execution.
- `src/components/BlackjackSimulator.jsx` - Main coordinator component.
- `src/components/ConfigurationPanel.jsx` - Parameter controls for simulation setup.
- `src/components/ResultsPanel.jsx` - Component for displaying simulation results.