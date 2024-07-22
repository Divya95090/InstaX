import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const LikeWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const LikeCount = styled.span`
  margin-left: 5px;
  font-size: 14px;
`;

const LikeButton = ({ isLiked, likeCount, onLike }) => {
  return (
    <LikeWrapper>
      <IconButton onClick={onLike} color={isLiked ? "secondary" : "default"}>
        {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
      <LikeCount>{likeCount} {likeCount === 1 ? 'like' : 'likes'}</LikeCount>
    </LikeWrapper>
  );
};

LikeButton.propTypes = {
  isLiked: PropTypes.bool.isRequired,
  likeCount: PropTypes.number.isRequired,
  onLike: PropTypes.func.isRequired,
};

export default LikeButton;
