import { useState } from 'react';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';

import styles from '@/styles/ScrollToTop.module.scss';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  if(typeof window !== 'undefined') {
    window.onscroll = () => {
      setIsVisible(window.pageYOffset > 300 ? true : false);
      return () => (window.onscroll = null);
    };
  }

  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  return (
    <div className={styles.scroll}>
      {isVisible && (
        <div onClick={handleScroll} className={styles.iconContainer}>
          <KeyboardArrowUpOutlinedIcon />
        </div>
      )}
    </div>
  );
};

export default ScrollToTop;
