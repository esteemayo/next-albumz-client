import { useCallback } from 'react';
import { likeAlbum } from '@/services/albumService';

const useFavorite = ({ actionId, likes, user }) => {
  const hasFavorited = useCallback(() => {
    const album = likes || [];
    return album.includes(user);
  }, [likes, user]);

  const handleLike = useCallback(async () => {
    try {
      const { data } = await likeAlbum(actionId);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return {
    hasFavorited,
    handleLike,
  };
};

export default useFavorite;
