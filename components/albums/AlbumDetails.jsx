import PropTypes from 'prop-types';
import styles from '@/styles/AlbumDescription.module.scss';

const AlbumDetails = ({ info, show, title, onClick }) => {
  return (
    <div className={styles.right}>
      <div className={styles.rightWrapper}>
        <h2 className={styles.album__heading}>About {title} album</h2>
        {!!show ? (
          <>
            {info?.split('\n').map((item, index) => {
              return (
                <p key={index} className={styles.album__info}>
                  {item}
                </p>
              );
            })}
            <button
              onClick={() => onClick(false)}
              className={styles.btn__info}
          >
              Show less
            </button>
          </>
        ) : (
          <>
            {excerpts(info, 350)?.split('\n')?.map((item, index) => {
            return (
                <p key={index} className={styles.album__info}>
                  {item}
                </p>
              );
            })}
            {info?.length > 350 && (
              <button
                onClick={() => onClick(true)}
                className={styles.btn__info}
              >
                Read more
            </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

AlbumDetails.propTypes = {
  info: PropTypes.string.isRequired,
  show: PropTypes.boolean.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.any.isRequired,
};

export default AlbumDetails;
