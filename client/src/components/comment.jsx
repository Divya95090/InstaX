import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Avatar from "@mui/material/Avatar";
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';

const CommentWrapper = styled.div`
  margin-bottom: 15px;
`;

const CommentContent = styled.div`
  display: flex;
  align-items: flex-start;
`;

const CommentText = styled.div`
  margin-left: 10px;
  flex-grow: 1;
`;

const Username = styled.span`
  font-weight: bold;
  margin-right: 5px;
`;

const ReplyButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text_secondary};
  cursor: pointer;
  font-size: 12px;
  margin-top: 5px;
`;

const ReplyInput = styled.input`
  width: 100%;
  margin-top: 5px;
  padding: 5px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 5px;
`;

const AddCommentWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
`;

const CommentInput = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 20px;
  margin-right: 10px;
`;

const Comment = ({ comment, onReply, depth = 0 }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleReply = () => {
    if (replyText.trim()) {
      onReply(comment.id, replyText.trim());
      setReplyText('');
      setIsReplying(false);
    }
  };

  return (
    <CommentWrapper style={{ marginLeft: `${depth * 20}px` }}>
      <CommentContent>
        <Avatar src={comment.avatar} alt={comment.username} style={{ width: 32, height: 32 }} />
        <CommentText>
          <Username>{comment.username}</Username>
          {comment.text}
          <ReplyButton onClick={() => setIsReplying(!isReplying)}>
            {isReplying ? 'Cancel' : 'Reply'}
          </ReplyButton>
          {isReplying && (
            <ReplyInput
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleReply()}
              placeholder="Write a reply..."
            />
          )}
        </CommentText>
      </CommentContent>
      {comment.replies && comment.replies.map((reply) => (
        <Comment key={reply.id} comment={reply} onReply={onReply} depth={depth + 1} />
      ))}
    </CommentWrapper>
  );
};

Comment.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    replies: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  onReply: PropTypes.func.isRequired,
  depth: PropTypes.number,
};

const CommentSystem = ({ comments, onAddComment, onReply }) => {
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(newComment.trim());
      setNewComment('');
    }
  };

  return (
    <div>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} onReply={onReply} />
      ))}
      <AddCommentWrapper>
        <CommentInput
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <IconButton onClick={handleAddComment}>
          <SendIcon />
        </IconButton>
      </AddCommentWrapper>
    </div>
  );
};

CommentSystem.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  onAddComment: PropTypes.func.isRequired,
  onReply: PropTypes.func.isRequired,
};

export default CommentSystem;
