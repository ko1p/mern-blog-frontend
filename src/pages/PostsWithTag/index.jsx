import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";

import { Post } from "../../components/Post";
import { TagsBlock } from "../../components/TagsBlock/TagsBlock";
import { CommentsBlock } from "../../components/CommentsBlock/CommentsBlock";
import { useDispatch, useSelector } from "react-redux";
import { fetchTags, fetchPostsWithTag } from "../../store/actions/posts";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";

export const PostsWithTag = () => {
  const dispatch = useDispatch();
  const { tag } = useParams();
  const { posts, tags } = useSelector((state) => state.posts);
  const userData = useSelector((state) => state.auth.data);

  const isPostsLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";

  useEffect(() => {
    dispatch(fetchPostsWithTag(tag));
    dispatch(fetchTags());
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
            items={[
              {
                user: {
                  fullName: "Вася Пупкин",
                  avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                },
                text: "Это тестовый комментарий",
              },
              {
                user: {
                  fullName: "Иван Иванов",
                  avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
                },
                text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
