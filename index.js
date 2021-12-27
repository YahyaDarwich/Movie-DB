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

const movies = [
  { title: "Jaws", year: 1975, rating: 8 },
  { title: "Avatar", year: 2009, rating: 7.8 },
  { title: "Brazil", year: 1985, rating: 8 },
  { title: "الإرهاب والكباب‎", year: 1992, rating: 6.2 },
];

app.get("/movies/create", function (req, res, next) {
  next();
});

app.get("/movies/read", function (req, res, next) {
  res.status(200);
  // res.json({cart: req.cart.toJSON(movies)})
  res.send(
    movies
      .map(
        (e) =>
          `${e.title}
      ${e.year}
      ${e.rating}
      `
      )
      .join("")
  );
  next();
});

app.get("/movies/update", function (req, res, next) {
  next();
});

app.get("/movies/delete", function (req, res, next) {
  next();
});

app.get("/movies/add", function (req, res, next) {
  next();
});

app.get("/movies/get", function (req, res, next) {
  next();
});

app.get("/movies/edit", function (req, res, next) {
  next();
});

app.get("/movies/read/by-date", function (req, res, next) {
  movies.sort(CompareByName);
  console.log(movies);
  console.log("------------------------------");
  movies.sort((firstItem, secondItem) => firstItem.year - secondItem.year);
  console.log(movies);
  res.status(200);
  res.send(movies);

  // OR send the list with String format
  // res.send(
  //   movies.map( (e) =>
  //    `${e.title}
  //     ${e.year}
  //     ${e.rating}
  //     `).join(" ")
  // );

  next();
});

app.get("/movies/read/by-rating", function (req, res, next) {
  movies.sort(CompareByName);
  console.log(movies);
  console.log("------------------------------");
  movies.sort((firstItem, secondItem) => secondItem.rating - firstItem.rating );
  console.log(movies);
  res.status(200);
  res.send(movies);

  // OR send the list with String format
  // res.send(
  //   movies.map( (e) =>
  //    `${e.title}
  //     ${e.year}
  //     ${e.rating}
  //     `).join(" ")
  // );
  
  next();
});

app.get("/movies/read/by-title", function (req, res, next) {
  console.log(movies);
  console.log("------------------------------");
  movies.sort(CompareByName);
  console.log(movies);
  res.status(200);
  res.send(movies);

  // OR send the list with String format
  // res.send(
  //   movies.map( (e) =>
  //    `${e.title}
  //     ${e.year}
  //     ${e.rating}
  //     `).join(" ")
  // );
  
  next();
});

function CompareByName(a, b) {
  var nameA = a.title.toUpperCase(); 
  var nameB = b.title.toUpperCase();
  if (nameA < nameB) {
    return -1;
  }
  else if (nameA > nameB) {
    return 1;
  }
  else return 0;
};

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
