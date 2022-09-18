import { useDispatch, useSelector } from 'react-redux';
import { DarkModeOutlined, LightModeOutlined } from '@mui/icons-material';

import styles from '@/styles/DarkMode.module.scss';
import { toggle } from '@/features/darkMode/darkModeSlice';

const DarkMode = () => {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => ({ ...state.darkMode }));

  return <div className={styles.darkmode} onClick={() => dispatch(toggle())}>
    {darkMode ? <DarkModeOutlined /> : <LightModeOutlined />}
  </div>;
};

export default DarkMode;
