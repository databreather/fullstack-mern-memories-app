import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

import User from "../models/user.js";

export const userLogin = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });

		if (!user) return res.status(404).send("Incorrect Email or Password");

		const isPasswordCorrect = await bcrypt.compare(password, user.password);

		if (!isPasswordCorrect)
			return res.status(404).send("Incorrect Email or Password");
		const payload = { id: user._id };
		const token = jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});

		res.status(200).json({ result: user, token, message: "Logged in" });
	} catch (err) {
		res.status(500).send("Internal Server Error");
	}
};

export const userSignup = async (req, res) => {
	const { firstName, email, lastName, password, confirmPassword } = req.body;

	let user = new User({
		name: `${firstName} ${lastName}`,
		email,
		password,
	});

	if (password !== confirmPassword)
		return res.status(400).send("Password don't match");

	try {
		const userExists = await User.findOne({ email });

		if (userExists) return res.status(400).send("User already exists.");

		user.password = await bcrypt.hash(password, 12);

		await user.save();
		const secret = String(process.env.JWT_SECRET);
		const payload = { id: user._id };
		const token = jwt.sign(payload, secret, {
			expiresIn: "1h",
		});

		res
			.status(201)
			.json({ user, token, message: "Account created successfully" });
	} catch (error) {
		res.status(500).send("Internal Server Error");
	}
};
