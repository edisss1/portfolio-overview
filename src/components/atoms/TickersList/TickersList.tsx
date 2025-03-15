import { useDispatch } from "react-redux"
import { BinanceTicker } from "../../../types/Ticker"
import "./TickersList.scss"
import { AppDispatch } from "../../../redux/store"
import { selectAsset } from "../../../redux/slices/assetsSlice"

interface TickersListProps {
    tickers: BinanceTicker[]
}

const TickersList = ({ tickers }: TickersListProps) => {
    const dispatch = useDispatch<AppDispatch>()

    return (
        <ul className="list">
            {tickers.map((ticker) => (
                <li key={ticker.s}>
                    <button
                        type="button"
                        onClick={() => dispatch(selectAsset(ticker))}
                    >
                        <span>{ticker.s}</span>
                        <span>{Number(ticker.c).toFixed(2)}%</span>
                    </button>
                </li>
            ))}
        </ul>
    )
}
export default TickersList
