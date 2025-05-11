const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors'); 
const user = require('./models/user');


const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
  };

app.use(cors(corsOptions));
app.options('/api/*', cors(corsOptions));
app.use(express.json()); 

const logger = (req,res, next) => {
    const czas = new Date().toISOString();
    console.log(`${req.method} ${req.url} ${czas}`);
    next();
};

app.use(logger);


try {
    mongoose.connect("mongodb+srv://alerksanderradecki:Dobromir1@mathmentor-ai.dthutad.mongodb.net/?retryWrites=true&w=majority&appName=MathMentor-AI")
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
        const { email, password } = req.body;
        const newUser = new user({ email, password });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully!' });
    } 
    catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Error creating user' });
    }
});