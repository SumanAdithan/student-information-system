import { createSlice, PayloadAction } from '@reduxjs/toolkit';
const apiUrl = import.meta.env.VITE_API_URL;
import { Student } from '@sis/types';

interface StudentState {
    student: { _id: string } & Student;
}

const initialState: StudentState = {
    student: {
        _id: '',
        profileImage: '',
        name: '',
        registerNo: 0,
        cgpa: 0,
        attendance: 0,
        dues: 0,
        dob: '',
        gender: 'Male',
        department: 'CSE',
        year: 1,
        regulation: '',
        semester: 1,
        batch: '',
        arrears: 0,
        degree: 'B.E',
        email: '',
        mobile: 0,
        accommodation: 'Day Scholar',
    },
};

const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        setStudent: (state, action: PayloadAction<{ _id: string } & Student>) => {
            const { profileImage } = action.payload;
            const profileImageUrl = profileImage ? `${apiUrl}/file/${action.payload.profileImage}` : '';
            state.student = { ...action.payload, profileImage: profileImageUrl };
        },
    },
});

export const { setStudent } = studentSlice.actions;
export const studentReducer = studentSlice.reducer;
