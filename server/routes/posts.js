import express from "express";
import {
	getPosts,
	getPost,
	createPost,
	updatePost,
	likePost,
	deletePost,
} from "../controllers/postController.js";
import auth from "../middlewares/auth.js";

const Router = express.Router();

Router.get("/", getPosts);
Router.post("/create", auth, createPost);
Router.patch("/update/:id", auth, updatePost);
Router.delete("/delete/:id", auth, deletePost);
Router.patch("/:id/like", auth, likePost);

export default Router;
