const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors'); 
const user = require('./models/user');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config(); 
const { sendConfirmationEmail, sendResetPasswordEmail } = require('./services/emailService');
const {logger} = require('./utils/logger');
const { corsOptions } = require('./config/cors');


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,       
    pass: process.env.EMAIL_PASS,   
  },
    tls: {
        rejectUnauthorized: false
    }
});


app.use(cors(corsOptions));
app.options('/api/*', cors(corsOptions));
app.use(express.json()); 
app.use(logger);


try {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Polaczono z MongoDB'));
} catch (error) {
    console.error('Nie mozna polaczyc z mongodb', error);
}


// Start serwera
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Serwer działa na http://localhost:${PORT}`);
});

// Test endpoint
app.get('/api/test', (req, res) => {
    res.json({ message: 'Connection successful!' });
});


// endpoint for adding a user 

app.post('/api/user', async (req, res) => {
    console.log('Got data from request:', req.body); 

    try {
        const { email:email, password:password } = req.body;
        const newUser = new user({ email, password });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully!' });
        await sendConfirmationEmail(email);
        
    } 
    catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Error creating user' });
    }
}); 


// endpoint for reseting password
app.post('/password/reset', async (req, res) => {
    console.log('Got data from request', req.body);  
    try {
        const { email:email } = req.body; 
        await sendResetPasswordEmail(email,'nowe-haslo'); 
    
    } 
    catch (error) {
        console.error('Error reseting user email:', error);
        res.status(500).json({ message: 'Error resseting passwrd' });
    }

});