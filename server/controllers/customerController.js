import Customer from '../models/customerModel.js';
import errorHandler from './errorController.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config'; // For environment variables

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
        const customer = await Customer.findOne({
            email: { $regex: new RegExp(email, 'i') }
        });
        if (!customer) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Compare the entered password with the hashed password
        const isMatch = await bcrypt.compare(password, customer.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Create JWT token
        const token = jwt.sign(
            { userId: customer._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Return token and sanitized user data
        res.status(200).json({
            token,
            user: {
                _id: customer._id,
                firstName: customer.firstName,
                lastName: customer.lastName,
                email: customer.email,
                dob: customer.dob
            }
        });

    } catch (error) {
        console.error('Login Error: ', error);
        res.status(500).json({ error: 'Internal server error' , message: error.message });
    }
};

const updateCurrentCustomer = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const customer = await Customer.findById(decoded.userId);
        if (!customer) return res.status(404).json({ error: 'User not found' });

        // Update allowed fields
        const updatableFields = ['firstName', 'lastName', 'phone', 'dob'];
        updatableFields.forEach(field => {
            if (req.body[field] !== undefined) {
                customer[field] = req.body[field];
            }
        });

        // Handle email update separately
        if (req.body.email && req.body.email !== customer.email) {
            const existingUser = await Customer.findOne({ email: req.body.email });
            if (existingUser) {
                return res.status(400).json({ error: 'Email already exists' });
            }
            customer.email = req.body.email;
        }

        // Handle date formatting
        if (req.body.dob) {
            customer.dob = new Date(req.body.dob);
        }

        await customer.save();
        res.json(customer);
    } catch (err) {
        console.error('Update error:', err);
        res.status(400).json({
            error: err.message || 'Update failed',
            details: err.errors 
        });
    }
};

const getCurrentCustomer = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const customer = await Customer.findById(decoded.userId)
            .select('-password -__v');
            
        if (!customer) return res.status(404).json({ error: 'User not found' });
        
        res.json(customer);
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
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
        console.log('Deleting user ID:', req.userId);
        
        // Validate ID format
        if (!mongoose.Types.ObjectId.isValid(req.userId)) {
            console.error('Invalid ID:', req.userId);
            return res.status(400).json({ error: "Invalid user ID" });
        }

        const deletedUser = await Customer.findByIdAndDelete(req.userId);
        if (!deletedUser) {
            console.error('User not found:', req.userId);
            return res.status(404).json({ error: "User not found" });
        }
        
        console.log('Deleted user:', deletedUser.email);
        res.json({ message: 'Account deleted successfully' });
    } catch (err) {
        console.error("Delete error:", err);
        res.status(500).json({ 
            error: "Deletion failed",
            details: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
};

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

export default { verifyCustomer, updateCurrentCustomer, createCustomer, custByID, getCurrentCustomer, listCustomers, removeCustomer, updateCustomer, removeCustomerList }