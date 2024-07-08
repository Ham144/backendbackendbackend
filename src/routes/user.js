import { Router, response } from "express";
import mongoose from "mongoose";
import User from "../models/User.js";
import { findById } from "../middlewares/findById.js";
import { useNavigate } from "react-router-dom";

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

router.get("/api/users/:id", findById, async (req, res) => {
    try {
        res.status(200).send(req.foundUser)
    } catch (error) {
        res.status(200).send("Something went wrong")
    }
})

router.post("/api/users", async (req, res) => {
    await mongoose.connect(process.env.MONGO_URL)
    try {
        await User.create(req.body)
        res.sendStatus(200)
    } catch (error) {
        res.status(401).send("error creating user")
    }
})

router.put("/api/users/:id", findById, async (req, res) => {
    const body = req.body
    let { username, password } = body
    const allFieldShouldbeExistBecauseItsPut = username?.length > 3 && password?.length > 3
    if (!allFieldShouldbeExistBecauseItsPut) return res.status(402).send("all field should be exist or longer")
    try {
        const result = await User.updateOne({ _id: req.userId }, body)
        if (result.acknowledged) return res.status(200).send(`user ${req.userId} is updated`)
        else return res.status(400).send(result)
    } catch (error) {
        res.status(400).send("Something went wrong")
    }
})

router.patch("/api/users/:id", findById, async (req, res) => {
    const body = req.body
    const { username, password } = body
    if (!username && !password) return res.status(400).send("you dont even try to change anything??")
    const allFieldShouldNotBeWeird = (username ? (username?.split("").every(e => !Number(e)) && username?.length > 3) : true) && (password ? password?.length > 3 : true)
    if (!allFieldShouldNotBeWeird) return res.status(401).send("all field should not be weird, name should be all string and longer longer then 3, password should be longer than 3")

    try {
        const result = await User.updateOne({ _id: req.userId }, body)
        if (result.acknowledged) return res.status(200).send(`user ${req.userId} is partially updated`)
        else return res.status(400).send(result)
    } catch (error) {
        res.status(400).send("terjadi kesalahan")
    }
})

router.delete("/api/users/:id", findById, async (req, res) => {
    try {
        const user = await User.deleteOne({ _id: req.userId })
        if (!user) return res.status(400).send("user not found")
        res.status(200).send(req.userId + " user is deleted")
    } catch (error) {
        res.status(400).send("Something went wrong")
    }
})



export default router