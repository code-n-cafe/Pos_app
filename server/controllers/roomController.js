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
        let room = await Room.find();
        res.json(room);
    } catch (err) {
        return res.status(400).json({
        error: errorHandler.getErrorMessage(err),
        });
    }
}

const roomByID = async (req, res, next, id) => {
    try {
                let room = await Room.findById(id);
                if (!room) {
                    return res.status(404).json({ 
                        error: "Room not found"
                    });
                }
                req.profile = room; // Ensure req.profile is set
                next(); // Proceed to the next middleware or route handler
            } catch (err) {
                return res.status(400).json({ 
                    error: "Could not retrieve room"
                });
            }
        };
    
    const updateRoom = async (req, res) => { 
        try {
                    const room = await Room.findByIdAndUpdate(
                    req.params.roomId,
                    req.body,
                    { new: true, runValidators: true }
                    );
                    if (!room) {
                        return res.status(404).json({ error: "Room not found" });
                    }
            
                    res.json(room); // Return the updated room
                } catch (err) {
                    console.error('Error updating room information:', err); // Log the error for debugging
                    return res.status(400).json({ error: "Could not update room" });
                }
            };
    
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