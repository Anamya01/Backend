require('dotenv').config();
const jwt = require('jsonwebtoken');
const ADMIN_PASSKEY = process.env.ADMIN_JWT;
function adminAuth(req, res, next){
    console.log("hei")
    const token = req.headers.token;
    console.log(token);
    const decoded =  jwt.verify(token, ADMIN_PASSKEY);
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
    AdminAuth : adminAuth
}