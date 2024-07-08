export const checkField = async (req, res, next) => {
    const body = req.body
    const { username, password } = body
    if (!username && !password) return res.status(400).send("you dont even try to change anything??")
    const allFieldShouldNotBeWeird = (username ? (username?.split("").every(e => !Number(e)) && username?.length > 3) : true) && (password ? password?.length > 3 : true)
    if (!allFieldShouldNotBeWeird) return res.status(401).send("all field should not be weird, name should be all string and longer then 3, password should be longer than 3")
    console.log("all field is fine(from checkField)")
    next()
}