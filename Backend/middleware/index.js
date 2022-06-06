require("dotenv").config();
const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
    const { authorization: token } = req.headers;

    if (!token) return res.status(401).send("Access denied. No token provided.");

    try {
        const decoded = jwt.verify(token, process.env.JWT_SERECT);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send("Invalid token.");
    }


}