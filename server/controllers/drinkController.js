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
        let drink = await Drink.find();
        res.json(drink);
    } catch (err) {
        return res.status(400).json({
        error: errorHandler.getErrorMessage(err),
        });
    }
}

const drinkByID = async (req, res, next, id) => {
    try {
            let drink = await Drink.findById(id);
            if (!drink) {
                return res.status(404).json({ 
                    error: "Drink not found"
                });
            }
            req.profile = drink; // Ensure req.profile is set
            next(); // Proceed to the next middleware or route handler
        } catch (err) {
            return res.status(400).json({ 
                error: "Could not retrieve drink"
            });
        }
    };
    
    const updateDrink = async (req, res) => { 
        try {
            const drink = await Drink.findByIdAndUpdate(
            req.params.drinkId,
            req.body,
            { new: true, runValidators: true }
            );
            if (!drink) {
                return res.status(404).json({ error: "Beverage not found" });
            }
    
            res.json(drink); // Return the updated beverage
        } catch (err) {
            console.error('Error updating beverage:', err); // Log the error for debugging
            return res.status(400).json({ error: "Could not update beverage" });
        }
    };
    
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