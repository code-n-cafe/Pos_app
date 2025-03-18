import express from 'express'
import userCtrl from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.route('/api/users')
    .get(userCtrl.listUser)
    .post(userCtrl.createUser)
    .delete(userCtrl.removeAllUSers)

userRouter.route('/api/users/:userId')
    .get(userCtrl.readUser)
    .put(userCtrl.updateUser)
    .delete(userCtrl.removeUser)

userRouter.param('userId', userCtrl.userByID)

export default userRouter
