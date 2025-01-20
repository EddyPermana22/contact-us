import winston from 'winston';

/**
 * Winston Logger Configuration
 *
 * This creates a logger instance with custom settings for different environments.
 */
const logger = winston.createLogger({
  // Set the default logging level
  level: 'info',

  // Configure the log format
  format: winston.format.combine(
    // Add timestamp to each log
    winston.format.timestamp(),
    // Include stack traces for Error instances
    winston.format.errors({ stack: true }),
    // Allow string interpolation
    winston.format.splat(),
    // Output logs as JSON
    winston.format.json(),
  ),

  // Add default metadata to all logs
  defaultMeta: { service: 'contact-us-service' },

  // Configure log storage
  transports: [
    // Store all error logs in 'error.log'
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    // Store all logs (regardless of level) in 'combined.log'
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

/**
 * Development Environment Logging
 *
 * In non-production environments, add console logging for easier debugging.
 */
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      // Use a simpler format for console logs
      format: winston.format.simple(),
    }),
  );
}

// Export the configured logger
export default logger;
