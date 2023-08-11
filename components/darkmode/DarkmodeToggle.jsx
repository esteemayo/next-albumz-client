import { useDispatch, useSelector } from 'react-redux';
import { dark, light } from '@/features/darkMode/darkModeSlice';

const DarkmodeToggle = () => {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => ({ ...state.darkMode }));

  return (
    <div>mode</div>
  );
};

export default DarkmodeToggle;
