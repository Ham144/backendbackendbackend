import express from "express"
import router from "./src/routes/user.js"
import dotenv from "dotenv"

const app = express()

dotenv.config()
app.use(express.json())
app.use(router)



const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))


app.get("/", (req, res) => {
    res.status(200).send(
        "<h1>Home Page</h1>"
    )
})