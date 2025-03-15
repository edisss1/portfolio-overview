import { BinanceTicker } from "./Ticker"

export interface Asset extends BinanceTicker {
    amount: number
}
