import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post, TagsBlock, CommentsBlock } from '../../components/index';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, fetchTags, fetchLastComments } from '../../store/actions/posts';

export const Home = () => {

  const dispatch = useDispatch();
  const { posts, tags, comments } = useSelector(state => state.posts);
  const userData = useSelector(state => state.auth.data);
  const [sortedBy, setSortedBy] = useState('latest');

  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';
  const isCommentsLoading = comments.status === 'loading';

  useEffect(() => {
    dispatch(fetchPosts(sortedBy));
    dispatch(fetchTags());
    dispatch(fetchLastComments());
  }, [dispatch, sortedBy]);

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={sortedBy === 'latest' ? 0 : 1} aria-label="Сортировка статей">
        <Tab label="Новые" onClick={() => setSortedBy('latest')} />
        <Tab label="Популярные" onClick={() => setSortedBy('views')} />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={12} md={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((post, index) => (
            isPostsLoading ? (
            <Post key={index} isLoading={true} />)
            :
            (<Post
              id={post._id}
              title={post.title}
              imageUrl={post.imageUrl ? `${post.imageUrl}` : ''}
              user={post.user}
              createdAt={post.createdAt}
              viewsCount={post.viewsCount}
              commentsCount={post.commentsCount.length}
              tags={post.tags}
              isEditable={userData?._id === post.user._id}
              key={`homePost-${index}`}
            />)
          ))}
        </Grid>
        <Grid xs={4} item sx={{ display: { xs: 'none', md: 'block' } }}>
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
