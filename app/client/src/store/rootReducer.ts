import { combineReducers } from '@reduxjs/toolkit';
import { layoutReducer } from './slices/layoutSlice';
import { profileReducer } from './slices/profileSlice';
import { studentReducer } from './slices/studentSlice';
import { actionReducer } from './slices/actionSlice';
import { assignmentReducer } from './slices/assignmentSlice';
import { internalResultReducer } from './slices/internalResultSlice';
import { semesterResultReducer } from './slices/semesterResultSlice';
import { duesReducer } from './slices/duesSlice';
import { timetableReducer } from './slices/timetableSlice';
import { duesAndApprovalsReducer } from './slices/duesAndApprovalsSlice';
import { facultyReducer } from './slices/facultySlice';

const rootReducer = combineReducers({
    layout: layoutReducer,
    profile: profileReducer,
    student: studentReducer,
    action: actionReducer,
    assignment: assignmentReducer,
    internalResult: internalResultReducer,
    semesterResult: semesterResultReducer,
    dues: duesReducer,
    timetable: timetableReducer,
    duesAndApprovals: duesAndApprovalsReducer,
    faculty: facultyReducer,
});

export default rootReducer;
