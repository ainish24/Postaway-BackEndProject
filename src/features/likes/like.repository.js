import { commentModel } from "../comments/comment.schema.js"
import { postModel } from "../posts/post.schema.js"
import { likeModel } from "./like.schema.js"
import { errorHandler } from "../../middlewares/errorHandler.js"

const toggleLike = async (targetId, userId, likeFor) => {
    try {
        if(likeFor=='Post'){
            const post =await postModel.findById(targetId)
            if(!post){
                throw new errorHandler(400,"No post with given id exists.")
            }
        }
        if(likeFor=='Comment'){
            const comment =await commentModel.findById(targetId)
            if(!comment){
                throw new errorHandler(400,"No comment with given id exists.")
            }
        }
        const isExist = await likeModel.findOne({
            targetId,
            userId,
            likeFor
        })
        if (isExist) {
            await isExist.deleteOne()
            return false
        } else {
            await likeModel.create({ targetId, userId, likeFor })
            return true
        }
    } catch (error) {
        throw new errorHandler(400, `Error toggling like. ${error.message}`)
    }
}

const getLikes = async (likeFor, targetId) => {
    try {
        if(likeFor=='Comment'){
            const comment=await commentModel.findById(targetId)
            if(!comment){
                throw new errorHandler(404,'Comment not found')
            }
        }
        if(likeFor=='Post'){
            const post=await postModel.findById(targetId)
            if(!post){
                throw new errorHandler(404,'Post not found')
            }
        }
        const likes = await likeModel.find({
            likeFor,
            targetId
        }).populate({path:'userId',select:'-password -__v -logoutAll'}).populate({path:'targetId',select:'-__v -__id -userId -postId -user'})
        return likes
    } catch (error) {
        console.log(error)
        throw new errorHandler(400, `Error getting likes. ${error.message}`)
    }
}

export default {
    toggleLike,
    getLikes
}