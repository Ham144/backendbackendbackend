import mongoose from "mongoose"
import User from "../models/User.js"

export const findById = async (req, res, next) => {
    await mongoose.connect(process.env.MONGO_URL)
    const { id } = req.params
    if (!id) return res.status(402).send("id is not given")
    const isFound = await User.findById(id)
    if (!isFound) return res.status(404).send("user not found")
    req.foundUser = isFound
    req.userId = id
    next()
}