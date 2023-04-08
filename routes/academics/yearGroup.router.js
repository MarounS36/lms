const express = require("express");
const { getAllYearGroupsCtrl, createYearGroupCtrl, getSingleYearGroupCtrl, updateYearGroupCtrl, deleteYearGroupCtrl } = require("../../controller/academics/yearGroup.controller");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");


const yearGroupRouter = express.Router();


yearGroupRouter
.route("/")
.get(isLogin,isAdmin, getAllYearGroupsCtrl)
.post(isLogin,isAdmin, createYearGroupCtrl)

yearGroupRouter
.route("/:id")
.get(isLogin, isAdmin ,getSingleYearGroupCtrl)
.put(isLogin, isAdmin , updateYearGroupCtrl)
.delete( isLogin, isAdmin , deleteYearGroupCtrl)
module.exports= yearGroupRouter;