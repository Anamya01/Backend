const { Router } = require('express');
const jwt  = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const userRoutes = Router();
const USER_PASSKEY = process.env.USER_JWT;
const { UserAuth } = require('../Middleware/User')
const { userModel, purchaseModel, adminModel, courseModel } = require('../db')
//user signup
userRoutes.post('/signup', async(req,res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password; //add zod validation
    const hashed_password = await bcrypt.hash(password, 10);
    try{
        userModel.create({
            name : username,
            email : email,
            password : hashed_password,
        })
    }catch(err){
        res.json({message : "some error occured"});
        return;
    }
    res.json({message : "success"});
})


//User Sign In
userRoutes.post('/signin', async(req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = await userModel.findOne({
        email : email
    })
    if(user){
        const matchpass = await bcrypt.compare(password, user.password);
        if(matchpass){
            const token = jwt.sign({
                id : user._id,
            }, USER_PASSKEY)
            res.json({
                token: token
            })
        }
        else{
            res.json({message:"password doesnt match"});
            return;
        }
    }
    else{
        res.json({message: "user not found"});
        return;
    }
})

userRoutes.get('/purchases', UserAuth, async(req, res) =>{
    const id = req.UserId;
    try{
        const purchases = await purchaseModel.find({
            userId : id,
        })
        const data = await courseModel.find({
            _id : { $in: purchases.map(x => x.courseId)}
        })
        res.json({
            data,
            purchases
        });
        return
    }catch(err){
        res.json({message : err});
    }
})

module.exports = {
    UserRouter : userRoutes,
}