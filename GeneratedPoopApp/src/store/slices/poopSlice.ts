import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PoopEntry, PoopState } from '../types';

const initialState: PoopState = {
    entries: [],
};

const poopSlice = createSlice({
    name: 'poop',
    initialState,
    reducers: {
        addPoop: (state, action: PayloadAction<{ size: PoopEntry['size'] }>) => {
            const newEntry: PoopEntry = {
                id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                timestamp: new Date().toISOString(),
                size: action.payload.size,
            };
            state.entries.unshift(newEntry);
        },
        removePoop: (state, action: PayloadAction<string>) => {
            state.entries = state.entries.filter((entry) => entry.id !== action.payload);
        },
        clearAll: (state) => {
            state.entries = [];
        },
    },
});

export const { addPoop, removePoop, clearAll } = poopSlice.actions;
export default poopSlice.reducer;
