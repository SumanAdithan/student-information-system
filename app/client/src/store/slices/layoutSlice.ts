import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LayoutState {
    isSidebarOpen: boolean;
    isMenuBtnVisible: boolean;
    isMobile: boolean;
}

const initialState: LayoutState = {
    isSidebarOpen: true,
    isMenuBtnVisible: false,
    isMobile: false,
};

const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        setSidebarOpen: (state, action: PayloadAction<boolean>) => {
            state.isSidebarOpen = action.payload;
        },
        toggleSidebarOpen: (state) => {
            state.isSidebarOpen = !state.isSidebarOpen;
        },
        setMenuBtnVisible: (state, action: PayloadAction<boolean>) => {
            state.isMenuBtnVisible = action.payload;
        },
        setIsMobile: (state, action: PayloadAction<boolean>) => {
            state.isMobile = action.payload;
        },
    },
});

export const { setSidebarOpen, toggleSidebarOpen, setMenuBtnVisible, setIsMobile } = layoutSlice.actions;
export const layoutReducer = layoutSlice.reducer;
