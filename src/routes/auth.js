import { Router } from "express"
import { checkDatabase } from "../middlewares/checkDatabase.js"
import User from "../models/User.js"
import passport from "passport"
const router = Router()

router.post("/api/auth", checkDatabase, passport.authenticate("local"), async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) return res.status(402).send("username or password is not given")
    const user = await User.findOne({ username })
    if (!user) return res.status(401).send("you dont have an account")
    if (password !== user.password) return res.status(401).send("password is wrong")
    req.session.user = user
    res.status(200).send(req.session)
})

router.get("/api/auth/status", async (req, res) => {
    if (!req.user) return res.status(401).send("unauthorized")
    console.log(req.user);
    console.log(req.session.user)
    return res.status(200).send(req.user)
})

export default router