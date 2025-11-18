import { useState, useEffect } from 'react';
import { showcaseAPI } from '../services/api';

export function useShowcases(filters = {}) {
  const [showcases, setShowcases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    const fetchShowcases = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await showcaseAPI.getAll(filters);
        setShowcases(response.data.cases);
        setPagination(response.data.pagination);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching showcases:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchShowcases();
  }, [JSON.stringify(filters)]);

  return { showcases, loading, error, pagination };
}

export function useShowcase(id) {
  const [showcase, setShowcase] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchShowcase = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await showcaseAPI.getById(id);
        setShowcase(response.data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching showcase:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchShowcase();
  }, [id]);

  return { showcase, loading, error };
}

