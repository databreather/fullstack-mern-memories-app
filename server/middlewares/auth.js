import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secret = process.env.JWT_SECRET;

const auth = (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader) return res.status(401);

		const token = authHeader.split(" ")[1];

		const isCustomToken = token.length < 500;

		if (token) {
			const decodedData = isCustomToken
				? jwt.verify(token, secret)
				: jwt.decode(token);
			req.userId = isCustomToken ? decodedData?.id : decodedData?.sub;

			next();
		}
	} catch (error) {
		console.log(error);
	}
};

export default auth;
