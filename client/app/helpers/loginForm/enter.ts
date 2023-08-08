import sendData from "./sendLoginData";
import * as Yup from "yup";
import { onIsLogin } from "@/app/components/store/slices/isLoginSlice";
import { offShowLoginForm } from "@/app/components/store/slices/showLoginFormSlice";

const Enter = async (dispatch: any, email: string, password: string) => {
  const schema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string()
      .min(5, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  try {
    await schema.validate({ email, password });
    const resp: any = await sendData(email!, password!);
    if (resp.token) {
      dispatch(onIsLogin());
      dispatch(offShowLoginForm());
    }
  } catch (err) {
    if (err instanceof Yup.ValidationError) {
      alert(err.errors);
    }
  }
};

export default Enter;
