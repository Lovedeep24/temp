const path = require("path");
const userFilePath = path.join(__dirname, "../../database/user.json");
const readFile = require('../../utils/readFile.js');
const {hashPassword} = require('../../utils/passwordHash.js');
const writeFile = require('../../utils/writeFile.js');
const generateId = require('../../utils/generateId.js')

const registerController = {
    async register(req,res,next){
        try {
            const {userName, email, password} = req.body;
            let User = readFile(userFilePath);
            const exists = User.users.find(user => user.email === email);
            if(exists){
                return res.status(400).json({"error": "Email is already registered"})
            }
            const { salt, hashedPassword } = hashPassword(password);
            const userId = generateId();
            const newUser = {
                userId,
                userName, 
                email, 
                password: hashedPassword,
                salt,
                credits: 20,
                role: "user",
                creditRequest: false,
                totalScan: 0
            }
            User.users.push(newUser)
            writeFile(User, userFilePath);
            return res.status(200).json(newUser);
        } catch (error) {
            return res.status(500).json({"error": "Internal server error"})
        }
    }
}
module.exports = registerController;
