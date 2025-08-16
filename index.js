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
import { userModel } from './src/features/users/user.schema.js';
import { postModel } from './src/features/posts/post.schema.js';

const app = express()
dotenv.config()

const swaggerJSON = JSON.parse(
    await readFile(new URL('./documentation/swagger.json', import.meta.url))
);
app.use(cors({
    origin: '*',
    credentials: true,
}));

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(loggerMiddleware)
app.use(express.static('public'))

app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/comments', commentRoutes)
app.use('/api/likes', likeRoutes)
app.use('/api/friends', friendshipRoutes)
app.use('/api/otp', otpRoutes)
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerJSON))

app.get('/', verifyToken, (req, res) => {
    res.send("Server is up!")
})
//Interview route
app.post('/getUserDetails', async (req, res) => {
    try {
        const { username } = req.body
        const foundUser = await userModel.aggregate([
            { $match: { email: username } },
        ])
        const reqDetails = await postModel.aggregate([
            { $match: { user: foundUser[0]._id } },  //aggregation always returns array
            {
                $lookup: {
                    from: "likes",
                    localField: "_id",
                    foreignField: "targetId",
                    as: "likesData"
                }
            },
            { $addFields: { likes: "$likesData.userId" } },
            { $project: { likesData: 0 } },
            {
                $lookup: {
                    from: "comments",
                    localField: "_id",
                    foreignField: "postId",
                    as: "commentsData"
                }
            },
            { $addFields: { comments: "$commentsData.comment" } },
            { $project: { commentsData: 0 } },
            {
                $project: {
                    _id: 0,
                    postId: "$_id",
                    userId: "$user",
                    likes: 1,
                    comments: 1
                }
            }
        ])
        res.json({
            status: 200,
            message: "Success",
            data: reqDetails
        })
    } catch (error) {
        console.log(error)
        throw new errorHandler(500, "Internal Server Error")
    }
})

//Practice route
app.post('/practice1',async (req,res)=>{
    try {
        const {userId} = req.body
        const foundUser = await userModel.findById(userId)
        const postsData=await postModel.aggregate([
            {$match:{user:foundUser._id}},
            {$lookup:{
                from:"likes",
                localField:"_id",
                foreignField:"targetId",
                as:"likesData"
            }},
            {$addFields:{likes:"$likesData._id"}},
            {$project:{likesData:0}},
            {$lookup:{
                from:"comments",
                localField:"_id",
                foreignField:"postId",
                as:"commentsData"
            }},
            {$addFields:{comments:"$commentsData._id"}},
            {$project:{commentsData:0}},
            {$project:{userId:"$user",likes:1,comments:1}},
            {$addFields:{likesLength:{$size:"$likes"}}},
            {$sort:{likesLength:1}},
            {$project:{likesLength:0}}
        ])
        const userData={
            user:foundUser
        }
        res.status(200).json({
            status:200,
            data:postsData
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status:"Error",
            message:"Internal Server Error"
        })
    }
})

app.use((req, res, next) => {
    throw new errorHandler(404, "Page does not exist!")
});

app.use(errorHandlerMiddleware)

app.listen(3000, async () => {
    await connectToDb()
    console.log("Server is up!")
})