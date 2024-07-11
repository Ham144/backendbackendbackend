import { Router } from "express";

const router = Router()

//get all products
router.get("/api/products", async (req, res) => {
    try {
        const response = res.cookie("kukisigned", "value of it", { signed: true, maxAge: 600000 * 2 }).sendStatus(200)
        console.log(response)
        // const kukisigned = req.cookies.kukisigned
        // console.log(kukisigned)
    } catch (error) {
        console.log(error)
    }

    res.sendStatus(200)
})

export default router