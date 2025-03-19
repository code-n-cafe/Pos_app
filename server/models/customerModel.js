import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required'
    },

    email: {
        type: String,
        trim: true,
        unique: 'Email already exists',
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required: 'Email is required'
    },
    phoneNumber: {
        type: String,
        trim: true,
        required: 'Phone number is required',
        unique: 'Phone number already exists',
        match: [/^\d{10}$/, 'Please fill a valid phone number']
    },
    group: {
        type: Boolean,
        required: 'Group information is required'
    },
    numberOfPeople: {
        type: Number,
        required: function() {
            return this.group;
        },
        min: [2, 'Number of people must be at least 2'],
        validator: function(value) {
            // `this` refers to the current document being validated
            return !this.group || (this.group && 2 <= value <= 5);
        },
        message: 'Number of people is required when group is selected',
        max: [5, 'Maximum capacity is 5']
    }
})

export default mongoose.model('Customer', CustomerSchema)