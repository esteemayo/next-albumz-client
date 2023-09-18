import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { closeMenu, toggleMenu } from '@/features/toggle/toggleSlice';

export const useMenu = () => {
  const dispatch = useDispatch();

  const openMenuHandler = useCallback(() => {
    dispatch(toggleMenu());
  }, [dispatch]);

  const closeMenuHandler = useCallback(() => {
    dispatch(closeMenu());
  }, [dispatch]);

  return {
    openMenuHandler,
    closeMenuHandler,
  };
};
