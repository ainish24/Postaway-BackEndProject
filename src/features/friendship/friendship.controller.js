import friendshipRepository from './friendship.repository.js'
import { errorHandler } from '../../middlewares/errorHandler.js'

const getFriends=async(req,res)=>{
    const userId=req.user._id
    const friends=await friendshipRepository.getFriends(userId)
    if(friends.length==0){
        return res.status(200).json({
            success:true,
            message:"No friends!"
        })
    }
    res.status(200).json({
        success:true,
        data:friends
    })
}

const getRequests=async(req,res)=>{
    const userId=req.user._id
    const requests=await friendshipRepository.getRequests(userId)
    if(requests.length==0){
        return res.status(200).json({
            success:true,
            message:"No requests!"
        })
    }
    res.status(200).json({
        success:true,
        data:requests
    })
}

const toggleFriends=async(req,res)=>{
    const senderId=req.user._id
    const receiverId=req.params.friendId
    if(senderId==receiverId){
        throw new errorHandler(400,"Cannot send friend request to yourself")
    }
    const friends=await friendshipRepository.toggleFriends(senderId,receiverId)
    if(friends){
        res.status(200).json({
            success:true,
            message:"Connection request sent"
        })
    }else{
        res.status(200).json({
            success:true,
            message:"Connection request deleted"
        })
    }
}

const respondRequest=async(req,res)=>{
    const {friendId}=req.params
    const userId=req.user._id
    const status = req.body.status
    if(status!='PENDING' && status!='ACCEPTED' && status!='REJECTED'){
        throw new errorHandler(400,'Invalid status')
    }
    const newStatus=await friendshipRepository.respondRequest(friendId,userId,status)
    if(newStatus){
        res.status(200).json({
            success:true,
            message:"Request approved"
        })
    }else{
        res.status(200).json({
            success:true,
            message:"Request deleted"
        })
    }
}

export default {
    getFriends,
    getRequests,
    toggleFriends,
    respondRequest
}