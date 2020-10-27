import {createSlice} from '@reduxjs/toolkit'

export const lastAddedPointSlice = createSlice({
    name: 'lastAddedPoint',
    initialState: {
        point: {
            x: null,
            y: null,
            r: null,
            res: null
        },
    },
    reducers: {
        addPoint: (state, action) => {
            state.point = action.payload
        }
    }
});

export const {addPoint} = lastAddedPointSlice.actions;
export const selectLastPoint = state => state.lastAddedPoint.point;

export default lastAddedPointSlice.reducer;