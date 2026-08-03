/* eslint-disable @typescript-eslint/no-unused-vars */
import { baseApi } from "../api";

interface Loginrequest {
    email:string;
    password:string;
    fcmtoken:string
}

interface signuprequest {
    name:string;
    mobile:number;
    email:string;
    fcmtoken:string;
    password:string
}

export const authApi = baseApi.injectEndpoints({
    endpoints:(builder) => ({
        login: builder.mutation<any,Loginrequest>({
            query:(body) => ({
                url:'loginuser',
                method:'POST',
                body,
            })
        }),
        signup:builder.mutation<any,signuprequest>({
            query:(body) => ({
                url:'adduser',
                method:'POST',
                body,
            })
        })
    }),
})

export const {useLoginMutation,useSignupMutation} = authApi