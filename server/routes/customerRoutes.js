import express from 'express'
import customerController from '../controllers/customerController.js'
import customerModel from '../models/customerModel.js';

const customerRouter = express.Router()

customerRouter.route('/api/customers/login')
    .post(customerController.verifyCustomer);

customerRouter.route('/api/customers')
  .get(customerController.listCustomers)
  .post(customerController.createCustomer)
  .delete(customerController.removeCustomerList);

customerRouter.route('/api/customers/:customerId') // Corrected route
    .get((req, res) => res.json(req.profile)) // Respond with the customer profile
    .put(customerController.updateCustomer) // Update customer
    .delete(customerController.removeCustomer); // Delete customer

customerRouter.param('customerId', customerController.custByID)

export default customerRouter