const readFile = require('../utils/readFile');
const writeFile = require('../utils/writeFile');
const path = require('path');
const userFilePath = path.join(__dirname, "../database/user.json");
const scanFilePath = path.join(__dirname, "../database/scan.json");
let User = readFile(userFilePath);
const userController = {
    async userProfile(req,res,next){
        try {
            const {userId} = req.params
            let user = User.users.find(user => user.userId === userId);
            if(!user){
                return res.status(404).json({error: 'User not found'});
            }
            const { salt, password, ...data } = user;
            user = { ...data };
            const Scan = readFile(scanFilePath);
            let pastScan = Scan.scans.filter(scan=> scan.userId === userId);
            const scanWithoutContent = pastScan.map(({ fileContent,userId, ...rest }) => rest);
            user = {...user, pastScan: scanWithoutContent};
            return res.status(200).json(user);
        } catch (error) {
            console.log(error)
            return res.status(500).json({"error": "Internal server error"});
        }
    },
    async creditRequest(req,res,next){
        try {
            const {userId} = req.params;
            const userIndex = User.users.findIndex(user=> user.userId === userId);
            if(userIndex<0){
                return res.status(404).json({error: 'User not found'});
            }
            User.users[userIndex].creditRequest = true;
            writeFile(User, userFilePath)
            return res.status(200).json({"message": "request was successfull"});
        } catch (error) {
            return res.status(500).json({error: 'Internal server error'});
        }
    }
}

module.exports = userController;
