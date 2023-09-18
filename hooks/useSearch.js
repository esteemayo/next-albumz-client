import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

export const useSearch = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleChange = useCallback((e) => {
    setQuery(e.target.value);
  }, []);

  const handleSearch = useCallback((e) => {
    e.preventDefault();

    if (query) {
      router.push(`/albums/search?q=${query}`);
      setQuery('');
    }
  }, [query, router]);

  return {
    query,
    handleChange,
    handleSearch,
  };
};
