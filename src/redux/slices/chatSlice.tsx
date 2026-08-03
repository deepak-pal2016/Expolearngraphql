/* eslint-disable @typescript-eslint/no-unused-vars */
import { showSuccess } from '@components/Flashmessge';
import { LocalStorage } from '@helpers/localstorage';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { APiService } from '@services/index';

interface Chatprops {
  senderId: string;
  receiverId: string;
}

export const fetchuserchat = createAsyncThunk<
  Chatprops[],
  any,
  { rejectValue: { status: number; message: string } }
>('fetchuserchat', async (body, { rejectWithValue }) => {
  try {
    const response = await APiService.fetchuserchats(body);
    return response.data;
  } catch (err: any) {
    return rejectWithValue({
      status: err?.response?.status,
      message:
        err?.response?.data?.message || err?.message || 'Something went wrong',
    });
  }
});

const initialState = {
  data: [] as Chatprops[],
  isError: false,
  isLoader: false,
};

const chatSlice = createSlice({
    name:'fetchchat',
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder.addCase(fetchuserchat.pending, (state) => {
            state.isLoader = true;
        });
        builder.addCase(fetchuserchat.fulfilled, (state, action: PayloadAction<Chatprops[]>) => {
            state.isLoader = false;
            state.data = action.payload;
        });
        builder.addCase(fetchuserchat.rejected, (state, action) => {
            state.isLoader = false;
            state.isError = true;
        });
    },
})

export const FetchchatReducer = chatSlice.reducer