import { combineReducers } from '@reduxjs/toolkit';
import { layoutReducer } from './slices/layoutSlice';
import { profileReducer } from './slices/profileSlice';
import { studentReducer } from './slices/studentSlice';
import { modalReducer } from './slices/modalSlice';

const rootReducer = combineReducers({
    layout: layoutReducer,
    profile: profileReducer,
    student: studentReducer,
    modal: modalReducer,
});

export default rootReducer;
