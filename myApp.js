var express = require("express");
var app = express();
require("dotenv").config();
const bodyParser = require("body-parser");

app.use(function(req, res, next) {
  console.log(req.method + " "  + req.path + " - " + req.ip);
  next();
})

//using bodyParser
app.use(bodyParser.urlencoded({extended: false}))

app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});



//testing .env
app.get("/json", function (req, res) {
  const response = "Hello json";
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({ message: response.toUpperCase() });
  } else {
    res.json({ message: response });
  }
});

//chaining middleware
app.get("/now", 
    function(req, res, next) {
      req.time = Date().toString();
      console.log(req.time);
      next();
    },
    function(req, res) {
      res.send({ time: req.time })
    }
)

//build echo server

app.get("/:word/echo", function(req, res) {

res.json({echo: req.params.word});

})

//Query parameter input from client
app.get("/name", function(req, res) {

  res.json({
    name: req.query.first+ " " + req.query.last,
  });
})

app.post("/name", function(req, res) {
  res.send({name: req.body.first+ " " + req.body.last})
})


module.exports = app;
