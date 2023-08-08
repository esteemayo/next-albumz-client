import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import IconButton from '@mui/material/IconButton';

const Popup = ({ title, children }) => {
  return (
    <Tooltip TransitionComponent={Zoom} title={title} arrow>
      <IconButton>
        {children}
      </IconButton>
    </Tooltip>
  );
};

export default Popup;
