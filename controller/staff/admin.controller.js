const Admin = require("../../model/Staff/Admin");
const AsyncHandler = require('express-async-handler');
const generateToken = require("../../utils/generateToken");
const verifyToken = require("../../utils/verifyToken");
const { hashPassword, isPassMatched } = require("../../utils/helpers");

//@desc Register admin
//@route POST api/admins/register
//@access Private
 exports.registerAdminCtrl = AsyncHandler(async (req,res)=>{
    const {name,email,password} = req.body;
        const adminFound = await Admin.findOne({email});
        if(adminFound){
            res.json("Admin Exists");
        }else{
        
        const user = await Admin.create({
            name,
            email,
            password: await hashPassword(password)
        })
        res.status(201).json({
            status:'success',
            data: user,
            message: "Admin registered successfully"
        })
    }
}); 
//@desc Login admin
//@route POST api/admins/login
//@access Private
exports.loginAdminCtrl =AsyncHandler(async (req,res)=>{
    const {email,password}= req.body;
        //find user
        const user = await Admin.findOne({email});
        if(!user){
            return res.json({message : 'User not found'})
        }
        //verify password
        const isMatched = await isPassMatched(password,user.password)
        if(!isMatched){
            return res.json({
                message: "Invalid login credentials"
            })
        }else{
            return res.json({
                data: generateToken(user._id),
                message: "Admin logged in succesfully",
            })
        }
        
        // if(user && user.verifyPassword(password)){
        //     const token = generateToken(user._id);
        //     const verify = verifyToken(token);
        //     console.log(verify);
        //     return res.json({
        //         data : generateToken(user._id),
        //         message: "Admin logged in succesfuly",
        //     })
        // }else{
        //     return res.json({message: "Invalid Login credentials"})
        // }
})
        
    
//@desc getAll admin
//@route GET api/admins/
//@access Private
exports.getAllAdminsCtrl = AsyncHandler(async(req,res)=>{
    const admins = await Admin.find();
    res.status(200).json({
        status: "success",
        message: "Admins fetched succesfully",
        data: admins
    })
})
//@desc get single admin
//@route GET api/admins/:id
//@access Private
exports.getAdminCtrl =  AsyncHandler(async(req,res)=>{
    const admin =await Admin.findById(req.userAuth._id).select(
        "-password -createdAt -updatedAt"
        )
        .populate("academicYears");
    
    if(!admin){
        throw new Error('Admin not found');
    }else{
        res.status(200).json({
            status:'success',
            data: admin,
            message: "Admin logged in succesfuly"
        })
    }
  })
//@desc Update admin
//@route PUT api/admins/:id
//@access Private
exports.updateAdminCtrl = AsyncHandler( async(req,res)=>{
    const {email, name, password} = req.body;
   
    //if email is taken
    const emailExist = await Admin.findOne({email})
    if(emailExist){
        throw new Error('This email is taken/exist');
    }
   
    //check if user is updating password
    if(password){
        //update
        const admin = await Admin.findByIdAndUpdate(req.userAuth._id,{
            email,
            password:await hashPassword(password),
            name
        },{
            new: true,
            runValidators: true,
        })
    res.status(200).json({
        status: "success",
        data: admin,
        message: "Admin updated succesfully"
    })
    
    }else{
        //update
        const admin = await Admin.findByIdAndUpdate(req.userAuth._id,{
            email,
            name
        },{
            new: true,
            runValidators: true,
        })
    res.status(200).json({
        status: "success",
        data: admin,
        message: "Admin updated succesfully"
    })
    
    }

        
})
//@desc delete admin
//@route DELETE api/admins/:id
//@access Private
exports.deleteAdminCtrl = (req,res)=>{
    try {
        res.status(201).json({
            status:'success',
            data:'delete admin',
        })
    } catch (error) {
        res.json({
            status:"failed",
            error: error.message,
        })
    }
}
//@desc suspend teacher 
//@route PUT api/admins/suspend/teacher/:id
//@access Private
 exports.suspendTeacherCtrl = (req,res)=>{
    try {
        res.status(201).json({
            status:'success',
            data:'Admin suspend teacher',
        })
    } catch (error) {
        res.json({
            status:"failed",
            error: error.message,
        })
    }
}
//@desc unsuspend teacher 
//@route PUT api/admins/unsuspend/teacher/:id
//@access Private
exports.unsuspendTeacherCtrl = (req,res)=>{
    try {
        res.status(201).json({
            status:'success',
            data:'Admin Unsuspending a teacher',
        })
    } catch (error) {
        res.json({
            status:"failed",
            error: error.message,
        })
    }
}
//@desc withdraw teacher 
//@route PUT api/admins/withdraw/teacher/:id
//@access Private
exports.withdrawTeacherCtrl = (req,res)=>{
    try {
        res.status(201).json({
            status:'success',
            data:'Admin withdraw teacher',
        })
    } catch (error) {
        res.json({
            status:"failed",
            error: error.message,
        })
    }
}
//@desc withdraw teacher 
//@route PUT api/admins/unwithdraw/teacher/:id
//@access Private
exports.unwithdrawTeacherCtrl = (req,res)=>{
    try {
        res.status(201).json({
            status:'success',
            data:'Admin Unwithdraw teacher',
        })
    } catch (error) {
        res.json({
            status:"failed",
            error: error.message,
        })
    }
}
//@desc withdraw teacher 
//@route PUT api/admins/publish/exam/:id
//@access Private
exports.publishExamCtrl = (req,res)=>{
    try {
        res.status(201).json({
            status:'success',
            data:'Admin publish exam',
        })
    } catch (error) {
        res.json({
            status:"failed",
            error: error.message,
        })
    }
}
//@desc withdraw teacher 
//@route PUT api/admins/unpublish/exam/:id
//@access Private
exports.unpublishExamCtrl = (req,res)=>{
    try {
        res.status(201).json({
            status:'success',
            data:'Admin unpublish exam',
        })
    } catch (error) {
        res.json({
            status:"failed",
            error: error.message,
        })
    }
}