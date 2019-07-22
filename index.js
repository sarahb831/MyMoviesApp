const express = require("express"),
  morgan = require("morgan"),
  bodyParser = require("body-parser"),
  uuid = require("uuid");

const mongoose = require("mongoose");
const Models = require("./models.js");

const passport = require('passport');
require('./passport.js');

const Movies = Models.Movie;
const Users = Models.User;

/* use this version for using local db */
/* mongoose
  .connect(
    "mongodb://127.0.0.1:27017/myMoviesDB",
    { useNewUrlParser: true }
  )
  .catch(function(err) {
    console.error("mongoose.connect error: " + err);
  });
*/

// use this version for connecting to MongoDB Atlas
  mongoose
    .connect('mongodb+srv://smbeauchamp:Sundance885!@smbcluster-byaox.mongodb.net/myMoviesDB?retryWrites=true',
      { useNewUrlParser: true }
    )
    .catch(function(err) {
      console.error("mongoose.connect error: " + err);
    });

const app = express();

const validator = require('express-validator');
app.use(validator());

const cors = require('cors');
//app.use(cors());

/* had been bypassed since client side built */
var allowedOrigins = ['*', 'http://localhost:1234'];
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) { // not specified on list
      var message = "The CORS policy for this application doesn't allow " +
      "access from "+origin;
      return callback(new Error(message), false);
  }
  return callback(null, true);
}
}));

app.use(bodyParser.json());

var auth = require('./auth.js')(app); // so Express is available to auth.js also

app.get("/*", (req, res) => {
  res.send("Welcome to My Movies!");
});

// log all requests
app.use(morgan("common"));

// get list of all movies

app.get("/movies", passport.authenticate('jwt', {session: false }), (req, res) => {
  Movies.find()
    .then(function(movies) {
      res.status(201).json(movies);
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// get list of all users

app.get("/users", (req, res) => {
  Users.find()
    .then(function(users) {
      res.status(201).json(users);
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// get data about a single movie by title

app.get("/movies/:Title", (req, res) => {
  Movies.findOne({ Title: req.params.Title })
    .then(function(movie) {
      res.json(movie);
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// get data about a genre by name

app.get("/movies/list/:Genre", (req, res) => {
  Movies.findOne({ "Genre.Name": req.params.Genre })
    .then(function(movie) {
      res.json(movie.Genre);
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// get data about a director by name

app.get("/movies/directors/:Name", (req, res) => {
  Movies.findOne({ "Director.Name": req.params.Name })
    .then(function(movie) {
      res.json(movie.Director);
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// add a new user
/* JSON in this format is expected:
{
  ID : Integer,
  Username : String,
  Password : String,
  Email : String,
  Birthday : Date
}
*/

app.post("/users", function(req, res) {
  // validation logic
  req.checkBody('Username', 'Username is required').notEmpty();
  req.checkBody('Username', 'Username contains non alphanumeric characters -' +
    ' not allowed.').isAlphanumeric();
  req.checkBody('Password', 'Password is required').notEmpty();
  req.checkBody('Email', 'Email is required').notEmpty();
  req.checkBody('Email', 'Email does not appear to be valid').isEmail();
  // check validation objects for errors
  var errors = req.validationErrors();

  if (errors) {
    return res.status(422).json({errors : errors});
  }
  var hashedPassword = Users.hashPassword(req.body.Password);
  Users.findOne({ Username: req.body.Username })
    .then(function(user) {
      if (user) {
        return res.status(400).send(req.body.Username + " already exists.");
      } else {
        Users.create({
          Username: req.body.Username,
          Password: hashedPassword,
          Email: req.body.Email,
          Birthday: req.body.Birthday
        })
          .then(function(user) {
            res.status(201).json(user);
          })
          .catch(function(err) {
            console.error(err);
            res.status(500).send("Error: " + err);
          });
      }
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// update a user's info

app.put("/users/:Username", (req, res) => {
  /*
based on JSON in this format:
{
  Username: String,
    (required)
  Password: String,
    (required)
  Email: String,
    (required)
  Birthday: Date
}
  */
  req.checkBody('Username', 'Username is required').notEmpty();
  req.checkBody('Username', 'Username contains non alphanumeric characters -' +
    ' not allowed.').isAlphanumeric();
  req.checkBody('Password', 'Password is required').notEmpty();
  req.checkBody('Email', 'Email is required').notEmpty();
  req.checkBody('Email', 'Email does not appear to be valid').isEmail();
  // check validation objects for errors
  var errors = req.validationErrors();

  if (errors) {
    return res.status(422).json({errors : errors});
  }
  var hashedPassword = Users.hashPassword(req.body.Password);
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $set: {
        Username: req.body.Username,
        Password: hashedPassword,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      }
    },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.status(201).json(updatedUser);
      }
    }
  );
});

// add a movie to a user's list of favorites by username

app.post("/users/:Username/Movies/:MovieID",(req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    { $push: { FavoriteMovies: req.params.MovieID } },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.status(201).json(updatedUser);
      }
    }
  );
});

// delete a movie from a user's list of favorites by username

app.delete("/users/:Username/:MovieID",(req, res) => {
  Users.updateOne(
    { Username: req.params.Username },
    { $pull: { FavoriteMovies: req.params.MovieID } }
  )
    .then(function(user) {
      if (!user) {
        res.status(400).send(req.params.Username + " was not found.");
      } else {
        res
          .status(201)
          .send(req.params.MovieID + " was deleted for " + req.params.Username);
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// delete user from the list of users
// needs troubleshooting
app.delete("/users/:Username", function(req, res) {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then(function(user) {
      if (!user) {
        res.status(400).send(req.params.Username + " was not found.");
      } else {
        res.status(201).send(req.params.Username + " was deleted.");
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// delete movie from movie list

app.delete("/movies/:Title", function(req, res) {
  Movies.findOneAndRemove({ Title: req.params.Title })
    .then(function(movie) {
      if (!movie) {
        res.status(400).send(req.params.Title + " was not found.");
      } else {
        res.status(201).send(req.params.Title + " was deleted.");
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// go to this folder for file requests
app.use(express.static("public"));

// log all application errors
app.use(function(err, req, res, next) {
  console.error(err.stack);
});

var port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", function() {
  console.log("Listening on Port "+port);
});
