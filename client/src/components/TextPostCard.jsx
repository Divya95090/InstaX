import React from 'react';
import styled from 'styled-components';
import Avatar from "@mui/material/Avatar";
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

const Card = styled.div`
  position: relative;
  text-decoration: none;
  background-color: ${({ theme }) => theme.card};
  max-width: 220px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 16px;
  border-radius: 6px;  
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.1);
  &:hover {
    cursor: pointer;
    transform: translateY(-8px);
    transition: all 0.4s ease-in-out;
    box-shadow: 0 0 18px 0 rgba(0, 0, 0, 0.3);
    filter: brightness(1.3);
  }
`;

const Top = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  position: relative;
`;

const Favorite = styled(IconButton)`
  color: white !important;
  top: 6px;
  left: 64px;
  padding: 6px !important;
  border-radius: 50%;
  z-index: 100;
  background: ${({ theme }) => theme.text_secondary + 95} !important;
  position: absolute !important;
  backdrop-filter: blur(4px);
  box-shadow: 0 0 16px 6px #222423 !important;
`;

const Share = styled(IconButton)`
  color: white !important;
  top: 1px;
  left: 16px;
  padding: 6px !important;
  border-radius: 50%;
  z-index: 100;
  background: ${({ theme }) => theme.text_secondary + 95} !important;
  position: absolute !important;
  backdrop-filter: blur(4px);
  box-shadow: 0 0 16px 6px #222423 !important;
`;

const CardInformation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-weight: 450;
  padding: 14px 0px 0px 0px;
  width: 100%;
`;

const MainInfo = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  gap: 4px;
`;

const Title = styled.div`
  overflow: hidden;
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.text_primary};
`;

const Description = styled.div`
  overflow: hidden;
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 12px;
`;

const CreatorInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: 6px;
`;

const Creator = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CreatorName = styled.div`
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.text_secondary};
`;

const TextPostCard = () => {
  return (
    <Card>
      <Top>
        <Favorite>
          <FavoriteIcon style={{ width: "16px", height: "16px" }} />  
        </Favorite>
        <Share>
          <ShareIcon />
        </Share>
      </Top>
      <CardInformation>
        <MainInfo>
          <Title>Text Post Title</Title> {/* Placeholder Title */}
          <Description>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </Description> {/* Placeholder Description */}
          <CreatorInfo>
            <Creator>
              <Avatar style={{ width: '26px', height: '26px' }} />
              <CreatorName>John Doe</CreatorName>
            </Creator>
          </CreatorInfo>
        </MainInfo>
      </CardInformation>
    </Card>
  );
}

export default TextPostCard;
