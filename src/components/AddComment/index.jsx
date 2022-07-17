import React from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import { LoadingButton } from '@mui/lab';

import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCreateComment } from "../../store/actions/posts";
import { postsSlice } from '../../store/slices/postsSlice'

export const AddComment = () => {
  const dispatch = useDispatch();
  const { avatarUrl } = useSelector(state => state.auth.data);
  const { text, status } = useSelector(state => state.posts.currentPost.comment);
  const { setCommentTextInput } = postsSlice.actions;
  const commentIsLoading = status === 'loading';

  const { id } = useParams();

  const sendComment = () => {
    dispatch(fetchCreateComment({id, text}))
  }

  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src={avatarUrl}
        />
        <div className={styles.form}>
          <TextField
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
            value={text}
            onChange={e => dispatch(setCommentTextInput(e.target.value.trim()))}
          />
          <LoadingButton loading={commentIsLoading} onClick={sendComment} variant="contained" disabled={text.length < 1}>Отправить</LoadingButton>
        </div>
      </div>
    </>
  );
};
