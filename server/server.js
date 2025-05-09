const express = require('express');
const mongoose = require('mongoose');

const app = express();
const cors = require('cors'); 


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
    mongoose.connect("mongodb+srv://olobeca:dobromir1@ecommerce-shop.sqgcgq9.mongodb.net/Ecommerce-Shop?retryWrites=true&w=majority&appName=Ecommerce-Shop")
    .then(() => console.log('Polaczono z MongoDB'));
} catch (error) {
    console.error('Nie mozna polaczyc z mongodb', error);
}



// Start serwera
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Serwer działa na http://localhost:${PORT}`);
});

