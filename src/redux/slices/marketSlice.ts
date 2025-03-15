import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { BinanceTicker } from "../../types/Ticker"

interface MarketState {
    tickers: BinanceTicker[]
}

const initialState: MarketState = {
    tickers: []
}

const marketSlice = createSlice({
    name: "market",
    initialState,
    reducers: {
        updateTickers: (state, action: PayloadAction<BinanceTicker[]>) => {
            state.tickers = action.payload
        }
    }
})
export const { updateTickers } = marketSlice.actions
export default marketSlice.reducer
