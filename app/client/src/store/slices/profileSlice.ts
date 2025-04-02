import { createSlice, PayloadAction } from '@reduxjs/toolkit';
const apiUrl = import.meta.env.VITE_API_URL;

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
        setProfile: (_, action: PayloadAction<ProfileState>) => {
            const { profileImage } = action.payload;
            const profileImageUrl = profileImage ? `${apiUrl}/file/${action.payload.profileImage}` : '';
            return { ...action.payload, profileImage: profileImageUrl };
        },
    },
});

export const { setRole, setProfile } = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
