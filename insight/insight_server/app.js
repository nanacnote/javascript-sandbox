var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

//Import routers
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var dataRouter = require("./routes/dataAPI");
var viewsRouter = require("./routes/viewsAPI");

// Initiate express app
var app = express();

// Cors allow middleware
app.use(cors());

// Set up mongoose connection
var mongoose = require("mongoose");
// var mongoDB = 'mongodb://admin:xyghyT-bygdow-xyqvo8@ds055802.mlab.com:55802/heroku_htz4tvh3';
// var mongoDB = "mongodb://127.0.0.1:27017/";
var mongoDB =
  "mongodb+srv://admin:s5kpSUAnDSPN1tee@cluster-htz4tvh3.ovx2f.mongodb.net/heroku_htz4tvh3?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
  console.log("CONNECTED to atlas - cluster-htz4tvh3 as ADMIN");
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/data", dataRouter);
app.use("/views", viewsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
