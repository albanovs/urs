import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from 'src/api';

export const fetchVisas = createAsyncThunk('visas/fetchVisas', async () => {
    const response = await api.get('/api/getworkvisa');
    return response.data;
});

const initialState = {
    visas: [],
    isLoading: false,
    error: null,
    isDataFetched: false,
};

const visasSlice = createSlice({
    name: 'visas',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchVisas.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchVisas.fulfilled, (state, action) => {
                state.isLoading = false;
                state.visas = action.payload;
                state.isDataFetched = true;
            })
            .addCase(fetchVisas.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export default visasSlice.reducer;