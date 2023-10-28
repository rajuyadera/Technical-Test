import express from "express"
import db from "./config/Database.js"
import MemberRouter from "./router/MembersRouter.js"
import BooksRouter from "./router/BooksRouter.js"
import cors from "cors"


const app = express()

try {
    db.authenticate()
    console.log("Database Running")
} catch (error) {
    console.log(error)
}


app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))
app.use(MemberRouter)
app.use(BooksRouter)


app.listen("9000", () => {
    console.log("server Runing At Port 9000")
})