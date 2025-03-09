const readFile = require('../utils/readFile');
const path = require('path');
const userFilePath = path.join(__dirname, "../database/user.json");
const FilePath = path.join(__dirname, "../database/scan.json");
let User = readFile(userFilePath);
const writeFile = require('../utils/writeFile');

const adminController = {
    async getCreditRequest(req,res,next){
        try {
            const requestUsers = User.users.filter(user=> user.creditRequest === true);
            if(!requestUsers){
                return res.status(404).json({"message": "no request found"});
            }            
            return res.json(requestUsers);
        } catch (error) {
            return res.status(500).json({error: 'Internal server error'});
        }
    },

    async approveCreditRequest(req,res,next){
        try {
            const {userId} = req.params;
            const {credits} = req.body;
            const userIndex = User.users.findIndex(user=> user.userId === userId);
            if(userIndex<0){
                return res.status(404).json({error: "user not found"});
            }
            User.users[userIndex].credits += credits;
            User.users[userIndex].creditRequest = false;
            writeFile(User, userFilePath);
            return res.status(200).json({"message": "Request approved!"});
        } catch (error) {
            return res.status(500).json({error: 'Internal server error'});
        }
    },

    async declineCreditRequest(req,res,next){
        try {
            const {userId} = req.params;
            const userIndex = User.users.findIndex(user=> user.userId === userId);
            console.log(userIndex);
            if(userIndex<0){
                return res.status(404).json({error: "user not found"});
            }
            User.users[userIndex].creditRequest = false;
            writeFile(User, userFilePath);
            return res.status(200).json({"message": "Request declined!"});
        } catch (error) {
            return res.status(500).json({error: 'Internal server error'});
        }
    },

    async getUserScans(req,res,next){
        try {
            let userScanData = [];
            User.users.forEach(user => {
                userScanData.push({userName:user.userName ,remainingCredit: user.credits, totalScan: user.totalScan})
            });
            return res.status(200).json(userScanData);
        } catch (error) {
            return res.status(500).json({error: 'Internal server error'});
        }
    },

    async topUsers(req,res,next){
        try {
            let count = 0;
            let sortedUser = User.users.sort((a, b) => b.totalScan - a.totalScan);
            let result = sortedUser.slice(0, 3).map(user => ({
                userName: user.userName,
                totalScan: user.totalScan
            }));
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({error: 'Internal server error'});
        }
    },

    async topTopic(req,res,next){
        try {
            const Scan = readFile(FilePath);
            const sortedScan = Scan.scans.sort((a,b)=> b.popularCount - a.popularCount);
            let result = sortedScan.slice(0,3).map(scan => ({
                topic: scan.topic,
                count: scan.popularCount
            }))
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({error: 'Internal server error'});
        }
    }
}

module.exports = adminController