const express = require('express');
const mongoose = require('mongoose')
require('dotenv').config();


const app = express();

app.use(express.json());

const authRoutes = require('./routes/auth');
const verifyToken = require('./routes/verifyToken');

app.get('/', (req, res) => {
    res.send('Welcome to the auth system');
})

app.get('/api/user/profile', verifyToken, (req, res) => {
    res.send('This is the user profile')
})

app.use('/api/users', authRoutes);


const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(result => {
    app.listen(port, () => console.log(`Server is running on port ${port}`))
})

mongoose.connection.on("error", err =>{
    console.log(`DB connection error : ${ err.message}`)
});

