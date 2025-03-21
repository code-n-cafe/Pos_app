import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    room_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
    },
    check_in: {
        type: Date,
        required: 'Check-in date is required'
    },
    check_out: {
        type: Date,
        required: 'Check-out date is required'
    }
});

export default mongoose.model('Ticket', BookingSchema)