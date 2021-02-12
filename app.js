/*
 Authors:
 Your name and student #:
 Your Partner's Name and student #:
 (Make sure you also specify on the Google Doc)
*/
const express = require("express");

let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", (req, res) => res.render("pages/index"));

app.get("/myForm", (req, res) => res.render("pages/myForm"));

app.post("/myForm", (req, res) => {
  let movieInput = req.body;
  let movieList = movieInput.movieInput.split(',');

  res.render('pages/index', { movies: movieList, from: 'form' });
});

app.get("/myListQueryString", (req, res) => {
  let movie1 = req.query.movie1
  let movie2 = req.query.movie2

  res.render('pages/index', { movie1: movie1, movie2: movie2, from: 'query' });
});

app.get("/search/:movieName", (req, res) => {
  

});

app.listen(3000, () => {
  console.log("Server is running on port 3000 🚀");
});