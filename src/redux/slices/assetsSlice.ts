import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { BinanceTicker } from "../../types/Ticker"
import { Asset } from "../../types/Asset"

interface AssetsState {
    assets: Asset[]
    selectedAsset: BinanceTicker | null
}

const loadAssets = () => {
    try {
        const data = localStorage.getItem("portfolio_assets")
        return data ? JSON.parse(data) : null
    } catch (error) {
        console.error(error)
        return []
    }
}

const initialState: AssetsState = {
    assets: loadAssets() || [],
    selectedAsset: null
}

const assetsSlice = createSlice({
    name: "assets",
    initialState,
    reducers: {
        selectAsset: (state, action: PayloadAction<BinanceTicker>) => {
            state.selectedAsset = action.payload
        },
        addAsset: (state, action: PayloadAction<Asset>) => {
            if (!state.assets?.some((asset) => asset.s === action.payload.s)) {
                state.assets?.push(action.payload)
                localStorage.setItem(
                    "portfolio_assets",
                    JSON.stringify(state.assets)
                )
            }
        },
        removeAsset: (state, action: PayloadAction<string>) => {
            state.assets = state.assets?.filter(
                (asset) => asset.s !== action.payload
            )
            localStorage.setItem(
                "portfolio_assets",
                JSON.stringify(state.assets)
            )
        },
        clearSelectedAsset: (state) => {
            state.selectedAsset = null
        },
        updateAsset: (state, action: PayloadAction<Asset>) => {
            state.assets = state.assets?.map((asset) => {
                if (asset.s === action.payload.s) {
                    return { ...asset, ...action.payload, amount: asset.amount }
                }
                return asset
            })
        }
    }
})

export const {
    addAsset,
    removeAsset,
    selectAsset,
    clearSelectedAsset,
    updateAsset
} = assetsSlice.actions

export default assetsSlice.reducer
