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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
