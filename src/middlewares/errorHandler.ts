import { Request, Response, NextFunction } from 'express';

// Global error handling middleware for Express
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log the error details to the console for debugging
  console.error(`[ERROR] ${err.name}: ${err.message}`);

  // Send a generic error response to the client
  res.status(500).json({
    message: 'Internal Server Error', // Generic error message
    error: err.message, // Actual error message for debugging purposes
  });
};
