import { createSlice } from "@reduxjs/toolkit";
import {
  fetchPosts,
  fetchPostsWithTag,
  fetchRemovePost,
  fetchTags,
  fetchLastComments,
  fetchPostById,
  fetchCommentsById,
  fetchCreateComment,
  fetchRemoveComment,
} from "../actions/posts";

const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
  comments: {
    items: [],
    status: "loading",
  },
  currentPost: {
    status: "loading",
    data: {},
    comments: {
      status: "loading",
      items: [],
    },
    comment: {
      text: "",
      status: "loaded"
    },
  },
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setCommentTextInput(state, action) {
      state.currentPost.comment.text = action.payload;
    },
  },
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.posts.status = "loading";
      state.posts.items = [];
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.status = "loaded";
      state.posts.items = action.payload;
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.status = "error";
      state.posts.items = [];
    },
    [fetchPostsWithTag.pending]: (state) => {
      state.posts.status = "loading";
      state.posts.items = [];
    },
    [fetchPostsWithTag.fulfilled]: (state, action) => {
      state.posts.status = "loaded";
      state.posts.items = action.payload;
    },
    [fetchPostsWithTag.rejected]: (state) => {
      state.posts.status = "error";
      state.posts.items = [];
    },
    [fetchTags.pending]: (state) => {
      state.tags.status = "loading";
      state.tags.items = [];
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.status = "loaded";
      state.tags.items = action.payload;
    },
    [fetchTags.rejected]: (state) => {
      state.tags.status = "error";
      state.tags.items = [];
    },
    [fetchRemovePost.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter(
        (post) => post._id !== action.meta.arg
      );
    },
    [fetchRemoveComment.fulfilled]: (state, action) => {
      state.currentPost.comments.items = state.currentPost.comments.items.filter(
        (comment) => comment._id !== action.meta.arg
      );
    },
    [fetchLastComments.pending]: (state) => {
      state.comments.status = "loading";
      state.comments.items = [];
    },
    [fetchLastComments.fulfilled]: (state, action) => {
      state.comments.status = "loaded";
      state.comments.items = action.payload;
    },
    [fetchLastComments.rejected]: (state) => {
      state.comments.status = "error";
      state.comments.items = [];
    },
    [fetchPostById.pending]: (state) => {
      state.currentPost.status = "loading";
      state.currentPost.data = {};
    },
    [fetchPostById.fulfilled]: (state, action) => {
      state.currentPost.status = "loaded";
      state.currentPost.data = action.payload;
    },
    [fetchPostById.rejected]: (state) => {
      state.currentPost.status = "error";
      state.currentPost.data = {};
    },
    [fetchCommentsById.pending]: (state) => {
      state.currentPost.comments.status = "loading";
      state.currentPost.comments.items = [];
    },
    [fetchCommentsById.fulfilled]: (state, action) => {
      state.currentPost.comments.status = "loaded";
      state.currentPost.comments.items = action.payload;
    },
    [fetchCommentsById.rejected]: (state) => {
      state.currentPost.comments.status = "error";
      state.currentPost.comments.items = [];
    },
    [fetchCreateComment.pending]: (state) => {
      state.currentPost.comment.status = 'loading';
    },
    [fetchCreateComment.fulfilled]: (state, action) => {
      state.currentPost.comments.items = action.payload;
      state.currentPost.comment.text = '';
      state.currentPost.comment.status = 'loaded';
    },
    [fetchCreateComment.rejected]: (state) => {
      state.currentPost.comment.status = 'error';
    },
  },
});

export default postsSlice.reducer;
