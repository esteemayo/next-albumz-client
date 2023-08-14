import { useCallback, useMemo, useState } from 'react';
import { likeAlbum } from '@/services/albumService';

const useFavorite = ({ actionId, likes, user, onAction }) => {
  const hasFavorited = useMemo(() => {
    const album = likes || [];
    return album.includes(user?._id);
  }, [likes, user]);

  const handleLike = useCallback(async () => {
    try {
      const { data } = await likeAlbum(actionId);
      onAction(data.album);
    } catch (err) {
      console.log(err);
    }
  }, [actionId]);

  return {
    hasFavorited,
    handleLike,
  };
};

export default useFavorite;