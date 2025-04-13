import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid';
import userRepository from "./user.repository.js"
import { errorHandler } from "../../middlewares/errorHandler.js"
import { tokenBlacklistModel } from './user.schema.js'

//Implemented a JTI verfication for a logout issue.
// It allowed users to copy the token before logging out and then paste the same token again in the cookie to take access as
// a signed in user. The JTI veririficatio prevents the user from doing so.

const signup = async (req, res) => {
    try {
        const { name, email, password, gender } = req.body
        if (!req.file) {
            throw new errorHandler(400, "Kindly upload avatar!")
        }
        const avatar = `/uploads/${req.file.filename}`
        const user = await userRepository.signUp({ name, email, password, gender, avatar })
        if (user) {
            return res.status(200).json({
                success: true,
                message: `${user.name}, You have signed up successfully`
            })
        }
    } catch (error) {
        throw new errorHandler(400, error.message)
    }
}

const signin = async (req, res) => {
    const { email, password } = req.body
    const user = await userRepository.signIn({ email, password })
    const jti = uuidv4()
    const token = jwt.sign({ jti, ...user.toJSON() }, process.env.JWT_KEY, { expiresIn: '15m' })
    res.cookie('token', token, { maxAge: 1000 * 60 * 15 })

    res.status(200).json({
        success: true,
        message: `${user.name}, You have logged in successfully`
    })
}

const logout = async (req, res) => {
    const expiresAt = new Date(req.user.exp * 1000)  //exp is a value set by jwt itself and by *1000 we are coverting it to miliseconds,making
    const jtiValue = req.user.jti                   // sure that it expires exactly when jwt expires
    await tokenBlacklistModel.create({
        jti: jtiValue,
        expiresAt: expiresAt,
    });
    res.clearCookie('token')
    res.status(200).json({
        status: true,
        message: "Logged out successfully"
    })
}

const logoutAll = async (req, res) => {
    const userId = req.user._id
    await userRepository.logoutAll(userId)
    res.clearCookie('token')
    res.status(200).json({
        status: true,
        message: "Logged out successfully"
    })
}

const getUserDetails = async (req, res) => {
    const { userId } = req.params
    const user = await userRepository.getById(userId)
    res.status(200).json({
        status: true,
        data: user
    })
}

const getAllDetails = async (req, res) => {
    const users = await userRepository.getAll()
    res.status(200).json({
        success: true,
        deta: users
    })
}

const updateDetails = async (req, res) => {
    const { userId } = req.params
    let data = req.body
    if (req.file) {
        const avatar = `/uploads/${req.file.filename}`
        data = { ...data, avatar }
    }
    if (data.password) {
        throw new errorHandler(401, "You cannot update password without OTP verification")
    }
    await userRepository.updateById(userId, data)
    res.status(200).json({
        success: true,
        message: "Data updated successfully"
    })
}


export default {
    signup,
    signin,
    logout,
    logoutAll,
    getUserDetails,
    getAllDetails,
    updateDetails
}