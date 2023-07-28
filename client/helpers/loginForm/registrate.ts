import * as Yup from 'yup';

const Registrate = async (email: string, password: string, role: string = 'user'): Promise<any> => {

    const schema = Yup.object().shape({
        email: Yup.string().email().required('Email is required'),
        password: Yup.string().min(5, 'Password must be at least 8 characters').required('Password is required'),
    });

    try {
        await schema.validate({ email, password });

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw: string = JSON.stringify({
            "email": email,
            "password": password,
            "role": role
        });

        const requestOptions: RequestInit = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        let res = await fetch("http://localhost:5000/auth/registration", requestOptions)
            .then(response => response.json())
            .then(result => result)
            .catch(error => console.log('error', error));
        res = res.statusCode == 400 ? false : true

        alert(res ? 'Пользователь зарегистрирован' : 'Пользователь с таким email уже зарегистрирован')

        return (res)
    } catch (err) {
        if (err instanceof Yup.ValidationError) {
            alert(err.errors);
        }
    }


}

export default Registrate