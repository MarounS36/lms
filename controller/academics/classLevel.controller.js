const AsyncHandler = require("express-async-handler");
const ClassLevel = require("../../model/Academic/ClassLevel");
const Admin = require("../../model/Staff/Admin");

//@desc Create Class Level
//@route POST api/v1/class-levels/
//@access Private
exports.createClassLevel = AsyncHandler(async(req,res)=>{
    const {name,description} = req.body;
    const classLevel = await ClassLevel.findOne({name});
    if(classLevel){
        throw new Error("Academic Year already exists");
    }
    const classLevelCreated = await ClassLevel.create({
        name, 
        description,
        createdBy: req.userAuth._id

    })
    //push class level into admin
    const admin = await  Admin.findById(req.userAuth._id);
    admin.classLevels.push(classLevelCreated._id);
    await admin.save(); 
    res.status(201).json({
        status: "success",
        message: "Academic year created succesfully",
        data: classLevelCreated,
    })
});

//@desc get All class levels
//@route GET api/v1/class-levels/
//@access Private
exports.getClassLevelsCtrl = AsyncHandler(async(req,res)=>{
    const classLevels = await ClassLevel.find();
    res.status(201).json({
        status: "success",
        message: "Class Levels fetched succesfully",
        data: classLevels,
    })
})
//@desc get SINGLE class Level
//@route GET api/v1/class-levels/:id
//@access Private
exports.getSingleClassLevelCtrl = AsyncHandler(async(req,res)=>{
    const classLevel = await ClassLevel.findById(req.params.id);
    res.status(201).json({
        status: "success",
        message: "Class Level fetched succesfully",
        data: classLevel,
    })
})
//@desc update class level
//@route GET api/v1/class-levels/:id
//@access Private
exports.updateClassLevelCtrl = AsyncHandler(async(req,res)=>{
    const {name, description}=  req.body;
    //check name exists
    const classLevelFound = await ClassLevel.findOne({name});
    if(classLevelFound){
        throw new Error("Class Level already exists");
    }
    const classLevel = await ClassLevel.findByIdAndUpdate(
        req.params.id,
        {
            name,
            description,
            createdBy: req.userAuth._id,
        },
        {
            new:true,
        });
    res.status(201).json({
        status: "success",
        message: "Class Level updated succesfully",
        data: classLevel,
    })
})
//@desc delete academic year
//@route DELETE api/v1/class-levels/:id
//@access Private
exports.deleteClassLevelCtrl = AsyncHandler(async(req,res)=>{
   await ClassLevel.findByIdAndDelete(req.params.id);
    
    res.status(201).json({
        status: "success",
        message: "Class Level deleted succesfully",
    })
})