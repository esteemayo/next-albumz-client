import PropTypes from 'prop-types';
import { useCallback, useMemo, useState } from 'react';
import { likeAlbum } from '@/services/albumService';

const useFavorite = ({ actionId, likes, user, onAction }) => {
  const hasFavorited = useMemo(() => {
    const album = likes || [];
    return album.includes(user?._id);
  }, [likes, user]);

  const toggleFavorite = useCallback(async () => {
    try {
      const { data } = await likeAlbum(actionId);
      onAction(data.album);
    } catch (err) {
      console.log(err);
    }
  }, [actionId]);

  return {
    hasFavorited,
    toggleFavorite,
  };
};

useFavorite.propTypes = {
  actionId: PropTypes.string.isRequired,
  likes: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  onAction: PropTypes.any.isRequired,
};

export default useFavorite;
