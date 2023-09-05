import { useMemo } from 'react';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import PropTypes from 'prop-types';

import FormatNumber from '@/components/FormatNumber';

import styles from '@/styles/AlbumDescription.module.scss';

const AlbumViews = ({ views }) => {
  const viewsLabel = useMemo(() => {
    return views?.length > 1 ? 'views' : 'view';
  }, [views]);

  return (
    <div className={styles.view__container}>
      <VisibilityOutlinedIcon className={styles.action__icon} />
      <span className={styles.views}>
        {views?.length} {viewsLabel}
      </span>
    </div>
  );
};

AlbumViews.propTypes = {
  views: PropTypes.array.isRequired,
};

export default AlbumViews;
