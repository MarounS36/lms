const AsyncHandler = require("express-async-handler");
const AcademicYear = require("../../model/Academic/AcademicYear");
const Admin = require("../../model/Staff/Admin");


//@desc Create academic year
//@route POST api/v1/academic-years/
//@access Private
exports.createAcademicYear = AsyncHandler(async(req,res)=>{
    const {name,fromYear,toYear} = req.body;
    const academicYear = await AcademicYear.findOne({name});
    if(academicYear){
        throw new Error("Academic Year already exists");
    }
    const academicYearCreated = await AcademicYear.create({
        name, 
        fromYear,
        toYear,
        createdBy: req.userAuth._id

    })
    //push academic year into admin
    const admin = await  Admin.findById(req.userAuth._id);
    admin.academicYears.push(academicYearCreated._id);
    await admin.save(); 
    res.status(201).json({
        status: "success",
        message: "Academic year created succesfully",
        data: academicYearCreated,
    })
});

//@desc get All academic years
//@route GET api/v1/academic-years/
//@access Private
exports.getAcademicYearsCtrl = AsyncHandler(async(req,res)=>{
    const academicYears = await AcademicYear.find();
    res.status(201).json({
        status: "success",
        message: "Academic Years fetched succesfully",
        data: academicYears,
    })
})
//@desc get SINGLE academic years
//@route GET api/v1/academic-years/:id
//@access Private
exports.getSingleAcademicYearCtrl = AsyncHandler(async(req,res)=>{
    const academicYear = await AcademicYear.findById(req.params.id);
    res.status(201).json({
        status: "success",
        message: "Academic Year fetched succesfully",
        data: academicYear,
    })
})
//@desc update academic year
//@route GET api/v1/academic-years/:id
//@access Private
exports.updateAcademicYearCtrl = AsyncHandler(async(req,res)=>{
    const {name, fromYear, toYear}=  req.body;
    //check name exists
    const createAcademicYearFound = await AcademicYear.findOne({name});
    if(createAcademicYearFound){
        throw new Error("Academic year already exists");
    }
    const academicYear = await AcademicYear.findByIdAndUpdate(
        req.params.id,
        {
            name,
            fromYear,
            toYear,
            createdBy: req.userAuth._id,
        },
        {
            new:true,
        });
    res.status(201).json({
        status: "success",
        message: "Academic Year updated succesfully",
        data: academicYear,
    })
})
//@desc delete academic year
//@route DELETE api/v1/academic-years/:id
//@access Private
exports.deleteAcademicYearCtrl = AsyncHandler(async(req,res)=>{
    await AcademicYear.findByIdAndDelete(req.params.id);
    
    res.status(201).json({
        status: "success",
        message: "Academic Year deleted succesfully",
    })
})