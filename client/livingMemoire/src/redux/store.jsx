import {configureStore} from '@reduxjs/toolkit';
import profileReducer from '../redux/ProfileSlicer';

export const store = configureStore({
    reducer: {
        profile: profileReducer,
    }
})

