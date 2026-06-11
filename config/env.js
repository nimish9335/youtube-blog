require('dotenv').config();

// Validate required environment variables
const requiredEnvVars = [
    'JWT_SECRET',
    'MONGODB_URI'
];

const isProduction = process.env.NODE_ENV === 'production';

if(isProduction){
    requiredEnvVars.forEach(envVar => {
        if(!process.env[envVar]){
            throw new Error(`Missing required environment variable: ${envVar}`);
        }
    });
}
