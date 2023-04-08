const AsyncHandler = require("express-async-handler");
const ClassLevel = require("../../model/Academic/ClassLevel");
const Program = require("../../model/Academic/Program");
const Subject = require("../../model/Academic/Subject");
const Admin = require("../../model/Staff/Admin");

//@desc Create Class Level
//@route POST api/v1/subjects/:programID
//@access Private
exports.createSubject = AsyncHandler(async(req,res)=>{
    const {name,description,academicTerm} = req.body;
    //find the program
    const programFound = await Program.findById(req.params.programID);
    if(!programFound){
        throw new Error("Program not found");
    }
    //check if exists
    const subjectFound = await Subject.findOne({name});
    if(subjectFound){
        throw new Error("Academic Year already exists");
    }
    const subjectCreated = await Subject.create({
        name, 
        description,
        academicTerm,
        createdBy: req.userAuth._id

    })
    //push to the program 
    programFound.subjects.push(subjectCreated._id);
    //save
    await programFound.save(); 
    res.status(201).json({
        status: "success",
        message: "Subject created succesfully",
        data: subjectCreated,
    })
});

//@desc get All Subjects
//@route GET api/v1/subjects/
//@access Private
exports.getSubjectsCtrl = AsyncHandler(async(req,res)=>{
    const subjects = await Subject.find();
    res.status(201).json({
        status: "success",
        message: "Subjects fetched succesfully",
        data: subjects,
    })
})
//@desc get SINGLE Subject
//@route GET api/v1/subject/:id
//@access Private
exports.getSingleSubjectCtrl = AsyncHandler(async(req,res)=>{
    const subject = await Subject.findById(req.params.id);
    res.status(201).json({
        status: "success",
        message: "Subject fetched succesfully",
        data: subject,
    })
})
//@desc update Subject
//@route GET api/v1/academic-terms/:id
//@access Private
exports.updateSubjectCtrl = AsyncHandler(async(req,res)=>{
    const {name, description, academicTerm}=  req.body;
    //check name exists
    const subjectFound = await subject.findOne({name});
    if(subjectFound){
        throw new Error("Subject already exists");
    }
    const subject = await Subject.findByIdAndUpdate(
        req.params.id,
        {
            name,
            description,
            academicTerm,
            createdBy: req.userAuth._id,
        },
        {
            new:true,
        });
    res.status(201).json({
        status: "success",
        message: "Class Level updated succesfully",
        data: subject,
    })
})
//@desc delete subject
//@route DELETE api/v1/subjects/:id
//@access Private
exports.deleteSubjectCtrl = AsyncHandler(async(req,res)=>{
   await Subject.findByIdAndDelete(req.params.id);
    
    res.status(201).json({
        status: "success",
        message: "Subject deleted succesfully",
    })
})