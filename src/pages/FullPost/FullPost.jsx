import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';

import { Post } from "../../components/Post";
import { AddComment } from "../../components/AddComment";
import { CommentsBlock } from "../../components/CommentsBlock/CommentsBlock";
import Grid from '@mui/material/Grid';
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommentsById, fetchPostById } from "../../store/actions/posts";

export const FullPost = () => {
  const dispatch = useDispatch();
  const { data, status, comments } = useSelector(state => state.posts.currentPost);
  const isUserAuth = useSelector(state => state.auth.data);

  const isDataLoading = status === 'loading';
  const isCommentsLoading = comments.status === 'loading';

  const { id } = useParams();

  useEffect(() => {

    dispatch(fetchPostById(id));
    dispatch(fetchCommentsById(id));

  }, [dispatch, id]);

  if (isDataLoading || isCommentsLoading) {
    return <Post isLoading={true} isFullPost />;
  }

  return (
    <Grid xs={12} md={8} item>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `${data.imageUrl}` : ''}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={comments.items.length}
        tags={data.tags}
        isFullPost
      >
        <div>
          <ReactMarkdown children={data.text} />
        </div>
      </Post>
      <CommentsBlock
        items={comments.items}
        isLoading={isCommentsLoading}
        isFullCommnet
      >
        {
          isUserAuth ? <AddComment /> : null
        }
      </CommentsBlock>
    </Grid>
  );
};
