import mongoose from "mongoose";

const BeverageSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required'
    },
    type: {
        type: String,
        enum: ['alcohol', 'non-alcohol'],
        default: 'non-alcohol'
    },
    price: {
        type: Number,
        required: 'Price is required',
        min: [0.01, 'Price must be at least $0.01']
    }
});

export default mongoose.model('Drink', BeverageSchema)