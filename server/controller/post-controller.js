import post from "../models/post.js";

export const createPost = async (request, response) => {
  try {
    const postData = await request.body;
    if (!postData) {
      return response.status(400).json({ msg: "invalid request data" });
    }
    const newPostData = new post(postData);
    await newPostData.save();
    return response
      .status(200)
      .json({ msg: "Post has been saved successfully", data: newPostData });
  } catch (error) {
    return response
      .status(500)
      .json({ msg: "error from the server", msg: error.message });
  }
};

export const getPostData = async (request, response) => {
  let category = request.query.category;
  let getData;
  console.log(category);
  try {
    if (category) {
      getData = await post.find({ category: category });
    } else {
      getData = await post.find({});
    }

    return response.status(200).json(getData);
  } catch (error) {
    return response.status(500).json({ msg: "error while getting data" });
  }
};
export const getDataById = async (request, response) => {
  try {
    const Data = await post.findById(request.params.id);
    return response.status(200).json(Data);
  } catch (error) {
    return response.status(500).json(error);
  }
};

export const updatePostData = async (request, response) => {
  try {
    const updatedPost = await post.findById(request.params.id);
    console.log(updatedPost);
    if (!updatedPost) {
      return response.status(404).json({ msg: "post Data not found" });
    }

    await post.findByIdAndUpdate(request.params.id, { $set: request.body });
    return response
      .status(200)
      .json({ msg: "data has been updated succesfully." });
  } catch (error) {
    return response.status(404).json({ msg: "something error", error });
  }
};

export const deletePost = async (request, response) => {
  try {
    let DeletePost = await post.findById(request.params.id);
    if (!DeletePost) {
      return response.status(404).json({ msg: "post not found" });
    }

    await DeletePost.delete();
    return response
      .status(200)
      .json({ msg: "Post has been deleted successfully" });
  } catch (error) {
    return response.status(500).json({ error: error.msg });
  }
};
