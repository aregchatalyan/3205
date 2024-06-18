declare namespace Express {
  interface Response {
    success: (status: number, data: any, message?: string) => void;
    failed: (status: number, message: any, errors?: Record<string, ValidationError>) => void;
  }
}
