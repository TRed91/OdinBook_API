const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const db = require('../db/userQueries');

const options = {
    secretOrKey: process.env.PASSPORT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const strategy = new JwtStrategy(options, async(payload, done) => {
    try {
        const user = await db.userGetById(payload.user.userId);
        if (!user) {
            return done(null, false);
        }
        return done(null, user);
    } catch (error) {
        return done(error, false);
    }
});

module.exports = strategy;