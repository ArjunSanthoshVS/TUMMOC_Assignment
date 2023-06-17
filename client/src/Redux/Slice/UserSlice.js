import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import * as api from '../api'

export const signup = createAsyncThunk("signup", async ({ data, navigate }, { rejectWithValue }) => {
    try {
        const response = await api.signUp(data)
        navigate('/login')
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
export const login = createAsyncThunk("signup", async (data, { rejectWithValue }) => {
    try {
        const response = await api.login(data)
        window.location = "/"
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setLogout: (state, action) => {
            state.user = null
            localStorage.removeItem("userToken")
        },
    },
    extraReducers: {
        [login.fulfilled]: (state, action) => {
            state.loading = false
            localStorage.setItem("userToken", JSON.stringify({ ...action.payload }))
            state.user = action.payload
        },
        [signup.fulfilled]: (state, action) => {
            state.loading = false
            localStorage.setItem("userToken", JSON.stringify({ ...action.payload }))
            state.user = action.payload
        },
    }
})

export const { setUser, setLogout } = userSlice.actions

export default userSlice.reducer 