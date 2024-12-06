const jwt = require("jsonwebtoken");

function isAuthenticated(req, res, next) {
	try {
		if (
			req.headers.authorization.split(" ")[0] === "Bearer" &&
			req.headers.authorization.split(" ")[1]
		) {
			const theToken = req.headers.authorization.split(" ")[1];
			const payLoad = jwt.verify(theToken, process.env.TOKEN_SECRET);
			console.log("here is the payload", payLoad);
			req.payLoad = { currentUser: payLoad };
			next();
		} else {
			res.status(403).json({ message: "no token present" });
		}
	} catch (error) {
		res.status(403).json({ message: "invalid token" });
	}
}

module.exports = { isAuthenticated };
