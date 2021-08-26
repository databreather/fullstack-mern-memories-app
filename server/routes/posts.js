import express from "express";
import {
	getPosts,
	searchPosts,
	getPost,
	createPost,
	updatePost,
	likePost,
	commentPost,
	deletePost,
} from "../controllers/postController.js";
import auth from "../middlewares/auth.js";

const Router = express.Router();

Router.get("/", getPosts);
Router.get("/search", searchPosts);
Router.get("/:id", getPost);
Router.post("/create", auth, createPost);
Router.patch("/update/:id", auth, updatePost);
Router.delete("/delete/:id", auth, deletePost);
Router.patch("/:id/like", auth, likePost);
Router.post("/:id/comment", auth, commentPost);

export default Router;
