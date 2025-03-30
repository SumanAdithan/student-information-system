import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EditModal {
    active: boolean;
    status: string;
}

interface ModalState {
    editModal: EditModal;
}

const initialState: ModalState = {
    editModal: {
        active: false,
        status: '',
    },
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        toggleModal: (state) => {
            state.editModal.active = !state.editModal.active;
        },
        setModal: (state, action: PayloadAction<EditModal>) => {
            state.editModal = action.payload;
        },
    },
});

export const { toggleModal, setModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
