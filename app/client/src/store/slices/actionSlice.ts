import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EditModal {
    active: boolean;
    status: string;
}

interface ActionState {
    view: boolean;
    editModal: EditModal;
}

const initialState: ActionState = {
    view: false,
    editModal: {
        active: false,
        status: '',
    },
};

const actionSlice = createSlice({
    name: 'action',
    initialState,
    reducers: {
        toggleView: (state) => {
            state.view = !state.view;
        },
        closeView: (state) => {
            state.view = false;
        },
        toggleModal: (state) => {
            state.editModal.active = !state.editModal.active;
        },
        setModal: (state, action: PayloadAction<EditModal>) => {
            state.editModal = action.payload;
        },
    },
});

export const { toggleView, closeView, toggleModal, setModal } = actionSlice.actions;
export const actionReducer = actionSlice.reducer;
