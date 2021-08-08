import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";

import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/user.js";

const app = express();

//Load Environment Variables
dotenv.config();

//Middlewares
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => {
	res.send("Welcome to my application");
});
app.use("/api/posts", postRoutes);
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 5000;

//DB Connection
mongoose.connect(
	`${process.env.MONGO_URI}`,
	{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
	(err) => {
		if (err) throw err;
		console.log("DB Connection Established");
	}
);

//App Listener
app.listen(PORT, (err) => {
	if (err) throw err;
	console.log("Server running on port:" + PORT);
});
