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
); // TODO Сохранить текст ошибок в redux, как-то отобразить их пользователю.
