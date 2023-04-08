const express = require("express");
const morgan = require("morgan");
const {
    globalErrHandler,
    notFoundErr
} = require('../middlewares/globalErrHandler');
const {adminRouter} = require("../routes/staff/admin.router");
const bodyParser = require('body-parser');
const academicYearRouter = require("../routes/academics/academicYear.router");
const academicTermRouter = require("../routes/academics/academicTerm.router");
const classLevelRouter = require("../routes/academics/classLevel.router");
const programRouter = require("../routes/academics/program.router");
const subjectRouter = require("../routes/academics/subject.router");
const yearGroupRouter = require("../routes/academics/yearGroup.router");

const app = express();

//Middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());

app.use('/api/v1/admins', adminRouter);
app.use("/api/v1/academic-years", academicYearRouter);
app.use("/api/v1/academic-terms", academicTermRouter);
app.use("/api/v1/class-levels", classLevelRouter);
app.use("/api/v1/programs", programRouter);
app.use("/api/v1/subjects", subjectRouter);
app.use("/api/v1/year-groups",yearGroupRouter);



//Error Middleware
app.use(notFoundErr);
app.use(globalErrHandler);

module.exports=app;
