import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { TextField, Button, Box, Typography, Card } from '@mui/material';
import { createCommentApi, getCommentsApi } from '../../../services/comments';

const useStyles = makeStyles(theme => ({
  bubbleContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: theme.spacing(2),
  },
  bubble: {
    backgroundColor: '#e1e5ea',
    borderRadius: theme.spacing(2),
    padding: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  message: {
    fontSize: 16,
    marginBottom: theme.spacing(1),
  },
  user: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(0.5),
  },
  timestamp: {
    fontSize: 12,
    color: '#777',
  },
}));

export const CommentSection = ({ productId }) => {
  const classes = useStyles();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    let interval;

    interval = setInterval(async () => {
      const result = await getCommentsApi(productId);

      if (result.success) {
        setComments(result.data);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleChange = event => {
    setComment(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    await createCommentApi(comment, productId);

    setComment('');
  };

  console.log(comments);

  return (
    <>
      <Typography variant='h6' marginY={4}>
        Comments
      </Typography>
      <div style={{ width: '100%' }}>
        {comments.length ? (
          <div style={{ width: '100%', height: 300, overflowY: 'auto' }}>
            {comments.map((comment, index) => (
              <Box key={index} marginBottom={2}>
                <Card className={classes.bubble}>
                  <Typography variant='body1' className={classes.message}>
                    {comment.message}
                  </Typography>
                  <Typography variant='subtitle2' className={classes.user}>
                    From: {comment.userId.email}
                  </Typography>
                  <Typography variant='caption' className={classes.createdAt}>
                    {new Date(comment.createdAt).toLocaleString()}
                  </Typography>
                </Card>
              </Box>
            ))}
          </div>
        ) : (
          <Typography textAlign='center'>No comments</Typography>
        )}
      </div>
      <Box display='flex' flexDirection='column' width='75%' marginTop={2}>
        <TextField
          className={classes.commentField}
          label='Add a comment'
          variant='outlined'
          multiline
          rows={2}
          value={comment}
          onChange={handleChange}
        />
        <Button type='submit' variant='contained' color='primary' className={classes.postButton} onClick={handleSubmit}>
          Post
        </Button>
      </Box>
    </>
  );
};
