const express = require("express"),
  morgan = require("morgan");

const app = express();

let topTenMovies = [
  {
    title: "The Godfather",
    director: "Francis Ford Coppola",
    year: "1972",
    genre: "crime",
    details: "American crime film about the Mafia based on novel by Mario Puzo."
  },
  {
    title: "The Shawshank Redemption",
    director: "Frank Darabont",
    year: "1994",
    genre: "drama",
    details:
      "American drama film about a banker sentenced to life in Shawshank State Prison."
  },
  {
    title: "Pulp Fiction",
    director: "Quentin Tarantino",
    year: "1994",
    genre: "crime",
    details:
      "American crime film about two mob hitmen, a boxer, a gangster's wife, and two bandits intertwine."
  },
  {
    title: "Star Wars",
    director: "George Lucas",
    year: "1977",
    genre: "science fiction",
    details:
      "American epic space opera film about battle between good and evil forces."
  },
  {
    title: "The Dark Knight",
    director: "Christopher Nolan",
    year: "2008",
    genre: "science fiction",
    details: "Superhero film based on DC Comics character Batman."
  },
  {
    title: "Goodfellas",
    director: "Martin Scorsese",
    year: "1990",
    genre: "crime",
    details:
      "Crime film about the rise and fall of a crime family associate and his friends."
  },
  {
    title: "The Godfather Part II",
    director: "Francis Ford Coppola",
    year: "1974",
    genre: "crime",
    details: "Prequel and sequel to The Godfather."
  },
  {
    title: "The Matrix",
    director: "The Wachowskis",
    year: "1999",
    genre: "science fiction",
    details:
      "A dystopian future with a similated reality to subdue the human population."
  },
  {
    title: "Schindler's List",
    director: "Steven Spielberg",
    year: "1993",
    genre: "historical",
    details:
      "Based on life of a German businessman who saved the lives of over a thousand Jewish refugees during the Holocaust."
  },
  {
    title: "Raiders of the Lost Ark",
    director: "Steven Spielberg",
    year: "1981",
    genre: "adventure",
    details:
      "A treasure hunter tries to find the Ark of the Covenant before a group of Nazis."
  }
];

// log all requests
app.use(morgan("common"));

app.get("/movies", function(req, res) {
  res.json(topTenMovies);
});

app.get("/", function(req, res) {
  res.send("Welcome to My Movies!");
});

// go to this folder for file requests
app.use(express.static("public"));

// log all application errors
app.use(function(err, req, res, next) {
  console.error(err.stack);
});

app.listen(8080, () => console.log("Your app is running on port 8080"));
