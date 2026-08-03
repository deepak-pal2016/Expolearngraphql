/* eslint-disable @typescript-eslint/no-unused-vars */
import { showSuccess } from '@components/Flashmessge';
import { LocalStorage } from '@helpers/localstorage';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { APiService } from '@services/index';

interface User {
  _id: string;
  name: string;
  email: string;
}

interface SigninUserResponse {
  token: string;
  user: User;
}

interface AuthState {
  token: string | null;
  data: User | null;
  isError: boolean;
  isLoader: boolean;
}

export const Loginuser = createAsyncThunk<
  SigninUserResponse,
  any,
  { rejectValue: { status: number; message: string } }
>('auth/login', async (body, { rejectWithValue }) => {
  try {
    const response = await APiService.login(body);
    return response.data;
  } catch (err: any) {
    return rejectWithValue({
      status: err?.response?.status,
      message:
        err?.response?.data?.message || err?.message || 'Something went wrong',
    });
  }
});

export const Registeruser = createAsyncThunk<
  SigninUserResponse,
  any,
  { rejectValue: { status: number; message: string } }
>('register', async (body, { rejectWithValue }) => {
  try {
    const response = await APiService.signup(body);
    return response?.data;
  } catch (err: any) {
    return rejectWithValue({
      status: err?.response?.status,
      message:
        err?.response?.data?.message || err?.message || 'Something went wrong',
    });
  }
});

export const Logoutuser = createAsyncThunk<
  any,
  { rejectValue: { status: number; message: string } }
>('logout', async (body, { rejectWithValue }) => {
  try {
    const response = await APiService.logout(body);
    return response.data;
  } catch (err: any) {
    return rejectWithValue({
      status: err?.response?.status,
      message:
        err?.response?.data?.message || err?.message || 'Something went wrong',
    });
  }
});

const initialState: AuthState = {
  token: null,
  data: null,
  isError: false,
  isLoader: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    Logout: state => {
      state.data = null;
      LocalStorage.removeItem('@user');
      LocalStorage.removeItem('@token');
      LocalStorage.removeItem('@login');
      LocalStorage.flushQuestionKeys();
      showSuccess('Logout Successfully..');
    },
    Userauthenticate: (state, action) => {
      state.data = action.payload;
      state.token = action.payload.token || null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(Loginuser.pending, state => {
        state.isLoader = true;
        state.isError = false;
      })
      .addCase(
        Loginuser.fulfilled,
        (state, action: PayloadAction<SigninUserResponse>) => {
          state.isLoader = false;
          state.isError = false;
          state.token = action.payload.token;
          state.data = action.payload.user;
        },
      )
      .addCase(Loginuser.rejected, state => {
        state.isLoader = false;
        state.isError = true;
      });
  },
});

const registerSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(Registeruser.pending, (state, action) => {
      state.isLoader = true;
    }),
      builder.addCase(Registeruser.fulfilled, (state, action) => {
        state.isLoader = false;
        state.isError = false;
        state.data = action.payload.user;
      }),
      builder.addCase(Registeruser.rejected, (state, action) => {
        state.isLoader = false;
        state.isError = false;
        //@ts-ignore
        state.data = [];
      });
  },
});

const LogoutSlice = createSlice({
  name: 'logout',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(Logoutuser.pending, state => {
        state.isLoader = true;
      })
      .addCase(Logoutuser.fulfilled, state => {
        state.isLoader = false;
        state.isError = false;
        state.data = null;
      })
      .addCase(Logoutuser.rejected, state => {
        state.isLoader = false;
        state.isError = true;
      });
  },
});

export const { Userauthenticate,Logout } = authSlice.actions;
export const AuthReducers = authSlice.reducer;
export const RegisterReducers = registerSlice.reducer;
export const LogoutReucers = LogoutSlice.reducer;
