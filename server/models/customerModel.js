import mongoose from "mongoose";
import bcrypt from "bcrypt";

const CustomerSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required'
    },
    password: {
        type: String,
        required: 'Password is required',
        set: function(password) {
            const salt = bcrypt.genSaltSync(10);
            return bcrypt.hashSync(password, salt);
        }
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
        min: [2, 'Number of people must be at least 2'],
        max: [5, 'Maximum capacity is 5'],
        validate: {
            validator: function(value) {
                return !this.group || (value >= 2 && value <= 5);
            },
            message: 'Number of people is required and must be between 2 and 5 when group is true'
        }
    }
});

CustomerSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

export default mongoose.model('Customer', CustomerSchema)