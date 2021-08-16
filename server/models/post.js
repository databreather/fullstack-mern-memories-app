import mongoose from "mongoose";

export default mongoose.model("posts", {
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
