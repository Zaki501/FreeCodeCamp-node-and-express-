var express = require("express");
var app = express();
require("dotenv").config();

app.use(function(req, res, next) {
  console.log(req.method + " "  + req.path + " - " + req.ip);
  next();
})

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.use(express.static(__dirname + "/public"));

//testing .env
app.get("/json", function (req, res) {
  const response = "Hello json";
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({ message: response.toUpperCase() });
  } else {
    res.json({ message: response });
  }
});




module.exports = app;
