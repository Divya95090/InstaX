import { CloseRounded } from '@mui/icons-material';
import { Modal } from '@mui/material';
import React, { useRef } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { closePlayer, openPlayer, setCurrentTime } from '../redux/audioplayerSlice';
import { openSnackbar } from '../redux/snackbarSlice';
import { markVideoAsViewed } from '../actions/videoActions';

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: top;
  justify-content: center;
  overflow-y: scroll;
  transition: all 0.5s ease;
`;

const Wrapper = styled.div`
  max-width: 800px;
  width: 100%;
  border-radius: 16px;
  margin: 50px 20px;
  height: min-content;
  background-color: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text_primary};
  padding: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 10px;
`;

const Title = styled.div`
  font-size: 22px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  margin: 12px 20px;
`;

const Videoplayer = styled.video`
  height: 100%;
  max-height: 500px;
  border-radius: 16px;
  margin: 0px 20px;
  object-fit: cover;
  margin-top: 30px;
`;

const VideoName = styled.div`
  font-size: 18px;    
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  margin: 12px 20px 0px 20px;
`;

const VideoDescription = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
  margin: 6px 20px 20px 20px;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 12px 20px 20px 20px;
  gap: 14px;
`;

const Btn = styled.div`
  border: none;
  font-size: 22px;
  font-weight: 600;
  text-align: center;
  width: 100%;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text_primary};
  padding: 14px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  &:hover {
    background-color: ${({ theme }) => theme.card_hover};
  }
`;

const VideoPlayer = ({ video, videoList, currenttime, index }) => {
  const dispatch = useDispatch();
  const videoref = useRef(null);

  const handleTimeUpdate = () => {
    const currentTime = videoref.current.currentTime;
    const duration = videoref.current.duration;
    const percentageWatched = (currentTime / duration) * 100;

    if (percentageWatched >= 20) {
      dispatch(markVideoAsViewed(video._id));
    }

    dispatch(
      setCurrentTime({
        currenttime: currentTime
      })
    );
  }

  const goToNextVideo = () => {
    if (videoList.length === index + 1) {
      dispatch(
        openSnackbar({
          message: "This is the last video",
          severity: "info",
        })
      );
      return;
    }
    dispatch(closePlayer());
    setTimeout(() => {
      dispatch(
        openPlayer({
          type: "video",
          videoList,
          index: index + 1,
          currenttime: 0,
          video: videoList[index + 1]
        })
      );
    }, 10);
  }

  const goToPreviousVideo = () => {
    if (index === 0) {
      dispatch(
        openSnackbar({
          message: "This is the first video",
          severity: "info",
        })
      );
      return;
    }
    dispatch(closePlayer());
    setTimeout(() => {
      dispatch(
        openPlayer({
          type: "video",
          videoList,
          index: index - 1,
          currenttime: 0,
          video: videoList[index - 1]
        })
      );
    }, 10);
  }

  return (
    <Modal open={true} onClose={() => dispatch(closePlayer())}>
      <Container>
        <Wrapper>
          <CloseRounded
            style={{
              position: "absolute",
              top: "12px",
              right: "20px",
              cursor: "pointer",
            }}
            onClick={() => {
              dispatch(closePlayer());
            }}
          />
          <Videoplayer controls
            ref={videoref}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => goToNextVideo()}
            autoPlay
            onPlay={() => { videoref.current.currentTime = currenttime }}
          >
            <source src={video.file} type="video/mp4" />
            <source src={video.file} type="video/webm" />
            <source src={video.file} type="video/ogg" />
            Your browser does not support the video tag.
          </Videoplayer>
          <VideoName>{video.name}</VideoName>
          <VideoDescription>{video.desc}</VideoDescription>
          <BtnContainer>
            <Btn onClick={() => goToPreviousVideo()}>
              Previous
            </Btn>
            <Btn onClick={() => goToNextVideo()}>
              Next
            </Btn>
          </BtnContainer>
        </Wrapper>
      </Container>
    </Modal >
  )
}

export default VideoPlayer;
