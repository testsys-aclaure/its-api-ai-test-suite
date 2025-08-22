// Load environment variables from .env file
import dotenv from 'dotenv';

// Load the .env file
dotenv.config();

// Global setup for tests
export default async function() {
  console.log('Environment configuration loaded');
  console.log('BASE_URL:', process.env.BASE_URL);
  console.log('DEFAULT_PROGRAM_ID:', process.env.DEFAULT_PROGRAM_ID);
  console.log('CLIENT_ID set:', !!process.env.CLIENT_ID);
  console.log('CLIENT_SECRET set:', !!process.env.CLIENT_SECRET);
}
