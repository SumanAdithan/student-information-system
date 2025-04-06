import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SemesterResult, UpdateSemesterResult } from '@sis/types';

interface SemesterResultState {
    resultTitles: string[];
    semesterResult: SemesterResult;
    editSemesterResult?: UpdateSemesterResult;
}

const initialState: SemesterResultState = {
    resultTitles: [],
    semesterResult: {
        registerNo: 0,
        year: 0,
        name: '',
        results: {
            one: [],
            two: [],
            three: [],
            four: [],
            five: [],
            six: [],
            seven: [],
            eight: [],
        },
    },
    editSemesterResult: {
        registerNo: 0,
        name: '',
        year: 0,
        subject: '',
        status: false,
        result: 'one',
        code: '',
        grade: '-',
    },
};

const semesterResultSlice = createSlice({
    name: 'semesterResult',
    initialState,
    reducers: {
        setSemesterResult: (state, action: PayloadAction<SemesterResultState>) => {
            return { ...state, ...action.payload };
        },
        setEditSemesterResult: (state, action: PayloadAction<UpdateSemesterResult>) => {
            state.editSemesterResult = action.payload;
        },
    },
});

export const { setSemesterResult, setEditSemesterResult } = semesterResultSlice.actions;
export const semesterResultReducer = semesterResultSlice.reducer;
