/**
 * Application monitoring and error tracking utilities
 */

// Types for monitoring configuration
interface MonitoringConfig {
  enableAnalytics: boolean;
  enableErrorTracking: boolean;
  enablePerformanceMonitoring: boolean;
  environment: string;
}

// Performance monitoring utilities
export const performanceMonitor = {
  /**
   * Mark the start of a performance measurement
   */
  markStart: (name: string): void => {
    if (typeof performance !== 'undefined' && performance.mark) {
      performance.mark(`${name}-start`);
    }
  },

  /**
   * Mark the end of a performance measurement and calculate duration
   */
  markEnd: (name: string): number | null => {
    if (
      typeof performance !== 'undefined' &&
      performance.mark &&
      performance.measure
    ) {
      performance.mark(`${name}-end`);
      try {
        performance.measure(name, `${name}-start`, `${name}-end`);
        const measure = performance.getEntriesByName(name)[0];
        return measure?.duration || null;
      } catch (error) {
        console.warn('Performance measurement failed:', error);
        return null;
      }
    }
    return null;
  },

  /**
   * Get web vitals and performance metrics
   */
  getWebVitals: (): Record<string, number> => {
    const vitals: Record<string, number> = {};

    if (typeof performance !== 'undefined') {
      const navigation = performance.getEntriesByType(
        'navigation',
      )[0] as PerformanceNavigationTiming;
      if (navigation) {
        vitals.loadTime = navigation.loadEventEnd - navigation.loadEventStart;
        vitals.domContentLoaded =
          navigation.domContentLoadedEventEnd -
          navigation.domContentLoadedEventStart;
        vitals.firstByte = navigation.responseStart - navigation.requestStart;
      }
    }

    return vitals;
  },
};

// Error tracking utilities
export const errorTracker = {
  /**
   * Log an error with context
   */
  logError: (error: Error, context?: Record<string, unknown>): void => {
    console.error('Application Error:', error);
    if (context) {
      console.error('Error Context:', context);
    }

    // In production, send to error tracking service
    if (import.meta.env.VITE_ENABLE_ERROR_TRACKING === 'true') {
      // Send to Sentry or other error tracking service
      // This would be implemented based on the chosen service
    }
  },

  /**
   * Log a warning with context
   */
  logWarning: (message: string, context?: Record<string, unknown>): void => {
    console.warn('Application Warning:', message);
    if (context) {
      console.warn('Warning Context:', context);
    }
  },

  /**
   * Set user context for error tracking
   */
  setUserContext: (
    userId: string,
    userData?: Record<string, unknown>,
  ): void => {
    // This would set user context in the error tracking service
    console.debug('User context set:', { userId, userData });
  },
};

// Analytics utilities
export const analytics = {
  /**
   * Track a custom event
   */
  trackEvent: (
    eventName: string,
    properties?: Record<string, unknown>,
  ): void => {
    if (import.meta.env.VITE_ENABLE_ANALYTICS === 'true') {
      console.debug('Analytics Event:', eventName, properties);

      // Send to analytics service (Google Analytics, Mixpanel, etc.)
      // This would be implemented based on the chosen service
    }
  },

  /**
   * Track page view
   */
  trackPageView: (pageName: string): void => {
    if (import.meta.env.VITE_ENABLE_ANALYTICS === 'true') {
      console.debug('Page View:', pageName);

      // Send page view to analytics service
    }
  },

  /**
   * Track user action
   */
  trackUserAction: (action: string, category: string, label?: string): void => {
    if (import.meta.env.VITE_ENABLE_ANALYTICS === 'true') {
      console.debug('User Action:', { action, category, label });

      // Send user action to analytics service
    }
  },
};

// Health check utilities
export const healthMonitor = {
  /**
   * Check application health status
   */
  checkHealth: (): {
    status: 'healthy' | 'degraded' | 'unhealthy';
    details: Record<string, unknown>;
  } => {
    const health = {
      status: 'healthy' as const,
      details: {
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        online: navigator.onLine,
        memory: (
          performance as unknown as {
            memory?: {
              usedJSHeapSize: number;
              totalJSHeapSize: number;
              jsHeapSizeLimit: number;
            };
          }
        )?.memory
          ? {
              used: (
                performance as unknown as { memory: { usedJSHeapSize: number } }
              ).memory.usedJSHeapSize,
              total: (
                performance as unknown as {
                  memory: { totalJSHeapSize: number };
                }
              ).memory.totalJSHeapSize,
              limit: (
                performance as unknown as {
                  memory: { jsHeapSizeLimit: number };
                }
              ).memory.jsHeapSizeLimit,
            }
          : null,
      },
    };

    // Check if we're online
    if (!navigator.onLine) {
      health.status = 'degraded';
      health.details.reason = 'offline';
    }

    // Check memory usage if available
    const perfWithMemory = performance as unknown as {
      memory?: { usedJSHeapSize: number; jsHeapSizeLimit: number };
    };
    if (perfWithMemory?.memory) {
      const memoryUsage =
        perfWithMemory.memory.usedJSHeapSize /
        perfWithMemory.memory.jsHeapSizeLimit;
      if (memoryUsage > 0.9) {
        health.status = 'degraded';
        health.details.memoryPressure = 'high';
      }
    }

    return health;
  },

  /**
   * Report health status to monitoring service
   */
  reportHealth: (): void => {
    const health = healthMonitor.checkHealth();
    console.debug('Health Status:', health);

    // In production, send to monitoring service
    if (import.meta.env.VITE_ENABLE_PERFORMANCE_MONITORING === 'true') {
      // Send health data to monitoring service
    }
  },
};

// Initialize monitoring based on environment configuration
export const initializeMonitoring = (): void => {
  const config: MonitoringConfig = {
    enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    enableErrorTracking: import.meta.env.VITE_ENABLE_ERROR_TRACKING === 'true',
    enablePerformanceMonitoring:
      import.meta.env.VITE_ENABLE_PERFORMANCE_MONITORING === 'true',
    environment: import.meta.env.VITE_APP_ENV || 'development',
  };

  console.log('Monitoring initialized:', config);

  // Set up global error handling
  if (config.enableErrorTracking) {
    window.addEventListener('error', (event) => {
      errorTracker.logError(new Error(event.message), {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      });
    });

    window.addEventListener('unhandledrejection', (event) => {
      errorTracker.logError(new Error('Unhandled Promise Rejection'), {
        reason: event.reason,
      });
    });
  }

  // Set up periodic health monitoring
  if (config.enablePerformanceMonitoring) {
    setInterval(() => {
      healthMonitor.reportHealth();
    }, 300000); // Every 5 minutes
  }

  // Track initial page load
  if (config.enableAnalytics) {
    analytics.trackPageView('application-start');
  }
};
