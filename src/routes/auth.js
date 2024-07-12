import { Router } from "express";
import { checkDatabase } from "../middlewares/checkDatabase.mjs";
import User from "../models/User.js";
import mongoose from "mongoose";
import session from "express-session";

const router = Router()


//for login
router.post("/api/auth", checkDatabase, async (req, res) => {
    const { body: { username, password } } = req
    if (!username || !password) return res.status(400).send("username and password is required")

    const user = await User.findOne({ username })
    if (!user) return res.status(404).send("user not found")
    if (user.password !== password) return res.status(401).send("password not match")
    req.sessionID = user._id
    return res.status(200).send("login success: " + user)
})

router.get("/api/auth/status", async (req, res) => {
    if (!req.sessionID) return res.status(404).send("unauthorized")
    res.status(200).send("authorized: " + req.session)
})

export default router