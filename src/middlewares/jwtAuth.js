import { errorHandler } from "./errorHandler.js";
import { userModel, tokenBlacklistModel } from "../features/users/user.schema.js";
import jwt from 'jsonwebtoken'

export const verifyToken = async (req, res, next) => {
    const token = req.cookies.token
    try {
        const user = jwt.verify(token, process.env.JWT_KEY)
        req.user = user
        const blackListed= await tokenBlacklistModel.findOne({jti:req.user.jti})
        if(blackListed){
            throw new errorHandler(401,"Token expired, login again")
        }
        const dbUser = await userModel.findById(user._id)
        const dbUserTime=dbUser.logoutAll
        const currentLoginTime=new Date(user.iat * 1000)
        if(dbUserTime>currentLoginTime){
            throw new errorHandler(401,"Login expired, please login again")
        }
        next()
    } catch (error) {
        throw new errorHandler(401, "Login Again")
    }
}