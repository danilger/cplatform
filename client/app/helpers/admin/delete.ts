const DeletPost: Function = async (id: string): Promise<any> => {
  let myHeaders = new Headers();
  //myHeaders.append("Authorization", `Bearer ${accessToken}`);

  const requestOptions: RequestInit = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
    credentials: "include",
  };

  const result = await fetch(
    `http://${process.env.NEXT_PUBLIC_ENV_LOCAL_HOST}:${process.env.NEXT_PUBLIC_ENV_LOCAL_SERVER_PORT}/posts/${id}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      return result;
    })
    .catch((error) => console.log("error", error));
  return result;
};
export default DeletPost;
