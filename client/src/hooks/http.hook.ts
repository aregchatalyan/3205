import { useState, useCallback } from 'react';

export interface ValidationError {
  msg: string;
  path: string;
  value: string;
}

export interface ApiData {
  message?: string;
  data?: any;
  errors?: Record<'email' | 'number', ValidationError>;
}

export const useHttp = () => {
  const [ loading, setLoading ] = useState<boolean>(false);

  const request = useCallback(async (url: string, init: RequestInit = {}) => {
    setLoading(true);

    if (init.body) {
      init.body = JSON.stringify(init.body);
      init.headers = {
        ...init.headers,
        'Content-Type': 'application/json'
      }
    }

    try {
      const response = await fetch(url, init);
      const data: ApiData = await response.json();

      setLoading(false);

      return data;
    } catch (e) {
      setLoading(false);
    }
  }, []);

  return { request, loading }
}
