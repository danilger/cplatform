import Link from "next/link"
import Login from "./header/login"


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