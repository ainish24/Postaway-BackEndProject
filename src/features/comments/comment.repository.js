import { errorHandler } from "../../middlewares/errorHandler.js"
import { commentModel } from "./comment.schema.js";

const getComments=async(postId)=>{
    try {
        const comments=await commentModel.find({postId:{$eq:postId}})
        return comments
    } catch (error) {
        throw new errorHandler (400,"No comments found")
    }
}
const addComment=async(postId,userId,comment)=>{
    try {
        const newComment={...comment,userId,postId}
        const createdComment=await commentModel.create(newComment)
        return createdComment
    } catch (error) {
        throw new errorHandler (400,"Error adding comment")
    }
}
const deleteComment=async(commentId)=>{
    try {
        const deletedComment=await commentModel.findByIdAndDelete(commentId)
        return deletedComment
    } catch (error) {
        throw new errorHandler (400,"Error deleting comment")
    }
}
const updateComment=async(commentId,data)=>{
    try {
        const updatedComment=await commentModel.findByIdAndUpdate(commentId,{...data},{new:true})
        return updatedComment
    } catch (error) {
        throw new errorHandler (400,"Error updating comment")
    }
}

export default {
    getComments,
    addComment,
    deleteComment,
    updateComment
}