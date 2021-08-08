import express from "express";
import mongoose from "mongoose";

import Post from "../models/post.js";

const router = express.Router();

export const getPosts = async (req, res) => {
	try {
		const posts = await Post.find();

		return res.status(200).json(posts);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

export const getPost = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (!post)
			return res.status(404).json({ message: "No post found with that id." });

		res.status(200).json(post);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

export const createPost = async (req, res) => {
	req.body.tags = req.body.tags ? splitByHashes(req.body.tags) : [];

	let post = new Post({
		...req.body,
		creatorId: req.userId,
	});

	try {
		await post.save();

		res.status(201).json({ post, message: "Post created" });
	} catch (error) {
		console.log(error);
		return res.status(409).json({ message: error.message });
	}
};

export const updatePost = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (!post)
			return res.status(404).json({ message: "No post foung with that id" });

		const updatedPost = await Post(
			req.params.id,
			{
				...req.body,
				updatedAt: new Date().toISOString(),
				tags: req.body.tags ? splitByHashes(req.body.tags) : post.tags,
			},
			{ new: true }
		);

		return res.status(200).json({ updatedPost, message: "Post updated" });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal Server Error" });
		console.log(error);
	}
};

export const deletePost = async (req, res) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.id))
		return res.status(404).json({ message: "No post found with that id" });

	try {
		await Post.findByIdAndRemove(req.params.id);

		return res.json({ message: "Post deleted successfully." });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

export const likePost = async (req, res) => {
	let message = "";
	if (!req.userId) {
		return res.status(401).json({ message: "Unauthenticated" });
	}

	try {
		const post = await Post.findById(req.params.id);

		if (!post)
			return res.status(404).json({ message: "No post found with that id" });

		//get the index of the likes element which matches with the authenticated user id
		const index = post.likes.findIndex((like) => like === req.userId);

		if (index === -1) {
			//user hasnt liked it, can now like
			post.likes.push(req.userId);
			message = "Somebody liked your post";
		} else {
			//user has already liked, remove like on 2nd attempt
			post.likes = post.likes.filter((id) => id !== req.userId);
			message = "Somebody unliked your post";
		}
		const updatedPost = await Post.findByIdAndUpdate(req.params.id, post, {
			new: true,
		});
		return res.status(200).json({ updatedPost, message });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

function splitByHashes(tags) {
	return tags.match(/#[a-zA-Z0-9@&-_]+/);
}

export default router;
