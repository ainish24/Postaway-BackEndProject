import { errorHandler } from "../../middlewares/errorHandler.js"
import { postModel } from "./post.schema.js"

const getAll=async()=>{
    try {
        const posts = await postModel.find()
        return posts
    } catch (error) {
        throw new errorHandler(400,'Posts not found')
    }
}

const getById = async(postId)=>{
    try {
        const post = await postModel.findById(postId)
        return post
    } catch (error) {
        throw new errorHandler(400,'Post not found')
    }
}

const getByUserId=async(userId)=>{
    try {
        const posts = await postModel.find({user: {$eq:userId}})
        return posts
    } catch (error) {
        throw new errorHandler(400,'No posts for this user')
    }
}

const addPost=async(data)=>{
    try {
        const post=await postModel.create({...data, user:data.userId})
        return post
    } catch (error) {
        throw new errorHandler(500,'Error creting new post')
    }
}

const deleteById=async(postId)=>{
    try {
        const post = await getById(postId)
        await postModel.findByIdAndDelete(postId)
        return post
    } catch (error) {
        throw new errorHandler(500,'Error deleting post')
    }
}

const updateById=async(postId,data)=>{
    try {
        const post = await postModel.findByIdAndUpdate(postId,{...data}, { new: true })
        return post
    } catch (error) {
        throw new errorHandler(500,'Error updating post')
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