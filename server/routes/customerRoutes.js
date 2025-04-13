import express from 'express';
import customerController from '../controllers/customerController.js';

const customerRouter = express.Router();

// 1. First define parameter middleware
customerRouter.param('customerId', customerController.custByID);

// 2. Then define routes
customerRouter.route('/api/customers/login')
    .post(customerController.verifyCustomer);

    customerRouter.route('/api/customers/me')
    .get(customerController.getCurrentCustomer)
    .put(customerController.updateCurrentCustomer)
    .delete(
        (req, res, next) => {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) return res.status(401).json({ error: "No token provided" });

            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) return res.status(401).json({ 
                    error: err.name === 'TokenExpiredError' 
                        ? 'Token expired' 
                        : 'Invalid token'
                });
                req.userId = decoded.userId;
                next();
            });
        },
        customerController.removeCustomer
    );

customerRouter.post('/api/customers/refresh-token', (req, res) => {
    try {
        // Add proper error handling for missing token
        const oldToken = req.headers.authorization?.split(' ')[1];
        if (!oldToken) return res.status(401).json({ error: "No token provided" });

        // Verify token even if expired
        const decoded = jwt.verify(oldToken, process.env.JWT_SECRET, { ignoreExpiration: true });
        
        // Generate new token with fresh expiration
        const newToken = jwt.sign(
            { userId: decoded.userId },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        
        res.json({ token: newToken });
    } catch (err) {
        console.error('Refresh token error:', err);
        res.status(401).json({ error: "Token refresh failed", details: err.message });
    }
});

customerRouter.route('/api/customers')
    .get(customerController.listCustomers)
    .post(customerController.createCustomer)
    .delete(customerController.removeCustomerList);

customerRouter.route('/api/customers/:customerId')
    .get((req, res) => res.json(req.profile))
    .put(customerController.updateCustomer)
    .delete(customerController.removeCustomer);

export default customerRouter;