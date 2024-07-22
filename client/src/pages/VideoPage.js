import React from 'react';
import { useParams } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';

const VideoPage = () => {
  const { videoId } = useParams();

  return (
    <div>
      <h1>Video Page</h1>
      <VideoPlayer videoId={videoId} />
    </div>
  );
};

export default VideoPage;
