const ResetPassword = async (email: string, password: string) => {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    email: email,
    password: password,
  });

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return await fetch(
    `http://${process.env.NEXT_PUBLIC_ENV_LOCAL_HOST}:${process.env.NEXT_PUBLIC_ENV_LOCAL_SERVER_PORT}/auth/changepassword`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => console.log("error", error));
};

export default ResetPassword;
