import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProfileState {
    name: string;
    role: string;
    profileImage: string;
}

const initialState: ProfileState = {
    name: '',
    role: '',
    profileImage: '',
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setRole: (state, action: PayloadAction<string>) => {
            state.role = action.payload;
        },
        setProfile: (state, action: PayloadAction<ProfileState>) => {
            return { ...state, ...action.payload };
        },
    },
});

export const { setRole, setProfile } = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
