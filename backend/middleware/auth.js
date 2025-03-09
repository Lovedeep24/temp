const {verifyToken} = require('../utils/accessToken')
const auth = (req,res,next)=>{
    try {
        const token = req.header("Authorization");
        if (!token) {
            return res.status(401).json({ error: "Access denied. No token provided." });
        }
        const userId = verifyToken(token.replace("Bearer ", ""));
        req.userId = userId;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid or expired token." });
    }
}
module.exports = auth;