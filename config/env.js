import { config } from "dotenv";

// Determine NODE_ENV first
const envMode = process.env.NODE_ENV || 'development';

// Load the corresponding env file
config({ path: `.env.${envMode}.local` });

// Now NODE_ENV is guaranteed to be loaded from the file if not set in terminal
export const PORT = process.env.PORT;
export const NODE_ENV = process.env.NODE_ENV || envMode;
export const DB_URI = process.env.DB_URI;

// helps us switch between development and production envs wihtout
// overriding one another