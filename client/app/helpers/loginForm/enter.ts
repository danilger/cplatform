import sendData from "./sendLoginData";
import * as Yup from 'yup';

const Enter = async (setIsLogin: Function, SetShowLoginForm: Function, email: string, password: string) => {

    const schema = Yup.object().shape({
        email: Yup.string().email().required('Email is required'),
        password: Yup.string().min(5, 'Password must be at least 8 characters').required('Password is required'),
    });

    try {
        await schema.validate({ email, password });
        const resp: any = await sendData(email!, password!)
        if (resp.token) {
            setIsLogin(true)
            SetShowLoginForm(false)
        };
    } catch (err) {
        if (err instanceof Yup.ValidationError) {
            alert(err.errors);
        }
    }
}

export default Enter