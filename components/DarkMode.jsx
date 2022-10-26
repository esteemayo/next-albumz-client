import Zoom from '@mui/material/Zoom';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import { DarkModeOutlined, LightModeOutlined } from '@mui/icons-material';

import styles from '@/styles/DarkMode.module.scss';
import { toggle } from '@/features/darkMode/darkModeSlice';

const DarkMode = () => {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => ({ ...state.darkMode }));

  return <div className={styles.darkmode} onClick={() => dispatch(toggle())}>
    {darkMode ? (
      <Tooltip TransitionComponent={Zoom} title='Dark mode' arrow>
        <IconButton>
          <DarkModeOutlined />
        </IconButton>
      </Tooltip>
    ) : (
      <Tooltip TransitionComponent={Zoom} title='Light mode' arrow>
        <IconButton>
          <LightModeOutlined />
        </IconButton>
      </Tooltip>
    )}
  </div>;
};

export default DarkMode;
