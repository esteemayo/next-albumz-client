import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export const useLogout = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const logout = useCallback((e) => {
    e.stopPropagation();

    dispatch(logoutUser());
    router.push('/');
  }, [router, dispatch]);

  return {
    logout,
  };
};
