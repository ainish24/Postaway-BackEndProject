import { friendshipModel } from "./friendship.schema.js"
import { errorHandler } from "../../middlewares/errorHandler.js"

const getFriends=async(userId)=>{
    try {
        const friends=await friendshipModel.find({receiverId:userId, status:'ACCEPTED'})
        return friends
    } catch (error) {
        throw new errorHandler(400, `Error getting friends. ${error.message}`)
    }
}

const getRequests=async(userId)=>{
    try {
        const requests=await friendshipModel.find({receiverId:userId, status:'PENDING'})
        return requests
    } catch (error) {
        throw new errorHandler(400, `Error getting requests. ${error.message}`)
    }
}

const toggleFriends=async(senderId,receiverId)=>{
    try {
        const isExist=await friendshipModel.findOne({senderId, receiverId})
        if(isExist){
            await isExist.deleteOne()
            return false
        }else{
            await friendshipModel.create({senderId,receiverId,status:"PENDING"})
            return true
        }
    } catch (error) {
        console.log(error)
        throw new errorHandler(400, `Error toggling connection. ${error.message}`)
    }
}

const respondRequest=async(senderId,receiverId,updatedStatus)=>{
    try {
        let friend=await friendshipModel.findOne({senderId,receiverId})
        if(!friend){
            throw new errorHandler(400,"No request found")
        }
        if(updatedStatus=='REJECTED'){
            await friend.deleteOne()
            return false
        }else{
            friend.status=updatedStatus
            await friend.save()
            return true
        }
    } catch (error) {
        console.log(error)
        throw new errorHandler(400, `Error taking action. ${error.message}`)
    }
}

export default {
    getFriends,
    getRequests,
    toggleFriends,
    respondRequest
}