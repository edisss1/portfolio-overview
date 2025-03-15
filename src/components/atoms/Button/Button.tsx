import "./Button.scss"
interface ButtonProps {
    children: React.ReactNode
    onClick?: () => void
    type?: "submit" | "reset" | "button"
}

const Button = ({ children, onClick, type }: ButtonProps) => {
    return (
        <button type={type} onClick={onClick} className="btn">
            {children}
        </button>
    )
}
export default Button
