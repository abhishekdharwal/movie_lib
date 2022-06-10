const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const MovieUser = require("../models/user-model");
const ListMovie = require("../models/movie-model");
const { findByIdAndUpdate } = require("../models/user-model");
class MovieController {
  async listAdd(req, res) {
    const listId = req.body.listId;
    const username = req.body.username;
    // console.log(listId);
    // var id = ObjectId(listId);
    // var id = ObjectId(req.body.listId);
    // console.log(id);
    if (!username) {
      res.status(404).send("Send User Id");
    }
    if (!listId) {
      res.status(404).send("Send list Id");
    }
    const user1 = await MovieUser.findOne({ username });
    if (!user1) {
      res.status(404).send("No user Found");
    }
    const _id = user1._id;
    console.log(_id);
    try {
      const user = await MovieUser.findByIdAndUpdate(
        { _id },
        { $push: { List: listId } }
      );
      res.status(200).send("Added");
    } catch (err) {
      res.status(404).send(err);
    }
  }
  async newList(req, res) {
    const newlist = await ListMovie.create(req.body);
    if (newlist) {
      res.status(200).send(newlist._id);
    }
  }
  async updateList(req, res) {
    const listId = req.body._id;
    const { Title, Year, Released, Genre, Poster, imdbID } = req.body;
    const _id = ObjectId(listId);
    const data = {
      imdbID: imdbID,
      Title: Title,
      Year: Year,
      Released: Released,
      Genre: Genre,
      Poster: Poster,
    };
    console.log(data);
    console.log(_id);
    const user = await ListMovie.findByIdAndUpdate(
      {
        _id,
      },
      {
        $push: { movies: data },
      }
    );
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(400).send("Not added to list");
    }
  }
}
module.exports = new MovieController();
