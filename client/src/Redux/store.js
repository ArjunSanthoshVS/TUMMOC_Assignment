import { configureStore } from "@reduxjs/toolkit";
import userReducer from './Slice/UserSlice'
export default configureStore({
    reducer: {
        user: userReducer,
    },
    preloadedState: {
        user: {
            user: JSON.parse(localStorage.getItem('userToken'))
        }
    }
})