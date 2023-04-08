const AsyncHandler = require("express-async-handler");
const Program = require("../../model/Academic/Program");
const Admin = require("../../model/Staff/Admin");

//@desc Create Program
//@route POST api/v1/programs/
//@access Private
exports.createProgramCtrl = AsyncHandler(async(req,res)=>{
    const {name,description} = req.body;
    const program = await Program.findOne({name});
    if(program){
        throw new Error("Academic Year already exists");
    }
    const programCreated = await Program.create({
        name, 
        description,
        createdBy: req.userAuth._id

    })
    //push program into admin
    const admin = await  Admin.findById(req.userAuth._id);
    admin.programs.push(Program._id);
    await admin.save(); 
    res.status(201).json({
        status: "success",
        message: "Program created succesfully",
        data: programCreated,
    })
});

//@desc get All programs
//@route GET api/v1/academic-years/
//@access Private
exports.getProgramsCtrl = AsyncHandler(async(req,res)=>{
    const programs = await Program.find();
    res.status(201).json({
        status: "success",
        message: "Programs fetched succesfully",
        data: programs,
    })
})
//@desc get SINGLE program
//@route GET api/v1/programs/:id
//@access Private
exports.getSingleProgramCtrl = AsyncHandler(async(req,res)=>{
    const program = await Program.findById(req.params.id);
    res.status(201).json({
        status: "success",
        message: "Program fetched succesfully",
        data: program,
    })
})
//@desc update program
//@route GET api/v1/programs/:id
//@access Private
exports.updateProgramCtrl = AsyncHandler(async(req,res)=>{
    const {name, description}=  req.body;
    //check name exists
    const programFound = await Program.findOne({name});
    if(programFound){
        throw new Error("Program already exists");
    }
    const program = await Program.findByIdAndUpdate(
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
        message: "Program updated succesfully",
        data: program,
    })
})
//@desc delete program
//@route DELETE api/v1/programs/:id
//@access Private
exports.deleteProgramCtrl = AsyncHandler(async(req,res)=>{
   await Program.findByIdAndDelete(req.params.id);
    
    res.status(201).json({
        status: "success",
        message: "Class Level deleted succesfully",
    })
})