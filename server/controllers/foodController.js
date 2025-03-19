import Food from '../models/foodModel.js';
import errorHandler from './errorController.js';

const createFood = async (req, res) => {
  const food = new Food(req.body);
  try {
    await food.save();
    return res.status(200).json({
      message: 'Successfully added' + Food.name + '!',
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
}

const listFood = async (req, res) => {
    try {
        let food = await Food.find().select('name email updated created');
        res.json(food);
    } catch (err) {
        return res.status(400).json({
        error: errorHandler.getErrorMessage(err),
        });
    }
}

const foodByID = async (req, res, next, id) => {
    try {
            let food = await Food.findById(id) 
            if (!food)
                return res.status('404').json({ 
                    error: "Dish not found"
                })
            req.profile = room
            next()
        } catch (err) {
            return res.status('400').json({ 
                error: "Could not retrieve dish"
            }) 
        }
    }
    
    const updateFood = async (req, res) => { 
        try {
            let food = req.profile
            food = extend(user, req.body) 
            food.updated = Date.now() 
            await food.save()
            res.json(food) 
        } catch (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err) 
            })
        } 
    }
    
    const removeFood = async (req, res) => { 
        try {
            let food = req.profile
            let deletedFood = await food.deleteOne()
            res.json(deletedFood) 
        } catch (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err) 
            })
        } 
    }
    
    const removeFoodList = async (req, res) => {
        try {
            await Food.deleteMany({})
            res.status(200).json({
                message: "Dishes list emptied."
            })
        } catch (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
    }
    
    export default { createFood, foodByID, listFood, removeFood, updateFood, removeFoodList }