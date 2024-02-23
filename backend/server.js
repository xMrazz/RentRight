const express = require('express');
const userRoutes = require('./routes/users');
const requestRoutes = require('./routes/requests');
const applicationRoutes = require('./routes/applications');
const listingRoutes = require('./routes/listings');
const authorizationRoutes = require('./routes/authorizations');
const announcementRoutes = require('./routes/announcements');

const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

const DB_CONNECTION_STRING = process.env.DB_URI || 'mongodb://admin:admin@mongo:27017/admin';

mongoose.connect(DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/requests', requestRoutes);
app.use('/api/v1/applications', applicationRoutes); 
app.use('/api/v1/listings', listingRoutes);
app.use('/api/v1/auth', authorizationRoutes);
app.use('/api/v1/announcements', announcementRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});