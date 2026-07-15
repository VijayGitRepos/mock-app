import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../services/authService";

const token  = localStorage.getItem('token')
const initialState = {
    user:null,
    token,
    loading:false,
    error:null
}

export const login = createAsyncThunk('/login', async(userData)=>{
    try {
        return await loginUser(userData)
    } catch (error) {
        console.log('Error Login Auth slice',error);
        return error;
    }
})

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        logOut:(state)=>{
            state.user=null;
            state.token=null;
            localStorage.removeItem('token')
        },
    },
    extraReducers:(builder)=>{
        builder
            .addCase(login.pending,(state)=>{
                state.loading = true;
            })
            .addCase(login.fulfilled, (state,action)=>{
                state.loading = false;
                console.log('Action',action.payload)
                state.token = action.payload;
                state.user = action.payload.user;
            })
            .addCase(login.rejected,(state,action)=>{
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export const{logOut} = authSlice.actions;
export default authSlice.reducer;