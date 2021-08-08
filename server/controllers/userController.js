import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

import User from "../models/user.js";

export const userLogin = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });

		if (!user)
			return res.status(404).json({ message: "Incorrect Email or Password" });

		const isPasswordCorrect = await bcrypt.compare(password, user.password);

		if (!isPasswordCorrect)
			return res.status(404).json({ message: "Incorrect Email or Password" });

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});

		res.status(200).json({ result: user, token, message: "Logged in" });
	} catch (err) {
		res.status(500).json({ message: "Internal Server Error" });
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
		return res.status(400).json({ message: "Password don't match" });

	try {
		const userExists = await User.findOne({ email });

		if (userExists)
			return res.status(400).json({ message: "User already exists." });

		user.password = await bcrypt.hash(password, 12);

		await user.save();

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});

		res
			.status(201)
			.json({ user, token, message: "Account created successfully" });
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
	}
};
