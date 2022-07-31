import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";

import { Post } from "../../components/Post";
import { TagsBlock } from "../../components/TagsBlock/TagsBlock";
import { CommentsBlock } from "../../components/CommentsBlock/CommentsBlock";
import { useDispatch, useSelector } from "react-redux";
import { fetchTags, fetchPostsWithTag, fetchLastComments } from "../../store/actions/posts";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";

export const PostsWithTag = () => {
  const dispatch = useDispatch();
  const { tag } = useParams();
  const { posts, tags, comments } = useSelector((state) => state.posts);
  const userData = useSelector((state) => state.auth.data);

  const isPostsLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";
  const isCommentsLoading = comments.status === 'loading';

  useEffect(() => {
    dispatch(fetchPostsWithTag(tag));
    dispatch(fetchTags());
    dispatch(fetchLastComments());
  }, [dispatch, tag]);

  return (
    <>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          <Typography variant='h2' component='h1'># {tag}</Typography>
        </Grid>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((post, index) =>
            isPostsLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                id={post._id}
                title={post.title}
                imageUrl={
                  post.imageUrl ? `${process.env.REACT_APP_API_URL}${post.imageUrl}` : ""
                }
                user={post.user}
                createdAt={post.createdAt}
                viewsCount={post.viewsCount}
                commentsCount={3}
                tags={post.tags}
                isEditable={userData?._id === post.user._id}
              />
            )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={comments.items}
            isLoading={isCommentsLoading}
          />
        </Grid>
      </Grid>
    </>
  );
};
