import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import logger from '../libs/logger';

/**
 * Global Error Handling Middleware
 *
 * This middleware catches and processes errors that occur during request handling.
 * It provides different responses based on the type of error encountered.
 *
 * @param err - The error object
 * @param req - The Express request object
 * @param res - The Express response object
 * @param next - The next middleware function
 */
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  // Handle Zod validation errors
  if (err instanceof ZodError) {
    // Transform Zod errors into a more user-friendly format
    const validationErrors = err.errors.map((error) => ({
      field: error.path.join('.'),
      message: error.message,
    }));

    // Log the validation errors
    logger.warn('Validation failed', { errors: validationErrors });

    // Send a 400 Bad Request response with detailed validation errors
    res.status(400).json({
      error: 'Validation failed',
      details: validationErrors,
    });
  }
  // Handle known errors (instances of Error)
  else if (err instanceof Error) {
    // Log the known error
    logger.error('Known error occurred', { error: err });

    // Send a 400 Bad Request response with error details
    res.status(400).json({
      error: err.name,
      message: err.message,
    });
  }
  // Handle unexpected errors
  else {
    // Log the unexpected error
    logger.error('Unexpected error occurred', { error: err });

    // Send a 500 Internal Server Error response
    res.status(500).json({
      error: 'InternalServerError',
      message: 'An unexpected error occurred',
    });
  }
};
