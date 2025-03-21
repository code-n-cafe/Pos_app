import express from 'express'
import roomController from '../controllers/roomController.js'

const roomRouter = express.Router()

roomRouter.route('/api/room')
    .get(roomController.listRooms)
    .post(roomController.createRoom)
    .delete(roomController.removeRoomList)

roomRouter.route('/api/room/:roomId')
    .get((req, res) => res.json(req.profile))
    .put(roomController.updateRoom)
    .delete(roomController.removeRoom)

roomRouter.param('roomId', roomController.roomByID)

export default roomRouter