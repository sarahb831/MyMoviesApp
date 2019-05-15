const express = require("express"),
  morgan = require("morgan"),
  bodyParser = require("body-parser"),
  uuid = require("uuid");

const mongoose = require("mongoose");
const Models = require("./models");

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect(
  "mongodb://localhost:27017/myMoviesDB",
  { userNewUrlParser: true }
);

const app = express();

app.use(bodyParser.json());

let movies = [
  {
    title: "The Godfather",
    description:
      "American crime film about the Mafia based on novel by Mario Puzo.",
    director: "Francis Ford Coppola",
    genre: "crime",
    imageUrl: "https://www.rottentomatoes.com/m/godfather",
    ifFeatured: "yes"
  },
  {
    title: "The Shawshank Redemption",
    description:
      "American drama film about a banker sentenced to life in Shawshank State Prison.",
    director: "Frank Darabont",
    genre: "drama",
    imageUrl:
      "https://resizing.flixster.com/k6HGNQn7mJviYejJCX50YuYsYSo=/206x305/v1.bTsxMTE2NjcyNztqOzE4MTI5OzEyMDA7ODAwOzEyMDA",
    ifFeatured: "yes"
  },
  {
    title: "Pulp Fiction",
    description:
      "American crime film about two mob hitmen, a boxer, a gangster's wife, and two bandits intertwine.",
    director: "Quentin Tarantino",
    genre: "crime",
    imageUrl:
      "https://resizing.flixster.com/0i1hnI180unVoxhpNmimKw4qwTQ=/206x305/v1.bTsxMTE3NjEwNTtqOzE4MTI5OzEyMDA7ODAwOzEyMDA",
    ifFeatured: "yes"
  },
  {
    title: "Star Wars",
    description:
      "American epic space opera film about battle between good and evil forces.",
    director: "George Lucas",
    genre: "science fiction",
    imageUrl:
      "https://resizing.flixster.com/cMFtFH6RRzLT5IuwitAtzoaCSxs=/fit-in/200x296.2962962962963/v1.bTsxMjMwMzAzODtqOzE4MDUyOzEyMDA7NDgwOzcxMQ",
    ifFeatured: "yes"
  },
  {
    title: "The Dark Knight",
    description: "Superhero film based on DC Comics character Batman.",
    director: "Christopher Nolan",
    genre: "science fiction",
    imageUrl:
      "https://resizing.flixster.com/Oa0UCsaN1J_EK4FaWugBqnTppaQ=/206x305/v1.bTsxMTE2NTE2MDtqOzE4MTI5OzEyMDA7ODAwOzEyMDA",
    ifFeatured: "yes"
  },
  {
    title: "Goodfellas",
    description:
      "Crime film about the rise and fall of a crime family associate and his friends.",
    director: "Martin Scorsese",
    genre: "crime",
    imageUrl:
      "https://resizing.flixster.com/C6vAATK9W_nlgNUwd0CXjPBEC-c=/206x305/v1.bTsxMTE2NjcyMztqOzE4MTI5OzEyMDA7ODAwOzEyMDA",
    ifFeatured: "yes"
  },
  {
    title: "The Godfather Part II",
    description: "Prequel and sequel to The Godfather.",
    director: "Francis Ford Coppola",
    genre: "crime",
    imageUrl:
      "https://resizing.flixster.com/-oP3lUcfjUt7BJgtcKh80XWIEXU=/fit-in/200x296.2962962962963/v1.bTsxMTE2OTc4MztqOzE4MTI5OzEyMDA7ODAwOzEyMDA",
    ifFeatured: "yes"
  },
  {
    title: "The Matrix",
    description:
      "A dystopian future with a similated reality to subdue the human population.",
    director: "The Wachowskis",
    genre: "science fiction",
    imageUrl:
      "https://resizing.flixster.com/MAbDE_svTjKNoxhiOXCtrWZ-G6g=/206x305/v1.bTsxMTE2ODA5NjtqOzE4MTI5OzEyMDA7ODAwOzEyMDA",
    ifFeatured: "yes"
  },
  {
    title: "Schindler's List",
    description:
      "Based on life of a German businessman who saved the lives of over a thousand Jewish refugees during the Holocaust.",
    director: "Steven Spielberg",
    genre: "historical",
    imageUrl:
      "https://resizing.flixster.com/0P5G_GOzKWSC8NyR5KaZJgcvZX0=/206x305/v1.bTsxMTIwODUwODtqOzE4MTI5OzEyMDA7ODUyOzExMzY",
    ifFeatured: "yes"
  },
  {
    title: "Raiders of the Lost Ark",
    description:
      "A treasure hunter tries to find the Ark of the Covenant before a group of Nazis.",
    director: "Steven Spielberg",
    genre: "adventure",
    imageUrl:
      "https://resizing.flixster.com/K_KyKtlrMBtOHsvG39r3e4mhjkQ=/fit-in/200x296.2962962962963/v1.bTsxMTE1NzYxNDtqOzE4MTI5OzEyMDA7MTAxMDsxNTAw",
    ifFeatured: "yes"
  }
];

