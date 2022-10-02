import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import styles from '@/styles/ScrollToTop.module.scss';

const ScrollToTop = () => {
  return (
    <div className={styles.scroll}>
      <div className={styles.iconContainer}>
        <KeyboardArrowUpOutlinedIcon />
      </div>
    </div>
  );
};

export default ScrollToTop;
