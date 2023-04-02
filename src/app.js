const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();

// const logger = require("morgan");

const v1 = require("./routes/v1");
const app = express();


// ----------- DB Config -----------//
mongoose.connect(process.env.url);

mongoose.connection.on("connected", () => {
  console.log("Connected to the database");
});

mongoose.connection.on("error", (err) => {
  console.error(`Failed to connected to the database: ${err}`);
});



// ----------- Middlewares -----------//
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



//----------------Routes----------------//
app.use("/api/v1", v1);



//----------------Errors----------------//
app.use((req, res, next) => {
  var err = new Error('this route is not found !!');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next)=> {
  const status = err.status || 500;
  const error = err.message || 'Error processing your request !!';

  res.status(status).send({error});
});




module.exports = app;
