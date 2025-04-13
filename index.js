import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import { readFile } from 'fs/promises';
import { connectToDb } from './src/configure/db.js'
import { errorHandlerMiddleware, errorHandler } from './src/middlewares/errorHandler.js'
import { loggerMiddleware } from './src/middlewares/logger.js'
import { verifyToken } from './src/middlewares/jwtAuth.js'
import userRoutes from './src/features/users/user.routes.js'
import postRoutes from './src/features/posts/post.routes.js'
import commentRoutes from './src/features/comments/comment.routes.js'
import likeRoutes from './src/features/likes/like.routes.js'
import friendshipRoutes from './src/features/friendship/friendship.routes.js'
import otpRoutes from './src/features/otp/otp.routes.js'

const app = express()
dotenv.config()

const swaggerJSON = JSON.parse(
    await readFile(new URL('./documentation/swagger.json', import.meta.url))
);
app.use(cors({
    origin: '*',
    credentials: true,
}));

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())
app.use(loggerMiddleware)
app.use(express.static('public'))

app.use('/api/users',userRoutes)
app.use('/api/posts',postRoutes)
app.use('/api/comments',commentRoutes)
app.use('/api/likes',likeRoutes)
app.use('/api/friends',friendshipRoutes)
app.use('/api/otp',otpRoutes)
app.use('/api/docs',swaggerUi.serve, swaggerUi.setup(swaggerJSON))

app.get('/',verifyToken,(req,res)=>{
    res.send("Server is up!")
})

app.use((req, res, next) => {
    throw new errorHandler(404,"Page does not exist!")
});

app.use(errorHandlerMiddleware)

app.listen(3000,async ()=>{
    await connectToDb()
    console.log("Server is up!")
})