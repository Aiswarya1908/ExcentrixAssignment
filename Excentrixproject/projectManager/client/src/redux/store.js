import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './projectsSlice';
import filesReducer from './filesSlice';

export const store = configureStore({
    reducer: {
        projects: projectsReducer,
        files: filesReducer,
    },
});
