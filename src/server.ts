import * as dotenv from "dotenv";
dotenv.config();
var mysql = require('mysql');
import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express"
import userRouter from "../src/routes/userRouter"
import taskRouter from "../src/routes/taskRouter"
import cookieParser from "cookie-parser"
import cors from "cors"


const app = express()
createConnection()
app.use(express.json({limit: '8000mb'}))
app.use(cors())
app.use(cookieParser())

app.use('/user',userRouter)
app.use('/task',taskRouter)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})