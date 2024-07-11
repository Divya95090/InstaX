import * as React from 'react';
import styled from "styled-components";
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';

const SearchedCard = styled(Link)`
  width: 500px;
  display: flex;
  flex-direction: column;
  padding: 18px 18px 30px 18px;
  border-radius: 6px;
  gap: 12px;
  background-color: ${({ theme }) => theme.card};
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.1);
  cursor: pointer;
  text-decoration: none;

  &:hover {
    cursor: pointer;
    transform: translateY(-8px);
    transition: all 0.4s ease-in-out;
    box-shadow: 0 0 18px 0 rgba(0, 0, 0, 0.3);
    filter: brightness(1.3);
  }

  @media (max-width: 768px) {
    width: 290px;
  }
`;

const VideoImage = styled.img`
  object-fit: cover;
  width: 50%;
  border-radius: 6px;
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.3);
`;

const VideoTitle = styled.div`
  color: ${({ theme }) => theme.text_primary};
  display: -webkit-box;
  font-size: 24px;
  font-weight: 520;
`;

const UploadInfo = styled.div`
  display: flex;
  width: 80%;
  gap: 12px;
`;

const Time = styled.div`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 14px;

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 560px) {
    font-size: 10px;
  }
`;

const CreatorName = styled.div`
  color: ${({ theme }) => theme.text_primary};
  font-size: 14px;

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 560px) {
    font-size: 10px;
  }
`;

const Description = styled.div`
  color: ${({ theme }) => theme.text_secondary};
  display: -webkit-box;
  max-width: 100%;
  font-size: 14px;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TopResult = ({ video }) => {
  return (
    <SearchedCard to={`/video/${video?._id}`}>
      <VideoImage src={video?.thumbnail} />
      <VideoTitle>{video?.name}</VideoTitle>
      <UploadInfo>
        <Time>• 12 Views</Time>
        <Time>• 12 days ago</Time>
        <CreatorName style={{ marginLeft: '18px' }}>{video?.creator.name}</CreatorName>
      </UploadInfo>
      <Description>{video?.desc}</Description> 
    </SearchedCard>
  );
};

export default TopResult;
