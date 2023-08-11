import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useMemo } from 'react';
import { DarkModeOutlined, LightModeOutlined } from '@mui/icons-material';

import { dark, light } from '@/features/darkMode/darkModeSlice';

import styles from '@/styles/DarkModeToggle.module.scss';

const DarkModeToggle = () => {
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => ({ ...state.darkMode }));

  const handleToggle = useCallback(() => {
    return mode === 'dark' ?
      dispatch(light('light')) :
      dispatch(dark('dark'));
  }, [mode, dark, light, dispatch]);

  const ballClasses = useMemo(() => {
    return mode === 'dark' ?
      `${styles.ball} ${styles.left}` :
      `${styles.ball} ${styles.right}`;
  }, [mode]);

  return (
    <div className={styles.container} onClick={handleToggle}>
      <div className={styles.icon}>
        <DarkModeOutlined />
      </div>
      <div className={styles.icon}>
        <LightModeOutlined />
      </div>
      <div className={ballClasses} />
    </div>
  );
};

export default DarkModeToggle;
