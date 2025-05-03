import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Faculty } from '@sis/types';

interface FacultyState {
    faculty: { _id: string } & Faculty;
}

const initialState: FacultyState = {
    faculty: {
        _id: '',
        name: '',
        email: '',
        position: 'Professor',
        total_subjects: 0,
        total_classes: '',
    },
};

const facultySlice = createSlice({
    name: 'faculty',
    initialState,
    reducers: {
        setFaculty: (state, action: PayloadAction<{ _id: string } & Faculty>) => {
            state.faculty = { ...action.payload };
        },
    },
});

export const { setFaculty } = facultySlice.actions;
export const facultyReducer = facultySlice.reducer;
