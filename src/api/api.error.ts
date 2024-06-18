import { ValidationError } from 'express-validator';

export class ApiError extends Error {
  status;
  errors;

  constructor(status: number, message?: string, errors?: Record<string, ValidationError>) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static BadRequest(message?: string, errors?: Record<string, ValidationError>) {
    return new ApiError(400, message, errors);
  }

  static NotFound(message?: string) {
    return new ApiError(404, message);
  }
}
