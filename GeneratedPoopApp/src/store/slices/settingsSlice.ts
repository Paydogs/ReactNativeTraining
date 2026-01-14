import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SettingsState, ThemeMode } from '../types';

const initialState: SettingsState = {
    theme: 'system',
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<ThemeMode>) => {
            state.theme = action.payload;
        },
    },
});

export const { setTheme } = settingsSlice.actions;
export default settingsSlice.reducer;
