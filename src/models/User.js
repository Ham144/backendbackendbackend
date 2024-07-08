import mongoose, { mongo } from "mongoose"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: {
            errorMessage: "Username already exists"
        }
    },
    password: String,
})

const User = mongoose.models.User || mongoose.model("User", userSchema)
export default User