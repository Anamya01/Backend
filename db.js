const mongoose = require('mongoose');
const schema = mongoose.Schema;
const ObjectId = schema.ObjectId;

const userSchema = new schema({
    email : { type : String, unique : true},
    name : String,
    password : String,
})

const adminSchema = new schema({
    email: {type : String, unique : true},
    name : String,
    password : String,
})

const courseSchema = new schema({
    title : String,
    description : String,
    price : Number,
    image_ : String,
    adminId : ObjectId
})

const purchaseSchema = new schema({
    courseId : ObjectId,
    userId : ObjectId
})

const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("courses", courseSchema);
const purchaseModel = mongoose.model("purchases", purchaseSchema);


module.exports = {
    userModel : userModel,
    adminModel : adminModel,
    courseModel : courseModel,
    purchaseModel : purchaseModel,
}