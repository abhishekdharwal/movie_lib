const MovieUser = require("../models/user-model");

class UserController {
  async register(req, res) {
    const user = await MovieUser.findOne({ username: req.body.username });
    if (user) return res.status(400).send("User Exists");
    const newUser = await MovieUser.create(req.body);
    res.status(201).send(newUser);
  }
}
module.exports = new UserController();
