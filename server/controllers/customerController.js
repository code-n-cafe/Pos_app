import Customer from '../models/customerModel.js';
import errorHandler from './errorController.js';

const createCustomer = async (req, res) => {
  const customer = new Customer(req.body);
  try {
    await customer.save();
    return res.status(200).json({
      message: 'Successfully created customer!',
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
}

const listCustomers = async (req, res) => {
    try {
        let customers = await Customer.find().select('name email updated created');
        res.json(customers);
    } catch (err) {
        return res.status(400).json({
        error: errorHandler.getErrorMessage(err),
        });
    }
}

const custByID = async (req, res, next, id) => {
    try {
            let customer = await Customer.findById(id) 
            if (!customer)
                return res.status('400').json({ 
                    error: "Client not found"
                })
            req.profile = customer
            next()
        } catch (err) {
            return res.status('400').json({ 
                error: "Could not retrieve client"
            }) 
        }
    }
    
    const updateCustomer = async (req, res) => { 
        try {
            let customer = req.profile
            customer = extend(user, req.body) 
            customer.updated = Date.now() 
            await customer.save()
            res.json(customer) 
        } catch (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err) 
            })
        } 
    }
    
    const removeCustomer = async (req, res) => { 
        try {
            let customer = req.profile
            let deletedCust = await customer.deleteOne() 
            res.json(deletedCust) 
        } catch (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err) 
            })
        } 
    }
    
    const removeCustomerList = async (req, res) => {
        try {
            await Customer.deleteMany({})
            res.status(200).json({
                message: "All clients removed"
            })
        } catch (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
    }
    
    export default { createCustomer, custByID, listCustomers, removeCustomer, updateCustomer, removeCustomerList }