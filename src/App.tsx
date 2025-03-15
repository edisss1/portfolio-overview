import { useSelector } from "react-redux"
import TickersTable from "./components/molecules/TickersTable/TickersTable"
import NavBar from "./components/organisms/NavBar/NavBar"
import { RootState } from "./redux/store"
import { useEffect } from "react"
import {
    connectToWebSocket,
    disconnectFromWebSocket
} from "./utils/connectToWebSocket"

function App() {
    const { assets } = useSelector((state: RootState) => state.assets)

    useEffect(() => {
        connectToWebSocket()

        return () => disconnectFromWebSocket()
    }, [])

    return (
        <>
            <NavBar />
            <TickersTable portfolioTickers={assets} />
        </>
    )
}

export default App
