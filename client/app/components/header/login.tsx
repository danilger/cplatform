'use client'
import { useEffect, useState } from "react";
import LoginForm from "../loginForm";
import { getCookie, deleteCookie } from 'cookies-next';
import DeleteHttpOnlyCookies from "@/app/helpers/cookies/deleteHttpOnlyCookie";



const Login = () => {
    const [showLoginForm, SetShowLoginForm] = useState(false)
    const [isLogin, setIsLogin] = useState(false)

    useEffect(() => {
        const loggedIn: any = getCookie('user_logged_in')
        setIsLogin(loggedIn)
    }, [])

    const logOut = async () => {

        deleteCookie('user_logged_in')
        DeleteHttpOnlyCookies(['access_token'])
        setIsLogin(false)
        window.location.replace('/')

    }

    let OnOf = (Set: Function): void => {
        Set((prev: any) => !prev)
    }

    return (

        <>

            {isLogin ?
                <div className="adminCase"><a href="/admin">Личный кабинет</a><div onClick={logOut} className="loginButton">Выйти</div></div> :
                <div className="loginButton" onClick={() => { OnOf(SetShowLoginForm) }}>Войти</div>
            }

            <LoginForm show={[showLoginForm, SetShowLoginForm, setIsLogin, OnOf]} />

        </>
    )
}
export default Login