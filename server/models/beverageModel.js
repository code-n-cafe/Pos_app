import mongoose from "mongoose";

const BeverageSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required'
    },
    type: {
        type: Boolean,
        required: 'Alcohol information is required',
        enum: [true, false],
        default: false,
        get: v => v ? 'alcohol' : 'non-alcohol',
        set: v => v === 'alcohol'
    },
    price: {
        type: Number,
        required: 'Price is required',
        min: [0.01, 'Price must be at least $0.01']
    }
});

export default mongoose.model('Beverage', BeverageSchema)