import mongoose from "mongoose";

const postSchema = mongoose.Schema({
	title: String,
	message: String,
	name: String,
	creatorId: String,
	tags: [String],
	selectedFile: String,
	likes: { type: [String], default: [] },
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: Date,
});

var Post = mongoose.model("PostMessage", postSchema);

export default Post;
