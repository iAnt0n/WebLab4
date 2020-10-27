import { configureStore } from '@reduxjs/toolkit'
import inputValuesReducer from "./slices/inputValuesSlice";
import historyReducer from './slices/historySlice'
import lastAddedPointReducer from "./slices/lastAddedPointSlice";

export default configureStore({
    reducer: {
        inputValues: inputValuesReducer,
        history: historyReducer,
        lastAddedPoint: lastAddedPointReducer
    }
})