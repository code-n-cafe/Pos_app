import express from 'express'
import roomController from '../controllers/roomController.js'

const roomRouter = express.Router()

roomRouter.route('/api/room')
    .get(roomController.listRooms)
    .post(roomController.createRoom)
    .delete(roomController.removeRoomList)

roomRouter.route('/api/users/:roomId')
    .get(roomController.roomByID)
    .put(roomController.updateRoom)
    .delete(roomController.removeRoom)

roomRouter.param('roomID', roomController.roomByID)

export default roomRouter