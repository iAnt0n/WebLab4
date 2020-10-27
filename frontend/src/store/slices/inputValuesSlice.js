import { createSlice } from '@reduxjs/toolkit'

export const inputValuesSlice = createSlice({
    name: 'inputValues',
    initialState: {
        r: localStorage.getItem("currentR")==null ? 1: Number(localStorage.getItem("currentR"))
    },
    reducers: {
        changeR: (state, action) => {
            state.r = action.payload
        }
    }
});

export const {changeR} = inputValuesSlice.actions;
export const selectR = state => state.inputValues.r;

export default inputValuesSlice.reducer