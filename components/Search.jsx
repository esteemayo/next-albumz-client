import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

import styles from '@/styles/Search.module.scss';

const Search = () => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSearch} className={styles.search}>
      <input
        type='search'
        placeholder='Search Albums'
        className={styles.search__input}
        onChange={(e) => setQuery(e.target.value)}
      />
      <SearchIcon className={styles.search__icon} />
    </form>
  );
};

export default Search;
