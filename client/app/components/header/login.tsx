'use client'

import LoginForm from "./loginForm";
import { deleteCookie } from 'cookies-next';
import DeleteHttpOnlyCookies from "@/app/helpers/cookies/deleteHttpOnlyCookie";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectIsLogin, setIsLogin } from "../store/slices/isLoginSlice";
import { setShowLoginForm } from "../store/slices/showLoginFormSlice";
import { useEffect } from "react";


const Login = () => {

    const isLogin = useAppSelector(selectIsLogin)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setIsLogin())
    }, [])

    const logOut = async () => {
        deleteCookie('user_logged_in')
        DeleteHttpOnlyCookies(['access_token'])
        dispatch(setIsLogin())
        window.location.replace('/')
    }


    return (

        <>
            {isLogin ?
                <div className="adminCase"><a href="/admin">Личный кабинет</a><div onClick={logOut} className="loginButton">Выйти</div></div> :
                <div className="loginButton" onClick={() => { dispatch(setShowLoginForm()) }}>Войти</div>
            }

            {<LoginForm />}
        </>

    )
}
export default Login