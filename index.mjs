import express from "express"
import userRouter from "./src/routes/user.js"
import productRouter from "./src/routes/product.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import session from "express-session"
import authRouter from "./src/routes/auth.js"
import passport from "passport"
import "./src/strategies/local-strategy.js"

const app = express()

dotenv.config()
app.use(express.json())
app.use(cookieParser("the secret"))
app.use(session({
    secret: "the secret",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 600000 * 2 }
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(userRouter)
app.use(productRouter)
app.use(authRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))

const Documentation = `
<style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        h1 {
            color: #333;
        }
        .api-section {
            background-color: #f9f9f9;
            border: 1px solid #ddd;
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 5px;
        }
        .api-section h3 {
            color: #0056b3;
        }
        .api-section h4 {
            color: #333;
        }
        .api-section b {
            color: #ff5722;
        }
        .api-section i {
            color: #888;
            display: block;
            margin-top: 10px;
        }
    </style>
<div>
        <h1>API Documentation</h1>
        <div class="api-section">
            <b>method: GET</b>
            <h3>api/users</h3>
            <h4>example: localhost:3000/api/users</h4>
            <p>getting all users</p>
        </div>
        <div class="api-section">
            <b>method: GET</b>
            <h3>api/users/:id</h3>
            <h4>example: localhost:3000/api/users/9294729858</h4>
            <p>getting a user by id</p>
        </div>
        <div class="api-section">
            <b>method: POST</b>
            <h3>api/users</h3>
            <h4>example: localhost:3000/api/users</h4>
            <h4>body: username: String, password: String</h4>
            <i>requirement: username and password should exist, username and password should be longer than 3, username can't be a number or include any numeric characters, username is unique</i>
            <p>create new user</p>
        </div>
        <div class="api-section">
            <b>method: PUT</b>
            <h3>api/users/:id</h3>
            <h4>example: localhost:3000/api/users/297628491292</h4>
            <h4>body (not nullable): username: String, password: String</h4>
            <i>requirement: username and password should exist, username and password should be longer than 3, username can't be a number or include any numeric characters, username is unique</i>
            <p>update all fields</p>
        </div>
        <div class="api-section">
            <b>method: PATCH</b>
            <h3>api/users/:id</h3>
            <h4>example: localhost:3000/api/users/29329479208</h4>
            <h4>body (nullable): username: String, password: String</h4>
            <i>requirement: username or password can be nullable but not both, username and password should be longer than 3, username can't be a number or include any numeric characters, username is unique</i>
            <p>update partial fields</p>
        </div>
        <div class="api-section">
            <b>method: DELETE</b>
            <h3>api/users/:id</h3>
            <h4>example: localhost:3000/api/users/29329479208</h4>
            <p>delete a user</p>
        </div>
    </div>`;

app.get("/", (req, res) => {
    res.cookie("kukisigned", "value of it", { signed: true, maxAge: 600000 * 2 })
    req.session.visited = true
    res.status(200).send(req.session);
});
