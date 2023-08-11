import { response } from "express";
import comments from "../models/comments.js";

export const newComment = async (request, response) => {
  try {
    let commentData = await new comments(request.body);
    await commentData.save();
    response.status(200).json({ msg: "Comment has been saved succesfully." });
  } catch (error) {
    response.status(500).json({ error: error.msg });
  }
};

export const setComments = async (request, response) => {
  console.log(request.params.id);
  try {
    const getComment = await comments.find({ postId: request.params.id });
    response.status(200).json({
      msg: "Comments has been fetched successfully",
      data: getComment,
    });
  } catch (error) {
    response.status(500).json({ error: error.msg });
  }
};
