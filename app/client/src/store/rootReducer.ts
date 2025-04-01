import { combineReducers } from '@reduxjs/toolkit';
import { layoutReducer } from './slices/layoutSlice';
import { profileReducer } from './slices/profileSlice';
import { studentReducer } from './slices/studentSlice';
import { actionReducer } from './slices/actionSlice';

const rootReducer = combineReducers({
    layout: layoutReducer,
    profile: profileReducer,
    student: studentReducer,
    action: actionReducer,
});

export default rootReducer;
