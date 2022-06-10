const LocalStrategy = require("passport-local").Strategy;
const MovieUser = require("./models/user-model");
exports.initializingPassport = (passport) => {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await MovieUser.findOne({ username });
        if (!user) return done(null, false);
        if (user.password !== password) return done(null, false);
        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    })
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await MovieUser.findById(id);
      done(null, user);
    } catch (err) {
      done(err, false);
    }
  });
};
