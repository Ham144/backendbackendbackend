import mongoose from "mongoose"
import User from "../models/User.js"

export const findById = async (req, res, next) => {
    mongoose.connect(process.env.MONGO_URL)
    const { id } = req.params
    if (!id) return res.sendStatus(400)
    const isFound = await User.findById(id)
    if (!isFound) return res.sendStatus(400)
    req.foundUser = isFound
    req.userId = id
    next()
}