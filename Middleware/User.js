require('dotenv').config();
const jwt = require('jsonwebtoken');
const USER_PASSKEY = process.env.USER_JWT;
function userAuth(req, res, next){
    const token = req.headers.token;
    const decoded =  jwt.verify(token, USER_PASSKEY);
    if(decoded){
        req.UserId = decoded.id;
        next();
    }else{
        res.json({
            message : "you are not signed in"
        });
    }

}
module.exports = {
    UserAuth : userAuth
}