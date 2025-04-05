import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InternalResult } from '@sis/types';

interface EditInternalResultState {
    registerNo: number;
    name: string;
    subject: string;
    result: 'one' | 'two' | 'three' | 'four';
    status: boolean;
    year: number;
    code: string;
    mark: number;
}

interface InternalResultState {
    resultTitles: string[];
    internalResult: InternalResult;
    editInternalResult?: EditInternalResultState;
}

const initialState: InternalResultState = {
    resultTitles: [],
    internalResult: {
        registerNo: 0,
        year: 0,
        name: '',
        results: {
            one: [],
            two: [],
            three: [],
            four: [],
        },
    },
    editInternalResult: {
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

const internalResultSlice = createSlice({
    name: 'internalResult',
    initialState,
    reducers: {
        setInternalResult: (state, action: PayloadAction<InternalResultState>) => {
            return { ...state, ...action.payload };
        },
        setEditInternalResult: (state, action: PayloadAction<EditInternalResultState>) => {
            state.editInternalResult = action.payload;
        },
    },
});

export const { setInternalResult, setEditInternalResult } = internalResultSlice.actions;
export const internalResultReducer = internalResultSlice.reducer;
