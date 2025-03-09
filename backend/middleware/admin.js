const {decodeAccessToken} = require('../utils/accessToken');
const admin = (req,res,next)=>{
    try {
        const token = req.header("Authorization");
        const {userId, role, randomBytes, timestamp} = decodeAccessToken(token.replace("Bearer ", ""));
        if(role !== 'admin'){
            return res.status(401).json({error: "Unauthorised access"})
        }
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid or expired token." });
    }
}
module.exports = admin;