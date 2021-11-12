import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseURL from "../utils/baseUrl";
import { handleApiError } from "../utils/errorHandler";

export const contactCreateAsync = createAsyncThunk(
    "contact/contactCreateAsync",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await axios({
                method: 'POST',
                url: `${baseURL}/api/contact/`,
                data: payload
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(handleApiError(error.response))
        }
    }
);

export const contactDeleteAsync = createAsyncThunk(
    "contact/contactDeleteAsync",
    async (payload, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.delete(`${baseURL}/api/contact/`+ payload.id);
            dispatch(contactFetchAsync())
            return response.data;
        } catch (error) {
            return rejectWithValue(handleApiError(error.response))
        }
    }
);


export const contactFetchAsync = createAsyncThunk(
    "contact/contactFetchAsync",
    async (rejectWithValue) => {
        try {
            const response = await axios.get(baseURL + "/api/contact");
            return response.data;
        } catch (error) {
            return rejectWithValue(handleApiError(error.response))
        }
    }
);



export const contactFetchOneAsync = createAsyncThunk(
    "contact/contactFetchOneAsync",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await axios.get(baseURL + `api/contact/${payload.id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(handleApiError(error.response))
        }
    }
);

export const contactUpdateAsync = createAsyncThunk(
    "contact/contactUpdateAsync",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await axios.put(baseURL + "api/contact/" + payload.id, { "payment_status": payload.payment_status });
            return response.data;
        } catch (error) {
            return rejectWithValue(handleApiError(error.response))
        }
    }
);

const initialState = {
    errorMessage: "",
    status: "idle",
    contact: "",
    isFetching: false,
    isSuccess: false,
    isError: false,
    contacts: []
};

const contactSlice = createSlice({
    name: "contact",
    initialState,
    reducers: {
        contactClearState: (state) => {
            state.status = 'idle';
            state.isFetching = false;
            state.isSuccess = false;
            state.isError = false;
            state.errorMessage = "";
        },
    },
    extraReducers: {
        // Create
        [contactCreateAsync.pending]: (state) => {
            state.status = 'pending'
            state.isFetching = true
        },
        [contactCreateAsync.fulfilled]: (state, action) => {
            state.status = "success";
            state.isFetching = false;
            state.isSuccess = true;
        },
        [contactCreateAsync.rejected]: (state, { payload }) => {
            state.isFetching = false
            state.status = 'failed';
            state.isError = true;
            state.errorMessage = payload;
        },

        // Fetch All
        [contactFetchAsync.pending]: (state) => {
            state.status = 'pending'
            state.isFetching = true
        },
        [contactFetchAsync.fulfilled]: (state, { payload }) => {
            state.status = "success";
            state.isFetching = false
            state.contacts = payload;
        },
        [contactFetchAsync.rejected]: (state, { payload }) => {
            state.status = 'failed';
            state.isError = true;
            state.errorMessage = payload;
        },

        // Fetch One
        [contactFetchOneAsync.pending]: (state) => {
            state.status = 'pending'
            state.isFetching = true
        },
        [contactFetchOneAsync.fulfilled]: (state, { payload }) => {
            state.status = "success";
            state.isFetching = false
            state.contact = payload;
        },
        [contactFetchOneAsync.rejected]: (state, { payload }) => {
            state.status = 'failed';
            state.isError = true;
            state.errorMessage = payload;
        },

        // Update
        [contactUpdateAsync.pending]: (state) => {
            state.status = 'pending'
            state.isFetching = true
        },
        [contactUpdateAsync.fulfilled]: (state, { payload }) => {
            state.status = "success";
            state.isFetching = false
            state.message = payload;
        },
        [contactUpdateAsync.rejected]: (state, { payload }) => {
            state.status = 'failed';
            state.isError = true;
            state.errorMessage = payload;
        },
    },
});

export const { contactClearState } = contactSlice.actions;
export default contactSlice.reducer;
