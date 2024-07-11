import { Router } from "express";

const router = Router()

//get all products
router.get("/api/products", async (req, res) => {
    res.status(200)

})

export default router