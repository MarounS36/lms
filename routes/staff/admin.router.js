const express = require('express');

const adminRouter = express.Router();
const {registerAdminCtrl, loginAdminCtrl, getAllAdminsCtrl, updateAdminCtrl, deleteAdminCtrl, suspendTeacherCtrl, unsuspendTeacherCtrl, withdrawTeacherCtrl, unwithdrawTeacherCtrl, publishExamCtrl, unpublishExamCtrl, getAdminCtrl} = require('../../controller/staff/admin.controller');
const isAdmin = require('../../middlewares/isAdmin');
const isLogin = require('../../middlewares/isLogin');

//admin register
adminRouter.post("/register", registerAdminCtrl);
//admin log in
adminRouter.post("/login",loginAdminCtrl)
// get all admins
adminRouter.get("/",isLogin ,getAllAdminsCtrl);
//get single admin
adminRouter.get("/profile",isLogin,isAdmin, getAdminCtrl)
//update admin
adminRouter.put("/",isLogin ,isAdmin ,updateAdminCtrl)
//delete admin
adminRouter.delete("/:id",deleteAdminCtrl)
//admin suspending teacher
adminRouter.put("/suspend/teacher/:id",suspendTeacherCtrl)
//admin unsuspending teacher
adminRouter.put("/unsuspend/teacher/:id",unsuspendTeacherCtrl)
// admin withdraw teacher
adminRouter.put("/withdraw/teacher/:id",withdrawTeacherCtrl)
//admin unwithdraw teacher
adminRouter.put("/unwithdraw/teacher/:id",unwithdrawTeacherCtrl)
//Admin publishing exam results 
adminRouter.put("/publish/exam/:id",publishExamCtrl)
//Admin Unpublishing exam results 
adminRouter.put("/unpublish/exam/:id",unpublishExamCtrl)

module.exports = {
    adminRouter,
};