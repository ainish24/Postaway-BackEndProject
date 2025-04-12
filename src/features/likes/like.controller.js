import likeRepository from "./like.repository.js"

const toggleLike=async(req,res)=>{
    const {likeFor}=req.query
    const {id}=req.params
    const userId=req.user._id
    const like= await likeRepository.toggleLike(id,userId,likeFor)
    if(like){
        res.status(200).json({
            success:true,
            message:"Like added"
        })
    }else{
        res.status(200).json({
            success:true,
            message:"Like removed"
        })
    }
}

const getLikes=async(req,res)=>{
    const {likeFor}=req.query
    const {id}=req.params
    const likes=await likeRepository.getLikes(likeFor,id)
    res.status(200).json({
        success:true,
        data:likes
    })
}


export default {
    toggleLike,
    getLikes
}