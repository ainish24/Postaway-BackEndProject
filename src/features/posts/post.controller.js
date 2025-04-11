import postRepository from "./post.repository.js"

const getAll=async(req,res)=>{
    const posts = await postRepository.getAll()
    res.status(200).json({
        success:true,
        data:posts
    })
}

const getById=async(req,res)=>{
    const {postId}=req.params
    const post = await postRepository.getById(postId)
    res.status(200).json({
        success:true,
        data:post
    })
}

const getByUserId=async(req,res)=>{
    const userId=req.user._id
    const posts = await postRepository.getByUserId(userId)
    res.status(200).json({
        success:true,
        data:posts
    })
}

const addPost=async(req,res)=>{
    const {caption,imageUrl}=req.body
    const userId=req.user._id
    const post = await postRepository.addPost({caption,imageUrl,userId})
    res.status(200).json({
        success:true,
        data:post
    })
}

const deleteById=async(req,res)=>{
    const {postId}= req.params
    const post = await postRepository.deleteById(postId)
    res.status(200).json({
        success:true,
        message:'Post deleted successfully',
        data:post
    })
}

const updateById=async(req,res)=>{
    const {postId}=req.params
    const data = req.body
    const post=await postRepository.updateById(postId,data)
    res.status(200).json({
        success:true,
        message:'Post updated successfully',
        data:post
    })
}

export default {
    getAll,
    getById,
    getByUserId,
    addPost,
    deleteById,
    updateById
}