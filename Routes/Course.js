const { Router } = require('express');
const { UserAuth } = require('../Middleware/User');
const { courseModel, purchaseModel } = require('../db');
const courseRoutes = Router();

courseRoutes.post('/purchase', UserAuth, async(req,res) => {
    const userId = req.UserId;
    const { courseId } = req.body;
    //check if already bought,
    await purchaseModel.create({
        userId,
        courseId 
    });
    res.json({message : "purchase successful"});
})

courseRoutes.get('/all', async(req,res) => {
    const courses = await courseModel.find({});
    res.json({message : "courses :", courses : courses});
})

module.exports = {
    CourseRouter : courseRoutes
}