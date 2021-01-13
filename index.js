

var cors = require('cors');
const express = require('express');

require('dotenv').config();

// Configurar CORS

app.use(cors());

const { dbConnection} = require('./database/config');

// Crear el servidor de express
const app = express();

// Base de datos

dbConnection();

// ThdIfsMPof8g5xi8

// marks

//Rutas
app.get('/', (req, res) => {
res.json({
    ok: true,
    msg: 'Hola Mundo'
});
});


app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + 3000);
});