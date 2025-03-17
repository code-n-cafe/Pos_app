import User from '../models/userModel.js'
import extend from 'lodash/extend.js'
import errorHandler from './errorController.js'

const createUser = async (req, res) => { 
    const user = new User(req.body) 
    try {
        await user.save()
        return res.status(200).json({ 
            message: "Successfully signed up!"
        })
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err) 
        })
    } 
}

const listUser = async (req, res) => { 
    try {
        let users = await User.find().select('name email updated created') 
        res.json(users)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err) 
        })
    } 
}

const userByID = async (req, res, next, id) => { 
    try {
        let user = await User.findById(id) 
        if (!user)
            return res.status('400').json({ 
                error: "User not found"
            })
        req.profile = user 
        next()
    } catch (err) {
        return res.status('400').json({ 
            error: "Could not retrieve user"
        }) 
    }
}

const readUser = (req, res) => {
    req.profile.hashed_password = undefined 
    req.profile.salt = undefined
    return res.json(req.profile) 
}

const updateUser = async (req, res) => { 
    try {
        let user = req.profile
        user = extend(user, req.body) 
        user.updated = Date.now() 
        await user.save()
        user.hashed_password = undefined 
        user.salt = undefined
        res.json(user) 
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err) 
        })
    } 
}

const removeUser = async (req, res) => { 
    try {
        let user = req.profile
        let deletedUser = await user.deleteOne() 
        deletedUser.hashed_password = undefined 
        deletedUser.salt = undefined
        res.json(deletedUser) 
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err) 
        })
    } 
}

const removeAllUSers = async (req, res) => {
    try {
        await User.deleteMany({})
        res.status(200).json({
            message: "All users removed"
        })
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

export default { createUser, userByID, readUser, listUser, removeUser, updateUser, removeAllUSers }

