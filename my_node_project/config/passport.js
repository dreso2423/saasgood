const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User'); // Replace with the path to your User model

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findByPk(id).then((user) => {
    done(null, user);
  });
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, done) {
    const existingUser = await User.findOne({ where: { googleId: profile.id } });
    if (existingUser) {
      return done(null, existingUser);
    }
    const newUser = await User.create({ googleId: profile.id, name: profile.displayName, email_address: profile.emails[0].value });
    done(null, newUser);
  }
));