import { createSlice } from "@reduxjs/toolkit";

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

    }
});

export default postsSlice.reducer;