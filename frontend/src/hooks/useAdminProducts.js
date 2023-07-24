import { useState, useEffect } from 'react';

import { getAdminProductsApi } from '../services/product';
import { eventEmitter } from '../utils/event-emitter';

export const useAdminProducts = (pageNum = 1) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({});
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    eventEmitter.on('apply-filters', payload => {
      const queryString = filterObjectToQueryString(payload);

      setIsLoading(true);
      setIsError(false);
      setError({});

      const controller = new AbortController();
      const { signal } = controller;

      getAdminProductsApi(1, queryString, { signal })
        .then(data => {
          if (data.success) {
            if (+data.currentPage === 1) {
              setResults(data.data.products);
            } else {
              setResults(prev => [...prev, ...data.data.products]);
            }

            setHasNextPage(Boolean(+data.data.currentPage < +data.data.totalPages));
          }

          setIsLoading(false);
        })
        .catch(e => {
          setIsLoading(false);
          if (signal.aborted) return;
          setIsError(true);
          setError({ message: e.message });
        });
    });
  }, []);

  function filterObjectToQueryString(obj) {
    const params = [];
    for (const key in obj) {
      const value = obj[key];
      if (value !== null) {
        params.push(`${key}=${value}`);
      }
    }
    const queryString = params.join('&');
    return queryString ? `${queryString}` : '';
  }

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setError({});

    const controller = new AbortController();
    const { signal } = controller;

    getAdminProductsApi(pageNum, null, { signal })
      .then(data => {
        if (data.success) {
          setResults(prev => [...prev, ...data.data.products]);
          setHasNextPage(Boolean(+data.data.currentPage < +data.data.totalPages));
        }

        setIsLoading(false);
      })
      .catch(e => {
        setIsLoading(false);
        if (signal.aborted) return;
        setIsError(true);
        setError({ message: e.message });
      });

    return () => controller.abort();
  }, [pageNum]);

  return { isLoading, isError, error, results, hasNextPage };
};
