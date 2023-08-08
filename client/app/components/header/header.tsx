import Link from "next/link"
import Login from "./login"


const Header = () => {
    return (
        <header className="container">
            <nav className="headerNav shadow">
                <Link href="/">Логотип</Link>
                <Login />
            </nav>
        </header>)
}

export default Header