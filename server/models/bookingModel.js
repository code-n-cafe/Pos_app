import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    }
});

export default mongoose.model('Room', RoomSchema)