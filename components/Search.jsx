import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import SearchIcon from '@mui/icons-material/Search';

import styles from '@/styles/Search.module.scss';

const Search = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSearch = useCallback((e) => {
    e.preventDefault();

    if (query) {
      router.push(`/albums/search?q=${query}`);
      setQuery('');
    }
  }, [query, router]);

  return (
    <form onSubmit={handleSearch} className={styles.search}>
      <input
        type='search'
        value={query}
        placeholder='Search Albums'
        className={styles.search__input}
        onChange={(e) => setQuery(e.target.value)}
      />
      <SearchIcon className={styles.search__icon} />
    </form>
  );
};

export default Search;
