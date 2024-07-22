import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Avatar from "@mui/material/Avatar";
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CommentSystem from './comment';
import LikeButton from './LikeButton';
import ShareButton from './Share';
import { likePost, unlikePost, addComment, sharePost } from '../api';

const Card = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.border};
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  align-self: center; // Add this line
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
`;

const Username = styled.span`
  margin-left: 10px;
  font-weight: bold;
  color: ${({ theme }) => theme.text_primary};
`;

const ContentContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%; // 1:1 Aspect Ratio
`;

const Content = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CarouselButton = styled(IconButton)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.5) !important;
  &:hover {
    background-color: rgba(255, 255, 255, 0.8) !important;
  }
`;

const Separator = styled.hr`
  border: 10;
  height: 1px;
  background-color: ${({ theme }) => theme.border};
  margin: 0;
`;

const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px;
  background-color: ${({ theme }) => theme.bgLighter};
`;

const ActionButton = styled(IconButton)`
  color: ${({ theme, active }) => active ? theme.primary : theme.text_primary} !important;
`;
const StyledLikeButton = styled(LikeButton)`
  && {
    color: ${({ theme, isLiked }) => isLiked ? theme.primary : theme.text_secondary};
  }
`;

const StyledShareButton = styled(ShareButton)`
  && {
    color: ${({ theme }) => theme.text_secondary};
  }
`;
const StyledSaveButton = styled(IconButton)`
  && {
    color: ${({ theme, isSaved }) => isSaved ? theme.primary : theme.text_secondary};
  }
`;

const LikeCount = styled.span`
  display: flex;
  margin-left: 5px;
  color: ${({ theme }) => theme.text_primary};
  font-size: 14px;
`;

const LikeContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Caption = styled.p`
  padding: 0 12px;
  margin: 0 0 16px 0;
  color: ${({ theme }) => theme.text_primary};
`;

const CommentsSection = styled.div`
  padding: 16px 16px;
  background-color: ${({ theme }) => theme.bgLight};
  border-top: 1px solid ${({ theme }) => theme.border};
`;

const Comment = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 8px;
  padding: 8px 0;
`;

const CommentContent = styled.div`
  margin-left: 10px;
`;

const CommentUsername = styled.span`
  font-weight: bold;
  margin-right: 5px;
  color: ${({ theme }) => theme.text_primary};
`;

const CommentText = styled.span`
  color: ${({ theme }) => theme.text_secondary};
`;

const AddComment = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  background-color: ${({ theme }) => theme.bgLight};
  border-top: 1px solid ${({ theme }) => theme.border};
`;

const CommentInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background-color: transparent;
  color: ${({ theme }) => theme.text_primary};
  &::placeholder {
    color: ${({ theme }) => theme.text_secondary};
  }
`;

const PostCard = ({ post, onLike, onComment, onShare, onView, onSave, initialSavedState = false }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(initialSavedState);
    const [likeCount, setLikeCount] = useState(0);
    const [comments, setComments] = useState([]);
    const videoRef = useRef(null);

  useEffect(() => {
    if (post) {
      setLikeCount(post.likes || 0);
      setComments(post.comments || []);
    }
  }, [post]);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement && post.type === 'video') {
      const handleTimeUpdate = () => {
        const progress = (videoElement.currentTime / videoElement.duration) * 100;
        if (progress >= 20 && !post.viewed) {
          onView(post.id);
        }
      };
      videoElement.addEventListener('timeupdate', handleTimeUpdate);
      return () => {
        if (videoElement) {
          videoElement.removeEventListener('timeupdate', handleTimeUpdate);
        }
      };
    }
  }, [post, onView]);

  if (!post) {
    return <Card><CardHeader>Error: Post data is missing</CardHeader></Card>;
  }

  const handlePrevImage = () => {
    if (post.images && post.images.length > 1) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? post.images.length - 1 : prevIndex - 1
      );
    }
  };

  const handleNextImage = () => {
    if (post.images && post.images.length > 1) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === post.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const handleLike = async () => {
    try {
      const response = await likePost(post.id);
      setIsLiked(true);
      setLikeCount(response.likes);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };
  const handleUnlike = async () => {
    try {
      const response = await unlikePost(post.id);
      setIsLiked(false);
      setLikeCount(response.likes);
    } catch (error) {
      console.error('Error unliking post:', error);
    }
  };

  const handleSave = () => {
    const newSavedState = !isSaved;
    setIsSaved(newSavedState);
    onSave(post.id, newSavedState);
  };

  const handleAddComment = async (commentText) => {
    try {
      const response = await addComment(post.id, commentText);
      setComments([...comments, response]);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };
  const handleShare = async () => {
    try {
      await sharePost(post.id);
      // Update UI or show a success message
    } catch (error) {
      console.error('Error sharing post:', error);
    }
  };

  const handleReply = (parentCommentId, replyText) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === parentCommentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), { id: Date.now(), username: 'CurrentUser', text: replyText, replies: [] }]
        };
      }
      return comment;
    });
    setComments(updatedComments);
    onComment(post.id, updatedComments);
  };

  return (
    <Card>
      <CardHeader>
        <Avatar src={post.user?.avatar} />
        <Username>{post.user?.username}</Username>
      </CardHeader>
      <Separator />
      <ContentContainer>
        <Content>
          {post.type === 'video' ? (
            <Video ref={videoRef} controls key={post.id}>
              <source src={post.videoUrl} type="video/mp4" />
            </Video>
          ) : (
            <>
              {post.images && post.images.length > 0 ? (
                <>
                  <Image src={post.images[currentImageIndex]} alt={`Post image ${currentImageIndex + 1}`} />
                  {post.images.length > 1 && (
                    <>
                      <CarouselButton style={{ left: -100 }} onClick={handlePrevImage}>
                        <ArrowBackIosNewIcon />
                      </CarouselButton>
                      <CarouselButton style={{ right: -390 }} onClick={handleNextImage}>
                        <ArrowForwardIosIcon />
                      </CarouselButton>
                    </>
                  )}
                </>
              ) : (
                <div>No image available</div>
              )}
            </>
          )}
        </Content>
      </ContentContainer>
      <Separator />
      <ActionBar>
      <LikeContainer>
          <StyledLikeButton isLiked={isLiked} onClick={handleLike} />
          <LikeCount>{likeCount}</LikeCount>
        </LikeContainer>
        <StyledShareButton onClick={() => onShare(post.id)} />
        <StyledSaveButton onClick={handleSave} isSaved={isSaved}>
          {isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
        </StyledSaveButton>
      </ActionBar>
      <Caption>{post.caption}</Caption>
      <CommentsSection>
        <CommentSystem 
          comments={comments}
          onAddComment={handleAddComment}
          onReply={handleReply}
        />
      </CommentsSection>
    </Card>
  );
};

export default PostCard;