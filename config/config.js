const config = {
    env: process.env.NODE_ENV || 'development', 
    port: process.env.PORT || 3001,
    jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key", 
    mongoUri: process.env.MONGODB_URI ||"mongodb+srv://peternguyenofficiel:ImagineWag0n@skeleton.eh91f.mongodb.net/?retryWrites=true&w=majority&appName=Skeleton"||
    process.env.MONGO_HOST ||
    'mongodb://' + (process.env.IP || 'localhost') + ':' + 
   (process.env.MONGO_PORT || '27017') +
    '/mernproject' 
    }
    export default config
   