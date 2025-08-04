# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) for working on the Blackjack Strategy Simulator. It outlines the project's architecture, development commands, and key implementation plans, aligning with the project's formal documentation (`PRD.md`, `PLANNING.md`, `TASKS.md`).

**Project Status:** Phase 1 Development - 3D Gaming Platform Implemented (as of August 2025)

## Commands

**Development:**
- `npm run dev` - Start development server (Vite) on http://localhost:5173
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality checks

**Testing:**
- `npm run test` - Run unit tests with Jest (33 BlackjackEngine tests, 95%+ coverage)
- `npm run test:e2e` - Run end-to-end tests with Playwright (16 comprehensive workflow tests)
- `npm run test:coverage` - Generate test coverage reports

**Package Management:**
- `npm install` - Install dependencies

## Architecture Overview

The project follows a modern, web-first architecture, starting with a client-side Single Page Application (SPA) for the MVP and designed for future expansion into a full-stack service with microservices, as detailed in `PLANNING.md`.

### Phase 1 (MVP) Core Components - IMPLEMENTED ✅
- **`BlackjackSimulator.tsx`** - The main application component orchestrating the UI, managing state and coordinating between components.
- **`BlackjackEngine.ts`** - The core simulation engine implementing game mechanics, card management, and strategy execution.
- **`useSimulation.ts`** - A React hook managing simulation state, asynchronous execution, and progress tracking.

### 3D Gaming Platform Components - NEW ✅
- **`BlackjackTable3D.tsx`** - Immersive 3D blackjack table with realistic casino atmosphere
- **`Card3D.tsx`** - 3D playing card component with face-up/down states and suit-based styling
- **`Chip3D.tsx`** - Casino-style poker chips with value-based colors and realistic geometry
- **`Game3DDemo.tsx`** - Demo page showcasing the 3D gaming experience

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

### UI Structure - IMPLEMENTED ✅
- **Dual Interface Design**: Navigation between Analysis (Simulator) and Gaming (3D Demo) modes
- **Responsive Layout**: Built with Tailwind CSS, works on desktop, tablet, and mobile
- **Analysis Mode**: Configuration panel with results/charting area using Recharts for data visualization
- **3D Gaming Mode**: Immersive casino table with Three.js/React Three Fiber rendering
- **Interactive Navigation**: Seamless switching between simulation and 3D gaming experiences

### Key Files
**Core Simulation (Analysis Mode):**
- `src/utils/BlackjackEngine.ts` - All simulation logic and strategy implementation.
- `src/hooks/useSimulation.ts` - Simulation state management and async execution.
- `src/components/BlackjackSimulator.tsx` - Main coordinator component.
- `src/components/ConfigurationPanel.tsx` - Parameter controls for simulation setup.
- `src/components/ResultsPanel.tsx` - Component for displaying simulation results.

**3D Gaming Platform:**
- `src/components/game/BlackjackTable3D.tsx` - Main 3D scene with casino table, lighting, and controls.
- `src/components/game/Card3D.tsx` - Individual 3D playing card component.
- `src/components/game/Chip3D.tsx` - Casino poker chip component with value-based styling.
- `src/pages/Game3DDemo.tsx` - 3D demo page with navigation and instructions.

**Application Structure:**
- `src/App.tsx` - Main app with navigation between Simulator and 3D Demo modes.