// import { commentModel } from "../comments/comment.schema.js"
// import { postModel } from "../posts/post.schema.js"
import { likeModel } from "./like.schema.js"
import { errorHandler } from "../../middlewares/errorHandler.js"

const toggleLike = async (targetId, userId, likeFor) => {
    try {
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
        throw new errorHandler(400, 'Error toggling like')
    }
}

const getLikes = async (likeFor, targetId) => {
    try {
        const likes = await likeModel.find({
            likeFor,
            targetId
        })
        return likes
    } catch (error) {
        throw new errorHandler(400, 'Error getting likes')
    }
}

export default {
    toggleLike,
    getLikes
}