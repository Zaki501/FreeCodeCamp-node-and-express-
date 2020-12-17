var express = require('express');
var app = express();


app.get("/", function(req, res){
  res.sendFile(__dirname + "/views/index.html")
});

app.use(express.static(__dirname + "/public"));

app.get("/json", function(req, res){
  res.json({"message": "Hello json"})
})
//git config test 2
































 module.exports = app;
