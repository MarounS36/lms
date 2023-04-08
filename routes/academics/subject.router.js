const express = require("express");
const { getSingleSubjectCtrl, getSubjectsCtrl, createSubject, updateSubjectCtrl, deleteSubjectCtrl } = require("../../controller/academics/subject.controller");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");


const subjectRouter = express.Router();

subjectRouter.post("/:programID", isLogin,isAdmin,createSubject);
subjectRouter.get("/",isLogin,isAdmin,getSubjectsCtrl);


subjectRouter
.route("/:id")
.get(isLogin, isAdmin ,getSingleSubjectCtrl)
.put(isLogin, isAdmin , updateSubjectCtrl)
.delete( isLogin, isAdmin , deleteSubjectCtrl)
module.exports= subjectRouter;