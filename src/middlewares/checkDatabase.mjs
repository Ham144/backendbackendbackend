import User from "../models/User.js"

export const checkDatabase = async (req, res, next) => {

    await mongoose.connect(process.env.MONGO_URL)
    const user = await User.findOne({ username: req.body.username })
    if (!user) return res.status(404).send("user not found")
    next()
}