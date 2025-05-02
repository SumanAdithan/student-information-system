import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DuesAndApprovals, UpdateDuesAndApprovalsDto } from '@sis/types';

interface DuesAndApprovalsState {
    duesAndApprovals: DuesAndApprovals;
    editDuesAndApprovals?: UpdateDuesAndApprovalsDto & {
        registerNo: number;
    };
}

const initialState: DuesAndApprovalsState = {
    duesAndApprovals: {
        name: '',
        registerNo: 0,
        course: '',
        branch: '',
        year: 0,
        isPartialPaid: false,
        semester: 0,
        pending: 0,
        approvals: {
            accountant: false,
            librarian: false,
            head_of_department: false,
            administrative_officer: false,
            principal: false,
        },
    },
    editDuesAndApprovals: {
        registerNo: 0,
        year: 0,
        semester: 0,
        approvals: {
            accountant: false,
            librarian: false,
            head_of_department: false,
            administrative_officer: false,
            principal: false,
        },
    },
};

const duesAndApprovalsSlice = createSlice({
    name: 'duesAndApprovals',
    initialState,
    reducers: {
        setDuesAndApprovals: (state, action: PayloadAction<DuesAndApprovalsState>) => {
            return { ...state, ...action.payload };
        },
        setEditDuesAndApprovals: (state, action: PayloadAction<any>) => {
            state.editDuesAndApprovals = action.payload;
        },
    },
});

export const { setDuesAndApprovals, setEditDuesAndApprovals } = duesAndApprovalsSlice.actions;
export const duesAndApprovalsReducer = duesAndApprovalsSlice.reducer;
