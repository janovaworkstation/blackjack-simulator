import React from 'react';
import ReactDOM from 'react-dom/client';
import Bugsnag from '@bugsnag/js';
import App from './App.jsx';
import './index.css';
import { initializeMonitoring } from './utils/monitoring.ts';

// Initialize monitoring and error tracking
initializeMonitoring();

// Create Bugsnag Error Boundary
const ErrorBoundary = Bugsnag.getPlugin('react')?.createErrorBoundary(React) || React.Fragment;

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>,
  );
}
