const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors'); 
const user = require('./models/user');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config(); 
const {logger} = require('./utils/logger');
const { corsOptions } = require('./config/cors');

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


const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes); 

const appRoutes = require('./routes/appRoutes');
app.use('/api/app', appRoutes);


// Start serwera
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Serwer działa na http://localhost:${PORT}`);
});



