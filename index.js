const express = require("express"),
  morgan = require("morgan"),
  bodyParser = require("body-parser"),
  uuid = require("uuid"),
  path = require("path");
  require('dotenv').config()

const mongoose = require("mongoose");
const Models = require("./models.js");

const passport = require('passport');
require('./passport.js');

const Movies = Models.Movie;
const Users = Models.User;

/**
 * @typedef Function
 * 
 * @typedef InnerFunctions
 * @property {function} 
 * @param {object}  
 */

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
    .connect('mongodb+srv://' + process.env.DB_LOGIN + '@smbcluster-byaox.mongodb.net/myMoviesDB?retryWrites=true',
      { useNewUrlParser: true }
    )
    .catch(function(err) {
      console.error("mongoose.connect error: " + err);
    });

const app = express();

const validator = require('express-validator');
app.use(validator());

const cors = require('cors');

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

// log all requests
app.use(morgan("common"));

/**
 * get list of all movies
 * 
 * URL: /movies
 * Method: GET
 * Query Parameters: none
 * Request Body Data Format: none
 * Response Body Data Format: JSON object containing data about all the Movies
 * 
 */


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

/**
 * get list of all users
 * 
 * URL: /users
 * Method: GET
 * Query Parameters: none
 * Request Body Data Format: none
 * Response Body Data Format: JSON object containing data about all users
 * 
 */
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

/**
 * get data about a single movie by title
 * 
 * URL: /movies/[Title]
 * Method: GET
 * Query Parameters: Title, the title of the movie for which to obtain data
 * Request Body Data Format: none
 * Response Body Data Format: JSON object containing data about the specified 
 *  movie, containing a title, description, genre, director, image URL
 *   and if-featured properties.
 * @example {
  
        Title : "The Godfather",    
        Description : "American crime film about the Mafia based on novel by Mario Puzo.",
        Genre : {
          Name: "Crime",
          Description: "Crime fiction is a genre that fictionalizes crimes, their detection, criminals and their motives."
        },
        Director : {
          Name: "Francis Ford Coppola",
          Bio: "Francis Ford Coppola was born in Michigan and has won
          multiple Oscars.",
          Birth: "1939",
          Death: "-"
        },
        ImagePath : "https://www.rottentomatoes.com/m/godfather",
        Featured : true
    }
 * 
 */
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

/**
 *  Get movie data about a genre by title/genre
 * 
 * URL:  /movies/list/:Genre<br>
 * Method: GET
 * Query Parameters: Genre, the genre of movies for which to obtain data
 * Request Body Data Format: none
 * Response Body Data Format: JSON object containing data about the specified 
 * movie, containing a title, description, genre, director, image URL 
 * and if-featured properties.
 * 
 * @example  {
  
    Title : "The Godfather",
    Description : "American crime film about the Mafia based on novel by Mario Puzo.",
    Genre : {
      Name: "Crime",
      Description: "Crime fiction is a genre that fictionalizes crimes, their detection, criminals and their motives."
    },
    Director : {
      Name: "Francis Ford Coppola",
      Bio: "Francis Ford Coppola was born in Michigan and has won multiple Oscars.",
      Birth: "1939",
      Death: "-"
    },
    ImagePath : "https://www.rottentomatoes.com/m/godfather",
    Featured : true
  }
 * 
 */
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

/**
 *   Get data about a director by name
 * 
 * URL:   /movies/directors/[Name]
 * Method: GET
 * Query Parameters:  Name, the name of the director for whom to obtain data
 * Request Body Data Format: none
 * Response Body Data Format: JSON object containing data about the specified 
 * director, containing a name, biography, birth year, and death year properties.
 * 
 * @example  {

    Name: "Francis Ford Coppola",
    Bio: "Francis Ford Coppola was born in Michigan and has won multiple Oscars.",
    Birth: "1939",
    Death: "-"
  }
 * 
 */
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

/**
 *   Add a new user
 * 
 * URL:   /users
 * Method: POST
 * Query Parameters:  None
 * Request Body Data Format: JSON object holding data about the user to add 
 * with username, password, email, date of birth
 * @example
 * {
  
  "Username" : "Thor", (required)
  "Password" : "Thor123", (required)
  "Email" : "Thor@gmail.com", (required)
  "Birthday" : "2012-08-01"
}

 * Response Body Data Format: JSON object containing data about the user that was added
 * 
 * @example  {
 
    "Username" : "Thor",
    "Password" : "Thor123",
    "Email" : "Thor@gmail.com",
    "Birthday" : "2012-08-01",
    "FavoriteMovies" : {_id: ObjectId("5cd8cee63e0876acb520d116")}
  }
 * 
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

/**
 *   Update a user's information
 * 
 * URL:  /users/[Username]
 * Method: PUT
 * Query Parameters:  Username, the current username for this user password
 * Request Body Data Format:   JSON object holding data about the user to 
 * update with username, password, email, date of birth.
 * @example {

  "Username" : "Thor",
  "Password" : "Thor123",
  "Email" : "MrThor@gmail.com",
  "Birthday" : "2012-08-01"
}

 * Response Body Data Format:   JSON object showing the updated information
 * 
 * @example {

    "Username" : "Thor",
    "Password" : "Thor123",
    "Email" : "MrThor@gmail.com",
    "Birthday" : "2012-08-01",
  }
 * 
 */
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

/**
 *   Add a movie to a user's list of favorites by username
 * 
 * URL:   /users/[Username]/Movies/[MovieID]
 * Method: POST
 * Query Parameters:  
 *  Username, the current username for this user
  * MovieID, the ID of the movie to be added
 * Request Body Data Format:   None
 * Response Body Data Format:   JSON object showing the updated information
 * 
 * @example {

    "Username" : "Thor",
    "Password" : "Thor123",
    "FavoriteMovies" : ["5cd8cee63e0876acb520d115"]
  }
 * 
 */
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

/**
 * Delete a movie from a user's list of favorites by username and movie ID
 * 
 * URL:   /users/[Username]/[MovieID]
 * Method: DELETE
 * Query Parameters:  
 *  Username, the current username for this user
 *  MovieID, the ID of the movie to be deleted
 * Request Body Data Format:   None
 * Response Body Data Format:   Text message indicating whether or not 
 * the movie was successfully deleted from the list of favorites.
 * 
 */
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

/**
 * Delete a user from the list of users by username
 * 
 * URL:    /users/[Username]
 * Method: DELETE
 * Query Parameters:  
 *  Username, the username of user to be deleted
 * Request Body Data Format:   None
 * Response Body Data Format:   Text message indicating whether or not 
 * the user was successfully deleted.
 * 
 */
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

/**
 * Delete a movie from the movie list
 * 
 * URL:    /movies/[Title]
 * Method: DELETE
 * Query Parameters:  
 *  Title, the title of the movie to delete
 * Request Body Data Format:   None
 * Response Body Data Format:   Text message indicating whether or not 
 * the movie was successfully deleted.
 * 
 */
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

if (process.env.NODE_ENV === 'production') {
  //serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // handle React routing, returning all request back to MyMovies app
  app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

var port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", function() {
  console.log("Listening on Port "+port);
});
