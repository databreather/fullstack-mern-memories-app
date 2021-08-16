import mongoose from "mongoose";

export default mongoose.model("users", {
	name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
});
