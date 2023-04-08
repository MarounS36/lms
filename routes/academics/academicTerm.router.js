const express = require("express");
const { getAcademicTermsCtrl, createAcademicTerm, getSingleAcademicTermCtrl, updateAcademicTermCtrl, deleteAcademicTermCtrl } = require("../../controller/academics/academicTerm.controller");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");


const academicTermRouter = express.Router();


academicTermRouter
.route("/")
.get(isLogin,isAdmin, getAcademicTermsCtrl)
.post(isLogin,isAdmin, createAcademicTerm)

academicTermRouter
.route("/:id")
.get(isLogin, isAdmin ,getSingleAcademicTermCtrl)
.put(isLogin, isAdmin , updateAcademicTermCtrl)
.delete( isLogin, isAdmin , deleteAcademicTermCtrl)
module.exports= academicTermRouter;