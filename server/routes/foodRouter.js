import express from 'express'
import foodController from '../controllers/foodController.js'

const foodRouter = express.Router()

foodRouter.route('/api/food')
    .get(foodController.listFood)
    .post(foodController.createFood)
    .delete(foodController.removeFoodList)

foodRouter.route('/api/users/:foodId')
    .get(foodController.foodByID)
    .put(foodController.updateFood)
    .delete(foodController.removeFood)

foodRouter.param('foodId', foodController.foodByID)

export default foodRouter