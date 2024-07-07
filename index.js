import express from "express"

const app = Express()

app.get("/", (req, res) => {
    res.status(200).send("Hello World!")
})


const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))