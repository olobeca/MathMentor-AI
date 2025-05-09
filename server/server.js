const express = require('express');

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





// Start serwera
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Serwer działa na http://localhost:${PORT}`);
});


