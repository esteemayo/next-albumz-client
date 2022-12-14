import { useDispatch, useSelector } from 'react-redux';
import { DarkModeOutlined, LightModeOutlined } from '@mui/icons-material';

import Popup from './Popup';
import styles from '@/styles/DarkMode.module.scss';
import { dark, light } from '@/features/darkMode/darkModeSlice';

const DarkMode = () => {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => ({ ...state.darkMode }));

  const toggleDarkmode = () => {
    darkMode === 'dark' ? dispatch(light('light')) : dispatch(dark('dark'));
  };

  return (
    <div className={styles.darkmode} onClick={toggleDarkmode}>
      {darkMode === 'dark' ? (
        <Popup title='Dark mode'>
          <DarkModeOutlined />
        </Popup>
      ) : (
        <Popup title='Light mode'>
          <LightModeOutlined />
        </Popup>
      )}
    </div>
  );
};

export default DarkMode;
