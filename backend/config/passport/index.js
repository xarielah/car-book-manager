const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("../../lib/db/schemas/user");
const doLog = require("../../lib/utils/logger");
const keys = require("../keys");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => done(null, user));
});

passport.use(
  new GoogleStrategy(
    {
      // options for the google strategy
      callbackURL: "/auth/google/redirect",
      clientID: keys.google.clientId,
      clientSecret: keys.google.secret,
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("🚀 ~ file: index.js:24 ~ profile:", profile);
      User.findOne({ googleId: profile.id }).then((currentUser) => {
        const userData = {
          googleId: profile.id,
          displayName: profile.displayName,
          email: profile.email,
          avatar: profile.picture,
        };

        if (currentUser) {
          // login
          doLog(
            `USER AUTH ## ${currentUser.displayName} - ${currentUser.email}`
          );

          const updateUserAfterLogin = async () =>
            await User.findByIdAndUpdate(currentUser.id, userData);
          updateUserAfterLogin();

          done(null, currentUser);
        } else {
          // create user

          new User(userData).save().then((record) => {
            doLog(`USER CREATION $$ ${record.displayName} - ${record.email}`);
            done(null, record);
          });
        }
      });
    }
  )
);
