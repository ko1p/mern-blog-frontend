import { createSlice } from "@reduxjs/toolkit";
import { fetchPosts, fetchPostsWithTag, fetchRemovePost, fetchTags } from "../actions/posts";

const initialState = {
    posts: {
        items: [],
        status: 'loading',
    },
    tags: {
        items: [],
        status: 'loading',
    },
};

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {

    }, 
    extraReducers: {
        [fetchPosts.pending]: (state) => {
            state.posts.status = 'loading';
            state.posts.items = [];
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts.status = 'loaded';
            state.posts.items = action.payload;
        },
        [fetchPosts.rejected]: (state) => {
            state.posts.status = 'error';
            state.posts.items = [];
        },
        [fetchPostsWithTag.pending]: (state) => {
            state.posts.status = 'loading';
            state.posts.items = [];
        },
        [fetchPostsWithTag.fulfilled]: (state, action) => {
            state.posts.status = 'loaded';
            state.posts.items = action.payload;
        },
        [fetchPostsWithTag.rejected]: (state) => {
            state.posts.status = 'error';
            state.posts.items = [];
        },
        [fetchTags.pending]: (state) => {
            state.tags.status = 'loading';
            state.tags.items = [];
        },
        [fetchTags.fulfilled]: (state, action) => {
            state.tags.status = 'loaded';
            state.tags.items = action.payload;
        },
        [fetchTags.rejected]: (state) => {
            state.tags.status = 'error';
            state.tags.items = [];
        },
        [fetchRemovePost.pending]: (state, action) => {
            state.posts.items = state.posts.items.filter(post => post._id !== action.meta.arg)
        },
     
    }
});

export default postsSlice.reducer;