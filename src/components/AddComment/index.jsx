import React, { useState } from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCreateComment } from "../../store/actions/posts";

export const AddComment = () => {
  const dispatch = useDispatch();
  const { avatarUrl } = useSelector(state => state.auth.data);

  const { id } = useParams();
 
  const [ commentText, setCommentText ] = useState('');

  const sendComment = () => {
    dispatch(fetchCreateComment({id, commentText}))
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
            onChange={e => setCommentText(e.target.value.trim())}
          />
          <Button onClick={sendComment} variant="contained" disabled={commentText.length < 1}>Отправить</Button>
        </div>
      </div>
    </>
  );
};
