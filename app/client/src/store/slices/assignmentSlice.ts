import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AssignmentResult } from '@sis/types';

interface AssignmentState {
    resultTitles: string[];
    assignmentResult: AssignmentResult;
}

const initialState: AssignmentState = {
    resultTitles: [],
    assignmentResult: {
        registerNo: 0,
        name: '',
        results: {
            one: [],
            two: [],
            three: [],
        },
    },
};

const assignmentSlice = createSlice({
    name: 'assignment',
    initialState,
    reducers: {
        setAssignment: (state, action: PayloadAction<AssignmentState>) => {
            return { ...state, ...action.payload };
        },
    },
});

export const { setAssignment } = assignmentSlice.actions;
export const assignmentReducer = assignmentSlice.reducer;
