const AsyncHandler = require("express-async-handler");
const AcademicTerm = require("../../model/Academic/AcademicTerm");
const Admin = require("../../model/Staff/Admin");

//@desc Create academic Term
//@route POST api/v1/academic-terms/
//@access Private
exports.createAcademicTerm = AsyncHandler(async(req,res)=>{
    const {name,description,duration} = req.body;
    const academicTerm = await AcademicTerm.findOne({name});
    if(academicTerm){
        throw new Error("Academic Year already exists");
    }
    const academicTermCreated = await AcademicTerm.create({
        name, 
        description,
        duration,
        createdBy: req.userAuth._id

    })
    //push academic year into admin
    const admin = await  Admin.findById(req.userAuth._id);
    admin.academicTerms.push(academicTermCreated._id);
    await admin.save(); 
    res.status(201).json({
        status: "success",
        message: "Academic year created succesfully",
        data: academicTermCreated,
    })
});

//@desc get All academic Terms
//@route GET api/v1/academic-years/
//@access Private
exports.getAcademicTermsCtrl = AsyncHandler(async(req,res)=>{
    const academicTerms = await AcademicTerm.find();
    res.status(201).json({
        status: "success",
        message: "Academic Terms fetched succesfully",
        data: academicTerms,
    })
})
//@desc get SINGLE academic Term
//@route GET api/v1/academic-years/:id
//@access Private
exports.getSingleAcademicTermCtrl = AsyncHandler(async(req,res)=>{
    const academicTerm = await AcademicTerm.findById(req.params.id);
    res.status(201).json({
        status: "success",
        message: "Academic Term fetched succesfully",
        data: academicTerm,
    })
})
//@desc update academic term
//@route GET api/v1/academic-terms/:id
//@access Private
exports.updateAcademicTermCtrl = AsyncHandler(async(req,res)=>{
    const {name, description, duration}=  req.body;
    //check name exists
    const createAcademicTermFound = await AcademicTerm.findOne({name});
    if(createAcademicTermFound){
        throw new Error("Academic term already exists");
    }
    const academicTerm = await AcademicTerm.findByIdAndUpdate(
        req.params.id,
        {
            name,
            description,
            duration,
            createdBy: req.userAuth._id,
        },
        {
            new:true,
        });
    res.status(201).json({
        status: "success",
        message: "Academic Term updated succesfully",
        data: academicTerm,
    })
})
//@desc delete academic year
//@route DELETE api/v1/academic-years/:id
//@access Private
exports.deleteAcademicTermCtrl = AsyncHandler(async(req,res)=>{
   await AcademicTerm.findByIdAndDelete(req.params.id);
    
    res.status(201).json({
        status: "success",
        message: "Academic Term deleted succesfully",
    })
})