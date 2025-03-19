import mongoose from "mongoose";

const BeverageSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required'
    },
    price: {
        type: Number,
        required: 'Price is required',
        min: [0.01, 'Price must be at least $0.01']
    },
    tags: {
        type: [String],
        enum: ['vegan', 'gluten-free', 'vegetarian', 'spicy', 'dairy-free', 'nut-free', 'organic', 'halal', 'kosher'],
        default: []
    }
});

export default mongoose.model('Beverage', BeverageSchema)