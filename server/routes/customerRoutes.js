import express from 'express'
import customerController from '../controllers/customerController.js'

const customerRouter = express.Router()

customerRouter.route('/api/customers')
    .get(customerController.listCustomers)
    .post(customerController.createCustomer)
    .delete(customerController.removeCustomerList)

customerRouter.route('/api/users/:customerId')
    .get(customerController.custByID)
    .put(customerController.updateCustomer)
    .delete(customerController.removeCustomer)

customerRouter.param('customerId', customerController.custByID)

export default customerRouter