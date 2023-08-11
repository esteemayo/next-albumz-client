import { useDispatch, useSelector } from 'react-redux';
import { DarkModeOutlined, LightModeOutlined } from '@mui/icons-material';

import { dark, light } from '@/features/darkMode/darkModeSlice';

import styles from '@/styles/DarkModeToggle.module.scss';

const DarkModeToggle = () => {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => ({ ...state.darkMode }));

  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <DarkModeOutlined />
      </div>
      <div className={styles.icon}>
        <LightModeOutlined />
      </div>
      <div className={styles.ball} />
    </div>
  );
};

export default DarkModeToggle;
