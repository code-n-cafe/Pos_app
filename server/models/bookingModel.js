import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required',
        trim: true
    },
    check_in: {
        type: Date,
        required: 'Check-in date is required'
    },
    check_out: {
        type: Date,
        required: 'Check-out date is required'
    },
    email: {
        type: String,
        required: 'Email is required',
        validate: {
            validator: function(value) {
                return /\S+@\S+\.\S+/.test(value);
            },
            message: 'Email is not valid'
        }
    },
    phone: {
        type: String,
        required: 'Phone number is required',
        validate: {
            validator: function(value) {
                return /^\d{10}$/.test(value);
            },
            message: 'Phone number must be 10 digits'
        }
    },
    group: {
        type: Boolean,
        required: 'Group information is required',
        default: false
    },
    numberOfPeople: {
        type: Number,
        required: function() {
            return this.group === true;
        },
        validate: {
            validator: function(value) {
                // Ensure value is a number and within the valid range
                return !this.group || (value >= 2 && value <= 5);
            },
            message: 'Number of people is required and must be between 2 and 5 when group is true'
        },
        default: 1
    },
});

export default mongoose.model('Ticket', BookingSchema)