import { useEffect } from "react"
import "./Modal.scss"

interface ModalProps {
    children: React.ReactNode
    ref: React.RefObject<HTMLDialogElement | null>
    clearForm: () => void
}

const Modal = ({ children, ref, clearForm }: ModalProps) => {
    const handleClickOutside = (e: MouseEvent) => {
        if (ref.current && !ref.current.contains(e.target as Node)) {
            clearForm()
            ref.current.close()
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)

        console.log("test")

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [ref.current])

    return (
        <dialog className="modal" ref={ref}>
            {children}
        </dialog>
    )
}
export default Modal
