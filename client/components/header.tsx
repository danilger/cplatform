import Link from "next/link"
import LoginButton from "./header/loginButton"


const Header = () => {
    return (
        <header className="container">
            <nav className="headerNav shadow">
                <Link href="/">Логотип</Link>
                <LoginButton />
            </nav>
        </header>)
}

export default Header