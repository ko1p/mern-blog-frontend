import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios/axios";

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async (sortParam, thunkAPI) => {
        try {
            const { data } = await axios.get(`/posts?sortBy=${sortParam}`);
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue("При загрузке постов произошла ошибка.")
        }
    }
); // TODO Сохранить текст ошибок в redux, как-то отобразить их пользователю.

export const fetchPostsWithTag = createAsyncThunk(
    'posts/fetchPostsWithTag',
    async (tag, thunkAPI) => {
        try {
            const { data } = await axios.get(`/tags/${tag}`);
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue("При загрузке постов по тегу произошла ошибка.")
        }
    }
); // TODO Сохранить текст ошибок в redux, как-то отобразить их пользователю.

export const fetchPostById = createAsyncThunk(
    'posts/fetchPostById',
    async (id, thunkAPI) => {
        try {
            const { data } = await axios.get(`/posts/${id}`);
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue("При загрузке статьи произошла ошибка.")
        }
    }
); // TODO Сохранить текст ошибок в redux, как-то отобразить их пользователю.

export const fetchTags = createAsyncThunk(
    'posts/fetchTags',
    async (_, thunkAPI) => {
        try {
            const { data } = await axios.get('/tags');
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue("При загрузке тегов произошла ошибка.")
        }
    }
); // TODO Сохранить текст ошибок в redux, как-то отобразить их пользователю.

export const fetchRemovePost = createAsyncThunk(
    'posts/fetchRemovePost',
    async (id, thunkAPI) => {
        try {
            const { data } = await axios.delete(`/posts/${id}`);
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue("При удалении статьи произошла ошибка.")
        }
    }
); // TODO Сохранить текст ошибок в redux, как-то отобразить их пользователю.

export const fetchRemoveComment = createAsyncThunk(
    'comments/fetchRemoveComment',
    async (commentId, thunkAPI) => {
        try {
            const { data } = await axios.delete(`/comments/${commentId}`);
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue("При удалении комментария произошла ошибка.")
        }
    }
); // TODO Сохранить текст ошибок в redux, как-то отобразить их пользователю.

export const fetchLastComments = createAsyncThunk(
    'comments/fetchLastComments',
    async (_, thunkAPI) => {
        try {
            const { data } = await axios.get(`/comments`);
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue("При загрузке комментариев произошла ошибка.")
        }
    }
); // TODO Сохранить текст ошибок в redux, как-то отобразить их пользователю.

export const fetchCreateComment = createAsyncThunk(
    'comments/fetchCreateComment',
    async ({id, text}, thunkAPI) => {
        try {
            const { data } = await axios.post(`/comments/${id}`, {text});
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue("При отправке комментария на серевер произошла ошибка.")
        }
    }
); // TODO Сохранить текст ошибок в redux, как-то отобразить их пользователю.

export const fetchCommentsById = createAsyncThunk(
    'posts/fetchCommentsById',
    async (id, thunkAPI) => {
        try {
            const { data } = await axios.get(`/comments/${id}`);
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue("При загрузке комментариев произошла ошибка.")
        }
    }
); // TODO Сохранить текст ошибок в redux, как-то отобразить их пользователю.
