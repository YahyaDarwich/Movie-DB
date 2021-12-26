const express = require("express");
const app = express();
const port = 3000;

var today = new Date();
var time =
  today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

app.get("/", (req, res) => {
  res.send("ok");
  next();
});

app.get("/test", (req, res) => {
  res.status(200);
  res.send("ok");

  // OR using this method
  // res.status(200).send("ok");
  next();
});

app.get("/time", (req, res) => {
  res.status(200);
  res.send(time);

  // OR using this method
  // res.status(200).send(time);
  next();
});

app.get("/hello/:id", function (req, res, next) {
  console.log("id: " + req.params.id);
  if (+req.params.id) {
    console.log("Yes it's ID: " + +req.params.id);
    res.status(200).send("Hello, " + req.params.id);
    next();
  } else {
    console.log("No it's not ID: " + +req.params.id);
    res.status(500).send("Error: id must be integer " + req.params.id);
    next();
  }
});

app.get("/search", function (req, res, next) {
  var data = { data: req.param("s") };
  console.log(req.param("s"));
  let str = req.param("s");
  if (str == null || str == undefined || str.length == 0) {
    res.status(500).send("you have to provide a search");
    throw new Error("true");
    next();
  } else {
    res.status(200).send("ok " + req.param("s"));
    res.json(data);
    next();
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
