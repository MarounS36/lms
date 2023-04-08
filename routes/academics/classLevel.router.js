const express = require("express");
const { getClassLevelsCtrl, createClassLevel, updateClassLevelCtrl, deleteClassLevelCtrl, getSingleClassLevelCtrl } = require("../../controller/academics/classLevel.controller");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");


const classLevelRouter = express.Router();


classLevelRouter
.route("/")
.get(isLogin,isAdmin, getClassLevelsCtrl)
.post(isLogin,isAdmin, createClassLevel)

classLevelRouter
.route("/:id")
.get(isLogin, isAdmin ,getSingleClassLevelCtrl)
.put(isLogin, isAdmin , updateClassLevelCtrl)
.delete( isLogin, isAdmin , deleteClassLevelCtrl)
module.exports= classLevelRouter;