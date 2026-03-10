import { config } from "dotenv";

// Determine NODE_ENV first
const envMode = process.env.NODE_ENV || 'development';

// Load the corresponding env file
config({ path: `.env.${envMode}.local` });

// Now NODE_ENV is guaranteed to be loaded from the file if not set in terminal
export const PORT = process.env.PORT;
export const NODE_ENV = process.env.NODE_ENV || envMode;
export const DB_URI = process.env.DB_URI;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
export const QSTASH_URL = process.env.QSTASH_URL;
export const QSTASH_TOKEN = process.env.QSTASH_TOKEN;
export const QSTASH_CURRENT_SIGNING_KEY = process.env.QSTASH_CURRENT_SIGNING_KEY;
export const QSTASH_NEXT_SIGNING_KEY = process.env.QSTASH_NEXT_SIGNING_KEY;


// helps us switch between development and production envs wihtout
// overriding one another