app.get("/", function(req, res) {
  res.send("Welcome to My Movies!");
});

// log all requests
app.use(morgan("common"));

// get list of all movies

app.get("/movies", (req, res) => {
  res.json(movies);
});

// get data about a single movie by title

app.get("/movies/:title", (req, res) => {
  res.json(
    movies.find(movie => {
      return movie.title === req.params.title;
    })
  );
});

// get data about a genre by name

app.get("/movies/list/:genre", (req, res) => {
  res.send(
    "Successful GET request returning movies for the " +
      req.params.genre +
      " genre."
  );
});

// get data about a director by name

app.get("/directors/:name", (req, res) => {
  res.send(
    "Successful GET request returning details about Director " +
      req.params.name +
      "."
  );
});

// add a new user

app.post("/users", (req, res) => {
  let newUser = req.body;

  if (!newUser.username) {
    const message = "Missing user name in request body";
    res.status(400).send(message);
  } else {
    res
      .status(200)
      .send(
        "Successful POST request to add details for username " +
          newUser.username
      );
  }
});

// update a user's info

app.put("/users/:username/:password", (req, res) => {
  // make sure that req.params.password matches password for this
  //req/params.username in the database

  let validPassword = true; // delete once above test is working

  if (validPassword) {
    res
      .status(201)
      .send(
        "Successful PUT request to update info for user name " +
          req.params.username
      );
  } else {
    res
      .status(404)
      .send("Unable to update info for user name " + req.params.username + ".");
  }
});

// add a movie to a user's list of favorites by username

app.post("/users/:username/:title", (req, res) => {
  if (!req.params.username) {
    const message = "Missing user name in request body";
    res.status(400).send(message);
  } else {
    res
      .status(200)
      .send(
        "Successful POST request to add movie " +
          req.params.title +
          " for user name " +
          req.params.username
      );
  }
});

// delete a movie from a user's list of favorites by username

app.delete("/users/:username/:title", (req, res) => {
  // make sure that movie is listed for the user's favorites
  let validTitle = true;
  if (validTitle) {
    res
      .status(201)
      .send(
        "Movie " +
          req.params.title +
          " was deleted from " +
          req.params.username +
          " favorites."
      );
  } else {
    res
      .status(400)
      .send(
        "Movie " +
          req.params.title +
          " is not in favorites for " +
          req.params.username +
          "."
      );
  }
});

// delete user from the list of users

app.delete("/users/:username", (req, res) => {
  // make sure that user is on the list
  let validUser = true;
  if (validUser) {
    res
      .status(201)
      .send(
        "User name " + req.params.username + " was deleted from the users list."
      );
  } else {
    res
      .status(400)
      .send("user name " + req.params.username + " was not found.");
  }
});

// go to this folder for file requests
app.use(express.static("public"));

// log all application errors
app.use(function(err, req, res, next) {
  console.error(err.stack);
});

app.listen(8080, () => console.log("Your app is running on port 8080"));
