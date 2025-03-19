import Drink from '../models/beverageModel.js';
import errorHandler from './errorController.js';

const createDrink = async (req, res) => {
  const drink = new Drink(req.body);
  try {
    await drink.save();
    return res.status(200).json({
      message: 'Successfully added beverage!',
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
}

const listDrink = async (req, res) => {
    try {
        let drink = await Drink.find().select('name email updated created');
        res.json(drink);
    } catch (err) {
        return res.status(400).json({
        error: errorHandler.getErrorMessage(err),
        });
    }
}

const drinkByID = async (req, res, next, id) => {
    try {
            let drink = await Drink.findById(id) 
            if (!drink)
                return res.status('400').json({ 
                    error: "Drinkn not found"
                })
            req.profile = room
            next()
        } catch (err) {
            return res.status('400').json({ 
                error: "Could not retrieve room"
            }) 
        }
    }
    
    const updateDrink = async (req, res) => { 
        try {
            let drink = req.profile
            drink = extend(user, req.body) 
            drink.updated = Date.now() 
            await drink.save()
            res.json(drink) 
        } catch (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err) 
            })
        } 
    }
    
    const removeDrink = async (req, res) => { 
        try {
            let drink = req.profile
            let deletedDrink = await drink.deleteOne()
            res.json(deletedDrink) 
        } catch (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err) 
            })
        } 
    }
    
    const removeDrinkList = async (req, res) => {
        try {
            await Drink.deleteMany({})
            res.status(200).json({
                message: "Drink list emptied."
            })
        } catch (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
    }
    
    export default { createDrink, drinkByID, listDrink, removeDrink, updateDrink, removeDrinkList }