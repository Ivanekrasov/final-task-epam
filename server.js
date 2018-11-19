const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users');
const info = require('./routes/info');
const appointments = require('./routes/api/appointments');


const app = express();

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello World'));

// Use Routes
app.use('/api/users', users);
app.use('/info', info);
app.use('/api/appointments', appointments);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
