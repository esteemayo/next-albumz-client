import { useDispatch, useSelector } from 'react-redux';
import { DarkModeOutlined, LightModeOutlined } from '@mui/icons-material';

import Popup from './Popup';
import styles from '@/styles/DarkMode.module.scss';
import { dark, light, toggle } from '@/features/darkMode/darkModeSlice';

const DarkMode = () => {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => ({ ...state.darkMode }));

  return (
    <div className={styles.darkmode}>
      {darkMode === 'dark' ? (
        <Popup title='Dark mode'>
          <DarkModeOutlined onClick={() => dispatch(light('light'))} />
        </Popup>
      ) : (
        <Popup title='Light mode'>
          <LightModeOutlined onClick={() => dispatch(dark('dark'))} />
        </Popup>
      )}
    </div>
  );
};

export default DarkMode;
