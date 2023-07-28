const sendData = async (email: string, password: string): Promise<boolean> => {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    email: email,
    password: password,
  });

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    credentials: "include",
    body: raw,
    redirect: "follow",
  };

  const resp = await fetch("http://localhost:5000/auth/login", requestOptions)
    .then((response) => response.json())
    .then((response) => response)
    .catch((error) => console.log("error", error));
  return resp;
};

export default sendData;
