import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    room_no: {
        type: Number,
        required: 'Room number is required',
        unique: 'Room number already exists',
    },
    capacity: {
        type: Number,
        required: 'Capacity is required',
        max: [5, 'Maximum capacity is 5']
    },
    price: {
        type: Number,
        required: 'Price is required',
    },
    status: {
        type: String,
        enum: ['available', 'booked', 'maintenance'],
        default: 'available'
    }
});

const Room = mongoose.models.Room || mongoose.model('Room', roomSchema);

export default Room;