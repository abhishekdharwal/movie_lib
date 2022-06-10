const passport = require("passport");
const movieController = require("./controllers/movie-controller");
const userController = require("./controllers/user-controller");
const router = require("express").Router();
router.post("/api/login", passport.authenticate("local"), (req, res) => {
  res.status(200).send("Yes Login is perfect");
});
router.get("/register", (req, res) => {
  res.render("register");
});
router.get("/login", (req, res) => {
  res.render("login");
});
router.post("/api/register", userController.register);
router.post("/api/newlist", movieController.newList);
router.post("/api/addnewlistid", movieController.listAdd);
router.post("/api/updatelist", movieController.updateList);
module.exports = router;
