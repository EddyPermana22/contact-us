import 'dotenv/config';

import { Server } from 'http';
import { app } from './app';

const PORT = process.env.PORT || 4000;

const server: Server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/**
 * Initiates a graceful shutdown of the server.
 * @param {NodeJS.Signals} signal - The signal received to initiate shutdown
 * @returns {void}
 */
function gracefulShutdown(signal: NodeJS.Signals): void {
  console.log(`Received ${signal}. Starting graceful shutdown...`);

  /*
   * Close the server gracefully:
   * 1. Stop accepting new connections
   * 2. Wait for existing connections to finish processing
   * 3. Then execute the callback function
   */
  server.close(() => {
    console.log('HTTP server closed.');
    process.exit(0);
  });

  /*
   * Failsafe mechanism:
   * If the server hasn't shut down within 10 seconds,
   * we force a shutdown to prevent hanging.
   * This ensures the application doesn't remain running indefinitely
   * if there are issues closing some connections.
   */
  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
}

/*
 * Signal Handling:
 * SIGTERM is typically sent by process managers (e.g., Kubernetes) to gracefully stop the process.
 * SIGINT is typically sent by pressing Ctrl+C in the terminal.
 *
 * By attaching our gracefulShutdown function to these signals,
 * we ensure our application can shut down properly in various scenarios,
 * allowing it to clean up resources and close connections gracefully.
 */
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
