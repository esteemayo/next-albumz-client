import { useDispatch, useSelector } from 'react-redux';
import { DarkModeOutlined, LightModeOutlined } from '@mui/icons-material';

import Popup from './Popup';
import styles from '@/styles/DarkMode.module.scss';
import { dark, light } from '@/features/darkMode/darkModeSlice';

const DarkMode = () => {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => ({ ...state.darkMode }));

  const toggleDarkmode = () => {
    dispatch(darkMode === 'dark' ? light('light') : dark('dark'));
  };

  return (
    <div className={styles.darkmode} onClick={toggleDarkmode}>
      {darkMode === 'dark' ? (
        <Popup title='Light Mode'>
          <LightModeOutlined style={{ color: '#fff' }} />
        </Popup>
      ) : (
        <Popup title='Dark Mode'>
          <DarkModeOutlined style={{ color: '#fff' }} />
        </Popup>
      )}
    </div>
  );
};

export default DarkMode;
