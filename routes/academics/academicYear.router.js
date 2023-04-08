const express = require("express");
const { createAcademicYear, getAcademicYearsCtrl, getSingleAcademicYearCtrl, updateAcademicYearCtrl, deleteAcademicYearCtrl } = require("../../controller/academics/academicYear.controller");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");

const academicYearRouter = express.Router();
// //create Academic Year
// academicYearRouter.post("/",isLogin,isAdmin, createAcademicYear);

// //get All academic years
// academicYearRouter.get("/",isLogin,isAdmin, getAcademicYearsCtrl);

academicYearRouter
.route("/")
.get(isLogin,isAdmin, getAcademicYearsCtrl)
.post(isLogin,isAdmin, createAcademicYear)
// //get single Academic year
// academicYearRouter.get("/:id", isLogin, isAdmin ,getSingleAcademicYearCtrl);

// //update academic year
// academicYearRouter.put("/:id", isLogin, isAdmin , updateAcademicYearCtrl);

//delete academic year
// academicYearRouter.delete("/:id", isLogin, isAdmin , deleteAcademicYearCtrl);
academicYearRouter
.route("/:id")
.get(isLogin, isAdmin ,getSingleAcademicYearCtrl)
.put(isLogin, isAdmin , updateAcademicYearCtrl)
.delete( isLogin, isAdmin , deleteAcademicYearCtrl)
module.exports= academicYearRouter;