import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
    showModal: boolean;
    newSymbol: string;
}

const initialState: UIState = {
    showModal: false,
    newSymbol: 'bitcoin',
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setShowModal(state, action: PayloadAction<boolean>) {
            state.showModal = action.payload;
        },
        setNewSymbol(state, action: PayloadAction<string>) {
            state.newSymbol = action.payload;
        },
    },
});

export const { setShowModal, setNewSymbol } = uiSlice.actions;

export default uiSlice.reducer;
