# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) for working on the Blackjack Strategy Simulator. It outlines the project's architecture, development commands, and key implementation plans, aligning with the project's formal documentation (`PRD.md`, `PLANNING.md`, `TASKS.md`).

**Project Status:** Phase 1 Complete - Strategy-Driven Architecture Implementation Phase (as of August 2025)

## Commands

**Development:**
- `npm run dev` - Start development server (Vite) on http://localhost:5173
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality checks

**Testing:**
- `npm run test` - Run unit tests with Jest (54 BlackjackEngine tests, 85%+ coverage)
- `npm run test:e2e` - Run end-to-end tests with Playwright (16 comprehensive workflow tests)
- `npm run test:coverage` - Generate test coverage reports

**Package Management:**
- `npm install` - Install dependencies

## Architecture Overview

The project follows a strategy-driven architecture that transforms simulation data into actionable live play guidance through an intelligent AI dealer coach. The system creates a unified ecosystem where profitable strategies discovered through simulation directly guide and evaluate live play performance.

### Current Priority: Strategy-Driven Architecture Implementation 🎯

**NEW PRIORITY #1: Strategy Foundation System**
- **Strategy Definition**: TypeScript interfaces for strategy data model with simulation config + betting strategy + AI coaching preferences
- **Strategy Management**: localStorage persistence with CRUD operations via `useStrategyManager` hook
- **Strategy Validation**: Profitability verification and comparison systems

**NEW PRIORITY #2: AI Dealer Coach System** 
- **AICoach Class**: Intelligent coaching engine with multiple personalities (mentor, expert, instructor)
- **Coaching Modes**: Card-by-card, end-of-shoe, count critique, and strategy adherence coaching
- **3D Avatar Integration**: Realistic dealer character with contextual dialogue and visual feedback

**NEW PRIORITY #3: Live Play Integration**
- **Strategy-Guided Gameplay**: Real-time decision recommendations based on saved strategies
- **Performance Analytics**: Strategy adherence tracking and improvement measurement
- **Adaptive Learning**: AI coach adjusts intensity based on player skill progression

### Existing Foundation - IMPLEMENTED ✅
- **`BlackjackSimulator.tsx`** - Main simulation application (to be enhanced with strategy management)
- **`BlackjackEngine.ts`** - Core simulation engine (to be extended with strategy creation workflow)
- **`useSimulation.ts`** - Simulation state management (to be enhanced with strategy saving)
- **Interactive Game Components** - Full 3D blackjack game (to be integrated with AI coaching)

### 3D Gaming Platform Components - NEW ✅
- **`BlackjackTable3D.tsx`** - Immersive 3D blackjack table with realistic casino atmosphere
- **`Card3D.tsx`** - 3D playing card component with face-up/down states and suit-based styling
- **`Chip3D.tsx`** - Casino-style poker chips with value-based colors and realistic geometry
- **`Game3DDemo.tsx`** - Demo page showcasing the 3D gaming experience

### Strategy-Driven Data Flow
1. **Strategy Creation**: `ConfigurationPanel` → `BlackjackSimulator` → `useSimulation` → `BlackjackEngine` → Strategy Results
2. **Strategy Management**: Strategy Results → Strategy Validation → `useStrategyManager` → localStorage persistence
3. **AI Coaching Integration**: Saved Strategy → `AICoach` class → Live play decision analysis and feedback
4. **Performance Tracking**: Player Actions → Strategy Comparison → Performance Analytics → Progress Reports

### Core Philosophy Implementation
The data flow transforms from linear simulation → results to cyclical strategy creation → coaching → improvement:
- Simulation creates profitable strategies
- Strategies are validated and saved with metadata
- AI coach uses strategies as benchmarks for live play evaluation
- Performance data feeds back to strategy refinement and coaching adaptation

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

**Interactive Gaming Platform:**
- `src/components/game/InteractiveGame.tsx` - Complete 3D blackjack game with all functionality.
- `src/components/game/GameUI.tsx` - Game interface with betting, actions, and status panels.
- `src/hooks/useBlackjackGame.ts` - Complete game logic hook with all blackjack rules.
- `src/pages/InteractiveGamePage.tsx` - Full interactive game page.

**Application Structure:**
- `src/App.tsx` - Main app with navigation between Simulator, 3D Demo, and Interactive Game modes.

## Recent Achievements (August 2025)

### ✅ **Milestone 1.4.3 & 1.4.3.0 Completed - Production-Ready 3D Blackjack Game**
- **Complete Game Implementation**: Fully functional blackjack game with all standard rules
- **Advanced Features**: Split functionality, insurance betting, double down, surrender
- **3D Visual Experience**: Realistic casino table with cards, chips, and animations (foundation for AI dealer avatar)
- **Testing Mode**: Manual card selection with 20+ pre-defined scenarios for comprehensive testing
- **Card Counting Integration**: Real-time running and true count display with 6-deck shoe
- **Professional Game Flow**: Proper timing, animations, and dealer logic
- **Production Deployment**: Successfully deployed with 97 tests passing, all lint errors resolved

### 🎯 **Strategy-Driven Architecture Redesign**
- **Vision Transformation**: Shifted from dual-platform to unified strategy ecosystem
- **AI Coach Architecture**: Technical design for intelligent dealer avatar integration
- **Priority Restructuring**: Updated TASKS.md to focus on strategy-driven implementation
- **Documentation Updates**: All .md files updated to reflect new strategic direction

### ⚡ **Performance & UX Optimization Audit - COMPLETED** (August 2025)
- **Final Audit Recommendations**: Successfully implemented all performance optimization suggestions
- **Hand Details Table Performance**: Fixed O(n²) → O(n) algorithm for running bankroll calculations, maintaining 50-item pagination for optimal UX
- **Large Dataset Handling**: Efficient processing of 100,000+ hand simulation results with instant loading
- **Split Hand Financial Accuracy**: Restored proper split hand tracking while maintaining performance optimizations
- **UI Consistency**: Strategy Validation and Hand Details components now consistently hide when hand tracking disabled
- **Hand Tracking Default**: Changed to disabled by default for faster simulations, with clear UI indicators when enabled
- **Test Suite**: All 238 tests passing with comprehensive coverage of performance optimizations

### 📋 **Next Implementation Phase (6 weeks estimated)**
1. **Strategy Foundation System** (2 weeks) - Strategy creation, management, and persistence
2. **AI Dealer Coach System** (3 weeks) - Intelligent coaching engine with 3D avatar integration  
3. **Strategy-Coach Integration** (1 week) - Live play guided by saved strategies with AI evaluation
4. **Mobile Optimization** (Phase 4.1) - Deferred until after core AI coaching system is complete