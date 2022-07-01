import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios/axios";

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async (_, thunkAPI) => {
        try {
            const { data } = await axios.get('/posts');
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue("При загрузке постов произошла ошибка.")
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

