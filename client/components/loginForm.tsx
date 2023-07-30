'use client'

import { useEffect, useRef, useState } from "react";
import Enter from "@/helpers/loginForm/enter";
import Registrate from "@/helpers/loginForm/registrate";
import { Display } from "@/helpers/display";
import ResetPassword from "@/helpers/loginForm/resetPassword";



const LoginForm = ({ show: [showLoginForm, SetShowLoginForm, setIsLogin, OnOf] }: any) => {

    const popupBack = useRef<HTMLDivElement>(null)

    const emailRef1 = useRef<HTMLInputElement>(null);
    const passwordRef1 = useRef<HTMLInputElement>(null);
    const emailRef2 = useRef<HTMLInputElement>(null);
    const passwordRef2 = useRef<HTMLInputElement>(null);

    const registrationEmailRef = useRef<HTMLInputElement>(null);
    const registrationPasswordRef = useRef<HTMLInputElement>(null);
    const checkPasswordRef = useRef<HTMLInputElement>(null);




    const Login = () => {
        const email = emailRef1.current?.value || '';
        const password = passwordRef1.current?.value || '';
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
        const email = emailRef2.current?.value || '';
        const password = passwordRef2.current?.value || '';
        const res = await ResetPassword(email, password)
        alert('Письмо с сылкой для восстановления пароля отправленно вам на e-mail/')
    }



    const refs = useRef<HTMLDivElement[]>([]);

    const ref = (x: HTMLDivElement | null, index: number) => {
        x ? refs.current[index] = x : false;
    };

    const switcher = (action: number): void => {
        refs.current.forEach((el, k) => {
            if (el && el.style) {
                el.style.display = k === action ? 'flex' : 'none';
            }
        });
    };


    useEffect(() => { switcher(0) }, [])


    return (
        <div ref={popupBack} className="popupBack" style={Display(showLoginForm)}>
            <div className="shadow loginForm" onKeyDown={(e) => { if (e.key === 'Enter') { Login() } }}>


                <div className="close" onClick={() => { OnOf(SetShowLoginForm); switcher(0) }}>×</div>


                <div ref={el => ref(el, 0)} className="loginWrapper">
                    <h3>Войти</h3>
                    <input ref={emailRef1} name="email" type="email" className="inputField" placeholder="Email" />
                    <input ref={passwordRef1} name="password" type="password" className="inputField" placeholder="Password" />

                    <input className="btn btnprimary" type="button" name="enter" value="Войти" onClick={Login} />

                    <div onClick={() => switcher(1)}>Восстановить пароль</div>
                    <div onClick={() => switcher(2)}>Регистрация</div>
                </div>

                <div ref={el => ref(el, 1)} className="loginWrapper">
                    <h3>Восстаноление пароля</h3>
                    <input ref={emailRef2} name="email" type="email" className="inputField" placeholder="Email" />
                    <input ref={passwordRef2} name="password" type="password" className="inputField" placeholder="Password" />

                    <input className="btn btnprimary" type="button" name="enter" value="Восстановить" onClick={resetPassword} />

                    <div onClick={() => switcher(0)}>Войти</div>
                    <div onClick={() => switcher(2)}>Регистрация</div>
                </div>

                <div ref={el => ref(el, 2)} className="loginWrapper">
                    <h3>Регистрация</h3>
                    <input ref={registrationEmailRef} name="email" type="email" className="inputField" placeholder="Email" />
                    <input ref={registrationPasswordRef} name="password" type="password" className="inputField" placeholder="Password" />
                    <input ref={checkPasswordRef} name="password" type="password" className="inputField" placeholder="Enter the password again" />
                    <input className="btn btnprimary" type="button" name="enter" value="Зарегистрироваться" onClick={Registration} />
                    <div onClick={() => switcher(0)}>Войти</div>
                    <div onClick={() => switcher(1)}>Восстановить пароль</div>
                </div>

            </div>
        </div >
    )
}

export default LoginForm;
