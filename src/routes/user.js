import { Router, response } from "express";
import mongoose from "mongoose";
import User from "../models/User.js";
import { findById } from "../middlewares/findById.js";

const router = Router()

router.get("/api/users", async (req, res) => {

    try {
        await mongoose.connect(process.env.MONGO_URL)

        const users = await User.find()
        if (!users) return res.sendStatus(400)
        res.status(200).send(users)

    } catch (error) {
        res.send(String(error))
    }

})


router.post("/api/users:id", (req, res) => {

})

router.delete("/api/users/:id", findById, async (req, res) => {
    try {
        mongoose.connect(process.env.MONGO_URL)
        const user = await User.findByIdAndDelete(req.userId)
        if (!user) return res.sendStatus(400)
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send("Something went wrong")
    }
})



export default router