import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LayoutState {
    isSidebarOpen: boolean;
    isMenuBtnVisible: boolean;
    isMobile: boolean;
    activeSelect: string | null;
}

const initialState: LayoutState = {
    isSidebarOpen: true,
    isMenuBtnVisible: false,
    isMobile: false,
    activeSelect: null,
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
        toggleSelect: (state, action: PayloadAction<string>) => {
            const key = action.payload;
            state.activeSelect = state.activeSelect === key ? null : key;
        },
    },
});

export const { setSidebarOpen, toggleSidebarOpen, setMenuBtnVisible, setIsMobile, toggleSelect } = layoutSlice.actions;
export const layoutReducer = layoutSlice.reducer;
