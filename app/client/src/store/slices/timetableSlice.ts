import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StudentTimetable } from '@sis/types';

interface timetableState {
    timetable: StudentTimetable;
}

const initialState: timetableState = {
    timetable: {
        year: 1,
        timetable: {
            monday: { one: '', two: '', three: '', four: '', five: '', six: '' },
            tuesday: { one: '', two: '', three: '', four: '', five: '', six: '' },
            wednesday: { one: '', two: '', three: '', four: '', five: '', six: '' },
            thursday: { one: '', two: '', three: '', four: '', five: '', six: '' },
            friday: { one: '', two: '', three: '', four: '', five: '', six: '' },
        },
        timetableDetails: [{ subjectName: '', code: '', staff: '' }],
    },
};

const timetableSlice = createSlice({
    name: 'timetable',
    initialState,
    reducers: {
        setTimetable: (state, action: PayloadAction<StudentTimetable>) => {
            state.timetable = { ...action.payload };
        },
    },
});

export const { setTimetable } = timetableSlice.actions;
export const timetableReducer = timetableSlice.reducer;
