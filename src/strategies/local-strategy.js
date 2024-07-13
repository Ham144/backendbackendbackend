import mongoose from "mongoose";
import passport from "passport";
import { Strategy } from "passport-local";
import User from "../models/User.js";

passport.serializeUser((user, done) => {
    if (!user) return done(null, false)
    else done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
    try {
        mongoose.connect(process.env.MONGO_URL)
        const user = await User.findById(id)
        if (!user) return done("not found user", false)
        return done(null, user)
    } catch (error) {
        console.log(error)
    }
})

export default passport.use(
    new Strategy(
        {
            usernameField: "username",
            passwordField: "password"
        },
        async (username, password, done) => {
            try {
                mongoose.connect(process.env.MONGO_URL)
                const user = await User.findOne({ username })
                if (!user) return done("credential not valid", false)
                if (password !== user.password) return done(null, false)
                return done(null, user)
            } catch (error) {
                done(error, null)
            }
        }
    )
)