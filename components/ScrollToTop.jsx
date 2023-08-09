import { useCallback, useState } from 'react';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';

import Popup from './Popup';

import styles from '@/styles/ScrollToTop.module.scss';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  if(typeof window !== 'undefined') {
    window.onscroll = () => {
      setIsVisible(window.scrollY > 300 ? true : false);
      return () => (window.onscroll = null);
    };
  }

  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={styles.scroll}>
      {isVisible && (
        <div onClick={handleScroll} className={styles.iconContainer}>
          <Popup title='Scroll to top'>
            <KeyboardArrowUpOutlinedIcon className={styles.scrollIcon} />
          </Popup>
        </div>
      )}
    </div>
  );
};

export default ScrollToTop;
