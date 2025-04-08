import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dues, PayDues, UpdateDues } from '@sis/types';

interface DuesState {
    dues: Dues;
    editDues?: UpdateDues;
    payDues: PayDues;
}

const initialState: DuesState = {
    dues: {
        name: '',
        registerNo: 0,
        year: 0,
        dues_details: {
            tuition_fee: {
                total: 0,
                offline: 0,
                online: 0,
                pending: 0,
                fully_paid: false,
            },
            bus_fee: {
                total: 0,
                offline: 0,
                online: 0,
                pending: 0,
                fully_paid: false,
            },
            stationary_fee: {
                total: 0,
                offline: 0,
                online: 0,
                pending: 0,
                fully_paid: false,
            },
            sports_placement_fee: {
                total: 0,
                offline: 0,
                online: 0,
                pending: 0,
                fully_paid: false,
            },
            apparel_fee: {
                total: 0,
                offline: 0,
                online: 0,
                pending: 0,
                fully_paid: false,
            },
            examination_fee: {
                total: 0,
                offline: 0,
                online: 0,
                pending: 0,
                fully_paid: false,
            },
            fine: {
                total: 0,
                offline: 0,
                online: 0,
                pending: 0,
                fully_paid: false,
            },
        },
        total_details: {
            total_amount: 0,
            paid_amount: 0,
            pending_amount: 0,
            isPartial_paid: false,
        },
        transaction_history: [],
    },
    editDues: {
        name: '',
        registerNo: 0,
        year: 0,
        amounts: {
            tuition_fee: 0,
            bus_fee: 0,
            stationary_fee: 0,
            sports_placement_fee: 0,
            apparel_fee: 0,
            examination_fee: 0,
            fine: 0,
        },
    },
    payDues: {
        year: 0,
        registerNo: 0,
        name: '',
        category: '',
        pending: 0,
    },
};

const duesSlice = createSlice({
    name: 'dues',
    initialState,
    reducers: {
        setDues: (state, action: PayloadAction<Dues>) => {
            state.dues = action.payload;
        },
        setEditDues: (state, action: PayloadAction<UpdateDues>) => {
            state.editDues = action.payload;
        },
        setPayDues: (state, action: PayloadAction<PayDues>) => {
            state.payDues = action.payload;
        },
    },
});

export const { setDues, setEditDues, setPayDues } = duesSlice.actions;
export const duesReducer = duesSlice.reducer;
