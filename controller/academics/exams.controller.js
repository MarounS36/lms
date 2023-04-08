const AsyncHandler = require("express-async-handler");
const Exam = require("../../model/Academic/Exam");
const Teacher = require("../../model/Staff/Teacher");


//@desc Create Exam
//@route POST api/v1/academic-years/
//@access Private Teachers Only
exports.createExam = AsyncHandler(async(req,res)=>{
    
})
