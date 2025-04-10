import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { connectToDb } from './src/configure/db.js'
import { errorHandlerMiddleware } from './src/middlewares/errorHandler.js'
import { loggerMiddleware } from './src/middlewares/logger.js'
import { verifyToken } from './src/middlewares/jwtAuth.js'
import userRoutes from './src/features/users/user.routes.js'

const app = express()
dotenv.config()

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())
app.use(loggerMiddleware)

app.use('/api/users',userRoutes)

app.get('/',verifyToken,(req,res)=>{
    res.send("Server is up!")
})

app.use(errorHandlerMiddleware)

app.listen(3000,async ()=>{
    await connectToDb()
    console.log("Server is up!")
})