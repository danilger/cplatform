const getAllPosts: Function = async (): Promise<any> => {

    const requestOptions: RequestInit = {
        method: 'GET',
        cache: 'no-store',
    };

    const result = await fetch("http://localhost:5000/posts/", requestOptions)
        .then(response => response.json())
        .then(result => result)
        .catch(error => console.log('error', error));
    return result
}



export default getAllPosts
