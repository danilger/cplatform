'use client'

import { useRef, useState } from "react";
import Enter from "@/helpers/loginForm/enter";
import Registrate from "@/helpers/loginForm/registrate";
import { Display } from "@/helpers/display";
import ResetPassword from "@/helpers/loginForm/resetPassword";


const LoginForm = ({ show: [showLoginForm, SetShowLoginForm, setIsLogin, OnOf] }: any) => {

    const popupBack = useRef<HTMLDivElement>(null)
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);


    const registrationEmailRef = useRef<HTMLInputElement>(null);
    const registrationPasswordRef = useRef<HTMLInputElement>(null);
    const checkPasswordRef = useRef<HTMLInputElement>(null);


    const [loginFormDisplay, SetLoginFormDisplay] = useState(false)
    const [resetState, SetResetState] = useState(false)


    const Login = () => {
        const email = emailRef.current?.value || '';
        const password = passwordRef.current?.value || '';
        Enter(setIsLogin, SetShowLoginForm, email, password)
    }


    const Registration = async () => {
        const email = registrationEmailRef.current?.value || '';
        const password = registrationPasswordRef.current?.value || '';
        const password2 = checkPasswordRef.current?.value || false;

        if (password == password2 && password2) {

            const res: boolean = await Registrate(email, password)

            if (res) {
                OnOf(SetShowLoginForm)
                Enter(setIsLogin, SetShowLoginForm, email, password)
            }

        } else { alert('Пароли не совпадают') }

    }


    const resetPassword = async () => {
        const email = emailRef.current?.value || '';
        const password = passwordRef.current?.value || '';
        const res = await ResetPassword(email, password)
        console.log(res)
        alert('Письмо с сылкой для восстановления пароля отправленно вам на e-mail/')
    }

    return (
        <div ref={popupBack} className="popupBack" style={Display(showLoginForm)}>
            <div className="shadow loginForm" onKeyDown={(e) => { if (e.key === 'Enter') { Login() } }}>


                <div className="close" onClick={() => { OnOf(SetShowLoginForm); SetLoginFormDisplay(false); SetResetState(true) }}>×</div>

                <div className="loginWrapper" style={Display(!loginFormDisplay)}>
                    <h3 style={Display(resetState)}>Войти</h3>
                    <h3 style={Display(!resetState)}>Восстаноление пароля</h3>
                    <input ref={emailRef} name="email" type="email" className="inputField" placeholder="Email" />
                    <input ref={passwordRef} name="password" type="password" className="inputField" placeholder="Password" />

                    <input className="btn btnprimary" type="button" name="enter" value="Войти" style={Display(resetState)} onClick={Login} />
                    <input className="btn btnprimary" type="button" name="enter" value="Восстановить" style={Display(!resetState)} onClick={resetPassword} />

                    <div onClick={() => OnOf(SetResetState)} style={Display(!resetState)}>Вход</div>
                    <div onClick={() => OnOf(SetLoginFormDisplay)}>Регистрация</div>
                    <div onClick={() => OnOf(SetResetState)} style={Display(resetState)}>Восстановить пароль</div>
                </div>

                <div className="registrationWrapper" style={Display(loginFormDisplay)}>
                    <h3>Регистрация</h3>
                    <input ref={registrationEmailRef} name="email" type="email" className="inputField" placeholder="Email" />
                    <input ref={registrationPasswordRef} name="password" type="password" className="inputField" placeholder="Password" />
                    <input ref={checkPasswordRef} name="password" type="password" className="inputField" placeholder="Enter the password again" />
                    <input className="btn btnprimary" type="button" name="enter" value="Зарегистрироваться" onClick={Registration} />
                    <div onClick={() => { OnOf(SetLoginFormDisplay); SetResetState(true) }}>Войти</div>
                    <div onClick={() => { OnOf(SetLoginFormDisplay); SetResetState(false) }} >Восстановить пароль</div>
                </div>


            </div>
        </div >
    )
}

export default LoginForm;
