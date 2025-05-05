import { createSlice, PayloadAction } from '@reduxjs/toolkit';
const apiUrl = import.meta.env.VITE_API_URL;

interface ProfileState {
    name: string;
    role: string;
    profileImage: string;
    email: string;
}

const initialState: ProfileState = {
    name: '',
    role: '',
    profileImage: '',
    email: '',
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setRole: (state, action: PayloadAction<string>) => {
            state.role = action.payload;
        },
        setProfile: (_, action: PayloadAction<ProfileState>) => {
            const timestamp = Date.now();
            return { ...action.payload, profileImage: `${apiUrl}/profile-image?t=${timestamp}` };
        },
    },
});

export const { setRole, setProfile } = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
