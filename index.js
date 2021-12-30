const express = require("express");
const app = express();
const port = 3000;
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const url = `mongodb+srv://yahya_codi:yahcodi@cluster0.skewv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(url);

const movieSchema = new mongoose.Schema({
  moviesItem: [{ title: String, year: Number, rating: Number }],
});
const Movies = mongoose.model("Movies", movieSchema);

var today = new Date();
var time =
  today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

app.get("/", (req, res) => {
  res.send("ok");
  next();
});

// Step 3
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

// Step 4
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

// Step 5
// const movies = [
//   { title: "Jaws", year: 1975, rating: 8 },
//   { title: "Avatar", year: 2009, rating: 7.8 },
//   { title: "Brazil", year: 1985, rating: 8 },
//   { title: "الإرهاب والكباب‎", year: 1992, rating: 6.2 },
// ];

const movies = new Movies({
  moviesItem: [
    { title: "Jaws", year: 1975, rating: 8 },
    { title: "Avatar", year: 2009, rating: 7.8 },
    { title: "Brazil", year: 1985, rating: 8 },
    { title: "الإرهاب والكباب‎", year: 1992, rating: 6.2 },
  ],
});

// Movies.find({}).then(result => {
//   result.forEach(note => {
//     console.log(note)
//   })
//   mongoose.connection.close()
// })

app.get("/movies/create", function (req, res, next) {
  next();
});

app.get("/movies/read", function (req, res, next) {
  res.status(200).send({ status: 200, data: movies.moviesItem });

  // OR send the list with String format
  // res.status(200).send(
  //   movies
  //     .map(
  //       (e) =>
  //         `${e.title}
  //     ${e.year}
  //     ${e.rating}
  //     `
  //     )
  //     .join("")
  // );
  next();
});

// app.get("/movies/update", function (req, res, next) {
//   next();
// });

// app.get("/movies/delete", function (req, res, next) {
//   next();
// });

// app.get("/movies/add", function (req, res, next) {
//   next();
// });

app.get("/movies/get", function (req, res, next) {
  next();
});

app.get("/movies/edit", function (req, res, next) {
  next();
});

// Step 6
app.get("/movies/read/by-date", function (req, res, next) {
  movies.moviesItem.sort(CompareByName);
  console.log(movies.moviesItem);
  console.log("------------------------------");
  movies.moviesItem.sort(
    (firstItem, secondItem) => firstItem.year - secondItem.year
  );
  console.log(movies.moviesItem);
  res.status(200);
  res.send(movies.moviesItem);

  // OR send the list with String format
  // res.send(
  //   movies.moviesItem.map( (e) =>
  //    `${e.title}
  //     ${e.year}
  //     ${e.rating}
  //     `).join(" ")
  // );

  next();
});

app.get("/movies/read/by-rating", function (req, res, next) {
  movies.moviesItem.sort(CompareByName);
  console.log(movies.moviesItem);
  console.log("------------------------------");
  movies.moviesItem.sort(
    (firstItem, secondItem) => secondItem.rating - firstItem.rating
  );
  console.log(movies.moviesItem);
  res.status(200);
  res.send(movies.moviesItem);

  // OR send the list with String format
  // res.send(
  //   movies.moviesItem.map( (e) =>
  //    `${e.title}
  //     ${e.year}
  //     ${e.rating}
  //     `).join(" ")
  // );

  next();
});

app.get("/movies/read/by-title", function (req, res, next) {
  console.log(movies.moviesItem);
  console.log("------------------------------");
  movies.moviesItem.sort(CompareByName);
  console.log(movies.moviesItem);
  res.status(200);
  res.send(movies.moviesItem);

  // OR send the list with String format
  // res.send(
  //   movies.moviesItem.map( (e) =>
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
  } else if (nameA > nameB) {
    return 1;
  } else return 0;
}

// Step 7
app.get("/movies/read/id/:id", function (req, res, next) {
  if (+req.params.id < movies.moviesItem.length) {
    console.log(movies.moviesItem);
    res
      .status(200)
      .send({ status: 200, data: movies.moviesItem[+req.params.id] });

    // OR this message
    //res.status(200).send(movies.moviesItem[+(req.params.id)]);
    next();
  } else {
    res.status(404).send({
      status: 404,
      error: true,
      message:
        "The movie '" +
        req.params.id +
        "' does not exist, the final ID is " +
        (movies.moviesItem.length - 1),
    });

    // OR this message
    //res.status(404).send("The movie \'"+req.params.id+"\' does not exist, the final ID is " + (movies.moviesItem.length-1));
    next();
  }
});

