import Customer from '../models/customerModel.js';
import errorHandler from './errorController.js';
import bcrypt from 'bcrypt';

const createCustomer = async (req, res) => {
    console.log(req.body);
  const customer = new Customer(req.body);
  try {
    const { firstName, lastName, dob, email, password } = req.body;
    // Check if the email already exists
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
        return res.status(400).json({ error: 'Email already exists' });
    }
    // Create a new customer
    const newCustomer = new Customer({ firstName, lastName, dob, email, password });
    await newCustomer.save();

    res.status(201).json({ message: 'Customer created successfully!', customer: newCustomer });
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create customer' });
}
}

const verifyCustomer = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the customer by email
        const customer = await Customer.findOne({ email });
        if (!customer) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Compare the entered password with the hashed password
        const isMatch = await bcrypt.compare(password, customer.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // If the password matches, return success
        res.status(200).json({ message: 'Login successful', customer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const listCustomers = async (req, res) => {
    try {
        let customers = await Customer.find();
        res.json(customers);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
        });
    }
}

const custByID = async (req, res, next, id) => {
    try {
        let customer = await Customer.findById(id);
        if (!customer) {
            return res.status(400).json({ 
                error: "Client not found"
            });
        }
        req.profile = customer; // Ensure req.profile is set
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        return res.status(400).json({ 
            error: "Could not retrieve client"
        });
    }
};

const updateCustomer = async (req, res) => {
    try {
        let customer = req.profile;
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        customer = Object.assign(customer, req.body);
        customer.updated = Date.now();
        await customer.save();
        res.json(customer);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

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

export default { verifyCustomer, createCustomer, custByID, listCustomers, removeCustomer, updateCustomer, removeCustomerList }