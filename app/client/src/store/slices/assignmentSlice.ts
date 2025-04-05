import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AssignmentResult } from '@sis/types';

interface EditAssignmentState {
    registerNo: number;
    name: string;
    subject: string;
    result: 'one' | 'two' | 'three';
    status: boolean;
    year: number;
    code: string;
    mark: number;
}

interface AssignmentState {
    resultTitles: string[];
    assignmentResult: AssignmentResult;
    editAssignmentResult?: EditAssignmentState;
}

const initialState: AssignmentState = {
    resultTitles: [],
    assignmentResult: {
        registerNo: 0,
        year: 0,
        name: '',
        results: {
            one: [],
            two: [],
            three: [],
        },
    },
    editAssignmentResult: {
        registerNo: 0,
        name: '',
        year: 0,
        subject: '',
        status: false,
        result: 'one',
        code: '',
        mark: 0,
    },
};

const assignmentSlice = createSlice({
    name: 'assignment',
    initialState,
    reducers: {
        setAssignment: (state, action: PayloadAction<AssignmentState>) => {
            return { ...state, ...action.payload };
        },
        setEditAssignment: (state, action: PayloadAction<EditAssignmentState>) => {
            state.editAssignmentResult = action.payload;
        },
    },
});

export const { setAssignment, setEditAssignment } = assignmentSlice.actions;
export const assignmentReducer = assignmentSlice.reducer;
