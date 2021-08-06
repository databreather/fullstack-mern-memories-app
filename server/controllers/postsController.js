import { Post } from "../models/Post.js";
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
	try {
		const posts = await Post.find();

		return res.status(200).json(posts);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const createPost = async (req, res) => {
	req.body.tags = splitByHashes(req.body.tags);
	let post = new Post(req.body);

	try {
		await post.save();
		return res.status(201).json({ post, message: "Post added." });
	} catch (error) {
		return res.status(409).json({ message: error.message });
	}
};

export const updatePost = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		if (!post) {
			return res.status(404).json({ message: "No post found with that id" });
		} else {
			const updatedPost = await Post.findByIdAndUpdate(
				req.params.id,
				{
					...req.body,
					tags: req.body.tags ? splitByHashes(req.body.tags) : post.tags,
				},
				{ new: true }
			);
			return res.status(200).json({ updatedPost, message: "Post updated" });
		}
	} catch (error) {
		return res.status(409).json({ message: error.message });
	}
};

export const deletePost = async (req, res) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		return res.status(404).json({ message: "No post found with that ID" });
	}
	try {
		await Post.findByIdAndRemove(req.params.id);
		return res.status(200).json({ message: "Post deleted" });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const likePost = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		if (!post) {
			return res.status(404).json({ message: "No post found with that id" });
		} else {
			const updatedPost = await Post.findByIdAndUpdate(
				req.params.id,
				{ likeCount: post.likeCount + 1 },
				{ new: true }
			);
			return res
				.status(200)
				.json({ updatedPost, message: "Somebody liked your post" });
		}
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};
function splitByHashes(tags) {
	return tags.match(/#[a-zA-Z0-9@-_&]+/g);
}
