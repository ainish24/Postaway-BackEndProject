import { errorHandler } from "../../middlewares/errorHandler.js"
import { postModel } from "./post.schema.js"

const getAll=async()=>{
    try {
        const posts = await postModel.find()
        return posts
    } catch (error) {
        throw new errorHandler(400,`Posts not found. ${error.message}`)
    }
}

const getById = async(postId)=>{
    try {
        const post = await postModel.findById(postId)
        return post
    } catch (error) {
        throw new errorHandler(400,`Post not found. ${error.message}`)
    }
}

const getByUserId=async(userId)=>{
    try {
        const posts = await postModel.find({user: {$eq:userId}})
        return posts
    } catch (error) {
        throw new errorHandler(400,`No posts for this user. ${error.message}`)
    }
}

const addPost=async(data)=>{
    try {
        const post=await postModel.create({...data, user:data.userId})
        return post
    } catch (error) {
        throw new errorHandler(500,`Error creting new post. ${error.message}`)
    }
}

const deleteById=async(postId)=>{
    try {
        const post = await getById(postId)
        await postModel.findByIdAndDelete(postId)
        return post
    } catch (error) {
        throw new errorHandler(500,`Error deleting post. ${error.message}`)
    }
}

const updateById=async(postId,data)=>{
    try {
        const post = await postModel.findByIdAndUpdate(postId,{...data}, { new: true })
        return post
    } catch (error) {
        throw new errorHandler(500,`Error updating post. ${error.message}`)
    }
}

export default {
    getAll,
    getById,
    getByUserId,
    addPost,
    deleteById,
    updateById
}