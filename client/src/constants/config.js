export const API_NOTIFICATION_MESSAGES = {
  loading: {
    title: "loading",
    message: "Data is being loaded.please wait",
  },
  success: {
    title: "success",
    message: "data has been loaded successfully",
  },
  responseFailure: {
    title: "error",
    message: "an error occured while fetching response  from the server",
  },
  requestFailure: {
    title: "error",
    message: "An error occured while parsing data",
  },
  networkerror: {
    title: "error",
    message:
      "unable to connect to the network,please check the internet connection.",
  },
};

export const SERVICE_URL = {
  userSignup: {
    url: "/signup",
    method: "POST",
  },
  userLogin: {
    url: "/login",
    method: "POST",
  },
  uploadFile: { url: "/upload/file", method: "POST" },
  createPost: {
    url: "/create",
    method: "POST",
  },
  getPostData: {
    url: "/post",
    method: "GET",
    params: true,
  },
  getPostById: {
    url: "/getData",
    method: "GET",
    query: true,
  },
  UpdatePost: {
    url: "/updateData",
    method: "PUT",
    query: true,
  },
  deletePostData: {
    url: "/deletePost",
    method: "DELETE",
    query: true,
  },
  postCommentData: {
    url: "/comment/new",
    method: "POST",
  },
  getAllComment: {
    url: "/comments",
    method: "GET",
    query: true,
  },
};
