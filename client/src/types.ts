type Fields = 'email' | 'number';

export interface Email {
  email: string;
  number: string;
}

export interface ApiData {
  message?: string;
  data?: Email[],
  errors?: Record<Fields, ValidationError>
}

export interface ValidationError {
  msg: string;
  path: string;
  value: string;
}
