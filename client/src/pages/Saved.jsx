import React, { useState, useEffect } from 'react';
import PostCard from '../components/PostCard';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Container = styled.div`
  padding: 20px 30px;
  padding-bottom: 200px;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Topic = styled.div`
  color: ${({ theme }) => theme.text_primary};
  font-size: 24px;
  font-weight: 540;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SavedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 18px 6px;
`;

const EmptyState = styled.div`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 18px;
  text-align: center;
  margin-top: 40px;
`;

const Saved = () => {
  const [savedPosts, setSavedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    fetchSavedPosts();
  }, []);

  const fetchSavedPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/posts/saved/${currentUser._id}`);
      setSavedPosts(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch saved posts. Please try again later.');
      setLoading(false);
    }
  };

  const handleLike = async (postId) => {
    try {
      await axios.put(`/api/posts/${postId}/like`);
      setSavedPosts(prevPosts =>
        prevPosts.map(post =>
          post._id === postId ? { ...post, likes: post.likes + 1 } : post
        )
      );
    } catch (err) {
      console.error('Failed to like post:', err);
    }
  };

  const handleComment = async (postId, comment) => {
    try {
      const response = await axios.post(`/api/posts/${postId}/comment`, { text: comment });
      setSavedPosts(prevPosts =>
        prevPosts.map(post =>
          post._id === postId
            ? { ...post, comments: [...post.comments, response.data] }
            : post
        )
      );
    } catch (err) {
      console.error('Failed to add comment:', err);
    }
  };

  const handleShare = async (postId) => {
    try {
      await axios.post(`/api/posts/${postId}/share`);
      // You might want to update the UI to reflect the share
      console.log(`Shared post ${postId}`);
    } catch (err) {
      console.error('Failed to share post:', err);
    }
  };

  const handleView = async (postId) => {
    try {
      await axios.put(`/api/posts/${postId}/view`);
      // You might want to update the UI to reflect the view
      console.log(`Viewed post ${postId}`);
    } catch (err) {
      console.error('Failed to record view:', err);
    }
  };

  const handleUnsave = async (postId) => {
    try {
      await axios.put(`/api/posts/${postId}/unsave`);
      setSavedPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
    } catch (err) {
      console.error('Failed to unsave post:', err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container>
      <Topic>Saved Posts</Topic>
      <SavedContainer>
        {savedPosts.length > 0 ? (
          savedPosts.map(post => (
            <PostCard 
              key={post._id} 
              post={post}
              onLike={() => handleLike(post._id)}
              onComment={(comment) => handleComment(post._id, comment)}
              onShare={() => handleShare(post._id)}
              onView={() => handleView(post._id)}
              onSave={() => handleUnsave(post._id)}
              initialSavedState={true}
            />
          ))
        ) : (
          <EmptyState>You haven't saved any posts yet.</EmptyState>
        )}
      </SavedContainer>
    </Container>
  );
};

export default Saved;