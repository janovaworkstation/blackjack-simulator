// Web Worker for Blackjack Simulation
// This allows simulation to run in a separate thread without blocking the UI

self.addEventListener('message', async (event) => {
  const { type, id } = event.data;

  if (type === 'SIMULATE') {
    try {
      // Import the BlackjackSimulation class
      // Note: This is a simplified approach. In a real implementation,
      // you'd need to copy the BlackjackEngine code or use a different import strategy

      // For now, we'll send a message back indicating we need the main thread
      self.postMessage({
        type: 'WORKER_NOT_IMPLEMENTED',
        id,
        message: 'Web Worker implementation requires engine refactoring',
      });
    } catch (error) {
      self.postMessage({
        type: 'ERROR',
        id,
        error: error.message,
      });
    }
  }
});

// Send ready message
self.postMessage({ type: 'READY' });
