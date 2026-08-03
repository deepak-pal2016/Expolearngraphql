import {configureStore}  from '@reduxjs/toolkit';
import { baseApi } from './api';
import { authReducers  } from '@redux/slices/authSlice';


export const store = configureStore({
    reducer:{
        [baseApi.reducerPath]:baseApi.reducer,
        auth:authReducers
    },
    middleware:(getDefaultMiddleware)=> 
       getDefaultMiddleware().concat(baseApi.middleware), 
    
})