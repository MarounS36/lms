const AsyncHandler = require("express-async-handler");
const YearGroup = require("../../model/Academic/YearGroup");
const Admin = require("../../model/Staff/Admin");

//@desc Create Year Group
//@route POST api/v1/years-group/
//@access Private
exports.createYearGroupCtrl = AsyncHandler(async(req,res)=>{
    ///check if exists
    const {name, academicYear} = req.body;
    const yearGroup = await YearGroup.findOne({name});
    if(yearGroup){
        throw new Error("Year Group already exists");
    }
    //create
    const yearGroupCreated = await YearGroup.create({
        name, 
        academicYear,
        createdBy: req.userAuth._id

    })
    //find admin
    const admin = await  Admin.findById(req.userAuth._id);
    if(!admin){
        throw new Error("Admin not found");
    }
    //push year-group into admin

    admin.yearGroups.push(yearGroupCreated._id);
    await admin.save(); 
    res.status(201).json({
        status: "success",
        message: "year group created succesfully",
        data: yearGroupCreated,
    })
});

//@desc get All year groups
//@route GET api/v1/year-groups/
//@access Private
exports.getAllYearGroupsCtrl = AsyncHandler(async(req,res)=>{
    const groups = await YearGroup.find();
    res.status(201).json({
        status: "success",
        message: "All year groups fetched succesfully",
        data: groups,
    })
})
//@desc get SINGLE Year Group
//@route GET api/v1/year-groups/:id
//@access Private
exports.getSingleYearGroupCtrl = AsyncHandler(async(req,res)=>{
    const group = await YearGroup.findById(req.params.id);
    res.status(201).json({
        status: "success",
        message: "Year Group fetched succesfully",
        data: group,
    })
})
//@desc update year group
//@route GET api/v1/year-groups/:id
//@access Private
exports.updateYearGroupCtrl = AsyncHandler(async(req,res)=>{
    const {name, academicYear}=  req.body;
    //check year group exists
    const yearGroupFound = await YearGroup.findOne({name});
    if(yearGroupFound){
        throw new Error("Class Level already exists");
    }
    const yearGroup = await YearGroup.findByIdAndUpdate(
        req.params.id,
        {
            name,
            academicYear,
            createdBy: req.userAuth._id,
        },
        {
            new:true,
        });
    res.status(201).json({
        status: "success",
        message: "Year Group updated succesfully",
        data: yearGroup,
    })
})
//@desc delete academic year
//@route DELETE api/v1/year-groups/:id
//@access Private
exports.deleteYearGroupCtrl = AsyncHandler(async(req,res)=>{
   await YearGroup.findByIdAndDelete(req.params.id);
    
    res.status(201).json({
        status: "success",
        message: "Year Group deleted succesfully",
    })
})