const DeleteHttpOnlyCookies = async (cookies: string[]) => {
  const send = async (name: string) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      cookieName: name,
    });
    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      credentials: "include",
      redirect: "follow",
    };
    await fetch(
      `http://${process.env.HOST}:${process.env.SERVER_PORT}/auth/logout`,
      requestOptions
    );
  };

  await Promise.all(cookies.map((cookie) => send(cookie)));
};

export default DeleteHttpOnlyCookies;
