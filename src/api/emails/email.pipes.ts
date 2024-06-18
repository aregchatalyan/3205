import { Schema } from 'express-validator';

export const getEmail: Schema = {
  email: {
    in: 'query',
    trim: true,
    escape: true,
    isEmail: {
      errorMessage: 'Please enter a valid email address',
    }
  },
  number: {
    in: 'query',
    trim: true,
    escape: true,
    optional: {
      options: {
        values: 'falsy'
      }
    },
    isNumeric: {
      errorMessage: 'Please enter a valid numeric value',
    }
  }
}
