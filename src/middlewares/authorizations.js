import { postModel } from "../features/posts/post.schema.js"
import { errorHandler } from "./errorHandler.js"
import { commentModel } from "../features/comments/comment.schema.js"

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

export const commentEditor=async(req,res,next)=>{
    const {commentId}=req.params
    const loggedInId=req.user._id
    const comment=await commentModel.findById(commentId)
    const post=await postModel.findById(comment.postId)
    if(!(loggedInId==comment.userId || loggedInId==post.user)){
        throw new errorHandler(401, "You are not authorized to perform this action")
    }
    next()
}