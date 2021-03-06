import express from "express";
import mongoose from "mongoose";

import Post from "../models/post.js";

const router = express.Router();

export const getPosts = async (req, res) => {
	//get posts by paginating
	const page = parseInt(req.query.page);
	const LIMIT = 8;
	const startIndex = (page - 1) * LIMIT;

	try {
		const totalPosts = await Post.countDocuments({});
		const posts = await Post.find()
			.sort({ _id: -1 })
			.limit(LIMIT)
			.skip(startIndex);

		return res.status(200).json({
			posts,
			currentPage: page,
			numberOfPages: Math.ceil(totalPosts / LIMIT),
		});
	} catch (error) {
		return res.status(500).send("Internal Server Error");
	}
};

export const searchPosts = async (req, res) => {
	const { search_q, tags } = req.query;
	try {
		const posts = await Post.find({
			$or: [
				{ title: new RegExp(search_q, "i") },
				{ tags: { $in: tags.split(",") } },
			],
		}).sort({ _id: -1 });
		return res.status(200).json(posts);
	} catch (error) {
		return res.status(500).send("Internal Server Error");
	}
};

export const getPost = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (!post) return res.status(404).send("No post found with that id.");

		return res.status(200).json(post);
	} catch (error) {
		return res.status(500).send("Internal Server Error");
	}
};

export const createPost = async (req, res) => {
	console.log(req.userId);

	req.body.tags = req.body.tags ? req.body.tags.split(",") : [];

	let post = new Post({
		...req.body,
		creatorId: req.userId,
	});

	try {
		await post.save();

		res.status(201).json({ post, message: "Post created" });
	} catch (error) {
		return res.status(409).send({ message: error.message });
	}
};

export const updatePost = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (!post) return res.status(404).send("No post found with that id");
		req.body.tags = req.body.tags.split(",");
		const updatedPost = await Post.findByIdAndUpdate(
			req.params.id,
			{
				...req.body,
				updatedAt: new Date().toISOString(),
			},
			{ new: true }
		);

		return res.status(200).json({ updatedPost, message: "Post updated" });
	} catch (error) {
		return res.status(500).send("Internal Server Error");
	}
};

export const deletePost = async (req, res) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.id))
		return res.status(404).send("No post found with that id");

	try {
		await Post.findByIdAndRemove(req.params.id);

		return res.send("Post deleted successfully.");
	} catch (error) {
		return res.status(500).send("Internal Server Error");
	}
};

export const likePost = async (req, res) => {
	let message = "";

	if (!req.userId) {
		return res.status(401).send("Unauthenticated.");
	}

	try {
		const post = await Post.findById(req.params.id);

		if (!post) return res.status(404).send("No post found with that id");

		//get the index of the likes element which matches with the authenticated user id
		const index = post.likes.findIndex((like) => like === req.userId);

		if (index === -1) {
			//user hasnt liked it, can like now
			post.likes.push(req.userId);
			message = "Somebody liked your post";
		} else {
			//user has already liked the post, remove like on 2nd attempt
			post.likes = post.likes.filter((id) => id !== req.userId);
			message = "Somebody unliked your post";
		}
		const updatedPost = await Post.findByIdAndUpdate(req.params.id, post, {
			new: true,
		});
		return res.status(200).json({ updatedPost, message });
	} catch (error) {
		return res.status(500).send("Internal Server Error");
	}
};

export const commentPost = async (req, res) => {
	const { id } = req.params;
	const { comment } = req.body;
	console.log(comment, id);

	if (!req.userId) {
		return res.status(401).send("Unauthenticated.");
	}

	try {
		const post = await Post.findById(id);
		if (!post) {
			return res.status(404).send("No post found with that id");
		}

		post.comments.push(comment);
		const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });

		return res.status(201).json(updatedPost);
	} catch (error) {
		console.log(error);
		return res.status(500).send("Internal Server Error");
	}
};
