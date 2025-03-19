import Room from '../models/roomModel.js';
import errorHandler from './errorController.js';

const createRoom = async (req, res) => {
  const room = new Room(req.body);
  try {
    await room.save();
    return res.status(200).json({
      message: 'Successfully created room!',
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
}

const listRooms = async (req, res) => {
    try {
        let room = await Room.find().select('name email updated created');
        res.json(room);
    } catch (err) {
        return res.status(400).json({
        error: errorHandler.getErrorMessage(err),
        });
    }
}

const roomByID = async (req, res, next, id) => {
    try {
            let room = await Room.findById(id) 
            if (!room)
                return res.status('400').json({ 
                    error: "Room not found"
                })
            req.profile = room
            next()
        } catch (err) {
            return res.status('400').json({ 
                error: "Could not retrieve room"
            }) 
        }
    }
    
    const updateRoom = async (req, res) => { 
        try {
            let room = req.profile
            room = extend(user, req.body) 
            room.updated = Date.now() 
            await room.save()
            res.json(room) 
        } catch (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err) 
            })
        } 
    }
    
    const removeRoom = async (req, res) => { 
        try {
            let room = req.profile
            let deletedRoom = await room.deleteOne()
            res.json(deletedRoom) 
        } catch (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err) 
            })
        } 
    }
    
    const removeRoomList = async (req, res) => {
        try {
            await Room.deleteMany({})
            res.status(200).json({
                message: "Room list emptied."
            })
        } catch (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
    }
    
    export default { createRoom, roomByID, listRooms, removeRoom, updateRoom, removeRoomList }