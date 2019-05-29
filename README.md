# myMovies API

This API provides information on movies, directors and genres.  It also allows a user to register and create a list of favorite movies.



## Endpoints


#### Description 
  Get a list of all Movies


#### URL
  /movies


#### Method
  GET


#### Query Parameters 
  None


#### Request Body Data Format
  None


#### Response Body Data Format
  JSON object containing data about all the Movies



----------------- 

#### Description
  Get data about a single movie based on the movie title


#### URL 
  /movies/[Title]


#### Method 
  GET


#### Query Parameters 
  **Title**, the title of the movie for which to obtain data


#### Request Body Data Format 
  None


#### Response Body Data Format 
  JSON object containing data about the specified movie, containing a title, description, genre, director, image URL and
if-featured properties.


  **Example**
  
      {
  
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
    
----------------- 

#### Description
  Get movie data about a genre by title/genre

#### URL
  /movies/list/:Genre<br>

#### Method
  GET

#### Query Parameters 
  **Genre**, the genre of movies for which to obtain data<br>
#### Request Body Data Format
  None
#### Response Body Data Format 
  JSON object containing data about the specified movie, containing a title, description, genre, director, image URL and
  if-featured properties.

**Example**:

  {

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

----------------- 

#### Description 
  Get data about a director by name
#### URL 
  /movies/directors/[Name]
#### Method 
  GET
#### Query Parameters
  **Name**, the name of the director for whom to obtain data
#### Request Body Data Format
  None
#### Response Body Data Format 
  JSON object containing data about the specified director, containing a name, biography, birth year, and death year
properties.

  **Example**:

  {

    Name: "Francis Ford Coppola",
  
    Bio: "Francis Ford Coppola was born in Michigan and has won multiple Oscars.",
  
    Birth: "1939",
  
    Death: "-"
  
  }

----------------- 
#### Description 
  Add a new user
#### URL 
  /users
#### Method 
  POST
#### Query Parameters 
  None
#### Request Body Data Format
  JSON object holding data about the user to add with username, password, email, date of birth
  
**Example**:

  {

    "Username" : "Thor", (required)
  
    "Password" : "Thor123", (required)
  
    "Email" : "Thor@gmail.com", (required)
  
    "Birthday" : "2012-08-01"
  
  }

#### Response Body Data Format 
  JSON object containing data about the user that was added


**Example**:

  {

    "Username" : "Thor",
  
    "Password" : "Thor123",
  
    "Email" : "Thor@gmail.com",
  
    "Birthday" : "2012-08-01",
  
    "FavoriteMovies" : {_id: ObjectId("5cd8cee63e0876acb520d116")}
  
  }

----------------- 
#### Description
  Update a user's information
#### URL 
  /users/[Username]<br>

#### Method
  PUT
#### Query Parameters 
  **Username**, the current username for this user password<br>
#### Request Body Data Format 
  JSON object holding data about the user to update with username, password, email, date of birth.

**Example**:

  {

    "Username" : "Thor",
  
    "Password" : "Thor123",
  
    "Email" : "MrThor@gmail.com",
  
    "Birthday" : "2012-08-01"
  
  }

#### Response Body Data Format 
  JSON object showing the updated information

**Example**:

  {

    "Username" : "Thor",

    "Password" : "Thor123",

    "Email" : "MrThor@gmail.com",

    "Birthday" : "2012-08-01",
  
  }

----------------- 
#### Description 
  Add a movie to a user's list of favorites by username and movie title
#### URL 
  /users/[Username]/Movies/[MovieID]
#### Method 
  POST
#### Query Parameters 
  **Username**, the current username for this user
  **MovieID**, the ID of the movie to be added
#### Request Body Data Format 
  None
#### Response Body Data Format 
  JSON object showing the updated information
  
**Example**:

  {

    "Username" : "Thor",
  
    "Password" : "Thor123",
  
    "FavoriteMovies" : ["5cd8cee63e0876acb520d115"]
  
  }
----------------- 
#### Description 
  Delete a movie from a user's list of favorites by username and movie ID
#### URL 
  /users/[Username]/[MovieID]
#### Method 
  DELETE
#### Query Parameters 
  **Username**, the current username for this user
  **MovieID**, the ID of the movie to be deleted<br>
#### Request Body Data Format 
  None
#### Response Body Data Format 
  Text message indicating whether or not the movie was successfully deleted from the list of favorites.
  
----------------- 
#### Description 
  Delete a user from the list of users by username
#### URL 
  /users/[Username]
#### Method 
  DELETE
#### Query Parameters
  **Username**, username for the user being deleted<br>
#### Request Body Data Format 
  None
#### Response Body Data Format
  Text message indicating whether or not the user was successfully deleted from the users list.
