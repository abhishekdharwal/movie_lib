const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const movieSchema = new Schema({
  list_name: String,
  Type: String,
  movies: [
    {
      imdbID: String,
      Title: String,
      Year: String,
      Released: String,
      Genre: String,
      Poster: String,
    },
  ],
});

module.exports = mongoose.model("MovieList", movieSchema);
