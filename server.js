import 'dotenv/config';
import config from './config/config.js' 
import app from './server/express.js'
import mongoose from 'mongoose' 


mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri)
.then(() => {
    console.log("Connected to the database!");
    })
.catch(err => {
    console.error("Database connection error:", err);
    process.exit(1);
    }
)
 mongoose.connection.on('error', () => {
 throw new Error(`unable to connect to database: ${config.mongoUri}`) 
 })
 app.get("/", (req, res) => {
 res.json({ message: "Welcome to User application." });
 });
 app.listen(config.port, (err) => { 
 if (err) {
 console.log(err) 
 }
 console.info('Server started on port %s.', config.port) 
 })
 app.use((req, res) => {
    res.status(404).json({ error: "Endpoint not found" });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        error: "Internal server error",
        message: process.env.NODE_ENV === 'development' 
            ? err.message 
            : 'Something went wrong'
    });
});
 