/**
 * Centralized debug logging utility for the Blackjack Strategy Simulator.
 * 
 * Provides environment-based debug gating to eliminate console output in production
 * while maintaining rich debugging capabilities during development.
 * 
 * @author Blackjack Strategy Simulator
 * @license MIT
 */

/**
 * Check if debug mode is enabled via environment variable.
 * Defaults to false if not explicitly enabled.
 * Handles both Vite and Jest test environments.
 */
const isDebugEnabled = (): boolean => {
  // Handle Node.js environments (Jest tests) - disable debug logging in tests
  if (typeof process !== 'undefined' && process.env) {
    if (process.env.NODE_ENV === 'test') {
      return false; // Disable debug logging in tests
    }
    return process.env.VITE_ENABLE_DEBUG_MODE === 'true';
  }
  
  // Handle browser environments - disable for now to avoid import.meta issues
  // In production, this would be replaced with proper Vite build-time variable replacement
  return false;
};

/**
 * Performance timing tracker for debugging slow operations.
 */
class PerformanceTimer {
  private startTime: number;
  private label: string;

  constructor(label: string) {
    this.label = label;
    this.startTime = performance.now();
    if (isDebugEnabled()) {
      console.log(`🕐 [TIMER START] ${label}`);
    }
  }

  end(): number {
    const duration = performance.now() - this.startTime;
    if (isDebugEnabled()) {
      console.log(`⏱️ [TIMER END] ${this.label}: ${duration.toFixed(2)}ms`);
    }
    return duration;
  }
}

/**
 * Debug logging function - only outputs when debug mode is enabled.
 * 
 * @param message - Primary message to log
 * @param optionalParams - Additional parameters to log
 */
export const debugLog = (message: string, ...optionalParams: any[]): void => {
  if (isDebugEnabled()) {
    console.log(`🐛 [DEBUG] ${message}`, ...optionalParams);
  }
};

/**
 * Debug warning function - only outputs when debug mode is enabled.
 * 
 * @param message - Primary warning message to log
 * @param optionalParams - Additional parameters to log
 */
export const debugWarn = (message: string, ...optionalParams: any[]): void => {
  if (isDebugEnabled()) {
    console.warn(`⚠️ [DEBUG WARN] ${message}`, ...optionalParams);
  }
};

/**
 * Debug error function - only outputs when debug mode is enabled.
 * Note: Production errors should still use console.error directly for monitoring.
 * 
 * @param message - Primary error message to log
 * @param optionalParams - Additional parameters to log
 */
export const debugError = (message: string, ...optionalParams: any[]): void => {
  if (isDebugEnabled()) {
    console.error(`❌ [DEBUG ERROR] ${message}`, ...optionalParams);
  }
};

/**
 * Enhanced debug logging with context information.
 * Useful for tracking function calls and state changes.
 * 
 * @param context - Context identifier (e.g., component name, function name)
 * @param message - Message to log
 * @param data - Optional data object to log
 */
export const debugContext = (context: string, message: string, data?: any): void => {
  if (isDebugEnabled()) {
    const logMessage = `🎯 [${context.toUpperCase()}] ${message}`;
    if (data !== undefined) {
      console.log(logMessage, data);
    } else {
      console.log(logMessage);
    }
  }
};

/**
 * Creates a performance timer for debugging slow operations.
 * 
 * @param label - Label to identify the timed operation
 * @returns PerformanceTimer instance with end() method
 * 
 * @example
 * ```typescript
 * const timer = debugTimer('Simulation Run');
 * // ... perform operation
 * timer.end(); // Logs duration if debug enabled
 * ```
 */
export const debugTimer = (label: string): PerformanceTimer => {
  return new PerformanceTimer(label);
};

/**
 * Debug table function - useful for logging structured data.
 * Only outputs when debug mode is enabled.
 * 
 * @param data - Data to display in table format
 * @param label - Optional label for the table
 */
export const debugTable = (data: any, label?: string): void => {
  if (isDebugEnabled()) {
    if (label) {
      console.log(`📊 [DEBUG TABLE] ${label}`);
    }
    console.table(data);
  }
};

/**
 * Utility to check if we're in debug mode (for conditional debug code).
 * 
 * @returns True if debug mode is enabled
 */
export const isDebugMode = (): boolean => {
  return isDebugEnabled();
};

/**
 * Debug group functions for organizing related log messages.
 */
export const debugGroup = {
  start: (label: string): void => {
    if (isDebugEnabled()) {
      console.group(`📂 [DEBUG GROUP] ${label}`);
    }
  },
  
  end: (): void => {
    if (isDebugEnabled()) {
      console.groupEnd();
    }
  },
  
  collapsed: (label: string): void => {
    if (isDebugEnabled()) {
      console.groupCollapsed(`📁 [DEBUG GROUP] ${label}`);
    }
  }
};

/**
 * Type definitions for debug context tracking.
 */
export type DebugContext = 
  | 'SIMULATION' 
  | 'GAME' 
  | 'UI' 
  | 'ENGINE' 
  | 'CARDS' 
  | 'BETTING' 
  | 'STRATEGY'
  | 'EXPORT';