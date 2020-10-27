import { createSlice } from '@reduxjs/toolkit'

export const historySlice = createSlice({
    name: 'history',
    initialState: {
        historyList: [],
    },
    reducers: {
        updateHistory: (state, action) => {
            state.historyList = action.payload
        },
        addPointToHistory: (state, action) => {
            state.historyList.push(action.payload)
        }
    }
});

export const {addPointToHistory, updateHistory} = historySlice.actions;
export const selectHistory = state => state.history.historyList;


export default historySlice.reducer;