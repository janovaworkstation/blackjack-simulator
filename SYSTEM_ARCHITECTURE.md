# System Architecture Document

## Document Overview
This document defines the system architecture for the Blackjack Strategy Simulator, focusing on the MVP Phase 1 implementation with extensibility for future phases.

**Version**: 1.0  
**Last Updated**: January 2025  
**Status**: Planning Phase  
**Owner**: Technical Architecture Team  

---

## Table of Contents
1. [High-Level System Architecture](#high-level-system-architecture)
2. [Component Hierarchy and Data Flow](#component-hierarchy-and-data-flow)
3. [State Management Strategy](#state-management-strategy)
4. [API Structure for Future Backend Integration](#api-structure-for-future-backend-integration)
5. [Technology Stack](#technology-stack)
6. [Architecture Patterns](#architecture-patterns)
7. [Performance Considerations](#performance-considerations)
8. [Security Architecture](#security-architecture)

---

## High-Level System Architecture

### System Overview
The Blackjack Strategy Simulator follows a **client-side first architecture** for Phase 1 (MVP), designed to evolve into a full-stack application in future phases.

```
┌─────────────────────────────────────────────────────────────┐
│                    Phase 1: MVP Architecture                │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                     Client Application                      │
│                     (React SPA + PWA)                      │
├─────────────────────────────────────────────────────────────┤
│  Presentation Layer  │  Business Logic  │  Data Layer      │
│  - React Components  │  - Game Engine   │  - Local Storage │
│  - UI State         │  - Simulation    │  - IndexedDB     │
│  - 3D Graphics     │  - Strategies    │  - Session Cache │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   External Services                        │
├─────────────────────────────────────────────────────────────┤
│  Bugsnag/SmartBear  │  UptimeRobot    │  Netlify CDN     │
│  (Error Tracking)   │  (Monitoring)   │  (Hosting)       │
└─────────────────────────────────────────────────────────────┘
```

### Future Architecture Evolution

```
┌─────────────────────────────────────────────────────────────┐
│                Future: Full-Stack Architecture             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                     Client Layer                           │
│  Web App │ Mobile PWA │ Desktop App │ Future: VR/AR        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      API Gateway                           │
│           (Authentication, Rate Limiting, Routing)         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   Microservices Layer                      │
│ Game Engine │ AI Service │ Analytics │ User Mgmt │ Social  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Data Layer                            │
│ PostgreSQL │ Redis │ InfluxDB │ MongoDB │ File Storage     │
└─────────────────────────────────────────────────────────────┘
```

---

## Component Hierarchy and Data Flow

### Application Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components (Button, Input, etc.)
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   └── Modal.tsx
│   ├── blackjack/       # Blackjack-specific components
│   │   ├── BlackjackSimulator.tsx    # Main orchestrator
│   │   ├── ConfigurationPanel.tsx    # Simulation configuration
│   │   ├── ResultsPanel.tsx          # Results display
│   │   ├── ResultsChart.tsx          # Data visualization
│   │   ├── HandDetailsTable.tsx      # Hand-by-hand tracking
│   │   └── BettingTable.tsx          # Betting strategy config
│   └── layout/          # Layout components
│       ├── Header.tsx
│       ├── Navigation.tsx
│       └── Footer.tsx
├── hooks/               # Custom React hooks
│   ├── useSimulation.ts             # Simulation state management
│   ├── useLocalStorage.ts           # Persistent storage
│   └── usePerformanceMonitoring.ts  # Performance tracking
├── stores/              # Zustand state stores
│   ├── simulationStore.ts           # Simulation state
│   ├── configurationStore.ts        # User preferences
│   └── resultsStore.ts              # Results history
├── utils/               # Utility functions and helpers
│   ├── BlackjackEngine.ts           # Core game logic
│   ├── strategies/                  # Strategy implementations
│   │   ├── BasicStrategy.ts
│   │   ├── HiLoStrategy.ts
│   │   └── KOStrategy.ts
│   ├── calculations/                # Mathematical utilities
│   │   ├── statistics.ts
│   │   ├── riskOfRuin.ts
│   │   └── expectedValue.ts
│   └── monitoring.ts                # Error and performance tracking
├── types/               # TypeScript type definitions
│   ├── game.ts          # Game-related types
│   ├── simulation.ts    # Simulation types
│   └── strategy.ts      # Strategy types
└── assets/              # Static assets
    ├── images/
    ├── sounds/
    └── models/
```

### Component Hierarchy

```
App
├── Header
│   ├── Navigation
│   └── UserProfile (future)
├── Main Content
│   └── BlackjackSimulator (Main Orchestrator)
│       ├── ConfigurationPanel
│       │   ├── GameRulesSection
│       │   ├── StrategySection
│       │   ├── BettingSection
│       │   └── SimulationSection
│       ├── SimulationControls
│       │   ├── StartButton
│       │   ├── PauseButton
│       │   └── StopButton
│       ├── ResultsPanel
│       │   ├── SummaryStats
│       │   ├── ResultsChart
│       │   └── ExportControls
│       └── HandDetailsTable (conditional)
└── Footer
    ├── StatusBar
    └── VersionInfo
```

### Data Flow Architecture

```typescript
// Data Flow Pattern: Unidirectional with Event-Driven Updates

1. User Interaction → Component
2. Component → Store Action
3. Store Update → Component Re-render
4. Component → Engine Calculation
5. Engine Result → Store Update
6. Store Update → UI Update

// Example Flow: Starting a Simulation
User clicks "Start" 
  → BlackjackSimulator.onStart()
  → useSimulation.startSimulation()
  → simulationStore.setStatus('running')
  → BlackjackEngine.runSimulation()
  → Engine emits progress events
  → simulationStore.updateProgress()
  → Components re-render with new state
```

### Core Data Flow Interfaces

```typescript
// Simulation Data Flow
interface SimulationFlow {
  input: SimulationConfig;
  processing: {
    engine: BlackjackEngine;
    progress: ProgressCallback;
    results: ResultsAccumulator;
  };
  output: SimulationResults;
}

// Component Communication Pattern
interface ComponentCommunication {
  props: ComponentProps;        // Parent → Child
  events: ComponentEvents;      // Child → Parent
  store: GlobalState;          // Global state access
  hooks: CustomHooks;          // Shared logic
}
```

---

## State Management Strategy

### Zustand Store Architecture

We've chosen **Zustand** over Redux for its simplicity and TypeScript-first approach.

```typescript
// Store Architecture Pattern

// 1. Simulation Store - Core simulation state
interface SimulationStore {
  // State
  status: 'idle' | 'running' | 'paused' | 'completed' | 'error';
  progress: SimulationProgress;
  results: SimulationResults | null;
  error: string | null;
  
  // Actions
  startSimulation: (config: SimulationConfig) => void;
  pauseSimulation: () => void;
  stopSimulation: () => void;
  updateProgress: (progress: SimulationProgress) => void;
  setResults: (results: SimulationResults) => void;
  setError: (error: string) => void;
  reset: () => void;
}

// 2. Configuration Store - User preferences and settings
interface ConfigurationStore {
  // State
  gameRules: GameRules;
  strategy: StrategyConfig;
  betting: BettingConfig;
  simulation: SimulationSettings;
  
  // Actions
  updateGameRules: (rules: Partial<GameRules>) => void;
  updateStrategy: (strategy: StrategyConfig) => void;
  updateBetting: (betting: BettingConfig) => void;
  updateSimulation: (settings: SimulationSettings) => void;
  loadPreset: (presetName: string) => void;
  savePreset: (name: string) => void;
  resetToDefaults: () => void;
}

// 3. Results Store - Historical results and analytics
interface ResultsStore {
  // State
  history: SimulationResults[];
  favorites: string[]; // Result IDs
  comparisons: ComparisonSet[];
  
  // Actions
  addResult: (result: SimulationResults) => void;
  removeResult: (id: string) => void;
  toggleFavorite: (id: string) => void;
  createComparison: (resultIds: string[]) => void;
  exportResults: (format: ExportFormat) => void;
  clearHistory: () => void;
}
```

### State Architecture Patterns

```typescript
// 1. Store Composition Pattern
const useAppStore = () => {
  const simulation = useSimulationStore();
  const configuration = useConfigurationStore();
  const results = useResultsStore();
  
  return {
    simulation,
    configuration,
    results,
    // Computed values
    isSimulationReady: configuration.isValid && simulation.status === 'idle',
    canStartSimulation: configuration.isValid && simulation.status !== 'running',
  };
};

// 2. Persistent State Pattern
const usePersistentStore = create<Store>()(
  persist(
    (set, get) => ({
      // Store implementation
    }),
    {
      name: 'blackjack-simulator-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        configuration: state.configuration,
        results: state.results.history.slice(-50), // Keep last 50 results
      }),
    }
  )
);

// 3. Reactive State Pattern
const useReactiveStore = create<Store>((set, get) => ({
  // State updates automatically trigger derived calculations
  updateGameRules: (rules) => {
    set((state) => {
      const newState = { ...state, gameRules: { ...state.gameRules, ...rules } };
      // Automatically recalculate dependent values
      newState.houseEdge = calculateHouseEdge(newState.gameRules);
      return newState;
    });
  },
}));
```

### State Synchronization Strategy

```typescript
// Local Storage Integration
interface StorageStrategy {
  // Immediate persistence for user preferences
  saveConfiguration: (config: ConfigurationState) => void;
  
  // Batched persistence for results (performance optimization)
  queueResultSave: (result: SimulationResults) => void;
  flushResultQueue: () => void;
  
  // Session-only storage for temporary state
  saveSession: (session: SessionState) => void;
  
  // Future: Cloud sync preparation
  syncToCloud: (data: SyncableData) => Promise<void>;
  syncFromCloud: () => Promise<SyncableData>;
}

// State Hydration on App Load
const hydrateStores = async () => {
  // 1. Load from localStorage
  const savedConfig = loadFromStorage('configuration');
  const savedResults = loadFromStorage('results');
  
  // 2. Apply to stores
  configurationStore.setState(savedConfig);
  resultsStore.setState(savedResults);
  
  // 3. Future: Sync with cloud if authenticated
  if (user.isAuthenticated) {
    await syncWithCloud();
  }
};
```

---

## API Structure for Future Backend Integration

### API Architecture Design

```typescript
// Phase 1: Client-Only (No Backend)
// All API interfaces are designed but implemented as local operations

// Phase 2+: Full Backend Integration
// Same interfaces, different implementations

// API Service Layer Architecture
interface APIService {
  // Authentication (Future Phase 2)
  auth: {
    login: (credentials: LoginCredentials) => Promise<AuthResult>;
    logout: () => Promise<void>;
    register: (userData: RegistrationData) => Promise<UserProfile>;
    refreshToken: () => Promise<TokenRefresh>;
  };
  
  // User Management (Future Phase 2)
  users: {
    getProfile: () => Promise<UserProfile>;
    updateProfile: (profile: Partial<UserProfile>) => Promise<UserProfile>;
    getPreferences: () => Promise<UserPreferences>;
    updatePreferences: (prefs: UserPreferences) => Promise<void>;
  };
  
  // Simulation Data (Future Phase 2)
  simulations: {
    save: (result: SimulationResults) => Promise<SavedSimulation>;
    list: (params: ListParams) => Promise<SimulationList>;
    get: (id: string) => Promise<SimulationResults>;
    delete: (id: string) => Promise<void>;
    share: (id: string, options: ShareOptions) => Promise<ShareResult>;
  };
  
  // Analytics (Future Phase 3)
  analytics: {
    getUserStats: () => Promise<UserStatistics>;
    getLeaderboards: () => Promise<Leaderboard[]>;
    getInsights: () => Promise<PersonalizedInsights>;
  };
  
  // Social Features (Future Phase 3)
  social: {
    getFriends: () => Promise<Friend[]>;
    sendFriendRequest: (userId: string) => Promise<void>;
    joinRoom: (roomId: string) => Promise<GameRoom>;
    sendMessage: (roomId: string, message: string) => Promise<void>;
  };
}
```

### API Implementation Strategy

```typescript
// Phase 1: Mock/Local Implementation
class LocalAPIService implements APIService {
  // All methods return locally computed/stored data
  async save(result: SimulationResults): Promise<SavedSimulation> {
    const saved = {
      ...result,
      id: generateId(),
      createdAt: new Date(),
      userId: 'local-user'
    };
    
    // Save to localStorage/IndexedDB
    await localDB.simulations.add(saved);
    return saved;
  }
}

// Phase 2+: HTTP API Implementation  
class HTTPAPIService implements APIService {
  private client: HTTPClient;
  
  async save(result: SimulationResults): Promise<SavedSimulation> {
    const response = await this.client.post('/api/simulations', result);
    return response.data;
  }
}

// Service Factory Pattern
const createAPIService = (environment: Environment): APIService => {
  switch (environment) {
    case 'local':
      return new LocalAPIService();
    case 'development':
    case 'production':
      return new HTTPAPIService();
    default:
      return new LocalAPIService();
  }
};
```

### API Data Models

```typescript
// Core API Data Types

// Simulation Models
interface SimulationResults {
  id: string;
  userId?: string;
  config: SimulationConfig;
  stats: SimulationStatistics;
  hands?: HandResult[]; // Optional detailed results
  createdAt: Date;
  duration: number;
  version: string;
}

interface SimulationConfig {
  gameRules: GameRules;
  strategy: StrategyConfig;
  betting: BettingConfig;
  simulation: SimulationSettings;
}

// User Models (Future)
interface UserProfile {
  id: string;
  email: string;
  username: string;
  preferences: UserPreferences;
  statistics: UserStatistics;
  subscription?: SubscriptionInfo;
}

interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  defaultGameRules: GameRules;
  defaultStrategy: StrategyConfig;
  privacy: PrivacySettings;
  notifications: NotificationSettings;
}

// API Response Models
interface APIResponse<T> {
  data: T;
  status: number;
  message?: string;
  timestamp: Date;
}

interface ListResponse<T> {
  items: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasNext: boolean;
  };
}
```

### API Client Architecture

```typescript
// HTTP Client with Interceptors
class APIClient {
  private baseURL: string;
  private timeout: number;
  
  constructor(config: APIConfig) {
    this.baseURL = config.baseURL;
    this.timeout = config.timeout;
    this.setupInterceptors();
  }
  
  private setupInterceptors() {
    // Request interceptor - add auth headers
    this.addRequestInterceptor((config) => {
      const token = getAuthToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
    
    // Response interceptor - handle errors
    this.addResponseInterceptor(
      (response) => response,
      (error) => {
        if (error.status === 401) {
          // Handle authentication errors
          redirectToLogin();
        }
        return Promise.reject(error);
      }
    );
  }
  
  // Generic HTTP methods
  async get<T>(url: string, params?: any): Promise<APIResponse<T>> {
    // Implementation
  }
  
  async post<T>(url: string, data: any): Promise<APIResponse<T>> {
    // Implementation
  }
}

// Error Handling Strategy
class APIError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
    public details?: any
  ) {
    super(message);
  }
}

const handleAPIError = (error: APIError) => {
  // Log to monitoring service
  monitoring.captureException(error);
  
  // Show user-friendly message
  switch (error.status) {
    case 400:
      showError('Invalid request. Please check your input.');
      break;
    case 401:
      showError('Please log in to continue.');
      break;
    case 429:
      showError('Too many requests. Please try again later.');
      break;
    default:
      showError('An unexpected error occurred. Please try again.');
  }
};
```

---

## Technology Stack

### Core Technologies

```typescript
// Frontend Framework Stack
const technologyStack = {
  // Core Framework
  framework: "React 18+",
  buildTool: "Vite",
  language: "TypeScript",
  
  // Styling and UI
  styling: "Tailwind CSS",
  ui: "Custom components + shadcn/ui base",
  icons: "Lucide React",
  
  // State Management
  globalState: "Zustand",
  serverState: "TanStack Query (future)",
  forms: "React Hook Form",
  
  // Development Tools
  testing: "Jest + React Testing Library",
  e2e: "Playwright",
  linting: "ESLint + Prettier",
  
  // Production Features
  pwa: "Vite PWA Plugin",
  bundling: "Vite (Rollup)",
  hosting: "Netlify",
  
  // Monitoring and Analytics
  errorTracking: "Bugsnag/SmartBear Insight Hub",
  uptime: "UptimeRobot",
  analytics: "TBD (Google Analytics/Plausible)",
  
  // Future Additions
  backend: "Node.js + TypeScript (future)",
  database: "PostgreSQL + Redis (future)",
  auth: "Auth0 or custom JWT (future)",
  realtime: "Socket.io (future)"
};
```

### Technology Decision Matrix

| Component | Chosen | Alternative | Reason |
|-----------|--------|-------------|--------|
| Framework | React | Vue/Angular | Large ecosystem, job market, team expertise |
| Build Tool | Vite | Create React App | Faster development, better DX |
| State Management | Zustand | Redux/Context | Simplicity, TypeScript-first, less boilerplate |
| Styling | Tailwind CSS | CSS Modules | Rapid development, consistency |
| Testing | Jest + RTL | Vitest | Mature ecosystem, extensive documentation |
| E2E Testing | Playwright | Cypress | Cross-browser support, better performance |
| Hosting | Netlify | Vercel | Free tier, easy setup, branch deploys |

---

## Architecture Patterns

### Design Patterns Used

```typescript
// 1. Facade Pattern - BlackjackEngine
class BlackjackEngine {
  // Simplifies complex subsystems
  private cardManager: CardManager;
  private handEvaluator: HandEvaluator;
  private strategyEngine: StrategyEngine;
  
  runSimulation(config: SimulationConfig): SimulationResults {
    // Orchestrates all subsystems
    const deck = this.cardManager.createDeck(config.gameRules);
    // ... complex logic simplified
  }
}

// 2. Strategy Pattern - Card Counting Systems
interface CountingStrategy {
  getCardValue(card: Card): number;
  calculateRunningCount(cards: Card[]): number;
  calculateTrueCount(runningCount: number, decksRemaining: number): number;
}

class HiLoStrategy implements CountingStrategy {
  getCardValue(card: Card): number {
    if (card.rank <= 6) return 1;
    if (card.rank >= 10) return -1;
    return 0;
  }
}

// 3. Observer Pattern - Progress Monitoring
class SimulationProgressObserver {
  private observers: ProgressCallback[] = [];
  
  subscribe(callback: ProgressCallback) {
    this.observers.push(callback);
  }
  
  notify(progress: SimulationProgress) {
    this.observers.forEach(callback => callback(progress));
  }
}

// 4. Command Pattern - Simulation Actions
interface SimulationCommand {
  execute(): void;
  undo(): void;
}

class StartSimulationCommand implements SimulationCommand {
  constructor(private engine: BlackjackEngine, private config: SimulationConfig) {}
  
  execute() {
    this.engine.start(this.config);
  }
  
  undo() {
    this.engine.stop();
  }
}

// 5. Factory Pattern - Strategy Creation
class StrategyFactory {
  static create(type: StrategyType): CountingStrategy {
    switch (type) {
      case 'hi-lo':
        return new HiLoStrategy();
      case 'ko':
        return new KOStrategy();
      default:
        throw new Error(`Unknown strategy: ${type}`);
    }
  }
}
```

### Component Architecture Patterns

```typescript
// 1. Compound Component Pattern
const ConfigurationPanel = {
  Root: ConfigurationPanelRoot,
  Section: ConfigurationSection,
  Field: ConfigurationField,
  Actions: ConfigurationActions,
};

// Usage:
<ConfigurationPanel.Root>
  <ConfigurationPanel.Section title="Game Rules">
    <ConfigurationPanel.Field label="Number of Decks" />
  </ConfigurationPanel.Section>
  <ConfigurationPanel.Actions>
    <Button onClick={handleReset}>Reset</Button>
  </ConfigurationPanel.Actions>
</ConfigurationPanel.Root>

// 2. Render Props Pattern (for complex state sharing)
interface SimulationProviderProps {
  children: (simulation: SimulationState) => React.ReactNode;
}

const SimulationProvider: React.FC<SimulationProviderProps> = ({ children }) => {
  const simulation = useSimulation();
  return <>{children(simulation)}</>;
};

// Usage:
<SimulationProvider>
  {(simulation) => (
    <div>
      <SimulationControls simulation={simulation} />
      <SimulationResults results={simulation.results} />
    </div>
  )}
</SimulationProvider>

// 3. Higher-Order Component Pattern (for cross-cutting concerns)
const withErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>
) => {
  return (props: P) => (
    <ErrorBoundary>
      <Component {...props} />
    </ErrorBoundary>
  );
};

// 4. Custom Hook Pattern (for logic reuse)
const useSimulationControls = () => {
  const simulation = useSimulationStore();
  
  const start = useCallback(() => {
    if (!simulation.isRunning) {
      simulation.start();
    }
  }, [simulation]);
  
  return {
    start,
    pause: simulation.pause,
    stop: simulation.stop,
    isRunning: simulation.isRunning,
    canStart: !simulation.isRunning,
  };
};
```

---

## Performance Considerations

### Performance Architecture

```typescript
// 1. Code Splitting Strategy
const LazyConfigurationPanel = lazy(() => import('./ConfigurationPanel'));
const LazyResultsChart = lazy(() => import('./ResultsChart'));

// Route-based splitting
const routes = [
  {
    path: '/simulator',
    component: lazy(() => import('./pages/SimulatorPage'))
  },
  {
    path: '/analysis',
    component: lazy(() => import('./pages/AnalysisPage'))
  }
];

// 2. Memoization Strategy
const ExpensiveCalculation = memo(({ data }: { data: SimulationData }) => {
  const result = useMemo(() => {
    return performExpensiveCalculation(data);
  }, [data]);
  
  return <div>{result}</div>;
});

// 3. Virtual Scrolling for Large Data Sets
const HandDetailsTable = ({ hands }: { hands: HandResult[] }) => {
  const parentRef = useRef<HTMLDivElement>(null);
  
  const virtualizer = useVirtualizer({
    count: hands.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35, // Row height
    overscan: 10,
  });
  
  return (
    <div ref={parentRef} style={{ height: '400px', overflow: 'auto' }}>
      {virtualizer.getVirtualItems().map((virtualRow) => (
        <HandRow key={virtualRow.index} hand={hands[virtualRow.index]} />
      ))}
    </div>
  );
};

// 4. Web Worker for Heavy Computations
class SimulationWorker {
  private worker: Worker;
  
  constructor() {
    this.worker = new Worker('/workers/simulation.worker.js');
  }
  
  runSimulation(config: SimulationConfig): Promise<SimulationResults> {
    return new Promise((resolve, reject) => {
      this.worker.postMessage({ type: 'START_SIMULATION', config });
      
      this.worker.onmessage = (event) => {
        const { type, data } = event.data;
        
        switch (type) {
          case 'SIMULATION_COMPLETE':
            resolve(data);
            break;
          case 'SIMULATION_ERROR':
            reject(new Error(data.message));
            break;
        }
      };
    });
  }
}

// 5. Performance Monitoring
const usePerformanceMonitoring = () => {
  useEffect(() => {
    // Monitor Core Web Vitals
    getCLS(console.log);
    getFCP(console.log);
    getFID(console.log);
    getLCP(console.log);
    getTTFB(console.log);
    
    // Custom performance marks
    performance.mark('simulation-start');
    // ... simulation logic
    performance.mark('simulation-end');
    performance.measure('simulation-duration', 'simulation-start', 'simulation-end');
  }, []);
};
```

### Optimization Strategies

```typescript
// 1. Bundle Size Optimization
const optimizations = {
  // Tree shaking - only import what's needed
  imports: "import { specific } from 'library';",
  
  // Dynamic imports for feature flags
  conditionalLoading: async () => {
    if (featureFlags.enableAdvancedAnalytics) {
      const { AdvancedAnalytics } = await import('./AdvancedAnalytics');
      return AdvancedAnalytics;
    }
  },
  
  // Compression and minification
  build: {
    gzip: true,
    brotli: true,
    minification: 'terser'
  }
};

// 2. Memory Management
class MemoryEfficientSimulation {
  private resultsBatch: HandResult[] = [];
  private readonly BATCH_SIZE = 1000;
  
  processHand(hand: HandResult) {
    this.resultsBatch.push(hand);
    
    if (this.resultsBatch.length >= this.BATCH_SIZE) {
      this.processBatch();
      this.resultsBatch = []; // Clear memory
    }
  }
  
  private processBatch() {
    // Process batch and store summary only
    const summary = this.calculateBatchSummary(this.resultsBatch);
    this.storeBatchSummary(summary);
  }
}

// 3. Caching Strategy
const useSmartCaching = () => {
  const cache = useMemo(() => new Map<string, any>(), []);
  
  const getCachedResult = useCallback(<T>(key: string, calculator: () => T): T => {
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = calculator();
    cache.set(key, result);
    
    // Prevent memory leaks - limit cache size
    if (cache.size > 100) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }
    
    return result;
  }, [cache]);
  
  return { getCachedResult };
};
```

---

## Security Architecture

### Client-Side Security

```typescript
// 1. Input Validation and Sanitization
const validateSimulationConfig = (config: unknown): SimulationConfig => {
  const schema = z.object({
    numberOfHands: z.number().min(1).max(1000000),
    numberOfDecks: z.number().min(1).max(8),
    strategy: z.enum(['basic', 'hi-lo', 'ko']),
    // ... more validations
  });
  
  return schema.parse(config);
};

// 2. Content Security Policy
const cspConfig = {
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'", "https://api.bugsnag.com"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'", "data:", "https:"],
    connectSrc: ["'self'", "https://api.bugsnag.com"],
    fontSrc: ["'self'"],
    objectSrc: ["'none'"],
    mediaSrc: ["'self'"],
    frameSrc: ["'none'"],
  }
};

// 3. Data Protection
class SecureStorage {
  private encryptionKey: string;
  
  constructor() {
    this.encryptionKey = this.generateEncryptionKey();
  }
  
  store(key: string, data: any): void {
    const encrypted = this.encrypt(JSON.stringify(data));
    localStorage.setItem(key, encrypted);
  }
  
  retrieve<T>(key: string): T | null {
    const encrypted = localStorage.getItem(key);
    if (!encrypted) return null;
    
    try {
      const decrypted = this.decrypt(encrypted);
      return JSON.parse(decrypted);
    } catch {
      return null;
    }
  }
  
  private encrypt(data: string): string {
    // Implementation using Web Crypto API
    // This is simplified - real implementation would use proper encryption
    return btoa(data);
  }
  
  private decrypt(encrypted: string): string {
    return atob(encrypted);
  }
}

// 4. Error Information Sanitization
const sanitizeError = (error: Error): SanitizedError => {
  return {
    message: error.message,
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    timestamp: new Date().toISOString(),
    // Remove any potentially sensitive information
    sanitized: true
  };
};

// 5. Rate Limiting (Client-Side)
class ClientRateLimiter {
  private attempts: Map<string, number[]> = new Map();
  
  isAllowed(action: string, maxAttempts: number, windowMs: number): boolean {
    const now = Date.now();
    const attempts = this.attempts.get(action) || [];
    
    // Remove old attempts outside the window
    const validAttempts = attempts.filter(time => now - time < windowMs);
    
    if (validAttempts.length >= maxAttempts) {
      return false;
    }
    
    validAttempts.push(now);
    this.attempts.set(action, validAttempts);
    return true;
  }
}
```

### Privacy and Compliance

```typescript
// Privacy-First Architecture
interface PrivacyConfig {
  collectAnalytics: boolean;
  collectCrashReports: boolean;
  shareUsageData: boolean;
  allowLocalStorage: boolean;
}

class PrivacyManager {
  private config: PrivacyConfig;
  
  constructor(userPreferences: UserPreferences) {
    this.config = {
      collectAnalytics: userPreferences.privacy.analytics,
      collectCrashReports: userPreferences.privacy.errorReporting,
      shareUsageData: userPreferences.privacy.usageData,
      allowLocalStorage: userPreferences.privacy.localStorage,
    };
  }
  
  shouldCollectAnalytics(): boolean {
    return this.config.collectAnalytics;
  }
  
  shouldReportErrors(): boolean {
    return this.config.collectCrashReports;
  }
  
  canStoreData(): boolean {
    return this.config.allowLocalStorage;
  }
}

// Data Anonymization
const anonymizeSimulationData = (data: SimulationResults): AnonymizedData => {
  return {
    ...data,
    userId: undefined, // Remove user identification
    timestamp: Math.floor(data.createdAt.getTime() / 86400000) * 86400000, // Round to day
    // Keep only necessary statistical data
    stats: data.stats,
    config: data.config,
  };
};
```

---

## Conclusion

This system architecture provides a solid foundation for the Blackjack Strategy Simulator MVP while maintaining extensibility for future phases. The architecture emphasizes:

1. **Simplicity**: Client-side first approach for rapid development
2. **Scalability**: Designed to evolve into a full-stack application
3. **Performance**: Optimized for smooth user experience
4. **Maintainability**: Clear separation of concerns and modular design
5. **Security**: Privacy-first approach with data protection

The architecture will be continuously refined as development progresses and new requirements emerge.

---

**Document Status**: Living document - updated as architecture evolves  
**Next Review Date**: Weekly during active development  
**Owner**: Technical Architecture Team  
**Contributors**: Development Team