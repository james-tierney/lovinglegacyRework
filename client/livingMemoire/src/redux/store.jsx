import {configureStore} from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import profileReducer from '../redux/ProfileSlicer';
import postsReducer from "../components/Profile/features/posts/postSlice";

export const store = configureStore({
    reducer: {
        profile: profileReducer,
        posts: postsReducer,
    }
})

