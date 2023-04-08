const Admin = require("../../model/Staff/Admin");
const Teacher = require("../../model/Staff/Teacher");
const AsyncHandler = require('express-async-handler');


//@desc Admin Register Teacher
//@route POST /api/v1/teachers/admin/register
//@access Private
exports.adminRegisterTeacher = AsyncHandler(async(req, res)=>{
    const {name, email, password} = req.body;
    //check if teacher already exists 
    const teacherFound = await Teacher.findOne({email});
    if(teacher){
        throw new Error("Teacher already employed");
    }
})