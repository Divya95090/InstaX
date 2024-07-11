import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import VideoCard from '../components/VideoCard';
import TextPostCard from '../components/TextPostCard'; // Assuming you create this component

const DashboardMain = styled.div`
  padding: 20px 30px;
  padding-bottom: 200px;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 768px) {
    padding: 6px 10px;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bg};
  border-radius: 10px;
  padding: 20px 30px;

  ${({ box, theme }) =>
    box &&
    `
    background-color: ${theme.bg};
    border-radius: 10px;
    padding: 20px 30px;
  `}
`;

const ContentHeader = styled.div`
  color: ${({ theme }) => theme.text_primary};
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const ViewAllLink = styled(Link)`
  color: ${({ theme }) => theme.primary};
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
  text-decoration: none;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  &:hover {
    transition: 0.2s ease-in-out;
    color: ${({ theme }) => theme.primary};
  }
`;

const ContentSection = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  padding: 18px 6px;

  @media (max-width: 550px) {
    justify-content: center;
  }
`;

const Dashboard = () => {
  // Example state for video and text posts
  const [videoPosts, setVideoPosts] = useState([]);
  const [textPosts, setTextPosts] = useState([]);

  // Example useEffect to fetch data (replace with actual API calls)
  useEffect(() => {
    // Fetch video posts
    // Example fetchVideoPosts();
    // setVideoPosts(response.data);

    // Fetch text posts
    // Example fetchTextPosts();
    // setTextPosts(response.data);
  }, []);

  return (
    <DashboardMain>
      <FilterContainer box={true}>
        <ContentHeader>Most Popular Videos</ContentHeader>
        <ViewAllLink to='/showvideos/mostpopular'>Show All</ViewAllLink>
        <ContentSection>
          {videoPosts.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </ContentSection>
      </FilterContainer>

      <FilterContainer box={true}>
        <ContentHeader>Popular Text Posts</ContentHeader>
        <ViewAllLink to='/showtextposts/popular'>Show All</ViewAllLink>
        <ContentSection>
          {textPosts.map(textPost => (
            <TextPostCard key={textPost.id} textPost={textPost} />
          ))}
        </ContentSection>
      </FilterContainer>
    </DashboardMain>
  );
};

export default Dashboard;
