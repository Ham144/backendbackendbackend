import { Router, response } from "express";
import mongoose, { mongo } from "mongoose";
import User from "../models/User.js";
import { findById } from "../middlewares/findById.js";
import { useNavigate } from "react-router-dom";
import { checkField } from "../middlewares/checkField.js";

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

router.post("/api/users", checkField, async (req, res) => {
    await mongoose.connect(process.env.MONGO_URL)
    const body = req.body
    const { username, password } = body
    if (!username) return res.status(402).send("username is not given")
    if (!password) return res.status(402).send("password is not given")

    let newUser;
    try {
        newUser = await User.findOne({ username })
        await User.create(body)
        newUser = await User.findOne({ username })
        res.status(200).send("berhasil menambakan user " + newUser)
    } catch (error) {
        if (newUser) {
            res.status(400).send("terjadi kesalahan, duplicate username  " + newUser + " sudah ada")
        }
        else {
            res.status(400).send("error tidak diketahui")
        }
    }
})

router.put("/api/users/:id", findById, checkField, async (req, res) => {
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

router.patch("/api/users/:id", findById, checkField, async (req, res) => {

    try {
        const result = await User.updateOne({ _id: req.userId }, req.body)
        if (result.acknowledged) return res.status(200).send(`user ${req.userId} is partially updated`)
        else return res.status(400).send(result)
    } catch (error) {
        res.status(400).send("terjadi kesalahan")
    }
})

router.delete("/api/users/:id", findById, async (req, res) => {
    const previouslength = await User.countDocuments()

    try {
        const user = await User.deleteOne({ _id: req.userId })
        if (user.deletedCount === 0) return res.status(405).send("nothing deleted")
        const currentlength = await User.countDocuments()
        res.status(200).send(req.userId + " user is deleted " + `previouslength = ${previouslength}, currentlength = ${currentlength}`)
    } catch (error) {
        res.status(400).send("Something went wrong")
    }
})



export default router