import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PostCard from '../components/PostCard';
import { getPosts } from '../api';

const DashboardMain = styled.div`
  padding: 20px 30px;
  padding-bottom: 200px;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  align-items: center;
  width: 100%;
  max-width: 600px;

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
  align-self: flex-start;

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
  align-self: flex-start;

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
  flex-direction: column;
  gap: 20px;
  padding: 18px 6px;
  align-items: center;

  @media (max-width: 550px) {
    align-items: center;
  }
`;

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await getPosts();
        setPosts(response);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Failed to fetch posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleLike = (postId) => {
    // Implement like functionality
    console.log(`Liked post ${postId}`);
  };

  const handleComment = (postId, comment) => {
    // Implement comment functionality
    console.log(`Commented on post ${postId}: ${comment}`);
  };

  const handleShare = (postId) => {
    // Implement share functionality
    console.log(`Shared post ${postId}`);
  };

  const handleView = (postId) => {
    // Implement view functionality
    console.log(`Viewed post ${postId}`);
  };

  const handleSave = (postId) => {
    // Implement save functionality
    console.log(`Saved post ${postId}`);
  };
  useEffect(() => {
    // Fetch posts from your API
    // For now, let's use some dummy data
    const dummyPosts = [
      {
        id: 1,
        type: 'image',
        images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
        caption: 'Beautiful day!',
        likes: 120,
        comments: [
          { username: 'user1', text: 'Great photo!' },
          { username: 'user2', text: 'Looks amazing!' }
        ],
        user: {
          username: 'johndoe',
          avatar: 'https://example.com/johndoe.jpg'
        }
      },
      {
        id: 2,
        type: 'video',
        videoUrl: 'https://example.com/video1.mp4',
        caption: 'Check out this cool video!',
        likes: 250,
        comments: [
          { username: 'user3', text: 'Awesome video!' }
        ],
        user: {
          username: 'janedoe',
          avatar: 'https://example.com/janedoe.jpg'
        }
      },
      {
        id: 3,
        type: 'text',
        title: 'Interesting Article',
        description: 'This is a fascinating read about...',
        likes: 80,
        comments: [
          { username: 'user4', text: 'Great article!' }
        ],
        user: {
          username: 'alexsmith',
          avatar: 'https://example.com/alexsmith.jpg'
        }
      }
    ];
    setPosts(dummyPosts);
  }, []);

  return (
    <DashboardMain>
      <FilterContainer box={true}>
        <ContentHeader>Recent Posts</ContentHeader>
        <ViewAllLink to='/showposts/recent'>Show All</ViewAllLink>
        <ContentSection>
          {loading ? (
            <p>Loading posts...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            posts.map(post => (
              <PostCard 
                key={post.id} 
                post={post}
                onLike={handleLike}
                onComment={handleComment}
                onShare={handleShare}
                onView={handleView}
                onSave={handleSave}
                initialSavedState={false}
              />
            ))
          )}
        </ContentSection>
      </FilterContainer>
    </DashboardMain>
  );
};

export default Dashboard;