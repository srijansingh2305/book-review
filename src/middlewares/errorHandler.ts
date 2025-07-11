import { Request, Response, NextFunction } from 'express';

// Global error handling middleware for Express
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(`[ERROR] ${err.name}: ${err.message}`); // Log error to console
  res.status(500).json({
    message: 'Internal Server Error', // Generic response
    error: err.message, // Include actual error message for debugging
  });
};
