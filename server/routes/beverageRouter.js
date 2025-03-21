import express from 'express'
import drinkController from '../controllers/drinkController.js'

const drinkRouter = express.Router()

drinkRouter.route('/api/drink')
    .get(drinkController.listDrink)
    .post(drinkController.createDrink)
    .delete(drinkController.removeDrinkList)

drinkRouter.route('/api/drink/:drinkId')
    .get((req, res) => res.json(req.profile))
    .put(drinkController.updateDrink)
    .delete(drinkController.removeDrink)

drinkRouter.param('drinkId', drinkController.drinkByID)

export default drinkRouter