import commentRepository from "./comment.repository.js";

const getComments=async (req,res)=>{
    const {postId}= req.params
    const comments=await commentRepository.getComments(postId)
    res.status(200).json({
        success:true,
        data:comments
    })
}

const addComment=async(req,res)=>{
    const {postId}= req.params
    const data =req.body
    const userId=req.user._id
    const comment=await commentRepository.addComment(postId,userId,data)
    res.status(200).json({
        success:true,
        message:'Comment added successfully',
        data:comment
    })
}

const deleteComment=async(req,res)=>{
    const {commentId}= req.params
    await commentRepository.deleteComment(commentId)
    res.status(200).json({
        success:true,
        message:'Comment deleted successfully'
    })
}

const updateComment=async(req,res)=>{
    const {commentId}= req.params
    const data =req.body
    const comment=await commentRepository.updateComment(commentId,data)
    res.status(200).json({
        success:true,
        message:'Comment updated successfully',
        data:comment
    })
}


export default {
    getComments,
    addComment,
    deleteComment,
    updateComment
}