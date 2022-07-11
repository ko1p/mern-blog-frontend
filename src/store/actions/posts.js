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

