import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import SearchIcon from '@mui/icons-material/Search';

import { useSearch } from '@/hooks/useSearch';

import styles from '@/styles/Search.module.scss';

const Search = () => {
  const router = useRouter();
  const { query, handleChange, handleSearch } = useSearch();

  return (
    <form onSubmit={handleSearch} className={styles.search}>
      <input
        type='search'
        value={query}
        placeholder='Search Albums'
        className={styles.search__input}
        onChange={handleChange}
      />
      <SearchIcon className={styles.search__icon} />
    </form>
  );
};

export default Search;
