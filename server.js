require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const mongo_connection = process.env.MONGO_CONNECTION;

const { AdminRouter } = require('./Routes/Admin')
const { UserRouter } = require('./Routes/User');
const { CourseRouter } = require('./Routes/Course')

//app intialization
const app = express();
app.use(express.json());
app.use('/api/v1/user', UserRouter);
app.use('/api/v1/admin', AdminRouter);
app.use('/api/v1/course', CourseRouter);

//Starting the app
async function main(){
    await mongoose.connect(mongo_connection);
    app.listen(3000, ()=>{
        console.log("server started");
    })
}
main();
