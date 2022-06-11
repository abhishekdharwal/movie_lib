const express = require("express");
const ejs = require("ejs");
const app = express();
const passport = require("passport");
const DbConnect = require("./database");
const router = require("./routes");
const PORT = process.env.PORT || 5500;
const MovieUser = require("./models/user-model");
const { initializingPassport } = require("./passportConfig");
const expressSession = require("express-session");

DbConnect();
initializingPassport(passport);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  expressSession({ secret: "secret", resave: false, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");
app.use(function (request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(router);

// app.get("/register", (req, res) => {
//   res.render("register");
// });
// app.get("/login", (req, res) => {
//   res.render("login");
// });
// app.post(
//   "/login",
//   passport.authenticate("local", {
//     failureRedirect: "/register",
//     successRedirect: "/",
//   }),
//   async (req, res) => {
//     res.render("login");
//   }
// );

app.post("/register", async (req, res) => {
  const user = await MovieUser.findOne({ username: req.body.username });
  if (user) return res.status(400).send("User Exists");
  const newUser = await MovieUser.create(req.body);
  res.status(201).send(newUser);
});
app.get("/", (req, res) => {
  res.render("index");
});
app.listen(PORT, () => console.log(`listening on ${PORT}`));
