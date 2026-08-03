/* eslint-disable @typescript-eslint/no-unused-vars */
import { showError } from '@components/Flashmessge';
import { LocalStorage } from '@helpers/localstorage';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout } from './fetures/auth/authslice';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://nannie-unfenestral-preculturally.ngrok-free.dev/api/',
  prepareHeaders: async (headers: any) => {
    const token = await LocalStorage.read('@token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});

const baseQueryWithInterceptor = async (
  args: any,
  api: any,
  extraOptions: any,
) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    showError(
      (result?.error?.data as { message: string })?.message ||
        'Invalid credentials',
    );
  }
  if(result?.error?.status === 404){
    showError(
      (result?.error?.data as { message: string })?.message ||
        'User not found',
    );
  }
  
    // console.log('Auto Logout');

    // api.dispatch(logout());
    // await LocalStorage.flushQuestionKeys();

  return result;
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
});
