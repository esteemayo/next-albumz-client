import { useMemo } from 'react';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import PropTypes from 'prop-types';

import styles from '@/styles/AlbumDescription.module.scss';

const AlbumViews = ({ views }) => {
  const viewsLabel = useMemo(() => {
    return views?.length > 1 ? 'views' : 'view';
  }, [views]);

  return (
    <span className={styles.action__wrapper}>
      <div className={styles.view__container}>
        <VisibilityOutlinedIcon className={styles.action__icon} />
        <span className={styles.views}>
          {views?.length} {viewsLabel}
        </span>
      </div>
    </span>
  );
};

AlbumViews.propTypes = {
  views: PropTypes.array.isRequired,
};

export default AlbumViews;
