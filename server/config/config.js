const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3001,
    jwtSecret: process.env.JWT_SECRET, // No default value
    mongoUri: process.env.MONGODB_URI
  };
  
  // Security check (development only)
  if (!config.jwtSecret && config.env === 'production') {
    throw new Error('FATAL ERROR: jwtSecret is not defined');
  }
  
  // Temporary development fallback
  if (config.env === 'development' && !config.jwtSecret) {
    config.jwtSecret = 'development_temp_secret_123';
    console.warn('WARNING: Using temporary development JWT secret');
  }
  
  export default config;