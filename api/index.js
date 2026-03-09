// api/index.js is the entry point for the API
const app = require('../backend/app');

// export the app for Vercel's serverless handler
module.exports = app;
