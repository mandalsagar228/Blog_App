import express from "express";
import { signupUser, loginUser } from "../controller/user-controller.js";
import { UploadImage, getImage } from "../controller/Image-controller.js";
import upload from "../utils/upload.js";
import {
  createPost,
  getPostData,
  getDataById,
  updatePostData,
  deletePost,
} from "../controller/post-controller.js";
import { authenticateToken } from "../controller/jwt-controller.js";
import { newComment, setComments } from "../controller/comments-controller.js";

const Router = express.Router();
Router.post("/signup", signupUser);
Router.post("/login", loginUser);
Router.post("/upload/file", upload.single("file"), UploadImage);
Router.get("/file/:filename", getImage);
Router.post("/create", authenticateToken, createPost);
Router.get("/post", authenticateToken, getPostData);
Router.get("/getData/:id", authenticateToken, getDataById);
Router.put("/updateData/:id", authenticateToken, updatePostData);
Router.delete("/deletePost/:id", authenticateToken, deletePost);
Router.post("/comment/new", authenticateToken, newComment);
Router.get("/comments/:id", authenticateToken, setComments);

export default Router;
