import { lazy, useRef } from "react"

const Modal = lazy(() => import("../../atoms/Modal/Modal"))
import PlusIcon from "../../../assets/PlusIcon"
import Button from "../../atoms/Button/Button"
import Header from "../../atoms/Header/Header"
import TickersList from "../../atoms/TickersList/TickersList"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../../redux/store"
import { addAsset, clearSelectedAsset } from "../../../redux/slices/assetsSlice"
import {
    connectToWebSocket,
    disconnectFromWebSocket
} from "../../../utils/connectToWebSocket"

import "./NavBar.scss"

const NavBar = () => {
    const [amount, setAmount] = useState<number | null>(null)
    const [query, setQuery] = useState("")
    const dispatch = useDispatch<AppDispatch>()
    const modalRef = useRef<HTMLDialogElement | null>(null)

    const { tickers } = useSelector((state: RootState) => state.market)
    const { selectedAsset } = useSelector((state: RootState) => state.assets)

    const openModal = () => modalRef.current?.showModal()

    const filteredTickers = tickers
        .filter((ticker) =>
            ticker.s.toLowerCase().includes(query.toLowerCase())
        )
        .sort((a, b) => (a.h > b.h ? -1 : 1))

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (selectedAsset && amount) {
            const newAsset = { ...selectedAsset, amount }
            dispatch(addAsset(newAsset))
        }

        setAmount(null)
        dispatch(clearSelectedAsset())
        setQuery("")
        modalRef.current?.close()
    }

    useEffect(() => {
        if (modalRef.current) {
            disconnectFromWebSocket()
        } else {
            connectToWebSocket()
        }
    }, [modalRef.current])

    const clearForm = () => {
        dispatch(clearSelectedAsset())
        setAmount(null)
        setQuery("")
    }

    return (
        <>
            <Modal clearForm={clearForm} ref={modalRef}>
                <form onSubmit={handleSubmit} className="modal-content">
                    <input
                        name="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        type="text"
                        placeholder="Поиск валюты..."
                        className="modal-input"
                    />
                    <TickersList tickers={filteredTickers} />
                    {selectedAsset && (
                        <>
                            <span>{selectedAsset?.s}</span>

                            <input
                                name="amount"
                                required
                                placeholder="Количество"
                                className="modal-input"
                                type="number"
                                step="any"
                                min={0}
                                max={1000}
                                value={amount === null ? "" : amount}
                                onChange={(e) => {
                                    if (/^\d*\.?\d*$/.test(e.target.value)) {
                                        setAmount(
                                            e.target.value === ""
                                                ? null
                                                : parseFloat(e.target.value)
                                        )
                                    }
                                }}
                            />

                            <div className="modal-buttons">
                                <Button type="submit">Добавить</Button>
                                <Button
                                    onClick={() => modalRef.current?.close()}
                                >
                                    Отмена
                                </Button>
                            </div>
                        </>
                    )}
                </form>
            </Modal>
            <nav className="nav">
                <Header />
                <Button onClick={openModal}>
                    <PlusIcon />
                    <span>Добавить</span>
                </Button>
            </nav>
        </>
    )
}
export default NavBar
