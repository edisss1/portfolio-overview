import { useDispatch } from "react-redux"
import "./TickersTable.scss"
import { AppDispatch } from "../../../redux/store"
import { removeAsset } from "../../../redux/slices/assetsSlice"
import { Asset } from "../../../types/Asset"

interface TickersTableProps {
    portfolioTickers: Asset[]
}

const TickersTable = ({ portfolioTickers }: TickersTableProps) => {
    const dispatch = useDispatch<AppDispatch>()

    const totalPortfolioValue = portfolioTickers.reduce(
        (acc, ticker) => acc + Number(ticker.amount) * Number(ticker.c),
        0
    )

    return (
        <div style={{ width: "100%" }}>
            {portfolioTickers.length === 0 && (
                <h1 className="empty-portfolio">
                    Нет активов в Вашем портфеле
                </h1>
            )}
            {portfolioTickers.length > 0 && (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Актив</th>
                            <th scope="col">Количество</th>
                            <th scope="col">Цена</th>
                            <th scope="col">Общая стоимость</th>
                            <th scope="col">Изм. за 24 ч.</th>
                            <th scope="col">% портфеля</th>
                        </tr>
                    </thead>
                    <tbody>
                        {portfolioTickers.map((ticker) => {
                            const totalAssetValue =
                                Number(ticker.amount) * Number(ticker.c)

                            const percentageOfPortfolio =
                                (totalAssetValue / totalPortfolioValue) * 100

                            return (
                                <tr
                                    className="asset-row"
                                    onClick={() =>
                                        dispatch(removeAsset(ticker.s))
                                    }
                                    key={ticker.s}
                                >
                                    <td>{ticker.s}</td>
                                    <td>{ticker.amount}</td>
                                    <td>{Number(ticker.c).toFixed(2)}</td>
                                    <td>
                                        {(
                                            Number(ticker.amount) *
                                            Number(ticker.c)
                                        ).toFixed(2)}
                                    </td>

                                    <td
                                        style={{
                                            color:
                                                Number(ticker.P) >= 0
                                                    ? "green"
                                                    : "red"
                                        }}
                                    >
                                        {Number(ticker.P).toFixed(2)}%
                                    </td>
                                    <td>{percentageOfPortfolio.toFixed(2)}%</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            )}
        </div>
    )
}
export default TickersTable
