import mongoose from "mongoose";
import bcrypt from "bcrypt";

const CustomerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: 'First name is required'
    },
    lastName: {
        type: String,
        trim: true,
        required: 'Last name is required'
    },
    dob: {
        type: Date,
        required: 'Date of birth is required',
        validate: {
            validator: function(value) {
                return value <= new Date();
            },
            message: 'Date of birth cannot be in the future'
        }
    },
    email: {
        type: String,
        trim: true,
        unique: 'Email already exists',
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required: 'Email is required'
    },
    password: {
        type: String,
        required: 'Password is required',
        }
    }
);

CustomerSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

export default mongoose.model('Customer', CustomerSchema)