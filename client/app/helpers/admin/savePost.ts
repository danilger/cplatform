import { offDisplayCreatePost } from "@/app/components/store/slices/panelSlice";
import { fetchAllPosts } from "@/app/components/store/slices/showPostsSlice";

const SavePost = (formData: FormData, dispatch: Function) => {
  var requestOptions: RequestInit = {
    method: "POST",
    body: formData,
    redirect: "follow",
    credentials: "include",
  };

  fetch(
    `http://${process.env.NEXT_PUBLIC_ENV_LOCAL_HOST}:${process.env.NEXT_PUBLIC_ENV_LOCAL_SERVER_PORT}/posts/`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      dispatch(fetchAllPosts());
      dispatch(offDisplayCreatePost());
    })
    .catch((error) => console.log("error", error));
};

export default SavePost;
