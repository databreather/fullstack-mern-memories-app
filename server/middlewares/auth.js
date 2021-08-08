import jwt from "jsonwebtoken";

const secret = "test";

const auth = async (req, res, next) => {
	let token;
	try {
		const authHeader = req.headers.authorization;

		if (authHeader) {
			token = authHeader.split(" ")[1];
		} else {
			res.status(401);
		}

		const isCustomAuth = token.length < 500;

		let decodedData;

		if (token && isCustomAuth) {
			decodedData = jwt.verify(token, secret);

			req.userId = decodedData?.id;
		} else {
			decodedData = jwt.decode(token);

			req.userId = decodedData?.sub;
		}

		next();
	} catch (error) {
		console.log(error);
	}
};

export default auth;
