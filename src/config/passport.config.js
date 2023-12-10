const GoogleStrategy = require("passport-google-oauth2").Strategy;
const mongodb = require("../database/database");
const config = require("./index.config");
const User = require("../models/user.model");
module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: config.googleClientId,
        clientSecret: config.googleClientSecret,
        callbackURL: "http://localhost:3000/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
        };
        try {
          let user = await User.findOne({ googleId: profile.id });
          if (user) {
            done(null, user);
          } else {
            user = await User.create(newUser);
            done(null, user);
          }
        } catch (error) {
          console.error(error);
        }
      }
    )
  );
  passport.serializeUser(function (user, done) {
    console.log(user);
    done(null, user.googleId);
  });
  passport.deserializeUser(async function (id, done) {
    const user = await User.findOne({ googleId: id });
    done(null, user);
  });
};