// Step 8
app.post("/movies/add", function (req, res, next) {
  let newTitle = req.param("title");
  let newYear = req.param("year");
  let newRating = req.param("rating");

  console.log(
    "Title= " + newTitle + " Year= " + newYear + " Rating= " + newRating
  );
  if (
    isMissing(newTitle) == false &&
    isMissing(newYear) == false &&
    +newYear != NaN &&
    newYear.length == 4
  ) {
    console.log(movies.moviesItem);
    console.log("-------------------------------");
    if (isMissing(newRating) == true) {
      newYear = +newYear; // change year to integer
      movies.moviesItem.push({ title: newTitle, year: newYear, rating: 4 });
      console.log(movies.moviesItem);
      res.status(200).send({ status: 200, data: movies.moviesItem });
      next();
    } else {
      newYear = +newYear; // change year to integer
      newRating = +newRating; // change rating to integer
      movies.moviesItem.push({
        title: newTitle,
        year: newYear,
        rating: newRating,
      });
      console.log(movies.moviesItem);
      res.status(200).send({ status: 200, data: movies.moviesItem });
      next();
    }
  } else {
    res.status(403).send({
      status: 403,
      error: true,
      message: "you cannot create a movie without providing a title and a year",
    });

    // OR this message
    //res.status(403).send("you cannot create a movie without providing a title and a year");
    next();
  }
  movies.save().then((result) => {
    console.log("saved!");
  });
});

function isMissing(str) {
  if (str == null || str == undefined || str.length == 0) return true;
  else return false;
}

// Step 9
app.delete("/movies/delete/:id", function (req, res, next) {
  console.log(req.params.id);
  if (req.params.id.startsWith("-")) {
    res.status(404).send({
      status: 404,
      error: true,
      message:
        "The movie '" +
        req.params.id +
        "' does not exist, you must enter an  ID >= 0 ",
    });
    next();
  } else {
    let id = +req.params.id;
    if (id < movies.moviesItem.length) {
      console.log("ID= " + id);
      movies.moviesItem.splice(id, 1);
      res.status(200).send({ status: 200, data: movies.moviesItem });

      // OR this message
      //res.status(200).send(movies.moviesItem);
      next();
    } else if (id == 0 && movies.moviesItem.length == 0) {
      res.status(404).send({
        status: 404,
        error: true,
        message:
          "The movie '" +
          id +
          "' does not exist, because the list of movies is empty ",
      });
      next();
    } else {
      res.status(404).send({
        status: 404,
        error: true,
        message: "The movie '" + id + "' does not exist ",
      });

      // OR this message
      //res.status(404).send("The movie \'"+id+"\' does not exist ");
      next();
    }
  }
  movies.save().then((result) => {
    console.log("saved!");
  });
});

//Step 10
app.put("/movies/update/:id", function (req, res, next) {
  let id = req.params.id;
  let newTitle = req.param("title");
  let newYear = req.param("year");
  let newRating = req.param("rating");

  console.log(
    "ID= " +
      id +
      " Title= " +
      newTitle +
      " Year= " +
      newYear +
      " Rating= " +
      newRating
  );
  if (
    isMissing(newTitle) == false &&
    isMissing(newYear) == false &&
    +newYear != NaN &&
    newYear.length == 4 &&
    isMissing(newRating) == false
  ) {
    console.log(movies.moviesItem);
    console.log("-------------------------------");

    newYear = +newYear; // change year to integer
    newRating = +newRating; // change rating to integer
    movies.moviesItem[id].title = newTitle;
    movies.moviesItem[id].year = newYear;
    movies.moviesItem[id].rating = newRating;
    console.log(movies.moviesItem);
    res.status(200).send({ status: 200, data: movies.moviesItem });
    next();
  } else if (
    isMissing(newYear) == false &&
    +newYear != NaN &&
    newYear.length == 4
  ) {
    console.log(movies.moviesItem);
    console.log("-------------------------------");
    newTitle = newTitle || movies.moviesItem[id].title;
    newYear = +newYear; // change year to integer
    newRating = +newRating || movies.moviesItem[id].rating; // change rating to integer
    console.log(
      "ID= " +
        id +
        " Title= " +
        newTitle +
        " Year= " +
        newYear +
        " Rating= " +
        newRating
    );
    movies.moviesItem[id].title = newTitle;
    movies.moviesItem[id].year = newYear;
    movies.moviesItem[id].rating = newRating;
    console.log(movies.moviesItem);
    res.status(200).send({ status: 200, data: movies.moviesItem });
    next();

    // OR this message
    //res.status(403).send("you cannot create a movie without providing a title and a year");
  } else if (isMissing(newYear) == true) {
    console.log(movies.moviesItem);
    console.log("-------------------------------");
    newTitle = newTitle || movies.moviesItem[id].title;
    newYear = movies.moviesItem[id].year; // change year to integer
    newRating = +newRating || movies.moviesItem[id].rating; // change rating to integer
    console.log(
      "ID= " +
        id +
        " Title= " +
        newTitle +
        " Year= " +
        newYear +
        " Rating= " +
        newRating
    );
    movies.moviesItem[id].title = newTitle;
    movies.moviesItem[id].year = newYear;
    movies.moviesItem[id].rating = newRating;
    console.log(movies.moviesItem);
    res.status(200).send({ status: 200, data: movies.moviesItem });
    next();
  } else {
    res.status(404).send({ status: 404, message: "enter a valid year" });
    next();
  }
  movies.save().then((result) => {
    console.log("saved!");
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
