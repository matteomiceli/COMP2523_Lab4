/*
 Authors:
 Your name and student #:
 Your Partner's Name and student #:
 (Make sure you also specify on the Google Doc)
*/
const express = require("express");
const { readFile, read } = require('fs');

let movieList;

let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", (req, res) => res.render("pages/index", { from: '' }));

app.get("/myForm", (req, res) => res.render("pages/myForm"));

app.post("/myForm", (req, res) => {
  let movieInput = req.body;
  movieList = movieInput.movieInput.split(',');

  res.render('pages/index', { movies: movieList, from: 'form' });
});

app.get("/myListQueryString", (req, res) => {
  let movie1 = req.query.movie1
  let movie2 = req.query.movie2

  movie1 = movieList.filter(movie => movie.includes(movie1));
  movie2 = movieList.filter(movie => movie.includes(movie2));

  let queryList = [];
  if (movie1 != '') {queryList.push(movie1.toString())};
  if (movie2 != '') {queryList.push(movie2.toString())};
  

  console.log(queryList);
  if (queryList == []) {
    res.render('pages/index', { from: 'noQuery' });
  } else {
    res.render('pages/index', { queryList: queryList, from: 'query' });
  }  
});

app.get("/search/:movieName", (req, res) => {
  let movieSearch = req.params.movieName;
  let descriptionData;
  let descriptionList;

  readFile('./movieDescriptions.txt', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      descriptionData = data;
      descriptionList = descriptionData.split(`\n`);

      let description = descriptionList.filter(descript => descript.includes(movieSearch));
      if (description == []) {
        res.render('pages/searchResult', { movieTitle: movieSearch, movieDescription: description.toString() });
      }
      else {
        res.render('pages/searchResult', { movieTitle: 'Movie not found...', movieDescription: 'Please enter a valid movie name.' });
      }
    }


  })
});

app.listen(3000, () => {
  console.log("Server is running on port 3000 🚀");
});