import { configureStore } from "@reduxjs/toolkit"
import assetsSlice from "./slices/assetsSlice"
import marketSlice from "./slices/marketSlice"

export const store = configureStore({
    reducer: {
        assets: assetsSlice,
        market: marketSlice
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
