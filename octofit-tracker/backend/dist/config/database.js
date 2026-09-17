import mongoose from 'mongoose';
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const db = mongoose.connection;
mongoose
    .connect(connectionString)
    .then(() => {
    console.log('Connected to octofit_db');
})
    .catch((error) => {
    console.warn('Warning: Could not connect to octofit_db. Running in offline mode.', error.message);
});
db.on('error', (error) => {
    console.warn('Database connection error:', error.message);
});
export default db;
