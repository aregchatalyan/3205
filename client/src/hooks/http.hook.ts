import { useState, useCallback } from 'react';
import { ApiData } from '../types';

export const useHttp = () => {
  const [ loading, setLoading ] = useState<boolean>(false);

  const request = useCallback(async (url: string, init: RequestInit = {}) => {
    setLoading(true);

    if (init.body) {
      init.body = JSON.stringify(init.body);
      init.headers = {
        'Content-Type': 'application/json',
        ...init.headers
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
