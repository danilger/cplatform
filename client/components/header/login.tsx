'use client'
import { useEffect, useState } from "react";
import LoginForm from "../loginForm";
import { getCookie, deleteCookie } from 'cookies-next';
import DeleteHttpOnlyCookies from "@/helpers/cookies/deleteHttpOnlyCookie";


const Login = () => {
    const [showLoginForm, SetShowLoginForm] = useState(false)
    const [isLogin, setIsLogin] = useState(false)

    useEffect(() => {
        const loggedIn: any = getCookie('user_logged_in')
        setIsLogin(loggedIn)
    }, [])

    const CelarCookies = async () => {

        deleteCookie('user_logged_in')
        await DeleteHttpOnlyCookies(['access_token'])
        setIsLogin(false)
        window.location.replace('/')

    }

    let OnOf = (Set: Function): void => {
        Set((prev: any) => !prev)
    }

    return (

        <>

            {isLogin ?
                <div className="adminCase"><a href="/admin">Личный кабинет</a><div onClick={CelarCookies}>Выйти</div></div> :
                <div onClick={() => { OnOf(SetShowLoginForm) }}>Войти</div>
            }

            <LoginForm show={[showLoginForm, SetShowLoginForm, setIsLogin, OnOf]} />

        </>
    )
}
export default Login