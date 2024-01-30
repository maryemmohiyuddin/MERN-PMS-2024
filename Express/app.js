var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var authRouter = require("./routes/authRouter");
var userRouter = require("./routes/userRouter");
var projectRouter = require("./routes/projectRouter");
var teamRouter = require("./routes/teamRouter");
var taskRouter = require("./routes/taskRouter");
var instructorRouter = require("./routes/instructorRouter");
var requestRouter = require("./routes/requestRouter");










//(secret code generator)  node -e "console.log(require('crypto').randomBytes(64).toString('base64'));"

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/project", projectRouter);
app.use("/team", teamRouter);
app.use("/task", taskRouter);
app.use("/instructor", instructorRouter);
app.use("/request", requestRouter);






// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
