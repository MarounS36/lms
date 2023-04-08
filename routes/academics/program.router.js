const express = require("express");
const { getProgramsCtrl, createProgramCtrl, getSingleProgramCtrl, updateProgramCtrl, deleteProgramCtrl } = require("../../controller/academics/program.controller");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");


const programRouter = express.Router();


programRouter
.route("/")
.get(isLogin,isAdmin, getProgramsCtrl)
.post(isLogin,isAdmin, createProgramCtrl)

programRouter
.route("/:id")
.get(isLogin, isAdmin ,getSingleProgramCtrl)
.put(isLogin, isAdmin , updateProgramCtrl)
.delete( isLogin, isAdmin , deleteProgramCtrl)
module.exports= programRouter;