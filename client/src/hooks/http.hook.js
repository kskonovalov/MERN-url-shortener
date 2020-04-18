import { useState, useCallback } from 'react';
import { header } from 'express-validator';

const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const request = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      setLoading(true);
      setError(null);
      try {
        if(body) {
          body = JSON.stringify(body);
          headers['Content-Type'] = 'application/json';
        }
        const response = await fetch(url, {
          method,
          body,
          headers
        });
        const data = await response.json();
        setLoading(false);
        if(!response.ok) {
          setError(data.message || `Something get wrong`);
        }

        return data;
      } catch (e) {
        setLoading(false);
        setError(e.message);
        throw e;
      }
    },
    []
  );
  const clearError = () => setError(null);
  return { loading, request, error, clearError };
};

export default useHttp;
