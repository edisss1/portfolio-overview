import { updateAsset } from "../redux/slices/assetsSlice"
import { updateTickers } from "../redux/slices/marketSlice"
import { store } from "../redux/store"
import { Asset } from "../types/Asset"
import { BinanceTicker } from "../types/Ticker"

const SOCKET_URL = "wss://stream.binance.com:9443/stream?streams=!ticker@arr"

let socket: WebSocket | null = null

export const connectToWebSocket = () => {
    if (socket) return

    socket = new WebSocket(SOCKET_URL)

    socket.onopen! = () => {
        const subscriptionMessage = {
            method: "SUBSCRIBE",
            params: ["!ticker@arr"],
            id: 1
        }

        socket?.send(JSON.stringify(subscriptionMessage))
    }

    socket.onerror! = (error) => {
        console.error("WebSocket error:", error)
    }

    socket.onmessage! = (event) => {
        const response = JSON.parse(event.data)

        if (!response || response.result === null) {
            return
        }

        const tickers: BinanceTicker[] = response.data
        store.dispatch(updateTickers(tickers))

        tickers.forEach((ticker) => {
            store.dispatch(updateAsset(ticker as Asset))
        })
    }
}

export const disconnectFromWebSocket = () => {
    if (socket) {
        socket.close()
        socket = null
    }
}
