const { Router } = require('express');
const jwt  = require('jsonwebtoken')
const userRoutes = Router();
const bcrypt = require('bcrypt');
const { AdminAuth } = require('../Middleware/Admin')
const ADMIN_PASSKEY = process.env.ADMIN_JWT;
const { userModel, purchaseModel, adminModel , courseModel } = require('../db')

//Admin Signup
userRoutes.post('/signup', async(req,res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password; //add zod validation
    const hashed_password = await bcrypt.hash(password, 10);
    try{
        adminModel.create({
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


//Admin Sign In 
userRoutes.post('/signin', async(req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = await adminModel.findOne({
        email : email
    })
    if(user){
        const matchpass = await bcrypt.compare(password, user.password);
        if(matchpass){
            const token = jwt.sign({
                id : user._id,
            }, ADMIN_PASSKEY)
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


// Create a Course
userRoutes.post('/course', AdminAuth, async(req,res) => {
    const id = req.Userid;
    const {title , description, price, image} = req.body;
    try{
        const course = await courseModel.create({
            title: title,
            description : description,
            price : price,
            image_ : image,
            adminId : id
        })
        res.json({
            message : "course created successfully",
            course : course._id
        })
        return;
    }catch(err){
        res.json({
            message : err
        })
        return;
    }
})


//Update a course
userRoutes.put('/course', AdminAuth, async(req,res) => {
    const id = req.UserId;
    const {title, description, image, price, courseId} = req.body;
    try{
        const course = await courseModel.updateOne({
            adminId : id,
            _id : courseId,
        }, {
            title: title,
            description : description,
            price : price,
            image_ : image,
        })
        res.json({
            message : "changes updated successfully",
            courseId : course._id
        })
        return;
    }catch(err){
        res.json({
            error : err
        })
        return;
    }
})


//Fetch all the courses created by admin
userRoutes.get('/mycourses', AdminAuth, async(req,res) => {
    const id = req.UserId;
    try{
        const courses = await courseModel.find({
           adminId : id,
        })
        res.json({
            message : "Coursed owned",
            courses,
        })
        // not completed
    }catch(err){
        res.json({
            error : err,
        });
        return;
    }
})

//Exporting routes
module.exports = {
    AdminRouter : userRoutes,
}