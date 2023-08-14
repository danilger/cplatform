import { cookies } from "next/headers";

const RoleGuard = async (role: string) => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access_token");
  const isLogin = cookieStore.get("user_logged_in")?.value;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({ token: accessToken?.value });

  const requestOptions: any = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const user: any = await fetch(
    `http://${process.env.NEXT_PUBLIC_ENV_LOCAL_HOST}:${process.env.NEXT_PUBLIC_ENV_LOCAL_SERVER_PORT}/auth/guard`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => console.log("error", error));

    console.log(user);

    if (isLogin && user && user.roles.includes(role)) {
      return user;
    }
  return false;
};

export default RoleGuard;
