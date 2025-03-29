import { combineReducers } from '@reduxjs/toolkit';
import { layoutReducer } from './slices/layoutSlice';
import { profileReducer } from './slices/profileSlice';
import { studentReducer } from './slices/studentSlice';

const rootReducer = combineReducers({
    layout: layoutReducer,
    profile: profileReducer,
    student: studentReducer,
});

export default rootReducer;
