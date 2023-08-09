import PropTypes from 'prop-types';
import SearchIcon from '@mui/icons-material/Search';

import styles from '@/styles/Sidebar.module.scss';

const Search = ({ value, onChange, onSubmit }) => {
  return (
    <div>
      <form onSubmit={onSubmit} className={styles.search}>
        <input
          type='search'
          value={value}
          placeholder='Search albums...'
          className={styles.search__input}
          onChange={(value) => onChange(value)}
        />
        <SearchIcon className={styles.search__icon} />
      </form>
    </div>
  );
};

Search.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Search;
