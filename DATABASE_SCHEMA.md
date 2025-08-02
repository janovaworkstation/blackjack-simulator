# Database Schema Planning Document

## Document Overview
This document defines the database schema design for the Blackjack Strategy Simulator, covering both current local storage requirements (Phase 1) and future backend database architecture (Phase 2+).

**Version**: 1.0  
**Last Updated**: January 2025  
**Status**: Planning Phase  
**Owner**: Database Architecture Team  

---

## Table of Contents
1. [User Data Models](#user-data-models)
2. [Simulation Result Storage Structure](#simulation-result-storage-structure)
3. [Gaming Session Data Models](#gaming-session-data-models)
4. [Data Migration Strategy](#data-migration-strategy)
5. [Phase 1: Local Storage Schema](#phase-1-local-storage-schema)
6. [Phase 2+: Backend Database Schema](#phase-2-backend-database-schema)
7. [Performance Optimization](#performance-optimization)
8. [Data Privacy and Security](#data-privacy-and-security)

---

## User Data Models

### Phase 1: Local User Data (Anonymous)

```typescript
// Local storage user data structure
interface LocalUserData {
  userId: string; // Generated UUID for local identification
  preferences: UserPreferences;
  settings: ApplicationSettings;
  createdAt: Date;
  lastActiveAt: Date;
  version: string;
}

interface UserPreferences {
  // UI Preferences
  theme: 'light' | 'dark' | 'auto';
  language: string;
  
  // Default Simulation Settings
  defaultGameRules: GameRules;
  defaultStrategy: StrategyType;
  defaultBetting: BettingConfig;
  
  // Privacy Settings
  privacy: {
    collectAnalytics: boolean;
    collectCrashReports: boolean;
    shareUsageData: boolean;
    allowLocalStorage: boolean;
  };
  
  // Display Preferences
  display: {
    showAdvancedStats: boolean;
    enableHandTracking: boolean;
    maxHandsToTrack: number;
    chartType: 'line' | 'bar' | 'area';
    resultsPerPage: number;
  };
}

interface ApplicationSettings {
  // Performance Settings
  performance: {
    enableWorkers: boolean;
    batchSize: number;
    maxCacheSize: number;
  };
  
  // Accessibility Settings
  accessibility: {
    reduceMotion: boolean;
    highContrast: boolean;
    fontSize: 'small' | 'medium' | 'large';
    screenReader: boolean;
  };
  
  // Notification Settings
  notifications: {
    simulationComplete: boolean;
    errorAlerts: boolean;
    performanceWarnings: boolean;
  };
}
```

### Phase 2+: Full User Profile Schema

```sql
-- Users table - Core user information
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email_verified BOOLEAN DEFAULT FALSE,
    
    -- Profile Information
    display_name VARCHAR(100),
    avatar_url TEXT,
    bio TEXT,
    location VARCHAR(100),
    website VARCHAR(255),
    
    -- Account Status
    status VARCHAR(20) DEFAULT 'active', -- active, suspended, deleted
    account_type VARCHAR(20) DEFAULT 'free', -- free, premium, professional
    subscription_id UUID REFERENCES subscriptions(id),
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    last_login_at TIMESTAMP,
    email_verified_at TIMESTAMP,
    
    -- Metadata
    metadata JSONB DEFAULT '{}'::jsonb,
    
    CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    CONSTRAINT valid_username CHECK (username ~* '^[a-zA-Z0-9_]{3,50}$')
);

-- User Preferences table - Detailed user settings
CREATE TABLE user_preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- UI Preferences
    theme VARCHAR(10) DEFAULT 'auto',
    language VARCHAR(10) DEFAULT 'en',
    timezone VARCHAR(50) DEFAULT 'UTC',
    
    -- Default Settings (stored as JSONB for flexibility)
    default_game_rules JSONB NOT NULL DEFAULT '{
        "numberOfDecks": 6,
        "dealerHitsSoft17": true,
        "doubleAfterSplit": true,
        "surrenderAllowed": true,
        "blackjackPayout": 1.5
    }'::jsonb,
    
    default_strategy JSONB NOT NULL DEFAULT '{
        "type": "basic",
        "countingSystem": null
    }'::jsonb,
    
    default_betting JSONB NOT NULL DEFAULT '{
        "strategy": "flat",
        "baseAmount": 10,
        "maxAmount": 100
    }'::jsonb,
    
    -- Privacy Settings
    privacy_settings JSONB NOT NULL DEFAULT '{
        "profileVisibility": "public",
        "shareStatistics": true,
        "allowFriendRequests": true,
        "showOnlineStatus": true
    }'::jsonb,
    
    -- Display Settings
    display_settings JSONB NOT NULL DEFAULT '{
        "showAdvancedStats": false,
        "enableHandTracking": true,
        "maxHandsToTrack": 1000,
        "chartType": "line",
        "resultsPerPage": 20
    }'::jsonb,
    
    -- Notification Settings
    notification_settings JSONB NOT NULL DEFAULT '{
        "email": {
            "simulationComplete": false,
            "friendRequests": true,
            "achievements": true
        },
        "push": {
            "enabled": false
        }
    }'::jsonb,
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- User Statistics table - Performance and usage metrics
CREATE TABLE user_statistics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Simulation Statistics
    total_simulations INTEGER DEFAULT 0,
    total_hands_played BIGINT DEFAULT 0,
    total_simulation_time INTERVAL DEFAULT '0 seconds',
    
    -- Strategy Performance
    basic_strategy_accuracy DECIMAL(5,4),
    counting_accuracy DECIMAL(5,4),
    optimal_betting_adherence DECIMAL(5,4),
    
    -- Skill Assessment
    skill_level VARCHAR(20) DEFAULT 'beginner', -- beginner, intermediate, advanced, expert
    skill_score INTEGER DEFAULT 0,
    last_assessment_at TIMESTAMP,
    
    -- Achievement Progress
    achievements_earned INTEGER DEFAULT 0,
    total_experience INTEGER DEFAULT 0,
    current_level INTEGER DEFAULT 1,
    
    -- Usage Patterns
    preferred_strategies TEXT[],
    most_used_game_rules JSONB,
    average_session_duration INTERVAL,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    CONSTRAINT valid_accuracies CHECK (
        basic_strategy_accuracy BETWEEN 0 AND 1 AND
        counting_accuracy BETWEEN 0 AND 1 AND
        optimal_betting_adherence BETWEEN 0 AND 1
    )
);
```

---

## Simulation Result Storage Structure

### Phase 1: Local Storage Structure

```typescript
// IndexedDB schema for local simulation storage
interface LocalSimulationDatabase {
  simulations: {
    id: string; // UUID
    name?: string; // User-assigned name
    config: SimulationConfig;
    results: SimulationResults;
    metadata: SimulationMetadata;
    createdAt: Date;
    isFavorite: boolean;
    tags: string[];
  };
  
  // For hand-by-hand tracking (optional detailed data)
  handDetails: {
    simulationId: string;
    handIndex: number;
    playerCards: Card[];
    dealerCards: Card[];
    playerAction: PlayerAction;
    outcome: HandOutcome;
    betAmount: number;
    winAmount: number;
    runningCount?: number;
    trueCount?: number;
  };
  
  // Configuration presets
  presets: {
    id: string;
    name: string;
    description?: string;
    config: SimulationConfig;
    isDefault: boolean;
    createdAt: Date;
  };
}

interface SimulationConfig {
  // Game Rules
  gameRules: {
    numberOfDecks: number;
    dealerHitsSoft17: boolean;
    doubleAfterSplit: boolean;
    surrenderAllowed: boolean;
    blackjackPayout: number;
    maxSplits: number;
    doubleOnAnyTwo: boolean;
    doubleAfterSplit: boolean;
    resplitAces: boolean;
    hitSplitAces: boolean;
  };
  
  // Strategy Configuration
  strategy: {
    type: 'basic' | 'hi-lo' | 'ko' | 'hi-opt-i' | 'hi-opt-ii' | 'red-7';
    deviations: boolean;
    illustrious18: boolean;
    fabricusFour: boolean;
  };
  
  // Betting Strategy
  betting: {
    strategy: 'flat' | 'progressive' | 'count-based';
    baseAmount: number;
    maxAmount: number;
    trueCountRanges?: BettingRange[];
    progressionType?: 'martingale' | 'paroli' | 'fibonacci';
  };
  
  // Simulation Parameters
  simulation: {
    numberOfHands: number;
    penetration: number; // Deck penetration percentage
    enableHandTracking: boolean;
    maxHandsToTrack: number;
    burnCards: number;
    shuffleTracking: boolean;
  };
}

interface SimulationResults {
  // Summary Statistics
  summary: {
    totalHands: number;
    totalWagered: number;
    totalWon: number;
    netResult: number;
    winRate: number;
    winStreakMax: number;
    loseStreakMax: number;
    avgBet: number;
    hourlyRate: number;
    riskOfRuin: number;
    kellyBet: number;
    standardDeviation: number;
  };
  
  // Detailed Breakdowns
  handOutcomes: {
    wins: number;
    losses: number;
    pushes: number;
    blackjacks: number;
    busts: number;
    surrenders: number;
    doubles: number;
    splits: number;
  };
  
  // Strategy Analysis
  strategyAnalysis: {
    basicStrategyAccuracy: number;
    deviationOpportunities: number;
    deviationsUsed: number;
    countingAccuracy: number;
    bettingAccuracy: number;
  };
  
  // Progressive Data
  progressiveData: {
    runningBankroll: number[];
    runningWinRate: number[];
    runningCount?: number[];
    trueCount?: number[];
    handNumbers: number[];
  };
  
  // Performance Metrics
  performance: {
    simulationDuration: number; // milliseconds
    handsPerSecond: number;
    memoryUsed: number;
    cpuTime: number;
  };
}

interface SimulationMetadata {
  version: string;
  engineVersion: string;
  browserInfo: string;
  randomSeed?: number;
  tags: string[];
  notes?: string;
  exportedFormats: string[];
  sharedWith: string[];
}
```

### Phase 2+: Backend Database Schema

```sql
-- Simulations table - Core simulation records
CREATE TABLE simulations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Basic Information
    name VARCHAR(255),
    description TEXT,
    
    -- Configuration (stored as JSONB for flexibility)
    game_rules JSONB NOT NULL,
    strategy_config JSONB NOT NULL,
    betting_config JSONB NOT NULL,
    simulation_params JSONB NOT NULL,
    
    -- Results Summary (for quick queries)
    total_hands INTEGER NOT NULL,
    total_wagered DECIMAL(12,2) NOT NULL,
    total_won DECIMAL(12,2) NOT NULL,
    net_result DECIMAL(12,2) NOT NULL,
    win_rate DECIMAL(7,6) NOT NULL,
    
    -- Performance Metrics
    simulation_duration INTEGER, -- milliseconds
    hands_per_second DECIMAL(8,2),
    
    -- Metadata
    engine_version VARCHAR(20) NOT NULL,
    random_seed BIGINT,
    is_favorite BOOLEAN DEFAULT FALSE,
    is_public BOOLEAN DEFAULT FALSE,
    tags TEXT[],
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP,
    
    -- Indexes for common queries
    CONSTRAINT positive_hands CHECK (total_hands > 0),
    CONSTRAINT valid_win_rate CHECK (win_rate BETWEEN 0 AND 1)
);

-- Simulation Results table - Detailed statistical results
CREATE TABLE simulation_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    simulation_id UUID NOT NULL REFERENCES simulations(id) ON DELETE CASCADE,
    
    -- Detailed Statistics (JSONB for complex nested data)
    hand_outcomes JSONB NOT NULL,
    strategy_analysis JSONB NOT NULL,
    progressive_data JSONB, -- May be null for large simulations
    
    -- Risk Analysis
    risk_of_ruin DECIMAL(7,6),
    kelly_bet DECIMAL(10,2),
    standard_deviation DECIMAL(10,2),
    confidence_intervals JSONB,
    
    -- Created timestamp
    created_at TIMESTAMP DEFAULT NOW()
);

-- Hand Details table - Individual hand records (optional, for detailed tracking)
CREATE TABLE hand_details (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    simulation_id UUID NOT NULL REFERENCES simulations(id) ON DELETE CASCADE,
    hand_number INTEGER NOT NULL,
    
    -- Hand Information
    player_cards INTEGER[] NOT NULL, -- Array of card values
    dealer_cards INTEGER[] NOT NULL,
    player_actions VARCHAR(20)[] NOT NULL, -- hit, stand, double, split, surrender
    
    -- Outcome
    outcome VARCHAR(20) NOT NULL, -- win, loss, push, blackjack, bust, surrender
    bet_amount DECIMAL(8,2) NOT NULL,
    win_amount DECIMAL(8,2) NOT NULL,
    
    -- Counting Information (if applicable)
    running_count INTEGER,
    true_count DECIMAL(4,2),
    cards_remaining INTEGER,
    
    -- Strategy Analysis
    optimal_action VARCHAR(20),
    player_action VARCHAR(20),
    is_optimal BOOLEAN,
    ev_loss DECIMAL(6,4),
    
    created_at TIMESTAMP DEFAULT NOW(),
    
    CONSTRAINT valid_hand_number CHECK (hand_number > 0),
    CONSTRAINT valid_bet CHECK (bet_amount > 0)
);

-- Simulation Presets table - Saved configurations
CREATE TABLE simulation_presets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    
    name VARCHAR(100) NOT NULL,
    description TEXT,
    
    -- Configuration
    game_rules JSONB NOT NULL,
    strategy_config JSONB NOT NULL,
    betting_config JSONB NOT NULL,
    simulation_params JSONB NOT NULL,
    
    -- Metadata
    is_public BOOLEAN DEFAULT FALSE,
    is_default BOOLEAN DEFAULT FALSE,
    usage_count INTEGER DEFAULT 0,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    CONSTRAINT unique_user_preset_name UNIQUE (user_id, name)
);
```

---

## Gaming Session Data Models

### Phase 1: Local Gaming Sessions

```typescript
// Local storage for gaming sessions
interface LocalGamingSession {
  sessionId: string;
  startTime: Date;
  endTime?: Date;
  status: 'active' | 'paused' | 'completed' | 'abandoned';
  
  // Session Configuration
  gameMode: 'practice' | 'tutorial' | 'challenge' | 'tournament';
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  gameRules: GameRules;
  
  // Session State
  currentHand: HandState;
  bankroll: number;
  totalWagered: number;
  handsPlayed: number;
  
  // Performance Tracking
  decisions: GameDecision[];
  mistakes: MistakeRecord[];
  achievements: Achievement[];
  
  // Session Summary
  finalStats: SessionStatistics;
}

interface GameDecision {
  handNumber: number;
  playerCards: Card[];
  dealerUpCard: Card;
  optimalAction: PlayerAction;
  playerAction: PlayerAction;
  isCorrect: boolean;
  timeTaken: number; // milliseconds
  hint?: string;
}

interface MistakeRecord {
  handNumber: number;
  mistakeType: 'basic_strategy' | 'counting' | 'betting' | 'timing';
  severity: 'minor' | 'major' | 'critical';
  explanation: string;
  correction: string;
}

interface SessionStatistics {
  duration: number; // milliseconds
  handsPlayed: number;
  accuracy: number;
  avgDecisionTime: number;
  mistakeCount: number;
  improvementAreas: string[];
  skillAssessment: SkillLevel;
}
```

### Phase 2+: Backend Gaming Sessions

```sql
-- Gaming Sessions table
CREATE TABLE gaming_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Session Information
    session_type VARCHAR(20) NOT NULL, -- practice, tutorial, challenge, tournament
    difficulty VARCHAR(20) NOT NULL,
    game_mode VARCHAR(20) NOT NULL,
    
    -- Configuration
    game_rules JSONB NOT NULL,
    starting_bankroll DECIMAL(10,2) NOT NULL,
    
    -- Session State
    status VARCHAR(20) DEFAULT 'active', -- active, paused, completed, abandoned
    current_bankroll DECIMAL(10,2),
    hands_played INTEGER DEFAULT 0,
    total_wagered DECIMAL(12,2) DEFAULT 0,
    
    -- Timestamps
    started_at TIMESTAMP DEFAULT NOW(),
    last_activity_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP,
    
    -- Session Duration
    total_duration INTERVAL DEFAULT '0 seconds',
    active_duration INTERVAL DEFAULT '0 seconds',
    
    CONSTRAINT valid_session_type CHECK (session_type IN ('practice', 'tutorial', 'challenge', 'tournament')),
    CONSTRAINT valid_difficulty CHECK (difficulty IN ('beginner', 'intermediate', 'advanced', 'expert'))
);

-- Game Hands table - Individual hands within sessions
CREATE TABLE game_hands (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES gaming_sessions(id) ON DELETE CASCADE,
    hand_number INTEGER NOT NULL,
    
    -- Hand Details
    player_cards INTEGER[] NOT NULL,
    dealer_cards INTEGER[] NOT NULL,
    bet_amount DECIMAL(8,2) NOT NULL,
    
    -- Player Decision
    optimal_action VARCHAR(20) NOT NULL,
    player_action VARCHAR(20) NOT NULL,
    is_optimal BOOLEAN NOT NULL,
    decision_time INTEGER, -- milliseconds
    
    -- Hand Outcome
    outcome VARCHAR(20) NOT NULL,
    payout DECIMAL(8,2) NOT NULL,
    
    -- Context Information
    running_count INTEGER,
    true_count DECIMAL(4,2),
    bankroll_before DECIMAL(10,2),
    bankroll_after DECIMAL(10,2),
    
    -- Hints and Coaching
    hint_requested BOOLEAN DEFAULT FALSE,
    hint_text TEXT,
    explanation TEXT,
    
    created_at TIMESTAMP DEFAULT NOW(),
    
    CONSTRAINT positive_hand_number CHECK (hand_number > 0),
    CONSTRAINT positive_bet CHECK (bet_amount > 0)
);

-- Player Mistakes table - Track learning opportunities
CREATE TABLE player_mistakes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    session_id UUID REFERENCES gaming_sessions(id) ON DELETE CASCADE,
    hand_id UUID REFERENCES game_hands(id) ON DELETE CASCADE,
    
    -- Mistake Classification
    mistake_type VARCHAR(30) NOT NULL, -- basic_strategy, counting, betting, timing
    mistake_category VARCHAR(50), -- specific category within type
    severity VARCHAR(10) NOT NULL, -- minor, major, critical
    
    -- Context
    game_situation JSONB NOT NULL, -- cards, count, etc.
    player_action VARCHAR(20) NOT NULL,
    optimal_action VARCHAR(20) NOT NULL,
    
    -- Educational Content
    explanation TEXT NOT NULL,
    correction_advice TEXT NOT NULL,
    practice_recommendations TEXT[],
    
    -- Learning Progress
    is_repeated BOOLEAN DEFAULT FALSE,
    times_repeated INTEGER DEFAULT 0,
    last_occurrence TIMESTAMP DEFAULT NOW(),
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT NOW(),
    
    CONSTRAINT valid_mistake_type CHECK (mistake_type IN ('basic_strategy', 'counting', 'betting', 'timing')),
    CONSTRAINT valid_severity CHECK (severity IN ('minor', 'major', 'critical'))
);

-- Session Achievements table - Track accomplishments
CREATE TABLE session_achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    session_id UUID NOT NULL REFERENCES gaming_sessions(id) ON DELETE CASCADE,
    
    -- Achievement Details
    achievement_type VARCHAR(50) NOT NULL,
    achievement_name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    
    -- Achievement Data
    achievement_data JSONB, -- specific metrics or conditions met
    points_earned INTEGER DEFAULT 0,
    
    -- Timestamps
    earned_at TIMESTAMP DEFAULT NOW(),
    
    CONSTRAINT positive_points CHECK (points_earned >= 0)
);
```

---

## Data Migration Strategy

### Phase 1 to Phase 2 Migration Plan

```typescript
// Migration Strategy Overview
interface MigrationPlan {
  phases: MigrationPhase[];
  rollbackStrategy: RollbackPlan;
  dataValidation: ValidationRules;
  performanceMetrics: MigrationMetrics;
}

interface MigrationPhase {
  name: string;
  description: string;
  estimatedTime: string;
  dependencies: string[];
  tasks: MigrationTask[];
}

// Data Export from Local Storage
class LocalDataExporter {
  async exportUserData(): Promise<ExportedUserData> {
    return {
      preferences: await this.getFromIndexedDB('userPreferences'),
      simulations: await this.getFromIndexedDB('simulations'),
      presets: await this.getFromIndexedDB('presets'),
      sessions: await this.getFromIndexedDB('gamingSessions'),
      metadata: {
        exportedAt: new Date(),
        version: '1.0.0',
        recordCount: await this.getTotalRecords()
      }
    };
  }
  
  async validateExportedData(data: ExportedUserData): Promise<ValidationResult> {
    const validator = new DataValidator();
    return validator.validate(data);
  }
}

// Data Import to Backend
class BackendDataImporter {
  async importUserData(
    userId: string, 
    exportedData: ExportedUserData
  ): Promise<ImportResult> {
    const transaction = await this.database.beginTransaction();
    
    try {
      // Import user preferences
      await this.importUserPreferences(userId, exportedData.preferences);
      
      // Import simulations with batch processing
      await this.importSimulations(userId, exportedData.simulations);
      
      // Import presets
      await this.importPresets(userId, exportedData.presets);
      
      // Import gaming sessions
      await this.importSessions(userId, exportedData.sessions);
      
      await transaction.commit();
      return { success: true, recordsImported: this.getImportedCount() };
      
    } catch (error) {
      await transaction.rollback();
      throw new MigrationError('Import failed', error);
    }
  }
}

// Data Synchronization Strategy
class DataSynchronizer {
  async syncLocalWithCloud(userId: string): Promise<SyncResult> {
    const localData = await this.getLocalData();
    const cloudData = await this.getCloudData(userId);
    
    // Three-way merge: local, cloud, and last sync state
    const conflicts = this.detectConflicts(localData, cloudData);
    
    if (conflicts.length > 0) {
      return this.resolveConflicts(conflicts);
    }
    
    // Apply changes bidirectionally
    await this.applyCloudChangesToLocal(cloudData);
    await this.applyLocalChangesToCloud(localData, userId);
    
    return { success: true, conflicts: 0 };
  }
}
```

### Migration Phases

```typescript
const migrationPhases: MigrationPhase[] = [
  {
    name: 'Phase 1: Data Export and Validation',
    description: 'Export all local data and validate integrity',
    estimatedTime: '2-4 weeks',
    dependencies: [],
    tasks: [
      'Create data export utilities',
      'Implement validation rules',
      'Test export on sample data',
      'Create migration UI for users'
    ]
  },
  {
    name: 'Phase 2: Backend Infrastructure',
    description: 'Set up backend database and APIs',
    estimatedTime: '4-6 weeks',
    dependencies: ['Phase 1'],
    tasks: [
      'Deploy database infrastructure',
      'Implement user authentication',
      'Create data import APIs',
      'Set up monitoring and backups'
    ]
  },
  {
    name: 'Phase 3: Gradual Migration',
    description: 'Migrate users in batches with fallback',
    estimatedTime: '6-8 weeks',
    dependencies: ['Phase 1', 'Phase 2'],
    tasks: [
      'Implement hybrid mode (local + cloud)',
      'Migrate power users first',
      'Monitor performance and issues',
      'Gradually migrate all users'
    ]
  },
  {
    name: 'Phase 4: Local Storage Deprecation',
    description: 'Phase out local storage dependency',
    estimatedTime: '2-3 weeks',
    dependencies: ['Phase 3'],
    tasks: [
      'Remove local storage fallbacks',
      'Update UI for cloud-only mode',
      'Clean up legacy code',
      'Archive migration tools'
    ]
  }
];
```

---

## Phase 1: Local Storage Schema

### IndexedDB Implementation

```typescript
// IndexedDB Schema Definition
const DB_NAME = 'BlackjackSimulatorDB';
const DB_VERSION = 1;

interface DatabaseSchema {
  users: {
    key: string; // userId
    value: LocalUserData;
    indexes: {
      lastActiveAt: Date;
      createdAt: Date;
    };
  };
  
  simulations: {
    key: string; // simulationId
    value: LocalSimulation;
    indexes: {
      userId: string;
      createdAt: Date;
      isFavorite: boolean;
      tags: string[];
    };
  };
  
  handDetails: {
    key: [string, number]; // [simulationId, handNumber]
    value: HandDetail;
    indexes: {
      simulationId: string;
      handNumber: number;
      outcome: string;
    };
  };
  
  presets: {
    key: string; // presetId
    value: SimulationPreset;
    indexes: {
      userId: string;
      isDefault: boolean;
      name: string;
    };
  };
  
  gamingSessions: {
    key: string; // sessionId
    value: LocalGamingSession;
    indexes: {
      userId: string;
      status: string;
      startTime: Date;
    };
  };
}

// Database initialization and upgrade handling
class LocalDatabase {
  private db: IDBDatabase | null = null;
  
  async initialize(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        this.createObjectStores(db);
      };
    });
  }
  
  private createObjectStores(db: IDBDatabase): void {
    // Users store
    if (!db.objectStoreNames.contains('users')) {
      const userStore = db.createObjectStore('users', { keyPath: 'userId' });
      userStore.createIndex('lastActiveAt', 'lastActiveAt');
      userStore.createIndex('createdAt', 'createdAt');
    }
    
    // Simulations store
    if (!db.objectStoreNames.contains('simulations')) {
      const simStore = db.createObjectStore('simulations', { keyPath: 'id' });
      simStore.createIndex('userId', 'userId');
      simStore.createIndex('createdAt', 'createdAt');
      simStore.createIndex('isFavorite', 'isFavorite');
      simStore.createIndex('tags', 'tags', { multiEntry: true });
    }
    
    // Hand details store (for optional detailed tracking)
    if (!db.objectStoreNames.contains('handDetails')) {
      const handStore = db.createObjectStore('handDetails', { 
        keyPath: ['simulationId', 'handNumber'] 
      });
      handStore.createIndex('simulationId', 'simulationId');
      handStore.createIndex('outcome', 'outcome');
    }
    
    // Additional stores...
  }
}
```

### Local Storage Optimization

```typescript
// Storage quota management
class StorageManager {
  async checkStorageQuota(): Promise<StorageQuotaInfo> {
    const estimate = await navigator.storage.estimate();
    return {
      used: estimate.usage || 0,
      available: estimate.quota || 0,
      percentage: ((estimate.usage || 0) / (estimate.quota || 1)) * 100
    };
  }
  
  async cleanupOldData(): Promise<CleanupResult> {
    const quotaInfo = await this.checkStorageQuota();
    
    if (quotaInfo.percentage > 80) {
      // Remove old simulation details (keep summaries)
      await this.removeOldHandDetails();
      
      // Remove old temporary sessions
      await this.removeAbandonedSessions();
      
      // Compress old simulation results
      await this.compressOldResults();
    }
    
    return this.getCleanupSummary();
  }
  
  async compressSimulationData(simulation: LocalSimulation): Promise<CompressedSimulation> {
    // Remove detailed hand data, keep statistical summaries
    const compressed: CompressedSimulation = {
      ...simulation,
      handDetails: undefined, // Remove to save space
      compressedAt: new Date(),
      originalSize: this.calculateSize(simulation)
    };
    
    return compressed;
  }
}
```

---

## Phase 2+: Backend Database Schema

### PostgreSQL Schema with Advanced Features

```sql
-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- For text search
CREATE EXTENSION IF NOT EXISTS "btree_gin"; -- For JSONB indexing

-- Create custom types
CREATE TYPE user_status AS ENUM ('active', 'suspended', 'deleted');
CREATE TYPE account_type AS ENUM ('free', 'premium', 'professional');
CREATE TYPE simulation_status AS ENUM ('running', 'completed', 'failed', 'cancelled');
CREATE TYPE session_status AS ENUM ('active', 'paused', 'completed', 'abandoned');

-- Subscriptions table
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_name VARCHAR(50) NOT NULL,
    price_monthly DECIMAL(8,2),
    price_yearly DECIMAL(8,2),
    features JSONB NOT NULL,
    limits JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Users table (enhanced version)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    
    -- Profile
    display_name VARCHAR(100),
    avatar_url TEXT,
    bio TEXT CHECK (length(bio) <= 500),
    location VARCHAR(100),
    website VARCHAR(255),
    
    -- Account
    status user_status DEFAULT 'active',
    account_type account_type DEFAULT 'free',
    subscription_id UUID REFERENCES subscriptions(id),
    email_verified BOOLEAN DEFAULT FALSE,
    
    -- Security
    failed_login_attempts INTEGER DEFAULT 0,
    locked_until TIMESTAMP NULL,
    password_reset_token VARCHAR(255),
    password_reset_expires TIMESTAMP,
    
    -- Activity
    last_login_at TIMESTAMP,
    last_activity_at TIMESTAMP,
    login_count INTEGER DEFAULT 0,
    
    -- Preferences (denormalized for performance)
    preferences JSONB DEFAULT '{}'::jsonb,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    -- Full-text search
    search_vector tsvector GENERATED ALWAYS AS (
        to_tsvector('english', coalesce(display_name, '') || ' ' || coalesce(username, '') || ' ' || coalesce(bio, ''))
    ) STORED,
    
    CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    CONSTRAINT valid_username CHECK (username ~* '^[a-zA-Z0-9_]{3,50}$')
);

-- Improved simulations table with partitioning
CREATE TABLE simulations (
    id UUID DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Basic info
    name VARCHAR(255),
    description TEXT,
    status simulation_status DEFAULT 'completed',
    
    -- Configuration (with validation)
    config JSONB NOT NULL CHECK (
        config ? 'gameRules' AND 
        config ? 'strategy' AND 
        config ? 'betting' AND 
        config ? 'simulation'
    ),
    
    -- Results summary (for fast queries)
    total_hands INTEGER NOT NULL CHECK (total_hands > 0),
    total_wagered DECIMAL(15,2) NOT NULL CHECK (total_wagered > 0),
    total_won DECIMAL(15,2) NOT NULL,
    net_result DECIMAL(15,2) NOT NULL,
    win_rate DECIMAL(7,6) NOT NULL CHECK (win_rate BETWEEN 0 AND 1),
    house_edge DECIMAL(7,6),
    
    -- Performance
    simulation_duration INTEGER, -- milliseconds
    hands_per_second DECIMAL(8,2),
    memory_used BIGINT, -- bytes
    
    -- Metadata
    engine_version VARCHAR(20) NOT NULL,
    random_seed BIGINT,
    tags TEXT[] DEFAULT '{}',
    
    -- Social features
    is_public BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    view_count INTEGER DEFAULT 0,
    like_count INTEGER DEFAULT 0,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP,
    
    PRIMARY KEY (id, created_at)
) PARTITION BY RANGE (created_at);

-- Create monthly partitions for simulations
CREATE TABLE simulations_2025_01 PARTITION OF simulations
    FOR VALUES FROM ('2025-01-01') TO ('2025-02-01');

-- Advanced indexing strategy
CREATE INDEX CONCURRENTLY idx_users_email_verified 
    ON users(email) WHERE email_verified = true;

CREATE INDEX CONCURRENTLY idx_users_search 
    ON users USING gin(search_vector);

CREATE INDEX CONCURRENTLY idx_simulations_user_created 
    ON simulations(user_id, created_at DESC);

CREATE INDEX CONCURRENTLY idx_simulations_public_featured 
    ON simulations(is_public, is_featured, created_at DESC) 
    WHERE is_public = true;

CREATE INDEX CONCURRENTLY idx_simulations_config_gin 
    ON simulations USING gin(config);

CREATE INDEX CONCURRENTLY idx_simulations_tags_gin 
    ON simulations USING gin(tags);

-- Triggers for automatic timestamp updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_simulations_updated_at 
    BEFORE UPDATE ON simulations 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### Database Performance Optimization

```sql
-- Materialized views for analytics
CREATE MATERIALIZED VIEW user_stats_summary AS
SELECT 
    u.id,
    u.username,
    u.created_at,
    COUNT(s.id) as total_simulations,
    COALESCE(SUM(s.total_hands), 0) as total_hands_played,
    COALESCE(AVG(s.win_rate), 0) as avg_win_rate,
    COALESCE(SUM(s.net_result), 0) as total_net_result,
    MAX(s.created_at) as last_simulation_at
FROM users u
LEFT JOIN simulations s ON u.id = s.user_id
GROUP BY u.id, u.username, u.created_at;

CREATE UNIQUE INDEX ON user_stats_summary (id);

-- Refresh materialized view periodically
CREATE OR REPLACE FUNCTION refresh_user_stats()
RETURNS void AS $$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY user_stats_summary;
END;
$$ LANGUAGE plpgsql;

-- Function to calculate advanced statistics
CREATE OR REPLACE FUNCTION calculate_simulation_stats(sim_id UUID)
RETURNS JSONB AS $$
DECLARE
    result JSONB;
BEGIN
    SELECT jsonb_build_object(
        'sharpe_ratio', calculate_sharpe_ratio(sim_id),
        'max_drawdown', calculate_max_drawdown(sim_id),
        'kelly_criterion', calculate_kelly_bet(sim_id),
        'confidence_interval', calculate_confidence_interval(sim_id)
    ) INTO result;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Partitioning maintenance function
CREATE OR REPLACE FUNCTION create_monthly_partition(table_name TEXT, year INTEGER, month INTEGER)
RETURNS void AS $$
DECLARE
    partition_name TEXT;
    start_date DATE;
    end_date DATE;
BEGIN
    partition_name := table_name || '_' || year || '_' || lpad(month::TEXT, 2, '0');
    start_date := make_date(year, month, 1);
    end_date := start_date + INTERVAL '1 month';
    
    EXECUTE format('CREATE TABLE %I PARTITION OF %I FOR VALUES FROM (%L) TO (%L)',
                  partition_name, table_name, start_date, end_date);
END;
$$ LANGUAGE plpgsql;
```

---

## Performance Optimization

### Database Performance Strategies

```sql
-- Connection pooling configuration
-- (Configured at application level)
/*
Pool Configuration:
- Max connections: 20-50 (based on server capacity)
- Min connections: 5
- Connection timeout: 30 seconds
- Idle timeout: 10 minutes
- Validation query: SELECT 1
*/

-- Query optimization techniques
EXPLAIN (ANALYZE, BUFFERS) 
SELECT s.*, u.username 
FROM simulations s 
JOIN users u ON s.user_id = u.id 
WHERE s.created_at >= NOW() - INTERVAL '30 days'
AND s.is_public = true 
ORDER BY s.like_count DESC, s.created_at DESC 
LIMIT 50;

-- Composite indexes for common query patterns
CREATE INDEX CONCURRENTLY idx_simulations_user_public_created 
    ON simulations(user_id, is_public, created_at DESC) 
    WHERE is_public = true;

-- Partial indexes for specific use cases
CREATE INDEX CONCURRENTLY idx_simulations_featured 
    ON simulations(created_at DESC) 
    WHERE is_featured = true AND is_public = true;

-- Database maintenance procedures
CREATE OR REPLACE FUNCTION maintenance_cleanup()
RETURNS void AS $$
BEGIN
    -- Remove old anonymous sessions
    DELETE FROM gaming_sessions 
    WHERE status = 'abandoned' 
    AND last_activity_at < NOW() - INTERVAL '7 days';
    
    -- Compress old hand details
    UPDATE simulations 
    SET config = config || '{"compressed": true}'::jsonb
    WHERE created_at < NOW() - INTERVAL '1 year'
    AND NOT (config ? 'compressed');
    
    -- Update statistics
    ANALYZE;
    
    -- Refresh materialized views
    REFRESH MATERIALIZED VIEW CONCURRENTLY user_stats_summary;
END;
$$ LANGUAGE plpgsql;

-- Automated vacuum and analyze
CREATE OR REPLACE FUNCTION auto_maintenance()
RETURNS void AS $$
BEGIN
    -- Vacuum frequently updated tables
    VACUUM ANALYZE users;
    VACUUM ANALYZE simulations;
    VACUUM ANALYZE gaming_sessions;
    
    -- Reindex if needed (check for bloat first)
    IF (SELECT schemaname FROM pg_stat_user_tables WHERE relname = 'simulations' AND n_dead_tup > 10000) IS NOT NULL THEN
        REINDEX TABLE simulations;
    END IF;
END;
$$ LANGUAGE plpgsql;
```

### Application-Level Caching

```typescript
// Multi-level caching strategy
interface CacheStrategy {
  l1: MemoryCache;    // Application memory
  l2: RedisCache;     // Distributed cache
  l3: DatabaseCache;  // Database query cache
}

class SimulationDataCache {
  private memoryCache = new Map<string, CachedData>();
  private redisClient: RedisClient;
  
  async getSimulation(id: string): Promise<SimulationData | null> {
    // L1: Check memory cache
    if (this.memoryCache.has(id)) {
      return this.memoryCache.get(id)!.data;
    }
    
    // L2: Check Redis cache
    const cached = await this.redisClient.get(`simulation:${id}`);
    if (cached) {
      const data = JSON.parse(cached);
      this.memoryCache.set(id, { data, timestamp: Date.now() });
      return data;
    }
    
    // L3: Query database
    const data = await this.database.getSimulation(id);
    if (data) {
      // Cache in Redis for 1 hour
      await this.redisClient.setex(`simulation:${id}`, 3600, JSON.stringify(data));
      
      // Cache in memory for 5 minutes
      this.memoryCache.set(id, { data, timestamp: Date.now() });
    }
    
    return data;
  }
  
  // Cache invalidation strategy
  async invalidateSimulation(id: string): Promise<void> {
    this.memoryCache.delete(id);
    await this.redisClient.del(`simulation:${id}`);
    
    // Also invalidate related caches
    await this.redisClient.del(`user:simulations:${data.userId}`);
  }
}
```

---

## Data Privacy and Security

### Data Protection Implementation

```typescript
// Data encryption at rest
class DataEncryption {
  private encryptionKey: string;
  
  constructor(key: string) {
    this.encryptionKey = key;
  }
  
  async encryptSensitiveData(data: SensitiveData): Promise<EncryptedData> {
    const algorithm = 'aes-256-gcm';
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipher(algorithm, this.encryptionKey);
    
    let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    return {
      data: encrypted,
      iv: iv.toString('hex'),
      tag: cipher.getAuthTag().toString('hex'),
      algorithm
    };
  }
  
  async decryptSensitiveData(encrypted: EncryptedData): Promise<SensitiveData> {
    const decipher = crypto.createDecipher(encrypted.algorithm, this.encryptionKey);
    decipher.setAuthTag(Buffer.from(encrypted.tag, 'hex'));
    
    let decrypted = decipher.update(encrypted.data, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return JSON.parse(decrypted);
  }
}

// Data anonymization for analytics
class DataAnonymizer {
  anonymizeUserData(userData: UserData): AnonymizedUserData {
    return {
      // Remove direct identifiers
      userId: this.hashUserId(userData.userId),
      email: undefined,
      username: undefined,
      
      // Generalize demographic data
      location: this.generalizeLocation(userData.location),
      registrationDate: this.roundToWeek(userData.createdAt),
      
      // Keep relevant metrics
      totalSimulations: userData.totalSimulations,
      averageWinRate: userData.averageWinRate,
      preferredStrategies: userData.preferredStrategies,
      
      // Add noise to sensitive metrics
      averageSessionLength: this.addNoise(userData.averageSessionLength, 0.1),
      totalTimeSpent: this.addNoise(userData.totalTimeSpent, 0.1)
    };
  }
  
  private hashUserId(userId: string): string {
    return crypto.createHash('sha256').update(userId + 'salt').digest('hex').substring(0, 16);
  }
  
  private generalizeLocation(location?: string): string | undefined {
    if (!location) return undefined;
    
    // Generalize to country/region level only
    const country = this.extractCountry(location);
    return country;
  }
  
  private addNoise(value: number, factor: number): number {
    const noise = (Math.random() - 0.5) * 2 * factor * value;
    return Math.max(0, value + noise);
  }
}
```

### Privacy Compliance

```sql
-- GDPR compliance features
CREATE TABLE data_processing_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    processing_type VARCHAR(50) NOT NULL, -- collection, processing, sharing, deletion
    purpose VARCHAR(100) NOT NULL,
    legal_basis VARCHAR(50) NOT NULL, -- consent, contract, legitimate_interest, etc.
    data_types TEXT[] NOT NULL,
    processed_at TIMESTAMP DEFAULT NOW(),
    processed_by VARCHAR(100), -- system component or user
    retention_period INTERVAL,
    notes TEXT
);

-- Data retention policies
CREATE OR REPLACE FUNCTION apply_data_retention_policy()
RETURNS void AS $$
BEGIN
    -- Delete old anonymized analytics data (5 years)
    DELETE FROM user_analytics 
    WHERE created_at < NOW() - INTERVAL '5 years'
    AND is_anonymized = true;
    
    -- Archive old user sessions (2 years for active users, 1 year for inactive)
    DELETE FROM gaming_sessions 
    WHERE completed_at < NOW() - INTERVAL '2 years'
    AND user_id IN (
        SELECT id FROM users 
        WHERE last_activity_at > NOW() - INTERVAL '1 year'
    );
    
    DELETE FROM gaming_sessions 
    WHERE completed_at < NOW() - INTERVAL '1 year'
    AND user_id IN (
        SELECT id FROM users 
        WHERE last_activity_at <= NOW() - INTERVAL '1 year'
    );
    
    -- Log retention activities
    INSERT INTO data_processing_logs (
        processing_type, purpose, legal_basis, data_types, processed_by
    ) VALUES (
        'deletion', 'data_retention_policy', 'legitimate_interest', 
        ARRAY['session_data', 'analytics_data'], 'automated_system'
    );
END;
$$ LANGUAGE plpgsql;

-- User data export for GDPR requests
CREATE OR REPLACE FUNCTION export_user_data(target_user_id UUID)
RETURNS JSONB AS $$
DECLARE
    user_export JSONB;
BEGIN
    SELECT jsonb_build_object(
        'user_profile', (
            SELECT row_to_json(u) FROM users u WHERE id = target_user_id
        ),
        'preferences', (
            SELECT row_to_json(p) FROM user_preferences p WHERE user_id = target_user_id
        ),
        'simulations', (
            SELECT jsonb_agg(row_to_json(s)) FROM simulations s WHERE user_id = target_user_id
        ),
        'gaming_sessions', (
            SELECT jsonb_agg(row_to_json(gs)) FROM gaming_sessions gs WHERE user_id = target_user_id
        ),
        'achievements', (
            SELECT jsonb_agg(row_to_json(a)) FROM session_achievements a WHERE user_id = target_user_id
        ),
        'export_timestamp', NOW(),
        'export_version', '1.0'
    ) INTO user_export;
    
    -- Log the export
    INSERT INTO data_processing_logs (
        user_id, processing_type, purpose, legal_basis, data_types, processed_by
    ) VALUES (
        target_user_id, 'export', 'gdpr_request', 'legal_obligation', 
        ARRAY['all_user_data'], 'data_protection_officer'
    );
    
    RETURN user_export;
END;
$$ LANGUAGE plpgsql;

-- User data deletion for right to be forgotten
CREATE OR REPLACE FUNCTION delete_user_data(target_user_id UUID, anonymize_only BOOLEAN DEFAULT false)
RETURNS void AS $$
BEGIN
    IF anonymize_only THEN
        -- Anonymize instead of delete (for statistical integrity)
        UPDATE users SET 
            email = 'deleted_' || id::text || '@example.com',
            username = 'deleted_user_' || id::text,
            display_name = 'Deleted User',
            bio = NULL,
            avatar_url = NULL,
            location = NULL,
            website = NULL
        WHERE id = target_user_id;
        
        -- Mark simulations as anonymized
        UPDATE simulations SET 
            name = 'Anonymized Simulation',
            description = NULL,
            is_public = false
        WHERE user_id = target_user_id;
        
    ELSE
        -- Complete deletion
        DELETE FROM users WHERE id = target_user_id;
        -- Related data will be cascade deleted
    END IF;
    
    -- Log the deletion/anonymization
    INSERT INTO data_processing_logs (
        user_id, processing_type, purpose, legal_basis, data_types, processed_by
    ) VALUES (
        target_user_id, 
        CASE WHEN anonymize_only THEN 'anonymization' ELSE 'deletion' END,
        'gdpr_request', 'legal_obligation', 
        ARRAY['all_user_data'], 'data_protection_officer'
    );
END;
$$ LANGUAGE plpgsql;
```

---

## Conclusion

This database schema planning document provides a comprehensive foundation for both the current Phase 1 local storage requirements and future backend database needs. The design emphasizes:

1. **Scalability**: Partitioned tables and optimized indexing for growth
2. **Performance**: Strategic caching and query optimization
3. **Privacy**: GDPR compliance and data protection by design
4. **Flexibility**: JSONB for evolving configuration needs
5. **Migration Path**: Clear strategy for moving from local to cloud storage

The schema will be iteratively refined as development progresses and new requirements emerge.

---

**Document Status**: Living document - updated as schema evolves  
**Next Review Date**: Monthly during development phases  
**Owner**: Database Architecture Team  
**Contributors**: Development Team, Data Protection Officer