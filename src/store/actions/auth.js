import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios/axios";

export const fetchAuth = createAsyncThunk(
    'auth/fetchAuth',
    async (params, thunkAPI) => {
        try {
            const { data } = await axios.post('auth/login', params);
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue("При авторизации произошла ошибка.")
        }
    }
);

export const fetchAuthMe = createAsyncThunk(
    'auth/fetchAuth',
    async (_, thunkAPI) => {
        try {
            const { data } = await axios.get('auth/me');
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue("При авторизации произошла ошибка.")
        }
    }
);
