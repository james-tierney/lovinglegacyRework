import {configureStore} from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import profileReducer from '../redux/ProfileSlicer';

export const store = configureStore({
    reducer: {
        profile: profileReducer,
    }
})

