import { postModel } from "../features/posts/post.schema.js"
import { errorHandler } from "./errorHandler.js"

export const postOwnerValidator=async(req,res,next)=>{
    const {postId}=req.params
    const post=await postModel.findById(postId)
    const actualUserId=post.toJSON().user
    const accesUserId=req.user._id
    if(accesUserId != actualUserId){
        throw new errorHandler(401, "You are not authorized to perform this action")
    }
    next()
}

export const verifyIdOwner=async(req,res,next)=>{
    const {userId}=req.params
    const loggedInId=req.user._id
    if(userId!=loggedInId){
        throw new errorHandler(401, "You are not authorized to perform this action")
    }
    next()
}